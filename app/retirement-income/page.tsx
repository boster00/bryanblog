// Pillar prose body is CJGEO-generated.
// Source of truth: content/retirement-income/pillar.html
// Hydration metadata (CJGEO article_id, main keyword) lives in lib/articles.ts.
// Regenerate via the CJGEO REST API and replace the HTML file in place.

import { promises as fs } from "fs";
import path from "path";
import ArticleShell from "@/components/ArticleShell";
import Cta from "@/components/Cta";
import { PILLAR, relatedFor } from "@/lib/articles";
import { extractSections } from "@/lib/sections";

export const metadata = {
  title: PILLAR.title,
  description: PILLAR.teaser,
};

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
        eyebrow="Retirement Income"
        title={PILLAR.title}
        byline="Updated May 2026 · 14 min read"
        intro="Most people who reach retirement have done their part — they saved, they worked, they planned. The question that keeps them up at night isn't whether they'll have enough to start; it's whether what they have will last."
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
