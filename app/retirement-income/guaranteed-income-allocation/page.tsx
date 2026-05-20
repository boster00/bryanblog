import Link from "next/link";
import ArticleShell from "@/components/ArticleShell";
import { getSatellite, PILLAR, relatedFor } from "@/lib/articles";

const meta = getSatellite("guaranteed-income-allocation")!;

export const metadata = {
  title: meta.title,
  description: meta.teaser,
};

const sections = [
  { id: "what-counts", heading: "What counts as guaranteed income" },
  { id: "the-floor-approach", heading: "The income-floor approach" },
  { id: "sizing-the-sleeve", heading: "Sizing the guaranteed sleeve" },
  { id: "common-allocations", heading: "Common allocation ranges" },
  { id: "what-to-avoid", heading: "What to avoid: over-locking" },
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
          "who-should-consider-annuity",
          "retirement-paycheck",
        ])}
      >
        <p>
          Once you have decided that some part of your plan should be predictable, the next question is how much. Too little and the floor under essentials is wobbly. Too much and the rest of the plan loses the flexibility that retirement actually needs. The right number is rarely a precise figure — it is a range, sized to your spending and your other income.
        </p>

        <section id="what-counts">
          <h2>What counts as guaranteed income</h2>
          <p>
            Guaranteed income, in the practical sense, is any source that arrives every month no matter what the markets do. For most retirees the main pieces are Social Security and a pension if they have one. Both pay a known amount, on a known day, for as long as you live. Social Security also adjusts each year for inflation, which gives it an extra advantage.
          </p>
          <p>
            Annuity income, when chosen, is the third common piece. Income from a fixed annuity or an annuity with a lifetime income rider can be added to the floor — subject to the insurance company&apos;s claims-paying ability. Interest and dividends, while reasonably predictable, are not in the same category, because the underlying value can move and the payments can vary.
          </p>
        </section>

        <section id="the-floor-approach">
          <h2>The income-floor approach</h2>
          <p>
            The simplest way to think about guaranteed income is the floor approach. The idea is to use guaranteed sources to cover essential expenses — the bills that must be paid every month — and to use flexible investments to cover everything else.
          </p>
          <p>
            With essentials covered by guarantees, market swings stop threatening the basics. The investment portfolio still does its job for travel, hobbies, gifts, and surprises, but the worry that a bad year leaves the lights off goes away. Many retirees describe a noticeable drop in financial anxiety once their floor is in place, even when the dollar amounts have not changed.
          </p>
        </section>

        <section id="sizing-the-sleeve">
          <h2>Sizing the guaranteed sleeve</h2>
          <p>
            The size of the guaranteed sleeve depends on three things: your essential monthly spending, the amount of guaranteed income you already have, and how much certainty you want above the bare minimum.
          </p>
          <p>
            A reasonable exercise is to do the math in this order:
          </p>
          <ul>
            <li>Write your monthly spending on essentials</li>
            <li>Subtract the guaranteed income you already have (Social Security, any pension)</li>
            <li>The remainder is your essentials gap</li>
            <li>Decide how much of that gap, if any, you want covered by a new source of guaranteed income</li>
          </ul>
          <p>
            Some retirees aim to cover the entire essentials gap with guarantees, so that no market drop can touch the floor. Others cover roughly half, leaving room for flexibility. Either choice can be reasonable depending on the rest of your situation.
          </p>
        </section>

        <section id="common-allocations">
          <h2>Common allocation ranges</h2>
          <p>
            There is no single right percentage of savings that should be in guaranteed income, but a few patterns show up often. Retirees with a generous pension may need little or no annuity income, because their floor is already in place. Retirees without a pension often consider allocating somewhere between twenty and forty percent of their savings to a guaranteed-income source, depending on the size of their gap.
          </p>
          <p>
            Above roughly half of total savings, the trade-off usually starts going the wrong way. The flexibility of the rest of the portfolio matters, and over-locking the plan can create its own kind of stress when life throws a surprise. The figure that fits your plan should come from your numbers, not from a rule of thumb — but rules of thumb are useful sanity checks.
          </p>
        </section>

        <section id="what-to-avoid">
          <h2>What to avoid: over-locking</h2>
          <p>
            The most common mistake on this question is allocating too much, too fast, to guaranteed income. A retiree who feels nervous about the market may move sixty or seventy percent of their savings into annuity contracts, only to find five years later that the lack of flexibility is its own problem.
          </p>
          <p>
            A more cautious path is to size the guaranteed sleeve based on the essentials gap, leave a meaningful cash reserve, and keep enough in flexible investments to handle the years ahead. If the math later suggests adding more, that decision can be made then. Decisions made under pressure tend to over-correct; decisions made on paper, with a few weeks of thought, almost never do. We talk through how guaranteed income fits into the broader paycheck in{" "}
            <Link href="/retirement-income/retirement-paycheck/">
              how to build a retirement paycheck
            </Link>
            . Part of the{" "}
            <Link href={PILLAR.href}>{PILLAR.title}</Link> guide.
          </p>
        </section>
      </ArticleShell>
    </main>
  );
}
