// One-off regeneration of the 5 live editorial diagrams after style audit.
// Uses the refined CANONICAL_PROMPT_PREFIX locked in lib/fill-diagrams.mjs.
//
// Run:  node --env-file=C:/Users/xsj70/cjgeo/.env.local scripts/regen-diagrams-audit.mjs

import { promises as fs } from "fs";
import path from "path";

const OUT_DIR = path.join(process.cwd(), "public", "images", "diagrams");

// Mirror the refined prompt prefix from lib/fill-diagrams.mjs (kept in sync — this
// is a one-off script; the module is the source of truth).
const CANONICAL_PROMPT_PREFIX = [
  'A single minimalist editorial vector illustration for a retirement-planning content site.',
  "PALETTE (use ONLY these hex values, no others): #1C4259 slate teal-navy (primary line/fill),",
  "#8C3A2E muted oxblood-terracotta (single accent), #FAF9F8 warm off-white (solid background),",
  "and at most #B5A99A warm taupe for a thin secondary line. NO pure white #FFFFFF, NO blue other",
  "than #1C4259, NO red/orange other than #8C3A2E, NO neon, NO pastels, NO gradients.",
  "BACKGROUND: solid warm off-white #FAF9F8 (paper texture, not white). NO gradient backgrounds,",
  "NO scenery, NO landscapes, NO buildings, NO horizon, NO weather, NO decorative motifs around the edges.",
  "STYLE: flat editorial vector illustration with restrained line weight, like a single illustration",
  "in The Atlantic, Kinfolk, or a thoughtful nonfiction book. Hand-drawn editorial feel. NO 3D rendering,",
  "NO photorealism, NO AI-art over-rendering, NO airbrushed shading, NO drop shadows, NO depth-of-field,",
  "NO multiple illustration styles mixed together, NO collage. ONE coherent flat-vector style end to end.",
  "ABSOLUTELY NO TEXT OR NUMBERS of any kind anywhere in the image — no labels, no titles, no axis",
  "numbers, no currency symbols, no percentages, no captions, no watermarks, no signatures, no",
  "tick marks with values. Captions are added as separate HTML outside the image. If the concept",
  "would normally require labels (a chart, a timeline), depict the SHAPE of the idea without the labels.",
  "AVOID finance clichés: NO piggy banks, NO money bags, NO sacks of cash, NO growing money plants,",
  "NO dollar-sign trees, NO coin stacks (with or without $ symbols), NO hand-shake silhouettes,",
  "NO suit-and-tie executive figures, NO generic up-arrow growth charts, NO balance scales of money,",
  "NO businessman silhouettes, NO hourglass with money, NO 3D coins. Choose a nuanced visual metaphor.",
  "NO rows of small icons across the top or bottom of the image. NO grids of mini-illustrations.",
  "NO collage of multiple separate scenes. NO secondary background characters or props.",
  "COMPOSITION: landscape 1024x768. ONE primary subject occupying the central 50-65% of the canvas,",
  "with generous whitespace (solid #FAF9F8) on all sides. Centered or thoughtfully off-center.",
  "DENSITY: minimalist. Convey ONE concept clearly with as few visual elements as possible.",
  "If the concept involves comparison or sequence, use 2-4 simple shapes arranged with breathing space,",
  "never crowded. When in doubt, fewer elements.",
].join(" ");

function buildPrompt(title, ctx) {
  return [
    CANONICAL_PROMPT_PREFIX,
    `\nSUBJECT to illustrate: ${title}.`,
    `\nNarrative context (informational only — do NOT add text from this into the image): ${ctx}`,
    `\nReminder: NO TEXT, NO NUMBERS, NO CURRENCY SYMBOLS, NO CLICHÉS, NO SCENERY, NO ICON STRIPS, NO COLLAGE. ONE clean editorial vector concept on warm-paper #FAF9F8 background.`,
  ].join("");
}

const TARGETS = [
  {
    filename: "monthly-income-needs-1.png",
    title: "The Two-Bucket Approach",
    ctx: "Retirement income planning concept: split retirement money into a safety bucket (covers monthly essentials, does not fluctuate with markets — Social Security, pension, fixed income) and a growth bucket (stays invested for long-term growth, can absorb market volatility).",
  },
  {
    filename: "monthly-income-needs-2.png",
    title: "Social Security Timing Trade-offs",
    ctx: "Three timing choices for claiming Social Security: claim early at age 62 (smaller permanent benefit), claim at full retirement age 66 or 67 (full benefit), or delay to age 70 (larger benefit). A trade-off between starting sooner with less versus waiting for more.",
  },
  {
    filename: "monthly-income-needs-3.png",
    title: "Four Steps to a Retirement Income Plan",
    ctx: "A four-step sequence for building a retirement income plan: (1) list income sources and monthly gaps, (2) check Social Security statement, (3) estimate healthcare costs, (4) decide what guaranteed income to add. Sequence and progression, no specific labels.",
  },
  {
    filename: "retirement-paycheck-1.png",
    title: "Safe Money and Growth Money — two complementary buckets",
    ctx: "Two distinct but complementary buckets of retirement money: safe money flows steadily into monthly expenses (calm, predictable, fixed); growth money stays in a long-term portfolio (active, growing, exposed to markets but for the long horizon). Show them as two related vessels, distinct in character.",
  },
  {
    filename: "retirement-paycheck-2.png",
    title: "Inflation eroding purchasing power over time",
    ctx: "The slow erosion of purchasing power across a long retirement: what one unit of spending power is at the start gradually shrinks over twenty years of modest inflation. Show the concept of slow erosion or shrinking-over-time, NOT a bar chart with numbers.",
  },
];

async function generate(prompt) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("OPENAI_API_KEY missing");
  const body = {
    model: process.env.OPENAI_IMAGE_MODEL || "gpt-image-2",
    prompt,
    size: "1536x1024", // landscape — closest API-supported size to 1024x768
    quality: "high",
    n: 1,
  };
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (json.error) throw new Error(`OpenAI: ${json.error.message}`);
  return json.data[0].b64_json;
}

async function withRetry(fn, label, max = 3) {
  let lastErr;
  for (let i = 1; i <= max; i++) {
    try {
      return await fn();
    } catch (e) {
      lastErr = e;
      console.warn(`[${label}] attempt ${i}/${max} failed: ${e.message}`);
      await new Promise((r) => setTimeout(r, 2000 * i));
    }
  }
  throw lastErr;
}

async function processOne(t) {
  const started = Date.now();
  const prompt = buildPrompt(t.title, t.ctx);
  const b64 = await withRetry(() => generate(prompt), t.filename);
  const buf = Buffer.from(b64, "base64");
  const outPath = path.join(OUT_DIR, t.filename);
  await fs.writeFile(outPath, buf);
  const ms = Date.now() - started;
  console.log(`[ok] ${t.filename} ${(buf.length / 1024).toFixed(1)}KB in ${(ms/1000).toFixed(1)}s`);
  return { ok: true, filename: t.filename, ms, bytes: buf.length };
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  console.log(`[regen] ${TARGETS.length} diagrams, concurrency 4`);
  const t0 = Date.now();
  // Concurrency pool of 4 (matches the fill-diagrams module default).
  const limit = 4;
  const results = new Array(TARGETS.length);
  let cursor = 0;
  const lanes = Array.from({ length: Math.min(limit, TARGETS.length) }, async () => {
    while (true) {
      const i = cursor++;
      if (i >= TARGETS.length) return;
      try {
        results[i] = await processOne(TARGETS[i]);
      } catch (e) {
        results[i] = { ok: false, filename: TARGETS[i].filename, error: e.message };
        console.error(`[fail] ${TARGETS[i].filename}: ${e.message}`);
      }
    }
  });
  await Promise.all(lanes);
  const totalMs = Date.now() - t0;
  console.log(`[done] total ${(totalMs/1000).toFixed(1)}s`);
  const failures = results.filter((r) => !r.ok);
  if (failures.length) {
    console.error(`${failures.length} failures:`, failures);
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
