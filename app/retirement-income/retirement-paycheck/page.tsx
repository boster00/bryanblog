import Link from "next/link";
import ArticleShell from "@/components/ArticleShell";
import { getSatellite, PILLAR, relatedFor } from "@/lib/articles";

const meta = getSatellite("retirement-paycheck")!;

export const metadata = {
  title: meta.title,
  description: meta.teaser,
};

const sections = [
  { id: "the-three-buckets", heading: "The three income buckets" },
  { id: "social-security-first", heading: "Start with Social Security" },
  { id: "savings-and-investments", heading: "Savings and investments" },
  { id: "optional-guaranteed", heading: "Optional: a guaranteed-income layer" },
  { id: "stacking-the-paycheck", heading: "Stacking it into one paycheck" },
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
          "monthly-income-needs",
          "guaranteed-income-allocation",
          "move-money-before-retirement",
        ])}
      >
        <p>
          {/* TODO: prose */}
          Part of the{" "}
          <Link href={PILLAR.href}>{PILLAR.title}</Link> guide.
        </p>

        <section id="the-three-buckets">
          <h2>The three income buckets</h2>
          {/* TODO: prose */}
        </section>
        <section id="social-security-first">
          <h2>Start with Social Security</h2>
          {/* TODO: prose */}
        </section>
        <section id="savings-and-investments">
          <h2>Savings and investments</h2>
          {/* TODO: prose */}
        </section>
        <section id="optional-guaranteed">
          <h2>Optional: a guaranteed-income layer</h2>
          {/* TODO: prose */}
        </section>
        <section id="stacking-the-paycheck">
          <h2>Stacking it into one paycheck</h2>
          {/* TODO: prose */}
        </section>
      </ArticleShell>
    </main>
  );
}
