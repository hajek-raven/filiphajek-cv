import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const PDF_PATH = path.join(ROOT, "public", "cv.pdf");
const PORT = Number(process.env.PDF_GEN_PORT ?? 3459);
const DEFAULT_SOURCES = [
  process.env.PDF_SOURCE_URL,
  "http://127.0.0.1:3000",
  "http://localhost:3000",
].filter(Boolean);
const SERVER_TIMEOUT_MS = 120_000;
const PAGE_TIMEOUT_MS = 30_000;

async function isServerReady(url) {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(2_000) });
    return response.ok;
  } catch {
    return false;
  }
}

async function waitForServer(url, maxMs) {
  const started = Date.now();

  while (Date.now() - started < maxMs) {
    if (await isServerReady(url)) return;
    await new Promise((resolve) => setTimeout(resolve, 400));
  }

  throw new Error(`Timed out waiting for ${url}`);
}

async function resolveBaseUrl() {
  if (process.env.PDF_FORCE_PRODUCTION === "1") {
    return startProductionServer();
  }

  for (const source of DEFAULT_SOURCES) {
    const url = source.replace(/\/$/, "");
    if (await isServerReady(`${url}/`)) {
      console.log(`Using running server at ${url}`);
      return { baseUrl: url, process: null };
    }
  }

  return startProductionServer();
}

async function startProductionServer() {
  const baseUrl = `http://127.0.0.1:${PORT}`;
  console.log(`Starting production server at ${baseUrl}`);

  await new Promise((resolve, reject) => {
    const build = spawn("pnpm", ["exec", "next", "build"], {
      cwd: ROOT,
      stdio: "inherit",
    });
    build.on("error", reject);
    build.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`next build exited with code ${code ?? "unknown"}`));
    });
  });

  const serverProcess = await new Promise((resolve, reject) => {
    const child = spawn(
      "pnpm",
      ["exec", "next", "start", "--port", String(PORT), "--hostname", "127.0.0.1"],
      {
        cwd: ROOT,
        env: { ...process.env, NODE_ENV: "production" },
        stdio: ["ignore", "pipe", "pipe"],
      },
    );

    let settled = false;

    const fail = (error) => {
      if (settled) return;
      settled = true;
      child.kill("SIGTERM");
      reject(error);
    };

    child.on("error", fail);
    child.on("exit", (code) => {
      if (!settled) fail(new Error(`next start exited with code ${code ?? "unknown"}`));
    });

    waitForServer(`${baseUrl}/`, SERVER_TIMEOUT_MS)
      .then(() => {
        if (settled) return;
        settled = true;
        resolve(child);
      })
      .catch(fail);
  });

  return { baseUrl, serverProcess };
}

async function generatePdf() {
  await mkdir(path.dirname(PDF_PATH), { recursive: true });

  const { baseUrl, serverProcess } = await resolveBaseUrl();
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.goto(`${baseUrl}/`, {
      waitUntil: "networkidle0",
      timeout: PAGE_TIMEOUT_MS,
    });
    await page.evaluate(() => document.fonts.ready);
    await page.emulateMediaType("print");
    await page.pdf({
      path: PDF_PATH,
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });
  } finally {
    await browser.close();
    serverProcess?.kill("SIGTERM");
  }

  console.log(`Wrote ${PDF_PATH}`);
}

generatePdf().catch((error) => {
  console.error(error);
  process.exit(1);
});
