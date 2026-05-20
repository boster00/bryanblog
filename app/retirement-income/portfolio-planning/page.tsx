// This satellite's prose body is CJGEO-generated.
// Source of truth: content/retirement-income/portfolio-planning.html
// Hydration metadata (CJGEO article_id, main keyword) lives in lib/articles.ts.
// Regenerate via the CJGEO REST API and replace the HTML file in place.

import { promises as fs } from "fs";
import path from "path";
import ArticleShell, { ArticleSection } from "@/components/ArticleShell";
import { getSatellite, relatedFor } from "@/lib/articles";

const meta = getSatellite("portfolio-planning")!;

export const metadata = {
  title: meta.title,
  description: meta.teaser,
};

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&rsquo;/g, "’")
    .replace(/&lsquo;/g, "‘")
    .replace(/&rdquo;/g, "”")
    .replace(/&ldquo;/g, "“")
    .replace(/&bull;/g, "•")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"');
}

function extractSections(html: string): ArticleSection[] {
  const sections: ArticleSection[] = [];
  const re = /<h2\s+id="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const heading = decodeEntities(m[2].replace(/<[^>]*>/g, "")).trim();
    sections.push({ id: m[1], heading });
  }
  return sections;
}

export default async function Page() {
  const htmlPath = path.join(
    process.cwd(),
    "content/retirement-income/portfolio-planning.html"
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
          "guaranteed-income-allocation",
          "cds-bonds-annuities",
        ])}
      >
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </ArticleShell>
    </main>
  );
}
