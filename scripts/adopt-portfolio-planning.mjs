// Adopt CJGEO article 825ce919-55d2-4e3b-9dfd-e870a0fc3a8c into
// /retirement-income/portfolio-planning/ — per the canonical adoptCJGEORawContent
// procedure in libs/skill_book/BryanBlog/index.js.
//
// Usage: node --env-file=C:/Users/xsj70/GuildOS/.env.local scripts/adopt-portfolio-planning.mjs

import { promises as fs } from "fs";
import path from "path";

const BASE = "https://cjgeoai.com";
const KEY = process.env.CJGEO_API_KEY;
if (!KEY) {
  console.error("CJGEO_API_KEY missing");
  process.exit(1);
}

const ARTICLE_ID = "825ce919-55d2-4e3b-9dfd-e870a0fc3a8c";
const SLUG = "portfolio-planning";
const MAIN_KEYWORD = "retirement income annuity";
const ADOPTED_AT = "2026-05-19";

// Section-level deep-dive injection (the SB's optional step 4).
// Maps slug-from-text h2 ids → satellite link(s). Heading-id slugs are
// derived AFTER sanitize, so we'll match by substring against the actual
// headings produced by the sanitizer (best-effort, prefix match).
// We'll pick targets so the same satellite isn't repeated within this article.
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

async function api(method, url, body) {
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
    console.error(`HTTP ${r.status} ${method} ${url}\n${text}`);
    const err = new Error(`HTTP ${r.status}`);
    err.status = r.status;
    err.body = json;
    throw err;
  }
  return json;
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
  // Drop CJGEO hero/footer-cta sections explicitly by class hint (best effort)
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
  // Drop any text content that appears before the first <p> or <h2>
  const firstP = html.search(/<p\b/i);
  const firstH2 = html.search(/<h2\b/i);
  const indices = [firstP, firstH2].filter(i => i >= 0);
  if (!indices.length) return html;
  const start = Math.min(...indices);
  return html.slice(start);
}

// After whitelist + id-injection, only keep top-level block elements from the
// allowed-block set (and their inner content). Loose text between elements
// (CJGEO leaves a lot of this after stripping wrapper <div>/<section>) is dropped.
function keepTopLevelBlocks(html) {
  // We re-tokenize by matching balanced top-level block tags from this set:
  // h2, h3, p, ul, ol, table, hr, blockquote.
  // Inline tags (a, strong, em, b, i, br) and intra-block tags are kept inside their parent.
  const blockTags = ["h2", "h3", "p", "ul", "ol", "table", "blockquote"];
  const out = [];
  let i = 0;
  const len = html.length;
  while (i < len) {
    // self-closing hr
    if (/^<hr\b/i.test(html.slice(i))) {
      const end = html.indexOf(">", i);
      if (end < 0) break;
      out.push("<hr/>");
      i = end + 1;
      continue;
    }
    // Look for an opening tag of an allowed block
    let matched = false;
    for (const t of blockTags) {
      const openRe = new RegExp(`^<${t}\\b[^>]*>`, "i");
      const m = html.slice(i).match(openRe);
      if (m) {
        const openTag = m[0];
        // Find matching closing tag (naive — no nested same-tag, which is OK
        // for our block set since they don't nest within themselves in CJGEO content;
        // tables we don't worry about since the closing </table> is uniquely matched).
        const closeRe = new RegExp(`</${t}\\s*>`, "i");
        const rest = html.slice(i + openTag.length);
        const cm = rest.match(closeRe);
        if (!cm) {
          // No closing — skip this opener
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
      // Skip one char (loose text, whitespace, stray tag)
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
  let parts = [];
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
    if (cand.matchAny.some(kw => t.includes(kw))) return cand.link;
  }
  // Fall back: first unused candidate
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
    // Append everything up to sectionEnd, then inject the link before the next section.
    let block = html.slice(cursor, sectionEnd);
    const link = pickDeepDive(sec.text, usedHrefs);
    if (link) {
      const linkHtml = `<p><em>&rarr; Deep dive: <a href="${link.href}">${link.title}</a></em></p>`;
      // Insert after last </p> inside block (relative to this section content)
      // 'block' starts at cursor (a section's first byte); we splice the link at the end of the last <p> within block.
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
  // Append any tail beyond the last section (shouldn't exist, but safe)
  if (cursor < html.length) result += html.slice(cursor);
  return { html: result, injected };
}

function wordCount(html) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().split(" ").length;
}

(async function main() {
  const root = path.resolve(process.cwd());

  console.log(`[1] fetch raw html for ${ARTICLE_ID}...`);
  const res = await api("POST", `/api/articles/${ARTICLE_ID}`, { action: "get_html" });
  const raw = res.content_html || res.html || "";
  const rawSize = Buffer.byteLength(raw, "utf8");
  console.log(`    raw size: ${rawSize}`);

  console.log("[2] sanitize...");
  let h = stripWrappers(raw);
  h = stripDivsSections(h);
  h = stripAttrs(h);
  h = whitelistTags(h);
  h = stripOrphanLeadText(h);
  // Keep only top-level block elements (drop loose interstitial text/whitespace)
  h = keepTopLevelBlocks(h);
  h = h.replace(/\n{3,}/g, "\n\n").trim();
  // Collapse stray empty paragraphs
  h = h.replace(/<p>\s*<\/p>/gi, "");
  // Drop a trailing CTA-style section (heading mentions "ready", "calculate",
  // "get started", "request" near the end — matches the CJGEO footer-cta pattern).
  h = h.replace(
    /<h2\b[^>]*>\s*(?:ready\b|get started\b|calculate your)[\s\S]*$/i,
    "",
  ).trim();
  // Drop the testimonials section ("What Retirees Say...") — compliance-conservative
  // tone (refStrategy rule 5) avoids endorsements/testimonials.
  h = h.replace(
    /<h2\b[^>]*>\s*What\s+Retirees\s+Say[\s\S]*?(?=<h2\b|$)/i,
    "",
  ).trim();
  // Drop leftover calculator widget micro-paragraphs (short fragments + the
  // "Estimates only" disclaimer near the top, before the first h2). The first
  // <p> in the file is the article's actual intro paragraph — keep it.
  {
    const firstH2 = h.search(/<h2\b/i);
    if (firstH2 > 0) {
      const intro = h.slice(0, firstH2);
      const rest = h.slice(firstH2);
      // Keep only the first <p>...</p> in the intro region; drop the rest of
      // intro-region <p>s (they're calculator widget labels like "Quick Income
      // Annuity Estimate", "See your approximate monthly payout", etc.).
      const firstPMatch = intro.match(/<p\b[^>]*>[\s\S]*?<\/p>/i);
      const cleanedIntro = firstPMatch ? firstPMatch[0] + "\n" : "";
      h = cleanedIntro + rest;
    }
  }
  // Drop bare "Calculator Inputs" / "Your Estimated Income" h3s + their
  // calculator-output <ul> (the calculator outputs read like raw widget data).
  h = h.replace(/<h3>\s*Calculator Inputs\s*<\/h3>\s*/i, "");
  h = h.replace(
    /<h3>\s*Your Estimated Income\s*<\/h3>\s*<ul>[\s\S]*?<\/ul>/i,
    "",
  );
  // Drop "Monthly Income Comparison" widget label and trailing illustrative disclaimer
  h = h.replace(/<p>\s*Monthly Income Comparison\s*<\/p>\s*/i, "");
  // Final whitespace tidy
  h = h.replace(/\n{3,}/g, "\n\n").trim();
  const sanitizedSize = Buffer.byteLength(h, "utf8");
  console.log(`    sanitized size: ${sanitizedSize}`);

  console.log("[3] inject h2 ids (slug-from-text)...");
  const idResult = injectH2Ids(h);
  h = idResult.html;
  console.log(`    headings: ${idResult.headings.length}`);
  idResult.headings.forEach(x => console.log(`      - ${x.id}  (${x.text})`));

  console.log("[4] inject deep-dive links...");
  const linkResult = injectDeepDiveLinks(h, idResult.headings);
  h = linkResult.html;
  console.log(`    links injected: ${linkResult.injected}`);

  const finalSize = Buffer.byteLength(h, "utf8");
  const wc = wordCount(h);
  console.log(`    final size: ${finalSize}, words: ${wc}`);

  const header = `<!--
  CJGEO-generated article body.
  article_id: ${ARTICLE_ID}
  main_keyword: ${MAIN_KEYWORD}
  adopted_at: ${ADOPTED_AT}
-->
`;
  const outPath = path.join(root, `content/retirement-income/${SLUG}.html`);
  await fs.writeFile(outPath, header + h);
  console.log(`[5] wrote ${outPath}`);

  await fs.writeFile(
    path.join(root, "scripts/.portfolio-planning-meta.json"),
    JSON.stringify(
      {
        articleId: ARTICLE_ID,
        slug: SLUG,
        mainKeyword: MAIN_KEYWORD,
        adoptedAt: ADOPTED_AT,
        rawSize,
        sanitizedSize: finalSize,
        wordCount: wc,
        h2Count: idResult.headings.length,
        headings: idResult.headings,
        deepDiveLinksInjected: linkResult.injected,
      },
      null,
      2,
    ),
  );
  console.log("DONE");
})().catch(e => {
  console.error(e);
  process.exit(1);
});
