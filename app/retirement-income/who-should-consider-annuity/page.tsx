import Link from "next/link";
import ArticleShell from "@/components/ArticleShell";
import { getSatellite, PILLAR, relatedFor } from "@/lib/articles";

const meta = getSatellite("who-should-consider-annuity")!;

export const metadata = {
  title: meta.title,
  description: meta.teaser,
};

const sections = [
  { id: "the-fit-question", heading: "The fit question" },
  { id: "good-fit-signals", heading: "Signals it's a good fit" },
  { id: "poor-fit-signals", heading: "Signals it's probably not" },
  { id: "income-gap", heading: "The income-gap test" },
  { id: "risk-tolerance", heading: "Risk tolerance and time horizon" },
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
          "guaranteed-income-allocation",
          "annuity-downsides",
        ])}
      >
        <p>
          {/* TODO: prose */}
          Part of the <Link href={PILLAR.href}>{PILLAR.title}</Link> guide.
        </p>

        <section id="the-fit-question">
          <h2>The fit question</h2>
          {/* TODO: prose */}
        </section>
        <section id="good-fit-signals">
          <h2>Signals it&apos;s a good fit</h2>
          {/* TODO: prose */}
        </section>
        <section id="poor-fit-signals">
          <h2>Signals it&apos;s probably not</h2>
          {/* TODO: prose */}
        </section>
        <section id="income-gap">
          <h2>The income-gap test</h2>
          {/* TODO: prose */}
        </section>
        <section id="risk-tolerance">
          <h2>Risk tolerance and time horizon</h2>
          {/* TODO: prose */}
        </section>
      </ArticleShell>
    </main>
  );
}
