import { renderPageText } from "@/lib/browser/render-page";
import { tool } from "ai";
import { z } from "zod";

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

function assertFetchableUrl(rawUrl: string): string {
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

  return parsed.toString();
}

export async function fetchPageContent(rawUrl: string) {
  return renderPageText(assertFetchableUrl(rawUrl));
}

export const fetchUrlTool = tool({
  description:
    "Načte veřejnou webovou stránku z URL v headless prohlížeči a vrátí její textový obsah. Použij, když uživatel pošle odkaz nebo chce informace z konkrétní stránky.",
  inputSchema: z.object({
    url: z.url().describe("Plná URL stránky včetně https://"),
  }),
  execute: async ({ url }) => fetchPageContent(url),
});
