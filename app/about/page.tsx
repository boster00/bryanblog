// /about — CJGEO-hydrated editorial page.
// Source of truth: content/about/index.html
// Hydration metadata: UTILITY_ARTICLES.about in lib/articles.ts.

import { promises as fs } from "fs";
import path from "path";
import ArticleShell from "@/components/ArticleShell";
import { UTILITY_ARTICLES } from "@/lib/articles";
import { extractSections } from "@/lib/sections";

const meta = UTILITY_ARTICLES.about;

export const metadata = {
  title: meta.title,
  description:
    "A small library of plain-English guides on retirement income planning — what Bryan Blog is, who it's for, and how to get started.",
};

export default async function AboutPage() {
  const htmlPath = path.join(process.cwd(), meta.contentPath);
  const html = await fs.readFile(htmlPath, "utf8");
  const sections = extractSections(html);

  return (
    <main>
      <ArticleShell
        eyebrow="About"
        title={meta.title}
        sections={sections}
      >
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </ArticleShell>
    </main>
  );
}
