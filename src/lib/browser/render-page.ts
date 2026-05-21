import { existsSync } from "node:fs";
import chromium from "@sparticuz/chromium-min";
import puppeteer, { type Browser } from "puppeteer-core";

const CHROMIUM_PACK_URL =
  "https://github.com/Sparticuz/chromium/releases/download/v148.0.0/chromium-v148.0.0-pack.x64.tar";

const BROWSER_TIMEOUT_MS = 20_000;
const MAX_TEXT_LENGTH = 12_000;

const LOCAL_CHROME_CANDIDATES = [
  process.env.CHROME_EXECUTABLE_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean) as string[];

function getLocalChromePath(): string | undefined {
  return LOCAL_CHROME_CANDIDATES.find((path) => existsSync(path));
}

function isServerlessRuntime(): boolean {
  return Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
}

async function launchBrowser(): Promise<Browser> {
  const localChromePath = getLocalChromePath();

  if (localChromePath && !isServerlessRuntime()) {
    return puppeteer.launch({
      executablePath: localChromePath,
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
    });
  }

  chromium.setGraphicsMode = false;

  return puppeteer.launch({
    args: await puppeteer.defaultArgs({ args: chromium.args, headless: "shell" }),
    defaultViewport: {
      deviceScaleFactor: 1,
      hasTouch: false,
      height: 1080,
      isLandscape: true,
      isMobile: false,
      width: 1280,
    },
    executablePath: await chromium.executablePath(CHROMIUM_PACK_URL),
    headless: "shell",
  });
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
