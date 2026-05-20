import Link from "next/link";
import { promises as fs } from "fs";
import path from "path";
import Hero from "@/components/Hero";
import { PILLAR, SATELLITES, UTILITY_ARTICLES } from "@/lib/articles";

export const metadata = {
  title: "Plan Retirement Income With Confidence",
  description:
    "Clear, plain-English answers about retirement income, annuities, and the safety-vs-growth trade-off.",
};

const TRUST_POINTS: { icon: string; title: string }[] = [
  { icon: "speech", title: "Plain-spoken explanations" },
  { icon: "shield", title: "No product pushes" },
  { icon: "scale", title: "Compliance-conservative" },
];

function TrustIcon({ kind }: { kind: string }) {
  const common = "w-5 h-5";
  if (kind === "speech") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={common}
        aria-hidden
      >
        <path d="M21 12a8 8 0 1 1-3.2-6.4L21 4l-1 4.1A7.96 7.96 0 0 1 21 12Z" />
        <path d="M8.5 11.5h7M8.5 14h4.5" />
      </svg>
    );
  }
  if (kind === "shield") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={common}
        aria-hidden
      >
        <path d="M12 3 4.5 6v6c0 4.5 3.2 7.8 7.5 9 4.3-1.2 7.5-4.5 7.5-9V6L12 3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }
  // scale
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={common}
      aria-hidden
    >
      <path d="M12 3v18M5 6h14" />
      <path d="M5 6 2 13h6L5 6Z" />
      <path d="m19 6-3 7h6l-3-7Z" />
      <path d="M8 21h8" />
    </svg>
  );
}

export default async function HomePage() {
  const whyHtml = await fs.readFile(
    path.join(process.cwd(), UTILITY_ARTICLES["home-why"].contentPath),
    "utf8"
  );
  return (
    <main>
      <Hero
        eyebrow="Retirement Income, Explained"
        title="Plan Retirement Income With Confidence"
        subtitle="A small library of plain-English guides for the questions that keep retirees up at night — will my money last, how much should be safe, and where do annuities actually fit?"
        cta={{ href: PILLAR.href, label: "Start with the pillar guide" }}
        photoSrc="/images/hero/kitchen-table-coffee.jpg"
        photoAlt="Hands holding a coffee mug on a warm wooden kitchen table, beside handwritten notes and reading glasses, soft window light."
      />

      {/* Why this blog exists — CJGEO-hydrated editorial intro block. */}
      <section className="max-w-3xl mx-auto px-6 pb-10 md:pb-14">
        <div
          className="prose-article"
          dangerouslySetInnerHTML={{ __html: whyHtml }}
        />
      </section>

      {/* Featured pillar card — terracotta-bordered editorial callout */}
      <section className="max-w-6xl mx-auto px-6 pb-12 md:pb-16">
        <div
          className="rounded-2xl bg-white p-7 md:p-9 border grid md:grid-cols-[auto_minmax(0,1fr)_auto] gap-6 md:gap-8 items-center shadow-[0_10px_30px_-18px_rgba(28,66,89,0.18)]"
          style={{ borderColor: "rgba(140, 58, 46, 0.22)" }}
        >
          {/* Round accent badge */}
          <div
            className="hidden md:flex items-center justify-center w-14 h-14 rounded-full shrink-0"
            style={{
              backgroundColor: "var(--color-accent-tint)",
              color: "var(--color-accent)",
            }}
            aria-hidden
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path d="M4 19V6a2 2 0 0 1 2-2h11l3 3v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
              <path d="M8 8h8M8 12h8M8 16h5" />
            </svg>
          </div>

          <div>
            <p className="eyebrow mb-2">The Pillar Guide</p>
            <h2
              className="text-2xl md:text-[1.75rem] font-semibold tracking-tight leading-tight"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--color-primary)",
              }}
            >
              {PILLAR.title}
            </h2>
            <p className="mt-2 text-stone-600 text-sm md:text-[15px] leading-relaxed">
              {PILLAR.teaser}
            </p>
          </div>

          <Link
            href={PILLAR.href}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-white text-[13px] font-semibold tracking-wide whitespace-nowrap transition-transform hover:-translate-y-0.5 shadow-sm justify-self-start md:justify-self-end"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            Read the pillar <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* Trust-point row */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
          {TRUST_POINTS.map((t) => (
            <li
              key={t.title}
              className="rounded-xl bg-white px-5 py-4 border border-[var(--color-neutral-mid)]/25 flex items-center gap-3"
            >
              <span
                className="inline-flex items-center justify-center w-9 h-9 rounded-full shrink-0"
                style={{
                  backgroundColor: "var(--color-accent-tint)",
                  color: "var(--color-accent)",
                }}
              >
                <TrustIcon kind={t.icon} />
              </span>
              <span
                className="text-[15px] font-semibold"
                style={{ color: "var(--color-primary)" }}
              >
                {t.title}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Article library */}
      <section className="max-w-6xl mx-auto px-6 pb-24 md:pb-32">
        <div className="mb-8 md:mb-10">
          <p className="eyebrow mb-2">The Library</p>
          <h2
            className="text-2xl md:text-3xl font-semibold tracking-tight"
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--color-primary)",
            }}
          >
            Deeper guides on the questions retirees actually ask
          </h2>
        </div>
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SATELLITES.map((a) => (
            <li key={a.slug}>
              <Link href={a.href} className="block warm-card group h-full">
                <h3
                  className="text-lg font-semibold tracking-tight leading-snug group-hover:opacity-80 transition-opacity"
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
    </main>
  );
}
