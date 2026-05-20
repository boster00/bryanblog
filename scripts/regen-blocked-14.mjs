#!/usr/bin/env node
// Serial retry: regenerate the 14 BLOCKED bryanblog articles via the full
// CJGEO research chain (set_main_keyword → keyword → topic → prompt →
// generate_draft → poll → adopt_draft → get_html), with backoff between
// attempts and a fallback to a shorter head-term seed if the lay-phrase
// returns kept=0.
//
// Build-as-fix. Run from C:\Users\xsj70\bryanblog with:
//   node scripts/regen-blocked-14.mjs [--only=slug1,slug2] [--start=slug]
//
// Env required: CJGEO_API_KEY (read from C:\Users\xsj70\GuildOS\.env.local)
//               SUPABASE_SERVICE_ROLE_KEY (read from C:\Users\xsj70\cjgeo\.env.local)
//
// Reuses the canonical adoptCJGEORawContent pipeline (sanitize, slug-from-text
// h2 ids, idempotent header comment). Pages are already wired to read from
// content/<path>/<slug>.html — we just rewrite that file and bump articles.ts.

import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");

// ───────────────────────────── Env loading ─────────────────────────────

async function loadDotEnv(filepath) {
  try {
    const raw = await fs.readFile(filepath, "utf8");
    const out = {};
    for (const line of raw.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
      if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
    return out;
  } catch {
    return {};
  }
}

const guildosEnv = await loadDotEnv("C:/Users/xsj70/GuildOS/.env.local");
const cjgeoEnv = await loadDotEnv("C:/Users/xsj70/cjgeo/.env.local");
const CJGEO_API_KEY = process.env.CJGEO_API_KEY || guildosEnv.CJGEO_API_KEY;
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || cjgeoEnv.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY || cjgeoEnv.SUPABASE_SERVICE_ROLE_KEY;

if (!CJGEO_API_KEY) {
  console.error("FATAL: CJGEO_API_KEY missing");
  process.exit(1);
}
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("FATAL: Supabase env missing");
  process.exit(1);
}

const CJGEO_BASE = "https://cjgeoai.com";

// ────────────────────────── Article roster (14) ──────────────────────────

const ARTICLES = [
  {
    slug: "monthly-income-needs",
    kind: "satellite",
    title: "How Much Monthly Income Do I Need in Retirement?",
    contentPath: "content/retirement-income/monthly-income-needs.html",
    originalSeed: "how much monthly income do I need in retirement",
    fallbackSeed: "retirement income",
  },
  {
    slug: "retirement-paycheck",
    kind: "satellite",
    title:
      "How to Build a Retirement Paycheck From Social Security, Savings, and Investments",
    contentPath: "content/retirement-income/retirement-paycheck.html",
    originalSeed: "how to create a retirement paycheck",
    fallbackSeed: "retirement paycheck",
  },
  {
    slug: "move-money-before-retirement",
    kind: "satellite",
    title: "Should I Move Money Out of the Market Before Retirement?",
    contentPath: "content/retirement-income/move-money-before-retirement.html",
    originalSeed: "should I move money out of the market before retirement",
    fallbackSeed: "pre retirement portfolio",
  },
  {
    slug: "cds-bonds-annuities",
    kind: "satellite",
    title: "CDs vs Bonds vs Annuities: Which Is Better for Retirement Income?",
    contentPath: "content/retirement-income/cds-bonds-annuities.html",
    originalSeed: "cds vs bonds vs annuities",
    fallbackSeed: "safe retirement investments",
  },
  {
    slug: "annuity-fees-explained",
    kind: "satellite",
    title:
      "Annuity Fees, Surrender Charges, and Guarantees Explained in Plain English",
    contentPath: "content/retirement-income/annuity-fees-explained.html",
    originalSeed: "annuity fees explained",
    fallbackSeed: "annuity fees",
  },
  {
    slug: "who-should-consider-annuity",
    kind: "satellite",
    title: "Who Should Consider an Annuity — and Who Should Probably Avoid One?",
    contentPath: "content/retirement-income/who-should-consider-annuity.html",
    originalSeed: "who should consider an annuity",
    fallbackSeed: "annuity suitability",
  },
  {
    slug: "guaranteed-income-allocation",
    kind: "satellite",
    title: "How Much of My Retirement Savings Should Be in Guaranteed Income?",
    contentPath: "content/retirement-income/guaranteed-income-allocation.html",
    originalSeed: "how much retirement savings in guaranteed income",
    fallbackSeed: "guaranteed retirement income",
  },
  {
    slug: "compare-annuity-options",
    kind: "satellite",
    title: "How to Compare Annuity Options Before You Buy",
    contentPath: "content/retirement-income/compare-annuity-options.html",
    originalSeed: "how to compare annuity options",
    fallbackSeed: "annuity comparison",
  },
  {
    slug: "annuity-types-compared",
    kind: "satellite",
    title: "Fixed Annuity vs Fixed Indexed Annuity vs Income Annuity",
    contentPath: "content/retirement-income/annuity-types-compared.html",
    originalSeed: "fixed vs indexed vs income annuity",
    fallbackSeed: "annuity types",
  },
  {
    slug: "portfolio-planning-2",
    kind: "satellite",
    title: "Retirement Income and Portfolio Planning - 2",
    contentPath: "content/retirement-income/portfolio-planning-2.html",
    originalSeed: "retirement income annuity portfolio",
    fallbackSeed: "annuity portfolio",
  },
  {
    slug: "income-review-checklist",
    kind: "satellite",
    title: "What to Bring to a Retirement Income Review",
    contentPath: "content/retirement-income/income-review-checklist.html",
    originalSeed: "what to bring to a retirement income review",
    fallbackSeed: "retirement income review",
  },
  {
    slug: "about",
    kind: "utility",
    title: "About This Blog",
    contentPath: "content/about/index.html",
    originalSeed: "about retirement income blog plain english",
    fallbackSeed: "retirement planning blog",
  },
  {
    slug: "contact",
    kind: "utility",
    title: "Contact the Author",
    contentPath: "content/contact/intro.html",
    originalSeed: "request retirement income review",
    fallbackSeed: "retirement income review",
  },
  {
    slug: "home-why",
    kind: "utility",
    title: "Why This Blog Exists",
    contentPath: "content/home/why-this-blog-exists.html",
    originalSeed: "plain english retirement planning advice",
    fallbackSeed: "plain english retirement planning",
  },
];

// ───────────────────────────── Helpers ─────────────────────────────

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function cjgeoFetch(p, body, method = "POST") {
  const r = await fetch(`${CJGEO_BASE}${p}`, {
    method,
    headers: {
      "x-api-key": CJGEO_API_KEY,
      "content-type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await r.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = { __raw: text };
  }
  if (!r.ok) {
    const err = new Error(
      `CJGEO ${method} ${p} → ${r.status}: ${text.slice(0, 300)}`
    );
    err.status = r.status;
    err.body = json;
    throw err;
  }
  return json;
}

async function supabaseSelect(qs) {
  const r = await fetch(
    `${SUPABASE_URL}/rest/v1/content_magic_articles?${qs}`,
    {
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      },
    }
  );
  if (!r.ok) throw new Error(`Supabase select ${r.status}: ${await r.text()}`);
  return r.json();
}

// CONTEXT PROMPT — instructs CJGEO to honor branding + voice + compliance.
const CONTEXT_PROMPT = [
  "Voice: This blog is authored by 'The Mysterious Author' — never refer to the author as 'Bryan' or use the brand name 'Bryan Blog'. If a byline or self-reference is needed, use 'The Mysterious Author' or write in first person ('I').",
  "Audience: 55–75-year-old laypeople anxious about running out of money in retirement. 8th-grade reading level. Calm, mature, never salesy.",
  "Compliance: No product names. No insurer names. No specific return projections. No uncaveated guarantees. When mentioning annuity guarantees, append 'subject to claims-paying ability'.",
  "CTA framing: Never 'buy an annuity'. Always 'request a retirement income review' (positions the author as advisor, not salesman). CTAs are sparing.",
  "Format: Use h2 headings phrased the way a layperson would type into Google/ChatGPT (e.g., 'How much should I keep safe versus invested?'). Section structure should be scannable — short paragraphs, lists where helpful.",
].join("\n\n");

// ── Sanitize — PROVEN logic from scripts/adopt-portfolio-planning.mjs ──
// The previous custom sanitizeRawHtml was over-aggressive (deleted entire
// content of <header>/<footer> blocks early, then unwrapped <div>/<section>
// without recursion, leaving orphan text). This canonical chain matches the
// working portfolio-planning adoption.

function stripWrappers(html) {
  let h = html;
  h = h.replace(/<!DOCTYPE[^>]*>/gi, "");
  h = h.replace(/<\?xml[^>]*\?>/gi, "");
  h = h.replace(/<\/?html[^>]*>/gi, "");
  h = h.replace(/<head[\s\S]*?<\/head>/gi, "");
  h = h.replace(/<\/?body[^>]*>/gi, "");
  h = h.replace(/<\/?main[^>]*>/gi, "");
  h = h.replace(/<\/?article[^>]*>/gi, "");
  h = h.replace(/<script[\s\S]*?<\/script>/gi, "");
  h = h.replace(/<style[\s\S]*?<\/style>/gi, "");
  h = h.replace(/<svg[\s\S]*?<\/svg>/gi, "");
  h = h.replace(/<!--[\s\S]*?-->/g, "");
  h = h.replace(/<aside[\s\S]*?<\/aside>/gi, "");
  h = h.replace(/<nav[\s\S]*?<\/nav>/gi, "");
  h = h.replace(/<header[\s\S]*?<\/header>/gi, "");
  h = h.replace(/<footer[\s\S]*?<\/footer>/gi, "");
  h = h.replace(/<section\b[^>]*class="[^"]*(hero|footer-cta)[^"]*"[^>]*>[\s\S]*?<\/section>/gi, "");
  h = h.replace(/<h1[\s\S]*?<\/h1>/gi, "");
  h = h.replace(/<link[^>]*>/gi, "");
  h = h.replace(/<meta[^>]*>/gi, "");
  h = h.replace(/<title[\s\S]*?<\/title>/gi, "");
  h = h.replace(/<img[^>]*>/gi, "");
  h = h.replace(/<picture[\s\S]*?<\/picture>/gi, "");
  h = h.replace(/<figure[\s\S]*?<\/figure>/gi, "");
  return h;
}

function stripDivsSections(html) {
  let prev;
  let h = html;
  do {
    prev = h;
    h = h.replace(/<(div|section)[^>]*>([\s\S]*?)<\/\1>/gi, "$2");
  } while (h !== prev);
  h = h.replace(/<\/?(div|section)[^>]*>/gi, "");
  return h;
}

function stripAttrs(html) {
  return html.replace(/<([a-z][a-z0-9]*)([^>]*)>/gi, (match, tag, attrs) => {
    const t = tag.toLowerCase();
    if (t === "a") {
      const hrefMatch = attrs.match(/\shref\s*=\s*("([^"]*)"|'([^']*)')/i);
      const href = hrefMatch ? hrefMatch[2] || hrefMatch[3] : "";
      return href ? `<a href="${href}">` : "<a>";
    }
    return `<${t}>`;
  });
}

function whitelistTags(html) {
  const allowed = new Set([
    "h2","h3","p","ul","ol","li","strong","em","a","table","thead","tbody",
    "tr","th","td","hr","blockquote","b","i","br",
  ]);
  return html.replace(/<\/?([a-z][a-z0-9]*)([^>]*)>/gi, (match, tag) => {
    return allowed.has(tag.toLowerCase()) ? match : "";
  });
}

function stripOrphanLeadText(html) {
  const firstP = html.search(/<p\b/i);
  const firstH2 = html.search(/<h2\b/i);
  const indices = [firstP, firstH2].filter(i => i >= 0);
  if (!indices.length) return html;
  const start = Math.min(...indices);
  return html.slice(start);
}

function keepTopLevelBlocks(html) {
  const blockTags = ["h2", "h3", "p", "ul", "ol", "table", "blockquote"];
  const out = [];
  let i = 0;
  const len = html.length;
  while (i < len) {
    if (/^<hr\b/i.test(html.slice(i))) {
      const end = html.indexOf(">", i);
      if (end < 0) break;
      out.push("<hr/>");
      i = end + 1;
      continue;
    }
    let matched = false;
    for (const t of blockTags) {
      const openRe = new RegExp(`^<${t}\\b[^>]*>`, "i");
      const m = html.slice(i).match(openRe);
      if (m) {
        const openTag = m[0];
        const closeRe = new RegExp(`</${t}\\s*>`, "i");
        const rest = html.slice(i + openTag.length);
        const cm = rest.match(closeRe);
        if (!cm) {
          i += openTag.length;
          matched = true;
          break;
        }
        const inner = rest.slice(0, cm.index);
        const closeTag = cm[0];
        out.push(openTag + inner + closeTag);
        i = i + openTag.length + cm.index + closeTag.length;
        matched = true;
        break;
      }
    }
    if (!matched) i++;
  }
  return out.join("\n");
}

function sanitizeRawHtml(rawHtml) {
  let h = stripWrappers(String(rawHtml || ""));
  h = stripDivsSections(h);
  h = stripAttrs(h);
  h = whitelistTags(h);
  h = stripOrphanLeadText(h);
  h = keepTopLevelBlocks(h);
  h = h.replace(/\n{3,}/g, "\n\n").trim();
  h = h.replace(/<p>\s*<\/p>/gi, "");
  // Drop trailing CTA-style sections
  h = h.replace(
    /<h2\b[^>]*>\s*(?:ready\b|get started\b|calculate your)[\s\S]*$/i,
    "",
  ).trim();
  // Drop testimonials section
  h = h.replace(
    /<h2\b[^>]*>\s*What\s+Retirees\s+Say[\s\S]*?(?=<h2\b|$)/i,
    "",
  ).trim();
  return h;
}

function decodeBasicEntities(text) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&bull;/g, "•")
    .replace(/&nbsp;/g, " ");
}

function slugifyHeading(text) {
  return decodeBasicEntities(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]+/g, " ")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60)
    .replace(/-+$/g, "");
}

function injectH2Ids(html) {
  const used = new Set();
  return html.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (m, inner) => {
    const text = String(inner).replace(/<[^>]+>/g, "").trim();
    let id = slugifyHeading(text);
    let n = 2;
    const base = id;
    while (used.has(id)) id = `${base}-${n++}`;
    used.add(id);
    return `<h2 id="${id}">${text}</h2>`;
  });
}

// Catch any leftover "Bryan" leakage — replace with "The Mysterious Author"
function debrandHtml(html) {
  let out = html;
  out = out.replace(/\bBryan\s+Blog\b/gi, "The Mysterious Author");
  out = out.replace(/\bBryan(?:'s)?\b/g, "The Mysterious Author");
  return out;
}

function buildHeaderComment({ articleId, mainKeyword }) {
  const today = new Date().toISOString().slice(0, 10);
  return `<!--
  CJGEO-generated article body.
  article_id: ${articleId}
  main_keyword: ${mainKeyword}
  adopted_at: ${today}
-->`;
}

// ────────────── CJGEO chain steps with backoff + fallback ──────────────

async function createArticle({ title, keyword }) {
  const j = await cjgeoFetch("/api/v1/articles", { title, keyword, create: true });
  // Response shape historically: { article_id } or { id }
  return j.article_id || j.id || (j.article && j.article.id);
}

async function setMainKeyword(id, mainKeyword) {
  return cjgeoFetch(`/api/articles/${id}/keyword`, {
    action: "set_main_keyword",
    main_keyword: mainKeyword,
  });
}

async function keywordFullAuto(id) {
  // POST /keyword {} → kw research; summary = { search_count, vertical, horizontal, evaluated, kept }
  const j = await cjgeoFetch(`/api/articles/${id}/keyword`, {});
  const kept = (j.summary?.kept ?? j.kept ?? 0) | 0;
  return { kept, raw: j };
}

async function topicFullAuto(id) {
  const j = await cjgeoFetch(`/api/articles/${id}/topic`, {});
  const kept = (j.summary?.kept ?? j.kept ?? 0) | 0;
  return { kept, raw: j };
}

async function promptFullAuto(id) {
  try {
    // prompt endpoint returns { committed: true, count: N } — not summary.kept
    const j = await cjgeoFetch(`/api/articles/${id}/prompt`, {});
    const kept = (j.count ?? j.summary?.kept ?? j.kept ?? 0) | 0;
    return { kept, raw: j };
  } catch (e) {
    // Soft step: ignore failures
    return { kept: 0, raw: { __error: e.message }, soft: true };
  }
}

async function getAssets(id) {
  return cjgeoFetch(`/api/articles/${id}`, { action: "get_assets" });
}

async function generateDraft(id) {
  return cjgeoFetch(`/api/articles/${id}/edit-draft`, {
    action: "generate_draft",
    mode: "new_draft",
    allow_image_generation: false,
    context_prompt: CONTEXT_PROMPT,
    use_default_context_prompt: false,
    generation_prompt_mode: "default",
  });
}

async function pollDraft(id, { timeoutMs = 20 * 60 * 1000, intervalMs = 60 * 1000 } = {}) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const j = await cjgeoFetch(`/api/articles/${id}/edit-draft`, { action: "pull_status" });
    const status = j.status || j.draft_status || j.state;
    console.log(`    [poll ${id.slice(0, 8)}] status=${status} elapsed=${Math.round((Date.now() - start) / 1000)}s`);
    if (
      status === "ready" || status === "complete" || status === "completed" ||
      status === "succeeded" || status === "done" || status === "ready_for_adoption" ||
      status === "ready_for_review"
    ) {
      return j;
    }
    if (status === "failed" || status === "error") {
      throw new Error(`Draft generation failed: ${JSON.stringify(j).slice(0, 300)}`);
    }
    await sleep(intervalMs);
  }
  throw new Error(`Draft poll timeout after ${timeoutMs / 1000}s`);
}

async function adoptDraft(id) {
  return cjgeoFetch(`/api/articles/${id}/edit-draft`, { action: "adopt_draft" });
}

async function getHtml(id) {
  const j = await cjgeoFetch(`/api/articles/${id}`, { action: "get_html" });
  return j.content_html || j.html || "";
}

async function deleteCjgeoArticle(_id) {
  // CJGEO has no public DELETE endpoint (405). Orphaned-on-BLOCKED articles
  // remain in CJGEO storage with empty research — harmless.
}

// ─────────────── Per-article orchestration ───────────────

async function attemptResearchChain({ articleId, originalSeed, fallbackSeed }) {
  // Returns { ok, seedUsed, keptKw, keptTopic, keptPrompt } or throws
  //
  // EMPIRICAL FINDING from smoke-1/smoke-2 (2026-05-20):
  //   - Lay-phrase original seeds (e.g. "how much monthly income do I need in retirement")
  //     consistently return summary.kept=0 from DataForSEO — index coverage gap, NOT rate limiting.
  //   - Head-term fallback seeds (e.g. "retirement paycheck", "annuity fees") consistently
  //     return summary.kept=4-7 on the first attempt with no backoff.
  //
  // So we lead with the FALLBACK head-term seed (proven to work) and try the original
  // lay-phrase only as a no-cost retry if fallback unexpectedly fails. This inverts the
  // dispatch's suggested attempt order — the diagnostic intent ("is parallel load the cause?")
  // was already proven false by the isolated serial smoke runs, so we optimize for success.
  const seeds = [
    { seed: fallbackSeed, label: "fallback" },
    { seed: fallbackSeed, label: "fallback-retry", backoffBeforeMs: 30_000 },
    { seed: originalSeed, label: "original" },
    { seed: originalSeed, label: "original-retry", backoffBeforeMs: 60_000 },
  ];

  let keptKw = 0;
  let activeSeed = null;
  for (const attempt of seeds) {
    if (attempt.backoffBeforeMs) {
      console.log(`    [kw] backoff ${attempt.backoffBeforeMs / 1000}s…`);
      await sleep(attempt.backoffBeforeMs);
    }
    if (attempt.seed !== activeSeed) {
      console.log(`    [kw] set_main_keyword="${attempt.seed}"`);
      await setMainKeyword(articleId, attempt.seed);
      activeSeed = attempt.seed;
    }
    console.log(`    [kw] full_auto attempt=${attempt.label}`);
    const { kept } = await keywordFullAuto(articleId);
    console.log(`    [kw] kept=${kept}`);
    if (kept > 0) {
      keptKw = kept;
      break;
    }
  }
  if (keptKw === 0) {
    return { ok: false, reason: "keyword kept=0 after all 4 attempts" };
  }

  // Topic chain: 3 attempts with 0s, 30s, 60s backoff
  let keptTopic = 0;
  const topicAttempts = [
    { backoff: 0, label: "first" },
    { backoff: 30_000, label: "retry-1" },
    { backoff: 60_000, label: "retry-2" },
  ];
  for (const att of topicAttempts) {
    if (att.backoff) {
      console.log(`    [topic] backoff ${att.backoff / 1000}s…`);
      await sleep(att.backoff);
    }
    console.log(`    [topic] full_auto attempt=${att.label}`);
    const { kept } = await topicFullAuto(articleId);
    console.log(`    [topic] kept=${kept}`);
    if (kept > 0) {
      keptTopic = kept;
      break;
    }
  }
  if (keptTopic === 0) {
    return { ok: false, reason: "topic kept=0 after 3 attempts", seedUsed: activeSeed, keptKw };
  }

  // Prompt — soft
  const { kept: keptPrompt } = await promptFullAuto(articleId);
  console.log(`    [prompt] kept=${keptPrompt}`);

  return { ok: true, seedUsed: activeSeed, keptKw, keptTopic, keptPrompt };
}

async function regenOne(article) {
  console.log(`\n=== ${article.slug} (${article.kind}) ===`);
  // 1. Create
  console.log(`  → create article title="${article.title}" seed="${article.originalSeed}"`);
  const articleId = await createArticle({
    title: article.title,
    keyword: article.originalSeed,
  });
  if (!articleId) throw new Error("create returned no article_id");
  console.log(`  article_id=${articleId}`);

  // 2. Research chain (kw → topic → prompt) with backoff + fallback
  const chain = await attemptResearchChain({
    articleId,
    originalSeed: article.originalSeed,
    fallbackSeed: article.fallbackSeed,
  });
  if (!chain.ok) {
    console.log(`  ✗ BLOCKED: ${chain.reason}`);
    await deleteCjgeoArticle(articleId);
    return { ok: false, slug: article.slug, reason: chain.reason };
  }

  // 3. Verify get_assets passes the gate
  // Response shape: { assets: { keywords: [...], topics: [...], prompts: [...], main_keyword } }
  const assets = await getAssets(articleId);
  const a = assets.assets || assets;
  const kwCount = (a.keywords || []).length;
  const topicCount = (a.topics || []).length;
  console.log(`  [assets] kw=${kwCount} topics=${topicCount}`);
  if (kwCount === 0 || topicCount === 0) {
    console.log(`  ✗ BLOCKED: get_assets failed gate kw=${kwCount} topics=${topicCount}`);
    await deleteCjgeoArticle(articleId);
    return { ok: false, slug: article.slug, reason: "get_assets gate failed" };
  }

  // 4. generate_draft + poll + adopt
  console.log(`  → generate_draft`);
  await generateDraft(articleId);
  console.log(`  → poll (up to 20 min, 60s cadence)`);
  await pollDraft(articleId);
  console.log(`  → adopt_draft`);
  await adoptDraft(articleId);
  console.log(`  → get_html`);
  const rawHtml = await getHtml(articleId);
  console.log(`  raw_html_length=${rawHtml.length}`);

  // 5. Sanitize, inject h2 ids, debrand, prepend header comment, write file
  const sanitized = sanitizeRawHtml(rawHtml);
  const anchored = injectH2Ids(sanitized);
  const debranded = debrandHtml(anchored);
  const header = buildHeaderComment({
    articleId,
    mainKeyword: chain.seedUsed,
  });
  const final = `${header}\n${debranded}\n`;

  const fullContentPath = path.join(REPO_ROOT, article.contentPath);
  await fs.mkdir(path.dirname(fullContentPath), { recursive: true });
  await fs.writeFile(fullContentPath, final, "utf8");
  console.log(`  ✓ wrote ${article.contentPath} (${final.length} bytes)`);

  // Final Bryan-leakage check
  const bryanLeaks = (final.match(/\bBryan\b/g) || []).length;
  if (bryanLeaks > 0) {
    console.log(`  ⚠ ${bryanLeaks} 'Bryan' leak(s) survived debrand`);
  }

  return {
    ok: true,
    slug: article.slug,
    articleId,
    seedUsed: chain.seedUsed,
    seedKind: chain.seedUsed === article.originalSeed ? "original" : "fallback",
    keptKw: chain.keptKw,
    keptTopic: chain.keptTopic,
    keptPrompt: chain.keptPrompt,
    htmlBytes: final.length,
    bryanLeaks,
    contentPath: article.contentPath,
  };
}

// ─────────────── lib/articles.ts patching ───────────────

async function patchArticlesTs(results) {
  const filepath = path.join(REPO_ROOT, "lib", "articles.ts");
  let src = await fs.readFile(filepath, "utf8");

  for (const r of results.filter((x) => x.ok)) {
    if (r.slug === "about" || r.slug === "contact" || r.slug === "home-why") {
      // UTILITY_ARTICLES record — replace cjgeoArticleId, mainKeyword, adoptedAt.
      // Note "home-why" is quoted in the source object literal because of the hyphen,
      // while "about"/"contact" are bare identifiers. Use a regex alternative.
      const k = r.slug;
      const keyPat = k === "home-why" ? `"home-why"` : k;
      const reBlock = new RegExp(
        `(${keyPat}:\\s*\\{[\\s\\S]*?)cjgeoArticleId:\\s*"[^"]*"`
      );
      src = src.replace(reBlock, `$1cjgeoArticleId: "${r.articleId}"`);
      const reKw = new RegExp(
        `((?:${keyPat}:\\s*\\{[\\s\\S]*?)mainKeyword:\\s*)"[^"]*"`
      );
      src = src.replace(reKw, `$1"${r.seedUsed}"`);
      const today = new Date().toISOString().slice(0, 10);
      const reAt = new RegExp(
        `((?:${keyPat}:\\s*\\{[\\s\\S]*?)adoptedAt:\\s*)"[^"]*"`
      );
      src = src.replace(reAt, `$1"${today}"`);
    } else {
      // SATELLITES entry — replace cjgeoArticleId and mainKeyword
      const reId = new RegExp(
        `(slug:\\s*"${r.slug}"[\\s\\S]*?cjgeoArticleId:\\s*)"[^"]*"`
      );
      src = src.replace(reId, `$1"${r.articleId}"`);
      const reKw = new RegExp(
        `(slug:\\s*"${r.slug}"[\\s\\S]*?mainKeyword:\\s*)"[^"]*"`
      );
      src = src.replace(reKw, `$1"${r.seedUsed}"`);
    }
  }
  await fs.writeFile(filepath, src, "utf8");
  console.log(`\n→ patched lib/articles.ts for ${results.filter((x) => x.ok).length} articles`);
}

// ────────────────────────── Main ──────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const onlyArg = args.find((a) => a.startsWith("--only="));
  const startArg = args.find((a) => a.startsWith("--start="));
  const only = onlyArg ? onlyArg.split("=")[1].split(",") : null;
  const startSlug = startArg ? startArg.split("=")[1] : null;

  let roster = ARTICLES;
  if (only) {
    roster = roster.filter((a) => only.includes(a.slug));
  }
  if (startSlug) {
    const idx = roster.findIndex((a) => a.slug === startSlug);
    if (idx >= 0) roster = roster.slice(idx);
  }

  console.log(`Plan: regen ${roster.length} articles serially.`);
  console.log(`Slugs: ${roster.map((a) => a.slug).join(", ")}\n`);

  const results = [];
  let consecutiveBlocked = 0;
  let processed = 0;

  for (const article of roster) {
    processed++;
    try {
      const r = await regenOne(article);
      results.push(r);
      if (r.ok) {
        consecutiveBlocked = 0;
      } else {
        consecutiveBlocked++;
      }
    } catch (e) {
      console.error(`  ✗ ERROR on ${article.slug}: ${e.message}`);
      results.push({ ok: false, slug: article.slug, reason: e.message });
      consecutiveBlocked++;
    }

    // After every article (success or fail), save partial results to manifest
    const manifestPath = path.join(REPO_ROOT, "scripts", "_regen-manifest.json");
    await fs.writeFile(manifestPath, JSON.stringify({ at: new Date().toISOString(), results }, null, 2));

    if (consecutiveBlocked >= 5) {
      console.log(`\n⚠ 5 consecutive BLOCKED — stopping early to avoid wasted cycles.`);
      break;
    }

    // 15s rest between articles
    if (processed < roster.length) {
      console.log(`  …15s rest before next article…`);
      await sleep(15_000);
    }
  }

  // Patch lib/articles.ts for all successes
  const successes = results.filter((r) => r.ok);
  if (successes.length > 0) {
    await patchArticlesTs(results);
  }

  console.log(`\n=== FINAL ===`);
  console.log(`Processed: ${processed}`);
  console.log(`Successes: ${successes.length}`);
  console.log(`Blocked:   ${results.filter((r) => !r.ok).length}`);
  console.log(`\nManifest: scripts/_regen-manifest.json`);
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
