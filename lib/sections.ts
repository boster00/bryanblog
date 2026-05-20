import { ArticleSection } from "@/components/ArticleShell";

// CJGEO-generated HTML preserves entities like &amp; and &rsquo; inside
// <h2 id="...">heading</h2>. The body renders fine (browser parses entities),
// but TOC labels render literally because they go through React text props.
// Decode the small set of entities CJGEO actually emits.
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

// Derive TOC sections from the <h2 id="..."> headings present in the
// generated HTML. Strip any inline tags inside the heading and decode
// CJGEO's HTML entities so the sidebar TOC reads naturally.
export function extractSections(html: string): ArticleSection[] {
  const sections: ArticleSection[] = [];
  const re = /<h2\s+id="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const heading = decodeEntities(m[2].replace(/<[^>]*>/g, "")).trim();
    sections.push({ id: m[1], heading });
  }
  return sections;
}
