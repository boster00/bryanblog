import Link from "next/link";
import ArticleShell from "@/components/ArticleShell";
import { getSatellite, PILLAR, relatedFor } from "@/lib/articles";

const meta = getSatellite("annuity-downsides")!;

export const metadata = {
  title: meta.title,
  description: meta.teaser,
};

const sections = [
  { id: "complexity", heading: "Complexity and product design" },
  { id: "fees-and-costs", heading: "Fees and ongoing costs" },
  { id: "liquidity-and-surrender", heading: "Liquidity and surrender charges" },
  { id: "lost-upside", heading: "Lost market upside" },
  { id: "insurer-risk", heading: "Insurer credit risk" },
  { id: "tax-treatment", heading: "Tax treatment quirks" },
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
          "annuity-fees-explained",
          "who-should-consider-annuity",
        ])}
      >
        <p>
          {/* TODO: prose */}
          Part of the <Link href={PILLAR.href}>{PILLAR.title}</Link> guide.
        </p>

        <section id="complexity">
          <h2>Complexity and product design</h2>
          {/* TODO: prose */}
        </section>
        <section id="fees-and-costs">
          <h2>Fees and ongoing costs</h2>
          {/* TODO: prose */}
        </section>
        <section id="liquidity-and-surrender">
          <h2>Liquidity and surrender charges</h2>
          {/* TODO: prose */}
        </section>
        <section id="lost-upside">
          <h2>Lost market upside</h2>
          {/* TODO: prose */}
        </section>
        <section id="insurer-risk">
          <h2>Insurer credit risk</h2>
          {/* TODO: prose */}
        </section>
        <section id="tax-treatment">
          <h2>Tax treatment quirks</h2>
          {/* TODO: prose */}
        </section>
      </ArticleShell>
    </main>
  );
}
