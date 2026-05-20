import Link from "next/link";
import ArticleShell from "@/components/ArticleShell";
import { getSatellite, PILLAR, relatedFor } from "@/lib/articles";

const meta = getSatellite("annuity-types-compared")!;

export const metadata = {
  title: meta.title,
  description: meta.teaser,
};

const sections = [
  { id: "fixed-annuity", heading: "Fixed annuity" },
  { id: "fixed-indexed-annuity", heading: "Fixed indexed annuity" },
  { id: "income-annuity", heading: "Income annuity (SPIA / DIA)" },
  { id: "side-by-side", heading: "Side-by-side comparison" },
  { id: "picking-the-job", heading: "Picking the right one for the right job" },
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
          "compare-annuity-options",
          "cds-bonds-annuities",
          "guaranteed-income-allocation",
        ])}
      >
        <p>
          {/* TODO: prose */}
          Part of the <Link href={PILLAR.href}>{PILLAR.title}</Link> guide.
        </p>

        <section id="fixed-annuity">
          <h2>Fixed annuity</h2>
          {/* TODO: prose */}
        </section>
        <section id="fixed-indexed-annuity">
          <h2>Fixed indexed annuity</h2>
          {/* TODO: prose */}
        </section>
        <section id="income-annuity">
          <h2>Income annuity (SPIA / DIA)</h2>
          {/* TODO: prose */}
        </section>
        <section id="side-by-side">
          <h2>Side-by-side comparison</h2>
          {/* TODO: prose */}
        </section>
        <section id="picking-the-job">
          <h2>Picking the right one for the right job</h2>
          {/* TODO: prose */}
        </section>
      </ArticleShell>
    </main>
  );
}
