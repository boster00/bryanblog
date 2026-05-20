import Link from "next/link";
import ArticleShell from "@/components/ArticleShell";
import { getSatellite, PILLAR, relatedFor } from "@/lib/articles";

const meta = getSatellite("cds-bonds-annuities")!;

export const metadata = {
  title: meta.title,
  description: meta.teaser,
};

const sections = [
  { id: "what-each-is", heading: "What each one actually is" },
  { id: "yield-comparison", heading: "Yield comparison" },
  { id: "liquidity-and-access", heading: "Liquidity and access" },
  { id: "taxes-and-guarantees", heading: "Taxes and guarantees" },
  { id: "inflation-risk", heading: "Inflation risk" },
  { id: "which-job", heading: "Which job each one is best for" },
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
          "annuity-downsides",
          "guaranteed-income-allocation",
        ])}
      >
        <p>
          {/* TODO: prose */}
          Part of the <Link href={PILLAR.href}>{PILLAR.title}</Link> guide.
        </p>

        <section id="what-each-is">
          <h2>What each one actually is</h2>
          {/* TODO: prose */}
        </section>
        <section id="yield-comparison">
          <h2>Yield comparison</h2>
          {/* TODO: prose */}
        </section>
        <section id="liquidity-and-access">
          <h2>Liquidity and access</h2>
          {/* TODO: prose */}
        </section>
        <section id="taxes-and-guarantees">
          <h2>Taxes and guarantees</h2>
          {/* TODO: prose */}
        </section>
        <section id="inflation-risk">
          <h2>Inflation risk</h2>
          {/* TODO: prose */}
        </section>
        <section id="which-job">
          <h2>Which job each one is best for</h2>
          {/* TODO: prose */}
        </section>
      </ArticleShell>
    </main>
  );
}
