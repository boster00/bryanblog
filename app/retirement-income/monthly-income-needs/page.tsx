import Link from "next/link";
import ArticleShell from "@/components/ArticleShell";
import { getSatellite, PILLAR, relatedFor } from "@/lib/articles";

const meta = getSatellite("monthly-income-needs")!;

export const metadata = {
  title: meta.title,
  description: meta.teaser,
};

const sections = [
  { id: "why-it-matters", heading: "Why this number matters" },
  { id: "current-spending", heading: "Start with current spending" },
  { id: "retirement-adjustments", heading: "Adjustments for retirement" },
  { id: "inflation", heading: "Inflation and rising costs" },
  { id: "ranges", heading: "Realistic ranges to plan around" },
];

export default function Page() {
  return (
    <main>
      <ArticleShell
        eyebrow="Retirement Income"
        title={meta.title}
        intro={meta.teaser}
        sections={sections}
        relatedArticles={relatedFor(["retirement-paycheck", "income-review-checklist"])}
      >
        <p>
          {/* TODO: prose */}
          This article belongs to the{" "}
          <Link href={PILLAR.href}>{PILLAR.title}</Link> guide.
        </p>

        <section id="why-it-matters">
          <h2>Why this number matters</h2>
          {/* TODO: prose */}
        </section>
        <section id="current-spending">
          <h2>Start with current spending</h2>
          {/* TODO: prose */}
        </section>
        <section id="retirement-adjustments">
          <h2>Adjustments for retirement</h2>
          {/* TODO: prose */}
        </section>
        <section id="inflation">
          <h2>Inflation and rising costs</h2>
          {/* TODO: prose */}
        </section>
        <section id="ranges">
          <h2>Realistic ranges to plan around</h2>
          {/* TODO: prose */}
        </section>
      </ArticleShell>
    </main>
  );
}
