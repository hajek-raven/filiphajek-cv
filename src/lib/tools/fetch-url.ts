import { tool } from "ai";
import { z } from "zod";

const MAX_BYTES = 1_000_000;
const MAX_TEXT_LENGTH = 12_000;
const FETCH_TIMEOUT_MS = 12_000;

const blockedHostnames = new Set([
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "::1",
]);

function isPrivateIpv4(hostname: string): boolean {
  const match = hostname.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (!match) {
    return false;
  }

  const octets = match.slice(1).map(Number);
  if (octets.some((octet) => octet > 255)) {
    return false;
  }

  const [a, b] = octets;
  return (
    a === 10 ||
    a === 127 ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    (a === 169 && b === 254) ||
    a === 0
  );
}

function assertFetchableUrl(rawUrl: string): URL {
  let parsed: URL;

  try {
    parsed = new URL(rawUrl);
  } catch {
    throw new Error("Neplatná URL adresa.");
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new Error("Povoleny jsou pouze HTTP a HTTPS URL.");
  }

  const hostname = parsed.hostname.toLowerCase();

  if (
    blockedHostnames.has(hostname) ||
    hostname.endsWith(".local") ||
    hostname.endsWith(".localhost") ||
    isPrivateIpv4(hostname)
  ) {
    throw new Error("Tato URL adresa není povolena.");
  }

  return parsed;
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}

function htmlToText(html: string): string {
  const withoutNoise = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ");

  const withBreaks = withoutNoise
    .replace(/<\/(p|div|h[1-6]|li|br|tr|section|article|header|footer)>/gi, "\n")
    .replace(/<(br|hr)\s*\/?>/gi, "\n");

  const text = decodeHtmlEntities(withBreaks.replace(/<[^>]+>/g, " "))
    .replace(/\r/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();

  return text;
}

function extractTitle(html: string): string | null {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!match?.[1]) {
    return null;
  }

  return decodeHtmlEntities(match[1].replace(/<[^>]+>/g, " ").trim()) || null;
}

export async function fetchPageContent(rawUrl: string) {
  const url = assertFetchableUrl(rawUrl);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url.toString(), {
      signal: controller.signal,
      headers: {
        Accept: "text/html,application/xhtml+xml,text/plain;q=0.9,*/*;q=0.8",
        "User-Agent": "filiphajek-cv-bot/1.0",
      },
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error(`Server vrátil stav ${response.status}.`);
    }

    const contentType = response.headers.get("content-type") ?? "";
    const buffer = await response.arrayBuffer();

    if (buffer.byteLength > MAX_BYTES) {
      throw new Error("Stránka je příliš velká pro načtení.");
    }

    const body = new TextDecoder("utf-8", { fatal: false }).decode(buffer);
    const title = contentType.includes("html") ? extractTitle(body) : null;
    const text = contentType.includes("html") ? htmlToText(body) : body.trim();

    if (!text) {
      throw new Error("Stránka neobsahuje textový obsah.");
    }

    const truncated = text.length > MAX_TEXT_LENGTH;

    return {
      url: url.toString(),
      title,
      contentType,
      content: truncated ? `${text.slice(0, MAX_TEXT_LENGTH)}…` : text,
      truncated,
      length: text.length,
    };
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Načtení stránky vypršelo.");
    }

    throw error instanceof Error ? error : new Error("Nepodařilo se načíst stránku.");
  } finally {
    clearTimeout(timeout);
  }
}

export const fetchUrlTool = tool({
  description:
    "Načte veřejnou webovou stránku z URL a vrátí její textový obsah. Použij, když uživatel pošle odkaz nebo chce informace z konkrétní stránky.",
  inputSchema: z.object({
    url: z.url().describe("Plná URL stránky včetně https://"),
  }),
  execute: async ({ url }) => fetchPageContent(url),
});
