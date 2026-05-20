import Link from "next/link";
import RelatedArticles, { RelatedArticle } from "./RelatedArticles";

export type ArticleSection = {
  id: string;
  heading: string;
};

type ArticleShellProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  /** Optional small byline line, e.g. "Updated May 2026 · 14 min read" */
  byline?: string;
  sections: ArticleSection[];
  relatedArticles?: RelatedArticle[];
  children: React.ReactNode;
};

export default function ArticleShell({
  eyebrow,
  title,
  intro,
  byline,
  sections,
  relatedArticles,
  children,
}: ArticleShellProps) {
  return (
    <article className="relative">
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-16 md:pt-14 md:pb-24 grid grid-cols-1 lg:grid-cols-[14rem_minmax(0,1fr)] gap-10 lg:gap-14">
        {/* Sticky LEFT-rail TOC (desktop) */}
        {sections.length > 0 && (
          <aside className="hidden lg:block">
            <nav className="pillar-toc" aria-label="Article sections">
              <p className="pillar-toc__title">On this page</p>
              <ul className="list-none p-0 m-0">
                {sections.map((s) => (
                  <li key={s.id}>
                    <Link href={`#${s.id}`} className="pillar-toc__link">
                      {s.heading}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}

        {/* Article body */}
        <div>
          <header className="mb-10 md:mb-12">
            {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
            <h1
              className="text-3xl md:text-[2.75rem] lg:text-[3.25rem] font-semibold tracking-tight leading-[1.08]"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--color-primary)",
              }}
            >
              {title}
            </h1>
            {byline && (
              <p className="mt-4 text-xs md:text-sm text-stone-500 tracking-wide">
                {byline}
              </p>
            )}
            {intro && (
              <p className="mt-6 text-lg text-stone-700 max-w-[58ch] leading-relaxed">
                {intro}
              </p>
            )}
          </header>

          <div className="prose-article max-w-[70ch]">
            {children}
            {relatedArticles && relatedArticles.length > 0 && (
              <RelatedArticles items={relatedArticles} />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
