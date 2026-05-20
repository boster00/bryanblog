// This satellite's prose body is CJGEO-generated.
// Source of truth: content/retirement-income/monthly-income-needs.html
// Hydration metadata (CJGEO article_id, main keyword) lives in lib/articles.ts.
// Regenerate via the CJGEO REST API and replace the HTML file in place.

import { promises as fs } from "fs";
import path from "path";
import ArticleShell, { ArticleSection } from "@/components/ArticleShell";
import { getSatellite, relatedFor } from "@/lib/articles";

const meta = getSatellite("monthly-income-needs")!;

export const metadata = {
  title: meta.title,
  description: meta.teaser,
};

// Derive TOC sections from the headings present in the generated HTML.
// Matches the same id+heading pairs that the sanitizer injected onto <h2 id="...">.
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
    "content/retirement-income/monthly-income-needs.html"
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
          "retirement-paycheck",
          "income-review-checklist",
        ])}
      >
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </ArticleShell>
    </main>
  );
}
