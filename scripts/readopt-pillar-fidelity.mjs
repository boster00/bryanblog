// Re-adopt the pillar using lib/sanitize-cjgeo.mjs (curated-allowlist sanitizer).
// Usage: node scripts/readopt-pillar-fidelity.mjs

import { promises as fs } from "fs";
import path from "path";
import { sanitizeCJGEO } from "../lib/sanitize-cjgeo.mjs";

const ROOT = path.resolve(process.cwd());

const RAW_PATH_CANDIDATES = [
  "C:\\Users\\xsj70\\GuildOS\\.claude\\worktrees\\xenodochial-ritchie-d3579a\\tmp\\adoption-fidelity\\pillar-cjgeo-raw.html",
];

const ARTICLE_ID = "46f22071-6075-417f-b4dc-37c32aa3510f";

const ANCHOR_MAP = [
  { id: "last-as-long-as-i-do", keywords: ["last as long", "last as i"] },
  { id: "steady-income-plan", keywords: ["steady income", "simple plan"] },
  {
    id: "safe-versus-invested",
    keywords: ["safe versus", "safe vs", "safe and invested", "keep safe"],
  },
  { id: "what-i-give-up", keywords: ["give up", "certainty"] },
  {
    id: "annuity-fit",
    keywords: ["annuity actually fit", "annuity fit", "fits my situation"],
  },
  {
    id: "compare-options",
    keywords: ["compare options", "compare annuity", "fine print"],
  },
  {
    id: "what-to-do-next",
    keywords: [
      "do before making",
      "do next",
      "making a decision",
      "should i do",
    ],
  },
];

const SATELLITE_LINKS = {
  "last-as-long-as-i-do": [
    {
      href: "/retirement-income/monthly-income-needs/",
      title: "how much monthly income do I actually need in retirement",
    },
  ],
  "steady-income-plan": [
    {
      href: "/retirement-income/retirement-paycheck/",
      title:
        "how to build a retirement paycheck from Social Security, savings, and investments",
    },
  ],
  "safe-versus-invested": [
    {
      href: "/retirement-income/move-money-before-retirement/",
      title: "should I move money out of the market before retirement",
    },
    {
      href: "/retirement-income/cds-bonds-annuities/",
      title: "CDs vs bonds vs annuities",
    },
  ],
  "what-i-give-up": [
    {
      href: "/retirement-income/annuity-downsides/",
      title: "what are the downsides of annuities",
    },
    {
      href: "/retirement-income/annuity-fees-explained/",
      title: "annuity fees, surrender charges, and guarantees explained",
    },
  ],
  "annuity-fit": [
    {
      href: "/retirement-income/who-should-consider-annuity/",
      title: "who should consider an annuity, and who should avoid one",
    },
    {
      href: "/retirement-income/guaranteed-income-allocation/",
      title: "how much of my savings should be in guaranteed income",
    },
  ],
  "compare-options": [
    {
      href: "/retirement-income/compare-annuity-options/",
      title: "how to compare annuity options before you buy",
    },
    {
      href: "/retirement-income/annuity-types-compared/",
      title: "fixed vs fixed indexed vs income annuity",
    },
  ],
  "what-to-do-next": [
    {
      href: "/retirement-income/income-review-checklist/",
      title: "what to bring to a retirement income review",
    },
  ],
};

async function loadRawHtml() {
  for (const p of RAW_PATH_CANDIDATES) {
    try {
      const buf = await fs.readFile(p, "utf8");
      console.log(`[raw] loaded cached: ${p} (${buf.length} bytes)`);
      return buf;
    } catch {}
  }
  const KEY = process.env.CJGEO_API_KEY;
  if (!KEY) throw new Error("Raw HTML not found and CJGEO_API_KEY missing");
  console.log("[raw] fetching from CJGEO API...");
  const r = await fetch(`https://cjgeoai.com/api/articles/${ARTICLE_ID}`, {
    method: "POST",
    headers: { "x-api-key": KEY, "content-type": "application/json" },
    body: JSON.stringify({ action: "get_html" }),
  });
  if (!r.ok) throw new Error(`get_html HTTP ${r.status}`);
  const j = await r.json();
  return j.content_html;
}

(async function main() {
  const raw = await loadRawHtml();
  console.log("[sanitize] running...");
  const result = sanitizeCJGEO(raw, {
    anchorMap: ANCHOR_MAP,
    satelliteLinks: SATELLITE_LINKS,
    strictAnchors: true,
  });
  console.log(
    `[sanitize] done. words=${result.wordCount} size=${result.html.length}`
  );
  console.log("[sanitize] headings:");
  for (const h of result.headings) console.log(`  - ${h.id} :: ${h.text}`);

  const meta = `<!--
  CJGEO-generated article body.
  article_id: ${ARTICLE_ID}
  main_keyword: will my money last in retirement
  adopted_at: ${new Date().toISOString().slice(0, 10)}
  sanitizer: lib/sanitize-cjgeo.mjs (curated-class allowlist)
-->
`;
  const outPath = path.join(ROOT, "content/retirement-income/pillar.html");
  await fs.writeFile(outPath, meta + result.html);
  console.log(`[write] ${outPath} (${result.html.length} bytes)`);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
