import Link from "next/link";
import ArticleShell from "@/components/ArticleShell";
import { getSatellite, PILLAR, relatedFor } from "@/lib/articles";

const meta = getSatellite("annuity-fees-explained")!;

export const metadata = {
  title: meta.title,
  description: meta.teaser,
};

const sections = [
  { id: "the-fee-categories", heading: "The fee categories that matter" },
  { id: "surrender-charges", heading: "How surrender charges actually work" },
  { id: "rider-costs", heading: "Income and benefit rider costs" },
  { id: "what-guarantees-mean", heading: "What 'guaranteed' actually means" },
  { id: "marketing-vs-contract", heading: "Marketing language vs the contract" },
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
          "annuity-downsides",
          "compare-annuity-options",
        ])}
      >
        <p>
          {/* TODO: prose */}
          Part of the <Link href={PILLAR.href}>{PILLAR.title}</Link> guide.
        </p>

        <section id="the-fee-categories">
          <h2>The fee categories that matter</h2>
          {/* TODO: prose */}
        </section>
        <section id="surrender-charges">
          <h2>How surrender charges actually work</h2>
          {/* TODO: prose */}
        </section>
        <section id="rider-costs">
          <h2>Income and benefit rider costs</h2>
          {/* TODO: prose */}
        </section>
        <section id="what-guarantees-mean">
          <h2>What &quot;guaranteed&quot; actually means</h2>
          {/* TODO: prose */}
        </section>
        <section id="marketing-vs-contract">
          <h2>Marketing language vs the contract</h2>
          {/* TODO: prose */}
        </section>
      </ArticleShell>
    </main>
  );
}
