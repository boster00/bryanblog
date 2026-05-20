import Link from "next/link";
import ArticleShell from "@/components/ArticleShell";
import { getSatellite, PILLAR, relatedFor } from "@/lib/articles";

const meta = getSatellite("compare-annuity-options")!;

export const metadata = {
  title: meta.title,
  description: meta.teaser,
};

const sections = [
  { id: "the-seven-numbers", heading: "The seven numbers that matter" },
  { id: "guaranteed-vs-illustrated", heading: "Guaranteed vs illustrated" },
  { id: "surrender-schedule", heading: "Surrender schedule and liquidity" },
  { id: "rider-details", heading: "Rider details" },
  { id: "insurer-strength", heading: "Insurer financial strength" },
  { id: "apples-to-apples", heading: "Building an apples-to-apples chart" },
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
          "annuity-types-compared",
          "annuity-fees-explained",
          "income-review-checklist",
        ])}
      >
        <p>
          {/* TODO: prose */}
          Part of the <Link href={PILLAR.href}>{PILLAR.title}</Link> guide.
        </p>

        <section id="the-seven-numbers">
          <h2>The seven numbers that matter</h2>
          {/* TODO: prose */}
        </section>
        <section id="guaranteed-vs-illustrated">
          <h2>Guaranteed vs illustrated</h2>
          {/* TODO: prose */}
        </section>
        <section id="surrender-schedule">
          <h2>Surrender schedule and liquidity</h2>
          {/* TODO: prose */}
        </section>
        <section id="rider-details">
          <h2>Rider details</h2>
          {/* TODO: prose */}
        </section>
        <section id="insurer-strength">
          <h2>Insurer financial strength</h2>
          {/* TODO: prose */}
        </section>
        <section id="apples-to-apples">
          <h2>Building an apples-to-apples chart</h2>
          {/* TODO: prose */}
        </section>
      </ArticleShell>
    </main>
  );
}
