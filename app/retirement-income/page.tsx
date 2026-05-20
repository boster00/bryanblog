import Link from "next/link";
import ArticleShell from "@/components/ArticleShell";
import Cta from "@/components/Cta";
import { PILLAR, relatedFor } from "@/lib/articles";

export const metadata = {
  title: PILLAR.title,
  description: PILLAR.teaser,
};

const sections = [
  { id: "last-as-long-as-i-do", heading: "Will my money last as long as I do?" },
  { id: "steady-income-plan", heading: "What's a simple plan for steady income?" },
  { id: "safe-versus-invested", heading: "How much should be safe vs invested?" },
  { id: "what-i-give-up", heading: "What do I give up for more certainty?" },
  { id: "annuity-fit", heading: "Does an annuity actually fit me?" },
  { id: "compare-options", heading: "How do I compare options?" },
  { id: "what-to-do-next", heading: "What should I do next?" },
];

export default function RetirementIncomePillar() {
  return (
    <main>
      <ArticleShell
        eyebrow="Pillar Guide"
        title={PILLAR.title}
        intro="The big-picture map. Each section answers a real question retirees ask, then points you to a deeper article when you're ready to dig in."
        sections={sections}
        relatedArticles={relatedFor([
          "monthly-income-needs",
          "retirement-paycheck",
          "income-review-checklist",
        ])}
      >
        <section id="last-as-long-as-i-do">
          <h2>Will my money last as long as I do?</h2>
          {/* TODO: prose */}
          <p>
            Read the deep-dive:{" "}
            <Link href="/retirement-income/monthly-income-needs/">
              How much monthly income do I actually need?
            </Link>
          </p>
        </section>

        <section id="steady-income-plan">
          <h2>What&apos;s a simple plan for steady income in retirement?</h2>
          {/* TODO: prose */}
          <p>
            See the satellite:{" "}
            <Link href="/retirement-income/retirement-paycheck/">
              How to build a retirement paycheck from Social Security, savings, and investments
            </Link>
            .
          </p>
        </section>

        <section id="safe-versus-invested">
          <h2>How much should I keep safe versus invested?</h2>
          {/* TODO: prose */}
          <p>
            Related reading:{" "}
            <Link href="/retirement-income/move-money-before-retirement/">
              Should I move money out of the market before retirement?
            </Link>{" "}
            and{" "}
            <Link href="/retirement-income/cds-bonds-annuities/">
              CDs vs bonds vs annuities
            </Link>
            .
          </p>
        </section>

        <section id="what-i-give-up">
          <h2>What do I give up to get more certainty?</h2>
          {/* TODO: prose */}
          <p>
            Dig deeper:{" "}
            <Link href="/retirement-income/annuity-downsides/">
              What are the downsides of annuities?
            </Link>{" "}
            and{" "}
            <Link href="/retirement-income/annuity-fees-explained/">
              Annuity fees, surrender charges, and guarantees explained
            </Link>
            .
          </p>
        </section>

        <section id="annuity-fit">
          <h2>How do I know whether an annuity actually fits my situation?</h2>
          {/* TODO: prose */}
          <p>
            See:{" "}
            <Link href="/retirement-income/who-should-consider-annuity/">
              Who should consider an annuity — and who should probably avoid one?
            </Link>{" "}
            then{" "}
            <Link href="/retirement-income/guaranteed-income-allocation/">
              How much of my savings should be in guaranteed income?
            </Link>
          </p>
        </section>

        <section id="compare-options">
          <h2>How do I compare options without getting lost in the fine print?</h2>
          {/* TODO: prose */}
          <p>
            Walk through:{" "}
            <Link href="/retirement-income/compare-annuity-options/">
              How to compare annuity options before you buy
            </Link>{" "}
            and{" "}
            <Link href="/retirement-income/annuity-types-compared/">
              Fixed vs fixed indexed vs income annuity
            </Link>
            .
          </p>
        </section>

        <section id="what-to-do-next">
          <h2>What should I do before making a decision?</h2>
          {/* TODO: prose */}
          <p>
            Bring this checklist to your next conversation:{" "}
            <Link href="/retirement-income/income-review-checklist/">
              What to bring to a retirement income review
            </Link>
            .
          </p>
          <Cta
            heading="Request a Retirement Income Review"
            body="Bring your numbers, your worries, and your questions. We'll walk through them together — no obligation, no jargon."
            href="/contact"
            label="Book a review"
          />
        </section>
      </ArticleShell>
    </main>
  );
}
