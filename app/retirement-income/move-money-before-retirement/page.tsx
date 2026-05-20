import Link from "next/link";
import ArticleShell from "@/components/ArticleShell";
import { getSatellite, PILLAR, relatedFor } from "@/lib/articles";

const meta = getSatellite("move-money-before-retirement")!;

export const metadata = {
  title: meta.title,
  description: meta.teaser,
};

const sections = [
  { id: "the-real-question", heading: "The real question behind the worry" },
  { id: "sequence-of-returns", heading: "Sequence-of-returns risk" },
  { id: "bucket-strategy", heading: "The bucket strategy" },
  { id: "how-much-to-derisk", heading: "How much to de-risk" },
  { id: "common-mistakes", heading: "Common mistakes" },
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
          "cds-bonds-annuities",
          "guaranteed-income-allocation",
        ])}
      >
        <p>
          {/* TODO: prose */}
          Part of the <Link href={PILLAR.href}>{PILLAR.title}</Link> guide.
        </p>

        <section id="the-real-question">
          <h2>The real question behind the worry</h2>
          {/* TODO: prose */}
        </section>
        <section id="sequence-of-returns">
          <h2>Sequence-of-returns risk</h2>
          {/* TODO: prose */}
        </section>
        <section id="bucket-strategy">
          <h2>The bucket strategy</h2>
          {/* TODO: prose */}
        </section>
        <section id="how-much-to-derisk">
          <h2>How much to de-risk</h2>
          {/* TODO: prose */}
        </section>
        <section id="common-mistakes">
          <h2>Common mistakes</h2>
          {/* TODO: prose */}
        </section>
      </ArticleShell>
    </main>
  );
}
