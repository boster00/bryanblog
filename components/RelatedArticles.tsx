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
    <section className="not-prose mt-20 pt-10 border-t border-[var(--color-neutral-mid)]/35">
      <p className="eyebrow mb-6">{heading}</p>
      <ul className="grid gap-5 md:grid-cols-2">
        {items.map((a) => (
          <li key={a.href}>
            <Link
              href={a.href}
              className="block warm-card group h-full"
            >
              <p className="eyebrow mb-3 !text-[10px]">Related</p>
              <h3
                className="text-lg md:text-[1.2rem] font-semibold tracking-tight leading-snug group-hover:opacity-80 transition-opacity"
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
                className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.18em]"
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
