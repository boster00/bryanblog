// Re-adopt all 14 satellites/utility articles using the new fidelity sanitizer.
// Usage: node scripts/readopt-all-fidelity.mjs
//
// Reads raw HTMLs from the GuildOS worktree tmp/adoption-fidelity dir.

import { promises as fs } from "fs";
import path from "path";
import { sanitizeCJGEO } from "../lib/sanitize-cjgeo.mjs";

const ROOT = path.resolve(process.cwd());
const RAW_DIR = "C:\\Users\\xsj70\\GuildOS\\.claude\\worktrees\\xenodochial-ritchie-d3579a\\tmp\\adoption-fidelity";

// (slug, contentPath, mainKeyword, articleId, deepDiveLinks)
// deepDiveLinks: an array of objects, keyed by 0-based heading index OR matched
// fuzzily to heading text. We'll keep them simple — just an array, the first
// link goes in heading 1, the second in heading 2, etc.
const ARTICLES = [
  {
    slug: "monthly-income-needs",
    contentPath: "content/retirement-income/monthly-income-needs.html",
    id: "253c5ee8-1704-4b6e-88d1-d2fb839cb16c",
    mainKeyword: "retirement income",
    deepDiveLinks: [
      { idx: 0, href: "/retirement-income/retirement-paycheck/", title: "how to build a retirement paycheck" },
    ],
  },
  {
    slug: "retirement-paycheck",
    contentPath: "content/retirement-income/retirement-paycheck.html",
    id: "c5f8abb9-4caf-495f-a832-447c425ac713",
    mainKeyword: "retirement paycheck",
    deepDiveLinks: [
      { idx: 0, href: "/retirement-income/guaranteed-income-allocation/", title: "how much of your savings should be in guaranteed income" },
    ],
  },
  {
    slug: "move-money-before-retirement",
    contentPath: "content/retirement-income/move-money-before-retirement.html",
    id: "d03cde8c-5aca-43ab-80f9-9bc898cb81f8",
    mainKeyword: "pre retirement portfolio",
    deepDiveLinks: [
      { idx: 0, href: "/retirement-income/cds-bonds-annuities/", title: "CDs vs bonds vs annuities" },
    ],
  },
  {
    slug: "cds-bonds-annuities",
    contentPath: "content/retirement-income/cds-bonds-annuities.html",
    id: "5c1c8043-ef29-4675-bfdd-fd457a85a849",
    mainKeyword: "safe retirement investments",
    deepDiveLinks: [
      { idx: 0, href: "/retirement-income/annuity-types-compared/", title: "fixed vs fixed-indexed vs income annuity" },
    ],
  },
  {
    slug: "annuity-downsides",
    contentPath: "content/retirement-income/annuity-downsides.html",
    id: "dc22d86a-3cd0-4d7f-9041-5e0d9a8ea6f0",
    mainKeyword: "annuity downsides",
    deepDiveLinks: [
      { idx: 0, href: "/retirement-income/annuity-fees-explained/", title: "annuity fees and surrender charges, explained" },
    ],
  },
  {
    slug: "annuity-fees-explained",
    contentPath: "content/retirement-income/annuity-fees-explained.html",
    id: "01a03fa4-6eec-41c5-ad11-1de0dfaa26b6",
    mainKeyword: "annuity fees",
    deepDiveLinks: [
      { idx: 0, href: "/retirement-income/compare-annuity-options/", title: "how to compare annuity options before you buy" },
    ],
  },
  {
    slug: "who-should-consider-annuity",
    contentPath: "content/retirement-income/who-should-consider-annuity.html",
    id: "0163f112-01e1-4954-b63b-6c257fc69564",
    mainKeyword: "annuity suitability",
    deepDiveLinks: [
      { idx: 0, href: "/retirement-income/guaranteed-income-allocation/", title: "how much of your savings should be in guaranteed income" },
    ],
  },
  {
    slug: "guaranteed-income-allocation",
    contentPath: "content/retirement-income/guaranteed-income-allocation.html",
    id: "2a6ef640-8b5a-4da6-864c-c976e3b6e6ac",
    mainKeyword: "guaranteed retirement income",
    deepDiveLinks: [
      { idx: 0, href: "/retirement-income/annuity-types-compared/", title: "the three flavors of annuity" },
    ],
  },
  {
    slug: "compare-annuity-options",
    contentPath: "content/retirement-income/compare-annuity-options.html",
    id: "83ae9418-1798-4a4d-9238-ad3ae1572a92",
    mainKeyword: "annuity comparison",
    deepDiveLinks: [
      { idx: 0, href: "/retirement-income/annuity-fees-explained/", title: "annuity fees and surrender charges, in plain English" },
    ],
  },
  {
    slug: "annuity-types-compared",
    contentPath: "content/retirement-income/annuity-types-compared.html",
    id: "96b4d588-2eb9-46a0-9fc3-c0a2465abf34",
    mainKeyword: "annuity types",
    deepDiveLinks: [
      { idx: 0, href: "/retirement-income/who-should-consider-annuity/", title: "who should consider an annuity" },
    ],
  },
  {
    slug: "portfolio-planning",
    contentPath: "content/retirement-income/portfolio-planning.html",
    id: "01c3334a-4f13-4a62-95d7-25bc784e74a5",
    mainKeyword: "retirement income annuity",
    deepDiveLinks: [
      { idx: 0, href: "/retirement-income/portfolio-planning-2/", title: "portfolio planning, part two" },
    ],
  },
  {
    slug: "portfolio-planning-2",
    contentPath: "content/retirement-income/portfolio-planning-2.html",
    id: "ff1b1af3-20e6-41e5-bada-140bda7ea55d",
    mainKeyword: "annuity portfolio",
    deepDiveLinks: [
      { idx: 0, href: "/retirement-income/income-review-checklist/", title: "what to bring to a retirement income review" },
    ],
  },
  {
    slug: "income-review-checklist",
    contentPath: "content/retirement-income/income-review-checklist.html",
    id: "d362872f-23ac-424f-81a0-a771df51b2f8",
    mainKeyword: "retirement income review",
    deepDiveLinks: [
      { idx: 0, href: "/retirement-income/", title: "the pillar: will my money last in retirement" },
    ],
  },
  {
    slug: "about",
    contentPath: "content/about/index.html",
    id: "0be37653-7ab3-4aa1-8ebf-de12da714514",
    mainKeyword: "retirement planning blog",
    deepDiveLinks: [],
  },
  {
    slug: "contact",
    contentPath: "content/contact/intro.html",
    id: "c1576088-5313-43ed-8b8d-ac806ac1278e",
    mainKeyword: "retirement income review",
    deepDiveLinks: [],
  },
];

function countStructural(html) {
  const counts = {};
  const matchers = {
    h2: /<h2\b/gi,
    h3: /<h3\b/gi,
    table: /<table\b/gi,
    ul: /<ul\b/gi,
    ol: /<ol\b/gi,
    li: /<li\b/gi,
    blockquote: /<blockquote\b/gi,
    details: /<details\b/gi,
    summary: /<summary\b/gi,
    figure: /<figure\b/gi,
    callout: /class="[^"]*\bcallout\b[^"]*"/gi,
    "stat-card": /class="[^"]*\bstat-card\b[^"]*"/gi,
    "stat-row": /class="[^"]*\bstat-row\b[^"]*"/gi,
    bucket: /class="[^"]*\bbucket\b[^"]*"/gi,
    "compare-grid": /class="[^"]*\bcompare-grid\b[^"]*"/gi,
    "compare-card": /class="[^"]*\bcompare-card\b[^"]*"/gi,
    "comparison-wrap": /class="[^"]*\bcomparison-wrap\b[^"]*"/gi,
    "income-layer": /class="[^"]*\bincome-layer\b[^"]*"/gi,
    "pull-quote": /class="[^"]*\bpull-quote\b[^"]*"/gi,
    pullquote: /class="[^"]*\bpullquote\b[^"]*"/gi,
    "faq-item": /class="[^"]*\bfaq-item\b[^"]*"/gi,
    timeline: /class="[^"]*\btimeline\b[^"]*"/gi,
    checklist: /class="[^"]*\bchecklist\b[^"]*"/gi,
    "check-list": /class="[^"]*\bcheck-list\b[^"]*"/gi,
    svg: /<svg\b/gi,
    "def-grid": /class="[^"]*\bdef-grid\b[^"]*"/gi,
    "card-grid": /class="[^"]*\bcard-grid\b[^"]*"/gi,
    takeaway: /class="[^"]*\btakeaway\b[^"]*"/gi,
    compliance: /class="[^"]*\bcompliance\b[^"]*"/gi,
    disclaimer: /class="[^"]*\bdisclaimer\b[^"]*"/gi,
  };
  for (const [k, re] of Object.entries(matchers)) {
    const m = html.match(re);
    counts[k] = m ? m.length : 0;
  }
  return counts;
}

const summary = [];

for (const a of ARTICLES) {
  try {
    const rawPath = path.join(RAW_DIR, `${a.slug}-raw.html`);
    const raw = await fs.readFile(rawPath, "utf8");
    const result = sanitizeCJGEO(raw, { strictAnchors: false });

    // Inject deep-dive links by heading index.
    let html = result.html;
    if (a.deepDiveLinks && a.deepDiveLinks.length) {
      // Build a section-id-keyed links map from heading index.
      const headingIds = result.headings.map((h) => h.id);
      const linkMap = {};
      for (const dd of a.deepDiveLinks) {
        const id = headingIds[dd.idx];
        if (!id) continue;
        if (!linkMap[id]) linkMap[id] = [];
        linkMap[id].push({ href: dd.href, title: dd.title });
      }
      // Inline a simple injector. Use the same pattern as injectSatelliteLinks.
      const sectionRe = /<h2 id="([^"]+)">[\s\S]*?<\/h2>/g;
      const matches = [];
      let m;
      while ((m = sectionRe.exec(html)) !== null) {
        matches.push({
          id: m[1],
          headingStart: m.index,
          headingEnd: m.index + m[0].length,
        });
      }
      let result2 = "";
      for (let i = 0; i < matches.length; i++) {
        const sec = matches[i];
        const next = matches[i + 1];
        const sectionEnd = next ? next.headingStart : html.length;
        if (i === 0) result2 += html.slice(0, matches[0].headingStart);
        let block = html.slice(sec.headingStart, sectionEnd);
        const sectionLinks = linkMap[sec.id] || [];
        if (sectionLinks.length) {
          const linkHtml = sectionLinks
            .map(
              (l) => `<p><em>&rarr; Deep dive: <a href="${l.href}">${l.title}</a></em></p>`
            )
            .join("\n");
          const lastClose = block.lastIndexOf("</p>");
          if (lastClose >= 0) {
            const insertAt = lastClose + "</p>".length;
            block = block.slice(0, insertAt) + "\n" + linkHtml + "\n" + block.slice(insertAt);
          } else {
            block = block + "\n" + linkHtml + "\n";
          }
        }
        result2 += block;
      }
      html = result2;
    }

    // Bryan leakage check
    if (/\bBryan\b/.test(html)) {
      console.log(`  [WARN] ${a.slug}: 'Bryan' found in sanitized output — needs manual rewrite`);
    }

    const meta = `<!--
  CJGEO-generated article body.
  article_id: ${a.id}
  main_keyword: ${a.mainKeyword}
  adopted_at: ${new Date().toISOString().slice(0, 10)}
  sanitizer: lib/sanitize-cjgeo.mjs (fidelity / permissive class-preservation)
-->
`;
    const outPath = path.join(ROOT, a.contentPath);
    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, meta + html);

    const stats = countStructural(html);
    const interesting = Object.entries(stats)
      .filter(([_, v]) => v > 0)
      .map(([k, v]) => `${k}:${v}`)
      .join(" ");
    console.log(`[ok] ${a.slug.padEnd(32)} bytes=${html.length.toString().padStart(5)} h2=${stats.h2} | ${interesting}`);
    summary.push({ slug: a.slug, bytes: html.length, headings: result.headings.length, stats });
  } catch (e) {
    console.error(`[FAIL] ${a.slug}: ${e.message}`);
  }
}

await fs.writeFile(
  path.join(RAW_DIR, "readopt-summary.json"),
  JSON.stringify(summary, null, 2)
);
console.log(`\nDone. ${summary.length}/15 written.`);
