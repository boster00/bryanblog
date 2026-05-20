import Link from "next/link";
import ArticleShell from "@/components/ArticleShell";
import { getSatellite, PILLAR, relatedFor } from "@/lib/articles";

const meta = getSatellite("guaranteed-income-allocation")!;

export const metadata = {
  title: meta.title,
  description: meta.teaser,
};

const sections = [
  { id: "what-counts", heading: "What counts as guaranteed income" },
  { id: "the-floor-approach", heading: "The income-floor approach" },
  { id: "sizing-the-sleeve", heading: "Sizing the guaranteed sleeve" },
  { id: "common-allocations", heading: "Common allocation ranges" },
  { id: "what-to-avoid", heading: "What to avoid: over-locking" },
];

export default function Page() {
  return (
    <main>
      <ArticleShell
        eyebrow="Retirement Income"
        title={meta.title}
        intro={meta.teaser}
        sections={sections}
        relatedArticles={relatedFor([
          "who-should-consider-annuity",
          "retirement-paycheck",
        ])}
      >
        <p>
          {/* TODO: prose */}
          Part of the <Link href={PILLAR.href}>{PILLAR.title}</Link> guide.
        </p>

        <section id="what-counts">
          <h2>What counts as guaranteed income</h2>
          {/* TODO: prose */}
        </section>
        <section id="the-floor-approach">
          <h2>The income-floor approach</h2>
          {/* TODO: prose */}
        </section>
        <section id="sizing-the-sleeve">
          <h2>Sizing the guaranteed sleeve</h2>
          {/* TODO: prose */}
        </section>
        <section id="common-allocations">
          <h2>Common allocation ranges</h2>
          {/* TODO: prose */}
        </section>
        <section id="what-to-avoid">
          <h2>What to avoid: over-locking</h2>
          {/* TODO: prose */}
        </section>
      </ArticleShell>
    </main>
  );
}
