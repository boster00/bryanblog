import Link from "next/link";
import Hero from "@/components/Hero";
import { PILLAR, SATELLITES } from "@/lib/articles";

export const metadata = {
  title: "Plan Retirement Income With Confidence",
  description:
    "Clear, plain-English answers about retirement income, annuities, and the safety-vs-growth trade-off.",
};

export default function HomePage() {
  return (
    <main>
      <Hero
        eyebrow="Retirement Income, Explained"
        title="Plan Retirement Income With Confidence"
        subtitle="A small library of plain-English guides for the questions that keep retirees up at night — will my money last, how much should be safe, and where do annuities actually fit?"
        cta={{ href: PILLAR.href, label: "Start with the pillar guide" }}
      />

      {/* Pillar callout */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-[1fr_auto] gap-8 items-end mb-10">
          <div>
            <p
              className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-3"
              style={{ color: "var(--color-accent)" }}
            >
              The Pillar Guide
            </p>
            <h2
              className="text-3xl md:text-4xl font-semibold tracking-tight"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--color-primary)",
              }}
            >
              {PILLAR.title}
            </h2>
            <p className="mt-3 text-stone-700 max-w-2xl leading-relaxed">
              {PILLAR.teaser}
            </p>
          </div>
          <Link
            href={PILLAR.href}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-semibold tracking-wide whitespace-nowrap transition-transform hover:-translate-y-0.5"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            Read the pillar <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Article grid */}
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SATELLITES.map((a) => (
            <li key={a.slug}>
              <Link href={a.href} className="block warm-card group h-full">
                <h3
                  className="text-lg font-semibold tracking-tight group-hover:opacity-80 transition-opacity"
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: "var(--color-primary)",
                  }}
                >
                  {a.title}
                </h3>
                <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                  {a.teaser}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
