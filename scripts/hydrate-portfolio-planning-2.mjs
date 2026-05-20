/**
 * One-shot: create CJGEO article → full_auto ×3 → generate_draft → poll → adopt →
 * get_html → sanitize (same passes as adopt-portfolio-planning.mjs) →
 * content/retirement-income/portfolio-planning-2.html
 *
 * Usage: node --env-file=.env.local scripts/hydrate-portfolio-planning-2.mjs
 */

import { promises as fs } from "fs";
import path from "path";

const BASE = "https://cjgeoai.com";
const KEY = process.env.CJGEO_API_KEY;
if (!KEY) {
  console.error("CJGEO_API_KEY missing");
  process.exit(1);
}

const SLUG = "portfolio-planning-2";
const MAIN_KEYWORD = "retirement income annuity portfolio";
const TITLE = "Retirement Income and Portfolio Planning - 2";
const SEED_KEYWORD = "retirement income annuity portfolio";

const CONTEXT_PROMPT = `Audience: 55–75 years old, approaching or in retirement, worried about outliving savings, not a financial professional.

Voice: calm, plain English, about eighth-grade reading level. Compliance-conservative: do not name insurance companies or specific financial products by brand; do not cite specific return percentages; do not promise outcomes; if you mention annuity income guarantees, add that payouts are subject to the insurer's claims-paying ability.

Topic: how to think about retirement income inside a broader portfolio plan—mixing guaranteed income with growth and cash, sequence-of-returns risk near retirement, and how to reason about trade-offs (liquidity, costs, giving up some upside).

Structure: use clear h2 section headings a layperson might search for. Cover: why a portfolio plan matters for income stability; roles for Social Security, savings, and guaranteed income; sizing ideas without pretending there is one right number; how to coordinate withdrawals with market conditions at a high level; a short checklist for next steps.

Close with advisor-framed language: invite the reader to request a retirement income review. Never use hard-sell "buy now" language.`;

const DEEP_DIVE_KEYWORDS = [
  {
    matchAny: ["allocation", "how much", "portfolio mix", "asset allocation", "stocks", "bonds"],
    link: {
      href: "/retirement-income/guaranteed-income-allocation/",
      title: "How Much of My Retirement Savings Should Be in Guaranteed Income?",
    },
  },
  {
    matchAny: ["income", "paycheck", "monthly", "withdraw", "spending"],
    link: {
      href: "/retirement-income/retirement-paycheck/",
      title:
        "How to Build a Retirement Paycheck From Social Security, Savings, and Investments",
    },
  },
  {
    matchAny: ["safe", "bond", "cd", "fixed income", "guarantee"],
    link: {
      href: "/retirement-income/cds-bonds-annuities/",
      title: "CDs vs Bonds vs Annuities: Which Is Better for Retirement Income?",
    },
  },
  {
    matchAny: ["market", "risk", "volatility", "sequence", "before retirement", "de-risk"],
    link: {
      href: "/retirement-income/move-money-before-retirement/",
      title: "Should I Move Money Out of the Market Before Retirement?",
    },
  },
  {
    matchAny: ["compare", "options", "choose", "evaluate", "decision"],
    link: {
      href: "/retirement-income/compare-annuity-options/",
      title: "How to Compare Annuity Options Before You Buy",
    },
  },
  {
    matchAny: ["fixed", "indexed", "immediate", "deferred", "type", "kind"],
    link: {
      href: "/retirement-income/annuity-types-compared/",
      title: "Fixed Annuity vs Fixed Indexed Annuity vs Income Annuity",
    },
  },
];

async function api(method, url, body, { retries = 4 } = {}) {
  let lastErr;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const r = await fetch(BASE + url, {
        method,
        headers: { "x-api-key": KEY, "content-type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
      });
      const text = await r.text();
      let json;
      try {
        json = JSON.parse(text);
      } catch {
        json = text;
      }
      if (!r.ok) {
        const retryable = r.status >= 500 || r.status === 429;
        console.error(`HTTP ${r.status} ${method} ${url} (attempt ${attempt + 1})\n${text}`);
        if (retryable && attempt < retries) {
          await sleep(4000 * Math.pow(2, attempt));
          continue;
        }
        const err = new Error(`HTTP ${r.status}`);
        err.status = r.status;
        err.body = json;
        throw err;
      }
      return json;
    } catch (e) {
      lastErr = e;
      if (attempt < retries && (e.code === "ECONNRESET" || e.cause?.code === "ECONNRESET")) {
        await sleep(4000 * Math.pow(2, attempt));
        continue;
      }
      throw e;
    }
  }
  throw lastErr;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

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
    "h2",
    "h3",
    "p",
    "ul",
    "ol",
    "li",
    "strong",
    "em",
    "a",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
    "hr",
    "blockquote",
    "b",
    "i",
    "br",
  ]);
  return html.replace(/<\/?([a-z][a-z0-9]*)([^>]*)>/gi, (match, tag) => {
    return allowed.has(tag.toLowerCase()) ? match : "";
  });
}

function stripOrphanLeadText(html) {
  const firstP = html.search(/<p\b/i);
  const firstH2 = html.search(/<h2\b/i);
  const indices = [firstP, firstH2].filter((i) => i >= 0);
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
    if (!matched) {
      i++;
    }
  }
  return out.join("\n");
}

function decodeBasicEntities(text) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&rsquo;/g, "’")
    .replace(/&lsquo;/g, "‘")
    .replace(/&rdquo;/g, "”")
    .replace(/&ldquo;/g, "“")
    .replace(/&bull;/g, "•")
    .replace(/&nbsp;/g, " ");
}

function slugify(text) {
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
  const headings = [];
  const used = new Set();
  const parts = [];
  let cursor = 0;
  const re = /<h2[^>]*>([\s\S]*?)<\/h2>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const text = m[1].replace(/<[^>]*>/g, "").trim();
    let id = slugify(text);
    let n = 2;
    while (used.has(id)) {
      id = `${slugify(text)}-${n++}`;
    }
    used.add(id);
    headings.push({ id, text });
    parts.push(html.slice(cursor, m.index));
    parts.push(`<h2 id="${id}">${text}</h2>`);
    cursor = m.index + m[0].length;
  }
  parts.push(html.slice(cursor));
  return { html: parts.join(""), headings };
}

function pickDeepDive(headingText, alreadyUsedHrefs) {
  const t = headingText.toLowerCase();
  for (const cand of DEEP_DIVE_KEYWORDS) {
    if (alreadyUsedHrefs.has(cand.link.href)) continue;
    if (cand.matchAny.some((kw) => t.includes(kw))) return cand.link;
  }
  for (const cand of DEEP_DIVE_KEYWORDS) {
    if (!alreadyUsedHrefs.has(cand.link.href)) return cand.link;
  }
  return null;
}

function injectDeepDiveLinks(html, headings) {
  const sectionRe = /<h2 id="([^"]+)">([\s\S]*?)<\/h2>/g;
  const positions = [];
  let m;
  while ((m = sectionRe.exec(html)) !== null) {
    positions.push({
      id: m[1],
      text: m[2].replace(/<[^>]*>/g, "").trim(),
      headingStart: m.index,
      headingEnd: m.index + m[0].length,
    });
  }
  const usedHrefs = new Set();
  let result = "";
  let cursor = 0;
  let injected = 0;
  for (let i = 0; i < positions.length; i++) {
    const sec = positions[i];
    const next = positions[i + 1];
    const sectionEnd = next ? next.headingStart : html.length;
    let block = html.slice(cursor, sectionEnd);
    const link = pickDeepDive(sec.text, usedHrefs);
    if (link) {
      const linkHtml = `<p><em>&rarr; Deep dive: <a href="${link.href}">${link.title}</a></em></p>`;
      const lastClose = block.lastIndexOf("</p>");
      if (lastClose >= 0) {
        const insertAt = lastClose + "</p>".length;
        block = block.slice(0, insertAt) + "\n" + linkHtml + "\n" + block.slice(insertAt);
      } else {
        block = block + "\n" + linkHtml + "\n";
      }
      usedHrefs.add(link.href);
      injected++;
    }
    result += block;
    cursor = sectionEnd;
  }
  if (cursor < html.length) result += html.slice(cursor);
  return { html: result, injected };
}

function sanitize(raw) {
  let h = stripWrappers(raw);
  h = stripDivsSections(h);
  h = stripAttrs(h);
  h = whitelistTags(h);
  h = stripOrphanLeadText(h);
  h = keepTopLevelBlocks(h);
  h = h.replace(/\n{3,}/g, "\n\n").trim();
  h = h.replace(/<p>\s*<\/p>/gi, "");
  h = h
    .replace(/<h2\b[^>]*>\s*(?:ready\b|get started\b|calculate your)[\s\S]*$/i, "")
    .trim();
  h = h
    .replace(/<h2\b[^>]*>\s*What\s+Retirees\s+Say[\s\S]*?(?=<h2\b|$)/i, "")
    .trim();
  {
    const firstH2 = h.search(/<h2\b/i);
    if (firstH2 > 0) {
      const intro = h.slice(0, firstH2);
      const rest = h.slice(firstH2);
      const firstPMatch = intro.match(/<p\b[^>]*>[\s\S]*?<\/p>/i);
      const cleanedIntro = firstPMatch ? firstPMatch[0] + "\n" : "";
      h = cleanedIntro + rest;
    }
  }
  h = h.replace(/<h3>\s*Calculator Inputs\s*<\/h3>\s*/i, "");
  h = h.replace(/<h3>\s*Your Estimated Income\s*<\/h3>\s*<ul>[\s\S]*?<\/ul>/i, "");
  h = h.replace(/<p>\s*Monthly Income Comparison\s*<\/p>\s*/i, "");
  h = h.replace(/\n{3,}/g, "\n\n").trim();
  return h;
}

async function waitForDraftReady(articleId) {
  const pollMs = 60_000;
  const maxMs = 20 * 60_000;
  let elapsed = 0;
  while (elapsed < maxMs) {
    const st = await api("POST", `/api/articles/${articleId}/edit-draft`, {
      action: "pull_status",
    });
    console.log(`    pull_status: ${st.status} (+${elapsed / 1000}s)`);
    if (st.status === "ready") return true;
    await sleep(pollMs);
    elapsed += pollMs;
  }
  return false;
}

(async function main() {
  const root = path.resolve(process.cwd());
  const adoptedAt = new Date().toISOString().slice(0, 10);
  const resumeId = process.env.CJGEO_RESUME_ARTICLE_ID?.trim();
  const draftOnlyId = process.env.CJGEO_RESUME_DRAFT_ONLY?.trim();

  let articleId;
  if (draftOnlyId) {
    articleId = draftOnlyId;
    console.log(`[0] resume from generate_draft only: ${articleId}`);
  } else if (resumeId) {
    articleId = resumeId;
    console.log(`[0] resume existing article_id=${articleId}`);
    console.log("[4] topic full_auto (best-effort)...");
    try {
      await api("POST", `/api/articles/${articleId}/topic`, {});
    } catch (e) {
      console.warn(`    topic full_auto failed (${e.message}); continuing`);
    }
    console.log("[5] prompt full_auto...");
    await api("POST", `/api/articles/${articleId}/prompt`, {});
  } else {
    console.log("[1] create article...");
    const created = await api("POST", "/api/v1/articles", {
      title: TITLE,
      keyword: SEED_KEYWORD,
      create: true,
    });
    articleId = created.article_id;
    if (!articleId) {
      console.error(created);
      throw new Error("No article_id from create");
    }
    console.log(`    article_id: ${articleId}`);

    console.log("[2] set_main_keyword...");
    await api("POST", `/api/articles/${articleId}/keyword`, {
      action: "set_main_keyword",
      main_keyword: MAIN_KEYWORD,
    });

    console.log("[3] keyword full_auto...");
    await api("POST", `/api/articles/${articleId}/keyword`, {});
    console.log("[4] topic full_auto (best-effort)...");
    try {
      await api("POST", `/api/articles/${articleId}/topic`, {});
    } catch (e) {
      console.warn(`    topic full_auto failed (${e.message}); continuing`);
    }
    console.log("[5] prompt full_auto...");
    await api("POST", `/api/articles/${articleId}/prompt`, {});
  }

  let draftReady = false;
  for (let attempt = 1; attempt <= 3 && !draftReady; attempt++) {
    console.log(`[6] generate_draft (attempt ${attempt})...`);
    const gen = await api("POST", `/api/articles/${articleId}/edit-draft`, {
      action: "generate_draft",
      mode: "new_draft",
      use_default_context_prompt: false,
      context_prompt: CONTEXT_PROMPT,
      generation_prompt_mode: "default",
      allow_image_generation: false,
    });
    console.log(`    generate response status field: ${gen.status || "n/a"}`);

    draftReady = await waitForDraftReady(articleId);
    if (!draftReady) {
      console.log("    timed out after 20m; will retry generate_draft if attempts remain");
    }
  }
  if (!draftReady) {
    throw new Error("Draft never became ready");
  }

  console.log("[7] adopt_draft...");
  let adopt = await api("POST", `/api/articles/${articleId}/edit-draft`, {
    action: "adopt_draft",
  });
  if (adopt.status === "not_ready") {
    throw new Error("adopt_draft returned not_ready unexpectedly");
  }
  console.log(`    adopted committed=${adopt.committed}`);

  console.log("[8] get_html...");
  const res = await api("POST", `/api/articles/${articleId}`, { action: "get_html" });
  const raw = res.content_html || res.html || "";
  if (!raw.length) throw new Error("Empty content_html");

  console.log("[9] sanitize + inject...");
  let h = sanitize(raw);
  const idResult = injectH2Ids(h);
  h = idResult.html;
  const linkResult = injectDeepDiveLinks(h, idResult.headings);
  h = linkResult.html;
  console.log(`    h2 count: ${idResult.headings.length}, deep dives: ${linkResult.injected}`);

  const header = `<!--
  CJGEO-generated article body.
  article_id: ${articleId}
  main_keyword: ${MAIN_KEYWORD}
  adopted_at: ${adoptedAt}
-->
`;
  const outPath = path.join(root, `content/retirement-income/${SLUG}.html`);
  await fs.writeFile(outPath, header + h);
  console.log(`[10] wrote ${outPath}`);

  await fs.writeFile(
    path.join(root, "scripts/.portfolio-planning-2-meta.json"),
    JSON.stringify(
      {
        articleId,
        slug: SLUG,
        mainKeyword: MAIN_KEYWORD,
        adoptedAt,
        h2Count: idResult.headings.length,
        headings: idResult.headings,
      },
      null,
      2,
    ),
  );
  console.log("DONE");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
