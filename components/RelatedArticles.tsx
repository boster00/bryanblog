import Link from "next/link";

export type RelatedArticle = {
  href: string;
  title: string;
  teaser?: string;
};

export default function RelatedArticles({
  items,
  heading = "Continue reading",
}: {
  items: RelatedArticle[];
  heading?: string;
}) {
  if (!items?.length) return null;
  return (
    <section className="not-prose mt-20 pt-10 border-t border-[var(--color-neutral-mid)]/40">
      <p
        className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-6"
        style={{ color: "var(--color-accent)" }}
      >
        {heading}
      </p>
      <ul className="grid gap-5 md:grid-cols-2">
        {items.map((a) => (
          <li key={a.href}>
            <Link
              href={a.href}
              className="block warm-card group h-full"
            >
              <h3
                className="text-lg md:text-xl font-semibold tracking-tight group-hover:opacity-80 transition-opacity"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--color-primary)",
                }}
              >
                {a.title}
              </h3>
              {a.teaser && (
                <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                  {a.teaser}
                </p>
              )}
              <span
                className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--color-accent)" }}
              >
                Read article <span aria-hidden>→</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
