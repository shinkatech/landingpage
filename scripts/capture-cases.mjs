import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "cases");

const CASES = [
  { slug: "resenha", url: "https://resenhacommunity.com.br/" },
  { slug: "clinica-estetica", url: "https://clinica-estetica-puce.vercel.app/" },
  { slug: "obsidiana", url: "https://obsidiana-bay.vercel.app/" },
  { slug: "clara-mendes", url: "https://projeto-lpnutricao.vercel.app/" },
  { slug: "geekdom", url: "https://geekdom-beta.vercel.app/" },
  { slug: "folio", url: "https://folio-sooty-three.vercel.app/" },
  { slug: "forja-academia", url: "https://landing-muscle.vercel.app/" },
  { slug: "vao-estudio", url: "https://vao-landing.vercel.app/" },
];

const WIDTH = 1440;
const HEIGHT = 900;

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ channel: "chrome", headless: true });

for (const item of CASES) {
  const page = await browser.newPage({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
  });
  await page.goto(item.url, { waitUntil: "networkidle", timeout: 90000 });
  await page.waitForTimeout(5000);
  await page.evaluate((scroll) => {
    document.querySelectorAll(".loader, [aria-hidden='true'].loader").forEach((el) => {
      el.style.display = "none";
    });
    if (scroll) {
      document.querySelector(scroll)?.scrollIntoView({ behavior: "instant", block: "start" });
      return;
    }
    window.scrollTo(0, 0);
  }, item.scroll);
  await page.waitForTimeout(item.scroll ? 1600 : 400);
  const file = join(outDir, `${item.slug}.png`);
  await page.screenshot({ path: file, clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT } });
  await page.close();
  console.log(`saved ${item.slug}`);
}

await browser.close();
