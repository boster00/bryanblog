// Backfill gpt-image-2 editorial diagrams across every adopted article in
// content/. Runs `fillDiagrams` on each file in-place.
//
// Run with:
//   node --env-file=C:/Users/xsj70/cjgeo/.env.local scripts/backfill-diagrams.mjs
// (provides OPENAI_API_KEY for the openai_images weapon's `generate` export.)
//
// Per-article concurrency is 4 (inside fillDiagrams). We also limit
// FILE-level concurrency to 4 so we never have more than ~16 gpt-image-2
// calls in flight at once.

import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { fillDiagrams } from "../lib/fill-diagrams.mjs";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT_GLOBS = [
  "content/retirement-income",
  "content/about",
  "content/contact",
];
const PUBLIC_DIR = path.join(REPO_ROOT, "public/images/diagrams");
const FILE_CONCURRENCY = 4;

// Adapter — self-contained mirror of the openai_images weapon's `generate`
// export (we can't import the GuildOS weapon directly here because it imports
// `@/libs/council/database`, a Next.js path alias that doesn't resolve from a
// raw node script). Same wire spec, same model, same response shape.
const IMAGE_MODEL = process.env.OPENAI_IMAGE_MODEL || "gpt-image-2";
async function openaiImagesGenerate({ prompt, size = "1024x1024", quality = "high", n = 1 }) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("OPENAI_API_KEY not configured");
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ model: IMAGE_MODEL, prompt, size, quality, n }),
  });
  const json = await res.json();
  if (json.error) throw new Error(`OpenAI Images error: ${json.error.message}`);
  if (!json.data || !Array.isArray(json.data)) {
    throw new Error(`OpenAI Images: unexpected response ${JSON.stringify(json).slice(0, 200)}`);
  }
  return json.data.map((d) => d.b64_json);
}

function slugFromFile(filename) {
  // monthly-income-needs.html → monthly-income-needs
  // about/index.html → about
  // contact/intro.html → contact-intro
  const base = path.basename(filename, ".html");
  const dir = path.basename(path.dirname(filename));
  if (base === "index") return dir;
  if (dir === "contact" && base !== "intro") return `${dir}-${base}`;
  if (dir === "contact") return `contact-${base}`;
  return base;
}

async function listAllArticles() {
  const all = [];
  for (const rel of CONTENT_GLOBS) {
    const dir = path.join(REPO_ROOT, rel);
    let entries;
    try {
      entries = await fs.readdir(dir);
    } catch {
      continue;
    }
    for (const f of entries) {
      if (!f.endsWith(".html")) continue;
      all.push(path.join(dir, f));
    }
  }
  return all.sort();
}

async function processOne(filepath) {
  const start = Date.now();
  const slug = slugFromFile(filepath);
  const html = await fs.readFile(filepath, "utf8");

  // Quick pre-detect: count bracket placeholders so we don't even open the
  // model when there's nothing to do.
  const placeholderCount = (html.match(/\[(Diagram|Chart|Visual|Illustration|Figure|Graph):/g) || []).length;
  if (placeholderCount === 0) {
    return {
      filepath,
      slug,
      placeholders: 0,
      generated: 0,
      failures: 0,
      runtimeMs: Date.now() - start,
      skipped: true,
    };
  }

  console.log(`[backfill] ${slug}: ${placeholderCount} placeholder(s) detected, generating...`);

  const result = await fillDiagrams(html, {
    slug,
    publicDir: PUBLIC_DIR,
    imageUrlPrefix: "/images/diagrams",
    openaiImagesGenerate,
    surroundingContextChars: 600,
    concurrency: 4,
    retries: 3,
    size: "1024x1024",
    quality: "high",
  });

  await fs.writeFile(filepath, result.html, "utf8");

  return {
    filepath,
    slug,
    placeholders: placeholderCount,
    generated: result.generatedImages.length,
    failures: result.failures.length,
    failureDetails: result.failures,
    runtimeMs: Date.now() - start,
    skipped: false,
  };
}

async function parallelPool(items, limit, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  const lanes = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (true) {
      const idx = cursor++;
      if (idx >= items.length) return;
      try {
        results[idx] = await worker(items[idx], idx);
      } catch (err) {
        results[idx] = { filepath: items[idx], error: err?.message || String(err) };
      }
    }
  });
  await Promise.all(lanes);
  return results;
}

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY not set. Run with --env-file=C:/Users/xsj70/cjgeo/.env.local");
    process.exit(1);
  }
  await fs.mkdir(PUBLIC_DIR, { recursive: true });

  const files = await listAllArticles();
  console.log(`[backfill] scanning ${files.length} article file(s)...`);

  const start = Date.now();
  const results = await parallelPool(files, FILE_CONCURRENCY, processOne);
  const totalMs = Date.now() - start;

  // Summary
  let totalPlaceholders = 0;
  let totalGenerated = 0;
  let totalFailures = 0;
  console.log("\n=== Per-article summary ===");
  console.log("slug | placeholders | generated | failures | runtimeMs");
  console.log("---|---|---|---|---");
  for (const r of results) {
    if (r.error) {
      console.log(`ERROR ${r.filepath}: ${r.error}`);
      continue;
    }
    totalPlaceholders += r.placeholders;
    totalGenerated += r.generated;
    totalFailures += r.failures;
    console.log(
      `${r.slug} | ${r.placeholders} | ${r.generated} | ${r.failures} | ${r.runtimeMs}`
    );
    if (r.failureDetails && r.failureDetails.length) {
      for (const f of r.failureDetails) {
        console.log(`    FAILURE: "${f.title}" — ${f.error}`);
      }
    }
  }
  console.log("---");
  console.log(`TOTAL placeholders: ${totalPlaceholders}`);
  console.log(`TOTAL generated:    ${totalGenerated}`);
  console.log(`TOTAL failures:     ${totalFailures}`);
  console.log(`TOTAL runtime:      ${(totalMs / 1000).toFixed(1)}s`);

  // List images saved
  try {
    const imgs = await fs.readdir(PUBLIC_DIR);
    const stats = await Promise.all(
      imgs.map(async (n) => {
        const s = await fs.stat(path.join(PUBLIC_DIR, n));
        return { n, size: s.size };
      })
    );
    const totalBytes = stats.reduce((a, s) => a + s.size, 0);
    console.log(`\n=== public/images/diagrams ===`);
    console.log(`${stats.length} image(s), total ${(totalBytes / 1024).toFixed(1)} KB`);
    for (const s of stats) {
      console.log(`  ${s.n} — ${(s.size / 1024).toFixed(1)} KB`);
    }
  } catch (err) {
    console.warn(`Could not enumerate ${PUBLIC_DIR}:`, err.message);
  }
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
