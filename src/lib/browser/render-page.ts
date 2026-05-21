import puppeteer, { type Browser } from "puppeteer-core";

const BROWSER_TIMEOUT_MS = 20_000;
const MAX_TEXT_LENGTH = 12_000;
const DEFAULT_BROWSERLESS_HOST = "production-sfo.browserless.io";

function getBrowserlessEndpoint(): string {
  if (process.env.BROWSERLESS_WS_ENDPOINT) {
    return process.env.BROWSERLESS_WS_ENDPOINT;
  }

  const token = process.env.BROWSERLESS_TOKEN;
  if (!token) {
    throw new Error(
      "Browser rendering is not configured. Set BROWSERLESS_TOKEN or BROWSERLESS_WS_ENDPOINT.",
    );
  }

  const rawBase = process.env.BROWSERLESS_URL ?? DEFAULT_BROWSERLESS_HOST;
  const base = rawBase.startsWith("ws") ? rawBase : `wss://${rawBase}`;
  const endpoint = new URL(base);
  endpoint.searchParams.set("token", token);

  return endpoint.toString();
}

async function launchBrowser(): Promise<Browser> {
  return puppeteer.connect({ browserWSEndpoint: getBrowserlessEndpoint() });
}

function normalizeText(text: string): string {
  return text
    .replace(/\r/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

export async function renderPageText(rawUrl: string) {
  const browser = await launchBrowser();

  try {
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    );

    await page.goto(rawUrl, {
      waitUntil: "networkidle2",
      timeout: BROWSER_TIMEOUT_MS,
    });

    await page
      .waitForFunction(
        () => document.body?.innerText.replace(/\s+/g, " ").trim().length > 200,
        { timeout: 5_000 },
      )
      .catch(() => undefined);

    const title = await page.title();
    const text = await page.evaluate(() => {
      const clone = document.body.cloneNode(true) as HTMLElement;

      clone
        .querySelectorAll(
          "script, style, noscript, nav, footer, header, [aria-hidden='true']",
        )
        .forEach((element) => element.remove());

      return clone.innerText;
    });

    const content = normalizeText(text);

    if (!content) {
      throw new Error("Stránka neobsahuje textový obsah.");
    }

    const truncated = content.length > MAX_TEXT_LENGTH;

    return {
      url: rawUrl,
      title: title || null,
      contentType: "text/html",
      content: truncated ? `${content.slice(0, MAX_TEXT_LENGTH)}…` : content,
      truncated,
      length: content.length,
      method: "browser" as const,
    };
  } finally {
    await browser.close();
  }
}
