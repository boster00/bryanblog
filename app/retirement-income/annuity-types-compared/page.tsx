// This satellite's prose body is CJGEO-generated.
// Source of truth: content/retirement-income/annuity-types-compared.html
// Hydration metadata (CJGEO article_id, main keyword) lives in lib/articles.ts.
// Regenerate via the CJGEO REST API and replace the HTML file in place.

import { promises as fs } from "fs";
import path from "path";
import ArticleShell from "@/components/ArticleShell";
import { getSatellite, relatedFor } from "@/lib/articles";
import { extractSections } from "@/lib/sections";

const meta = getSatellite("annuity-types-compared")!;

export const metadata = {
  title: meta.title,
  description: meta.teaser,
};

export default async function Page() {
  const htmlPath = path.join(
    process.cwd(),
    "content/retirement-income/annuity-types-compared.html"
  );
  const html = await fs.readFile(htmlPath, "utf8");
  const sections = extractSections(html);

  return (
    <main>
      <ArticleShell
        eyebrow="Retirement Income"
        title={meta.title}
        intro={meta.teaser}
        sections={sections}
        relatedArticles={relatedFor([
          "cds-bonds-annuities",
          "annuity-fees-explained",
          "who-should-consider-annuity",
        ])}
      >
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </ArticleShell>
    </main>
  );
}
