// This satellite's prose body is CJGEO-generated.
// Source of truth: content/retirement-income/cds-bonds-annuities.html
// Hydration metadata (CJGEO article_id, main keyword) lives in lib/articles.ts.
// Regenerate via the CJGEO REST API and replace the HTML file in place.

import { promises as fs } from "fs";
import path from "path";
import ArticleShell, { ArticleSection } from "@/components/ArticleShell";
import { getSatellite, relatedFor } from "@/lib/articles";

const meta = getSatellite("cds-bonds-annuities")!;

export const metadata = {
  title: meta.title,
  description: meta.teaser,
};

function extractSections(html: string): ArticleSection[] {
  const sections: ArticleSection[] = [];
  const re = /<h2\s+id="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const heading = m[2].replace(/<[^>]*>/g, "").trim();
    sections.push({ id: m[1], heading });
  }
  return sections;
}

export default async function Page() {
  const htmlPath = path.join(
    process.cwd(),
    "content/retirement-income/cds-bonds-annuities.html"
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
          "annuity-types-compared",
          "annuity-downsides",
          "guaranteed-income-allocation",
        ])}
      >
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </ArticleShell>
    </main>
  );
}
