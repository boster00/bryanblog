import Link from "next/link";
import ArticleShell from "@/components/ArticleShell";
import Cta from "@/components/Cta";
import { getSatellite, PILLAR, relatedFor } from "@/lib/articles";

const meta = getSatellite("income-review-checklist")!;

export const metadata = {
  title: meta.title,
  description: meta.teaser,
};

const sections = [
  { id: "documents-to-bring", heading: "Documents to bring" },
  { id: "numbers-to-know", heading: "Numbers to know" },
  { id: "questions-to-ask", heading: "Questions to ask" },
  { id: "what-good-looks-like", heading: "What a good review looks like" },
  { id: "after-the-meeting", heading: "What to do after the meeting" },
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
          "compare-annuity-options",
          "retirement-paycheck",
        ])}
      >
        <p>
          {/* TODO: prose */}
          Part of the <Link href={PILLAR.href}>{PILLAR.title}</Link> guide.
        </p>

        <section id="documents-to-bring">
          <h2>Documents to bring</h2>
          {/* TODO: prose */}
        </section>
        <section id="numbers-to-know">
          <h2>Numbers to know</h2>
          {/* TODO: prose */}
        </section>
        <section id="questions-to-ask">
          <h2>Questions to ask</h2>
          {/* TODO: prose */}
        </section>
        <section id="what-good-looks-like">
          <h2>What a good review looks like</h2>
          {/* TODO: prose */}
        </section>
        <section id="after-the-meeting">
          <h2>What to do after the meeting</h2>
          {/* TODO: prose */}
        </section>

        <Cta
          heading="Ready for a Retirement Income Review?"
          body="Bring this checklist. We'll walk through it together — no obligation, no jargon."
          href="/contact"
          label="Book a review"
        />
      </ArticleShell>
    </main>
  );
}
