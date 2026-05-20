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
  sections: ArticleSection[];
  relatedArticles?: RelatedArticle[];
  children: React.ReactNode;
};

export default function ArticleShell({
  eyebrow,
  title,
  intro,
  sections,
  relatedArticles,
  children,
}: ArticleShellProps) {
  return (
    <article className="relative">
      {/* Header band */}
      <header className="mesh-accent border-b border-[var(--color-neutral-mid)]/30">
        <div className="max-w-5xl mx-auto px-6 pt-14 pb-12 md:pt-20 md:pb-16">
          {eyebrow && (
            <p
              className="mb-4 text-[11px] font-semibold tracking-[0.22em] uppercase"
              style={{ color: "var(--color-accent)" }}
            >
              {eyebrow}
            </p>
          )}
          <h1
            className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.08] max-w-4xl"
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--color-primary)",
            }}
          >
            {title}
          </h1>
          {intro && (
            <p className="mt-5 text-lg text-stone-700 max-w-2xl leading-relaxed">
              {intro}
            </p>
          )}
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-[14rem_minmax(0,1fr)] gap-12">
        {/* Sticky TOC (desktop) */}
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

        {/* Body */}
        <div className="prose-article max-w-3xl">
          {children}
          {relatedArticles && relatedArticles.length > 0 && (
            <RelatedArticles items={relatedArticles} />
          )}
        </div>
      </div>
    </article>
  );
}
