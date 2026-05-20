// Pillar prose body is CJGEO-generated.
// Source of truth: content/retirement-income/pillar.html
// Hydration metadata (CJGEO article_id, main keyword) lives in lib/articles.ts.
// Regenerate via the CJGEO REST API and replace the HTML file in place.

import { promises as fs } from "fs";
import path from "path";
import ArticleShell, { ArticleSection } from "@/components/ArticleShell";
import Cta from "@/components/Cta";
import { PILLAR, relatedFor } from "@/lib/articles";

export const metadata = {
  title: PILLAR.title,
  description: PILLAR.teaser,
};

// Derive TOC sections from the headings present in the generated HTML.
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

export default async function RetirementIncomePillar() {
  const htmlPath = path.join(
    process.cwd(),
    "content/retirement-income/pillar.html"
  );
  const html = await fs.readFile(htmlPath, "utf8");
  const sections = extractSections(html);

  return (
    <main>
      <ArticleShell
        eyebrow="Pillar Guide"
        title={PILLAR.title}
        intro="The big-picture map. Each section answers a real question retirees ask, then points you to a deeper article when you're ready to dig in."
        sections={sections}
        relatedArticles={relatedFor([
          "monthly-income-needs",
          "retirement-paycheck",
          "income-review-checklist",
        ])}
      >
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <Cta
          heading="Request a Retirement Income Review"
          body="Bring your numbers, your worries, and your questions. We'll walk through them together — no obligation, no jargon."
          href="/contact"
          label="Book a review"
        />
      </ArticleShell>
    </main>
  );
}
