// Retry pass for 3 diagrams that still showed cliché elements
// (growing plants in containers, balance scales) despite explicit bans.
// Uses sharpened anti-cliché language and alternative metaphors.

import { promises as fs } from "fs";
import path from "path";

const OUT_DIR = path.join(process.cwd(), "public", "images", "diagrams");

const HARD_CONSTRAINTS = [
  "A single minimalist editorial vector illustration for a retirement-planning content site.",
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
  "tick marks with values.",
  // HARDER cliché ban — the previous pass had growing plants and balance scales sneak through.
  "STRICTLY FORBIDDEN visual elements (do NOT include any of these even as a small accent):",
  "growing plants, sprouting plants, leaves, vines, seedlings, any vegetation inside any container,",
  "plants of any kind in any pot or bucket or vessel, money plants, dollar-sign trees,",
  "balance scales, scales of any kind, see-saws, teeter-totters, weighing apparatus,",
  "piggy banks, money bags, sacks of cash, coin stacks, dollar bills, currency notes, $ symbols,",
  "hand-shakes, suit-and-tie figures, businessman silhouettes, generic up-arrow growth charts,",
  "hourglasses, 3D coins, dollar signs.",
  "NO rows of small icons across the top or bottom. NO grids of mini-illustrations. NO collage.",
  "NO secondary background characters or props.",
  "COMPOSITION: landscape 1536x1024 aspect. ONE primary subject occupying the central 50-65% of the canvas,",
  "with generous whitespace (solid #FAF9F8) on all sides. Centered or thoughtfully off-center.",
  "DENSITY: minimalist. Convey ONE concept clearly with as few visual elements as possible.",
  "When in doubt, fewer elements.",
].join(" ");

function buildPrompt(title, ctx, metaphorHint) {
  return [
    HARD_CONSTRAINTS,
    `\nSUBJECT to illustrate: ${title}.`,
    `\nNarrative context (informational only — do NOT embed any text from this into the image): ${ctx}`,
    `\nVisual metaphor direction: ${metaphorHint}`,
    `\nFinal reminder: NO plants, NO leaves, NO balance scales, NO text, NO numbers, NO currency. One clean editorial vector concept on warm-paper #FAF9F8 background, with breathing room.`,
  ].join("");
}

const TARGETS = [
  {
    filename: "monthly-income-needs-1.png",
    title: "The Two-Bucket Approach",
    ctx: "Split retirement money into two complementary categories: a safety category (steady, protected, used for monthly essentials) and a growth category (active, exposed to markets but for the long horizon). Show two distinct but related containers — one calm, one active.",
    metaphorHint: "Two ceramic vessels or two stylized geometric shapes (squares, circles, simple flat icons) side by side — one in slate teal-navy (calm, anchored, with a subtle horizontal line suggesting stability), one in terracotta (slightly different shape suggesting motion or change). NO plants, NO leaves, NO vegetation. NO water pouring. Pure abstract shape contrast.",
  },
  {
    filename: "monthly-income-needs-2.png",
    title: "Social Security Timing Trade-offs",
    ctx: "Three different moments at which a person might claim Social Security: earlier (smaller permanent income), full retirement age (middle), or delayed (larger permanent income). The choice is a trade-off between when income begins and how large each payment is.",
    metaphorHint: "Three abstract simple shapes (circles or squares) of progressively different sizes arranged along a horizontal line, with the smallest shape on the left and the largest shape on the right, suggesting the size grows as the choice is delayed. NO scales, NO hourglasses, NO clocks, NO calendars, NO arrows pointing up. Just three flat shapes of varying size on a clean horizontal line.",
  },
  {
    filename: "retirement-paycheck-1.png",
    title: "Safe Money and Growth Money — two complementary buckets",
    ctx: "Two related but distinct categories of retirement money: safe money (used to cover steady monthly expenses, calm and predictable) and growth money (stays invested for long-term growth, active and exposed to markets). They serve different purposes but together form the whole.",
    metaphorHint: "Two abstract flat geometric forms side by side: a slate teal-navy form on the left (calm, anchored, horizontal lines suggesting a still surface) and a terracotta form on the right (slightly different geometry — perhaps angled or stacked layers suggesting accumulation over time). NO plants, NO leaves, NO buckets pouring water, NO vessels with vegetation. Pure flat editorial geometry — like a Josef Albers or Saul Bass composition.",
  },
];

async function generate(prompt) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("OPENAI_API_KEY missing");
  const body = {
    model: process.env.OPENAI_IMAGE_MODEL || "gpt-image-2",
    prompt,
    size: "1536x1024",
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

async function processOne(t) {
  const started = Date.now();
  const prompt = buildPrompt(t.title, t.ctx, t.metaphorHint);
  const b64 = await generate(prompt);
  const buf = Buffer.from(b64, "base64");
  const outPath = path.join(OUT_DIR, t.filename);
  await fs.writeFile(outPath, buf);
  const ms = Date.now() - started;
  console.log(`[ok] ${t.filename} ${(buf.length / 1024).toFixed(1)}KB in ${(ms/1000).toFixed(1)}s`);
}

async function main() {
  const t0 = Date.now();
  const limit = 3;
  let cursor = 0;
  const lanes = Array.from({ length: Math.min(limit, TARGETS.length) }, async () => {
    while (true) {
      const i = cursor++;
      if (i >= TARGETS.length) return;
      try {
        await processOne(TARGETS[i]);
      } catch (e) {
        console.error(`[fail] ${TARGETS[i].filename}: ${e.message}`);
      }
    }
  });
  await Promise.all(lanes);
  console.log(`[done] total ${((Date.now() - t0)/1000).toFixed(1)}s`);
}

main().catch((e) => { console.error(e); process.exit(1); });
