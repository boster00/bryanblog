// Fill bracket-placeholder diagrams with gpt-image-2 editorial illustrations.
//
// Canonical implementation of `adoptCJGEORawContent` Phase 4.5 (locked in the
// GuildOS BryanBlog skill book). Any literal placeholder of the form
//   [Diagram: <title>]
//   [Chart: <title>]
//   [Visual: <title>]
//   [Illustration: <title>]
//   [Figure: <title>]
//   [Graph: <title>]
// in the sanitized HTML is replaced with a `<figure class="diagram">…</figure>`
// containing a generated PNG saved to `public/images/diagrams/<slug>-<n>.png`.
//
// Heuristic for the wrapping `<div class="diagram-placeholder">` shell that
// CJGEO emits:
//   - empty shell (only the bracket text + a decorative SVG, no structural
//     children) → replace the WHOLE div with the new <figure>.
//   - structural shell (contains .bucket, .timeline, .compare-card, .bucket-diagram,
//     <table>, .stat-card, .grid-card, etc.) → KEEP the structural children,
//     strip the bracket text and decorative SVG, and INSERT the <figure> at
//     the top of the div.
//
// Concurrency: image generation runs in PARALLEL (up to 4 at a time per
// article). gpt-image-2 at quality:"high" takes 60–120s each; sequential
// would be too slow.
//
// 3-retry logic per image. If all retries fail, the placeholder is REMOVED
// entirely so literal `[Diagram: …]` text never ships to users.

import { promises as fs } from "fs";
import path from "path";

const PLACEHOLDER_RE = /\[(Diagram|Chart|Visual|Illustration|Figure|Graph):\s*([^\]]+)\]/g;

// Classes that mark a `<div class="diagram-placeholder">` shell as "structural"
// (i.e. it wraps content we must KEEP — only strip the label + decorative SVG).
const STRUCTURAL_CHILD_CLASSES = [
  "bucket",
  "bucket-diagram",
  "bucket--safe",
  "bucket--growth",
  "timeline",
  "timeline__step",
  "compare-card",
  "compare-wrap",
  "comparison-wrap",
  "stat-card",
  "stat-item",
  "stat-cell",
  "grid-card",
  "income-layers",
  "checklist",
  "check-list",
  "callout",
  "takeaway",
  "ind-badge",
];

// CANONICAL PROMPT TEMPLATE (locked 2026-05-20 after style audit).
// Original template generated cluttered AI-art with burnt-in text, finance clichés
// (money buckets, growing money plants, coin stacks with $ signs, balance scales),
// scenery backgrounds (Greek temples, cityscapes, mountains, lighthouses), and icon
// strips. This refined template addresses each failure mode with explicit bans.
const CANONICAL_PROMPT_PREFIX = [
  'A single minimalist editorial vector illustration for a retirement-planning content site.',
  // Palette — explicit hex, no other colors allowed.
  "PALETTE (use ONLY these hex values, no others): #1C4259 slate teal-navy (primary line/fill),",
  "#8C3A2E muted oxblood-terracotta (single accent), #FAF9F8 warm off-white (solid background),",
  "and at most #B5A99A warm taupe for a thin secondary line. NO pure white #FFFFFF, NO blue other",
  "than #1C4259, NO red/orange other than #8C3A2E, NO neon, NO pastels, NO gradients.",
  // Background — paper feel.
  "BACKGROUND: solid warm off-white #FAF9F8 (paper texture, not white). NO gradient backgrounds,",
  "NO scenery, NO landscapes, NO buildings, NO horizon, NO weather, NO decorative motifs around the edges.",
  // Style — editorial vector, not AI-art.
  "STYLE: flat editorial vector illustration with restrained line weight, like a single illustration",
  "in The Atlantic, Kinfolk, or a thoughtful nonfiction book. Hand-drawn editorial feel. NO 3D rendering,",
  "NO photorealism, NO AI-art over-rendering, NO airbrushed shading, NO drop shadows, NO depth-of-field,",
  "NO multiple illustration styles mixed together, NO collage. ONE coherent flat-vector style end to end.",
  // No text — strongest possible wording.
  "ABSOLUTELY NO TEXT OR NUMBERS of any kind anywhere in the image — no labels, no titles, no axis",
  "numbers, no currency symbols, no percentages, no captions, no watermarks, no signatures, no",
  "tick marks with values. Captions are added as separate HTML outside the image. If the concept",
  "would normally require labels (a chart, a timeline), depict the SHAPE of the idea without the labels.",
  // No clichés.
  "AVOID finance clichés: NO piggy banks, NO money bags, NO sacks of cash, NO growing money plants,",
  "NO dollar-sign trees, NO coin stacks (with or without $ symbols), NO hand-shake silhouettes,",
  "NO suit-and-tie executive figures, NO generic up-arrow growth charts, NO balance scales of money,",
  "NO businessman silhouettes, NO hourglass with money, NO 3D coins. Choose a nuanced visual metaphor.",
  // No icon strips / collage.
  "NO rows of small icons across the top or bottom of the image. NO grids of mini-illustrations.",
  "NO collage of multiple separate scenes. NO secondary background characters or props.",
  // Composition.
  "COMPOSITION: landscape 1024x768. ONE primary subject occupying the central 50-65% of the canvas,",
  "with generous whitespace (solid #FAF9F8) on all sides. Centered or thoughtfully off-center.",
  // Density.
  "DENSITY: minimalist. Convey ONE concept clearly with as few visual elements as possible.",
  "If the concept involves comparison or sequence, use 2-4 simple shapes arranged with breathing space,",
  "never crowded. When in doubt, fewer elements.",
].join(" ");

function buildPrompt(title, surroundingProse) {
  const ctx = (surroundingProse || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 500);
  return [
    CANONICAL_PROMPT_PREFIX,
    `\nSUBJECT to illustrate: ${title}.`,
    `\nNarrative context (informational only — do NOT add text from this into the image): ${ctx}`,
    `\nReminder: NO TEXT, NO NUMBERS, NO CURRENCY SYMBOLS, NO CLICHÉS, NO SCENERY, NO ICON STRIPS, NO COLLAGE. ONE clean editorial vector concept on warm-paper #FAF9F8 background.`,
  ].join("");
}

function htmlToPlainText(html) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&mdash;/gi, "—")
    .replace(/&ndash;/gi, "–")
    .replace(/&amp;/gi, "&")
    .replace(/&#39;/gi, "'")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Decode the common HTML entities CJGEO emits inside the placeholder title
// text so they don't end up double-escaped in the final caption / alt.
function decodeCommonEntities(s) {
  return String(s)
    .replace(/&mdash;/gi, "—")
    .replace(/&ndash;/gi, "–")
    .replace(/&hellip;/gi, "…")
    .replace(/&lsquo;/gi, "‘")
    .replace(/&rsquo;/gi, "’")
    .replace(/&ldquo;/gi, "“")
    .replace(/&rdquo;/gi, "”")
    .replace(/&nbsp;/gi, " ")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&amp;/gi, "&");
}

function escapeHtmlAttr(s) {
  return decodeCommonEntities(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeHtmlText(s) {
  return decodeCommonEntities(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildFigureHtml({ src, alt, caption }) {
  return [
    `<figure class="diagram">`,
    `  <img src="${escapeHtmlAttr(src)}" alt="${escapeHtmlAttr(alt)}" loading="lazy">`,
    `  <figcaption>${escapeHtmlText(caption)}</figcaption>`,
    `</figure>`,
  ].join("\n");
}

// Find every `[Kind: title]` occurrence, with metadata about its enclosing
// <div class="diagram-placeholder">…</div> (if any) and the surrounding prose
// context window. Returns occurrences in document order — non-overlapping.
function findPlaceholders(html, surroundingContextChars) {
  const occurrences = [];
  // Pass 1: scan for wrapping diagram-placeholder divs that contain a bracket
  // placeholder anywhere inside.
  const divRe = /<div\b[^>]*class="[^"]*\bdiagram-placeholder\b[^"]*"[^>]*>([\s\S]*?)<\/div>/gi;
  let m;
  const consumed = []; // [{start, end}]
  while ((m = divRe.exec(html)) !== null) {
    const divStart = m.index;
    const divEnd = m.index + m[0].length;
    const inner = m[1];
    const inner_m = inner.match(PLACEHOLDER_RE);
    if (!inner_m) continue;
    // Extract first placeholder kind + title within the div.
    PLACEHOLDER_RE.lastIndex = 0;
    const km = PLACEHOLDER_RE.exec(inner);
    PLACEHOLDER_RE.lastIndex = 0;
    if (!km) continue;
    const kind = km[1];
    const title = km[2].trim().replace(/\s+/g, " ");

    // Is this a "structural" shell?
    const hasStructuralChild = STRUCTURAL_CHILD_CLASSES.some((cls) =>
      new RegExp(`class="[^"]*\\b${cls}\\b[^"]*"`).test(inner)
    );

    // Surrounding prose: prose-text BEFORE the div and AFTER the div
    const beforeText = htmlToPlainText(
      html.slice(Math.max(0, divStart - surroundingContextChars * 2), divStart)
    ).slice(-surroundingContextChars);
    const afterText = htmlToPlainText(
      html.slice(divEnd, divEnd + surroundingContextChars * 2)
    ).slice(0, surroundingContextChars);

    occurrences.push({
      kind,
      title,
      mode: hasStructuralChild ? "structural-shell" : "empty-shell",
      replaceStart: divStart,
      replaceEnd: divEnd,
      shellInner: inner,
      surroundingProse: `${beforeText} ${afterText}`.trim(),
    });
    consumed.push({ start: divStart, end: divEnd });
  }

  // Pass 2: any bracket placeholder NOT inside a consumed div.
  PLACEHOLDER_RE.lastIndex = 0;
  while ((m = PLACEHOLDER_RE.exec(html)) !== null) {
    const start = m.index;
    const end = m.index + m[0].length;
    const insideConsumed = consumed.some((c) => start >= c.start && end <= c.end);
    if (insideConsumed) continue;
    // Expand the replacement bounds to the enclosing <p>…</p> if the placeholder
    // is the sole content of a paragraph.
    let replaceStart = start;
    let replaceEnd = end;
    // Look backward for an immediate <p> tag.
    const pOpenIdx = html.lastIndexOf("<p>", start);
    const pCloseAfter = html.indexOf("</p>", end);
    if (pOpenIdx !== -1 && pCloseAfter !== -1) {
      const between = html.slice(pOpenIdx + 3, pCloseAfter).trim();
      if (between === m[0]) {
        replaceStart = pOpenIdx;
        replaceEnd = pCloseAfter + 4;
      }
    }

    const beforeText = htmlToPlainText(
      html.slice(Math.max(0, replaceStart - surroundingContextChars * 2), replaceStart)
    ).slice(-surroundingContextChars);
    const afterText = htmlToPlainText(
      html.slice(replaceEnd, replaceEnd + surroundingContextChars * 2)
    ).slice(0, surroundingContextChars);

    occurrences.push({
      kind: m[1],
      title: m[2].trim().replace(/\s+/g, " "),
      mode: "inline",
      replaceStart,
      replaceEnd,
      shellInner: null,
      surroundingProse: `${beforeText} ${afterText}`.trim(),
    });
  }

  occurrences.sort((a, b) => a.replaceStart - b.replaceStart);
  return occurrences;
}

// Given a "structural-shell" inner HTML, strip the bracket placeholder text
// (its enclosing <p>…</p> if any) and any decorative top-level <svg>…</svg>
// that sits as a sibling of the bracket text.
function stripLabelAndDecorativeSvg(innerHtml) {
  let h = innerHtml;
  // Strip <p>…[Kind: title]…</p>
  h = h.replace(
    /<p>\s*\[(Diagram|Chart|Visual|Illustration|Figure|Graph):\s*[^\]]+\]\s*<\/p>/gi,
    ""
  );
  // Strip any naked bracket text not in a <p>
  h = h.replace(PLACEHOLDER_RE, "");
  // Strip top-level decorative SVGs (CJGEO emits a tiny 24x24 icon above the label).
  // Only strip SVGs that are direct text in the inner (not deeply nested inside
  // a structural child) — heuristic: an <svg viewBox="0 0 24 24" …>…</svg> with
  // no other children between the placeholder strip site and an aria-hidden flag.
  h = h.replace(
    /<svg\b[^>]*\baria-hidden="true"[^>]*>[\s\S]*?<\/svg>/gi,
    ""
  );
  h = h.replace(
    /<svg\b[^>]*\bviewBox="0\s+0\s+24\s+24"[^>]*>[\s\S]*?<\/svg>/gi,
    ""
  );
  return h;
}

async function withRetry(fn, retries = 3, label = "") {
  let lastErr;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn(attempt);
    } catch (err) {
      lastErr = err;
      // eslint-disable-next-line no-console
      console.warn(`[fill-diagrams] ${label} attempt ${attempt}/${retries} failed:`, err?.message || err);
      // brief backoff
      await new Promise((r) => setTimeout(r, 1000 * attempt));
    }
  }
  throw lastErr;
}

// Parallel pool with concurrency limit.
async function parallelPool(items, limit, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  const lanes = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (true) {
      const idx = cursor++;
      if (idx >= items.length) return;
      results[idx] = await worker(items[idx], idx);
    }
  });
  await Promise.all(lanes);
  return results;
}

/**
 * Fill bracket placeholders in a sanitized HTML body with gpt-image-2 figures.
 *
 * @param {string} sanitizedHtml
 * @param {object} options
 * @param {string} options.slug                     — e.g. "monthly-income-needs"
 * @param {string} [options.publicDir]              — image output dir (default "public/images/diagrams")
 * @param {string} [options.imageUrlPrefix]         — URL prefix (default "/images/diagrams")
 * @param {(input: {prompt: string, size: string, quality: string, n?: number}) => Promise<string[]>} options.openaiImagesGenerate
 *                                                  — returns array of base64 PNG strings
 * @param {number} [options.surroundingContextChars=600]
 * @param {number} [options.concurrency=4]
 * @param {number} [options.retries=3]
 * @param {string} [options.size="1024x1024"]
 * @param {string} [options.quality="high"]
 * @returns {Promise<{ html: string, generatedImages: Array<{alt, src, sizeBytes, idx}>, failures: Array<{title, error}> }>}
 */
export async function fillDiagrams(sanitizedHtml, options) {
  const {
    slug,
    publicDir = "public/images/diagrams",
    imageUrlPrefix = "/images/diagrams",
    openaiImagesGenerate,
    surroundingContextChars = 600,
    concurrency = 4,
    retries = 3,
    size = "1024x1024",
    quality = "high",
  } = options || {};

  if (!slug) throw new Error("fillDiagrams: slug is required");
  if (typeof openaiImagesGenerate !== "function") {
    throw new Error("fillDiagrams: openaiImagesGenerate is required");
  }

  const occurrences = findPlaceholders(sanitizedHtml, surroundingContextChars);
  if (occurrences.length === 0) {
    return { html: sanitizedHtml, generatedImages: [], failures: [] };
  }

  await fs.mkdir(publicDir, { recursive: true });

  const generatedImages = [];
  const failures = [];

  // Build per-occurrence work items.
  const work = occurrences.map((o, i) => ({ ...o, n: i + 1 }));

  // Run image generation in parallel.
  const results = await parallelPool(work, concurrency, async (o) => {
    const prompt = buildPrompt(o.title, o.surroundingProse);
    const filename = `${slug}-${o.n}.png`;
    const filepath = path.join(publicDir, filename);
    const src = `${imageUrlPrefix.replace(/\/$/, "")}/${filename}`;

    try {
      const b64s = await withRetry(
        () => openaiImagesGenerate({ prompt, size, quality, n: 1 }),
        retries,
        `${slug}#${o.n} "${o.title.slice(0, 50)}"`
      );
      const b64 = Array.isArray(b64s) ? b64s[0] : b64s;
      if (!b64 || typeof b64 !== "string") {
        throw new Error("openaiImagesGenerate returned no base64 data");
      }
      const buf = Buffer.from(b64, "base64");
      await fs.writeFile(filepath, buf);
      return {
        ok: true,
        occurrence: o,
        meta: { alt: o.title, src, sizeBytes: buf.byteLength, idx: o.n, filepath },
      };
    } catch (err) {
      return {
        ok: false,
        occurrence: o,
        error: err?.message || String(err),
      };
    }
  });

  // Apply replacements right-to-left so indices stay stable.
  // Each result still references the original offsets via result.occurrence.
  const sortedResults = [...results].sort(
    (a, b) => b.occurrence.replaceStart - a.occurrence.replaceStart
  );

  let html = sanitizedHtml;
  for (const r of sortedResults) {
    const o = r.occurrence;
    let replacement;
    if (r.ok) {
      const fig = buildFigureHtml({
        src: r.meta.src,
        alt: r.meta.alt,
        caption: o.title,
      });
      if (o.mode === "structural-shell") {
        // Keep structural children; strip label + decorative SVG; insert <figure> at top.
        const cleanedInner = stripLabelAndDecorativeSvg(o.shellInner).trim();
        replacement = `<div class="diagram-placeholder">\n${fig}\n${cleanedInner}\n</div>`;
      } else {
        // empty-shell OR inline → replace the whole match with the <figure>
        replacement = fig;
      }
      generatedImages.push(r.meta);
    } else {
      // 3 retries failed → REMOVE the placeholder entirely. For structural-shell,
      // keep the structural children (still useful), strip only the label/SVG.
      if (o.mode === "structural-shell") {
        const cleanedInner = stripLabelAndDecorativeSvg(o.shellInner).trim();
        replacement = `<div class="diagram-placeholder">\n${cleanedInner}\n</div>`;
      } else {
        replacement = "";
      }
      failures.push({ title: o.title, error: r.error, mode: o.mode });
    }
    html = html.slice(0, o.replaceStart) + replacement + html.slice(o.replaceEnd);
  }

  return { html, generatedImages, failures };
}

export default fillDiagrams;
