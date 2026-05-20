import Link from "next/link";
import ArticleShell from "@/components/ArticleShell";
import { getSatellite, PILLAR, relatedFor } from "@/lib/articles";

const meta = getSatellite("monthly-income-needs")!;

export const metadata = {
  title: meta.title,
  description: meta.teaser,
};

const sections = [
  { id: "why-it-matters", heading: "Why this number matters" },
  { id: "current-spending", heading: "Start with current spending" },
  { id: "retirement-adjustments", heading: "Adjustments for retirement" },
  { id: "inflation", heading: "Inflation and rising costs" },
  { id: "ranges", heading: "Realistic ranges to plan around" },
];

export default function Page() {
  return (
    <main>
      <ArticleShell
        eyebrow="Retirement Income"
        title={meta.title}
        intro={meta.teaser}
        sections={sections}
        relatedArticles={relatedFor(["retirement-paycheck", "income-review-checklist"])}
      >
        <p>
          Of all the questions to settle before retiring, the monthly number is the one that anchors everything else. Without it, every other choice — when to take Social Security, how aggressively to invest, whether to consider an annuity — is essentially a guess. The good news is that you do not need a complicated spreadsheet to get there. A reasonable monthly target comes from a careful look at how you actually live today, with a few adjustments for the life you want next.
        </p>

        <section id="why-it-matters">
          <h2>Why this number matters</h2>
          <p>
            Most retirees do not run out of money because of one bad investment. They run out because spending and income drift apart over the years, and the gap is not noticed until it has grown. Knowing your monthly need turns retirement from a vague worry into a measurable target.
          </p>
          <p>
            The number you settle on does several jobs at once. It sets a draw rate against your savings. It tells you whether Social Security and any pension you have will cover essentials. It frames the size of any safety bucket you build. It even helps you decide how much risk feels reasonable to keep in the market, because risk that you do not need to take is risk you can usually skip.
          </p>
        </section>

        <section id="current-spending">
          <h2>Start with current spending</h2>
          <p>
            The most accurate starting point is what you are already spending today. Pull the last twelve months of statements from your checking account and your main credit card. Sort the outflows into two broad piles: fixed bills that come every month no matter what, and flexible spending that you choose week to week.
          </p>
          <p>
            Fixed bills usually include housing (mortgage or rent, taxes, insurance, utilities), insurance premiums (health, auto, life), transportation, groceries, and any recurring medications. Flexible spending covers travel, dining out, hobbies, gifts, subscriptions, home projects, and the gifts to children or grandchildren that always seem larger than planned. Add the twelve months together and divide by twelve. That average is the most honest baseline you have.
          </p>
        </section>

        <section id="retirement-adjustments">
          <h2>Adjustments for retirement</h2>
          <p>
            Once you have today&apos;s number, walk through the line items and ask which ones will change. Many people see a few categories rise and a few fall in roughly even measure, though not always.
          </p>
          <ul>
            <li>Commuting and work-clothes costs usually drop</li>
            <li>Health insurance often rises until Medicare kicks in, then changes shape</li>
            <li>Travel, hobbies, and dining out frequently rise in the first ten years</li>
            <li>Home repair and replacement costs grow as houses age along with their owners</li>
            <li>Help around the house may become a line item later in retirement</li>
          </ul>
          <p>
            A common rule of thumb says most retirees need somewhere between seventy and eighty-five percent of their pre-retirement income, but the rule is only a starting point. Some retirees spend more in the first decade than they did while working, simply because they have the time. A careful look at your real categories is more reliable than the rule.
          </p>
        </section>

        <section id="inflation">
          <h2>Inflation and rising costs</h2>
          <p>
            The other big adjustment is time. A budget that feels comfortable today will not buy the same life in twenty years. Even modest inflation, compounded over a long retirement, roughly doubles the cost of living over a typical retirement horizon.
          </p>
          <p>
            That does not mean you need to double every line item on day one. It does mean the plan should expect rising bills. Sources of income that can grow over time — Social Security, dividends from broadly diversified investments, certain rental income — help carry the load. Sources that are flat, such as a fixed pension or a level annuity payment, slowly lose ground unless paired with something that grows. The best plans usually include both kinds.
          </p>
        </section>

        <section id="ranges">
          <h2>Realistic ranges to plan around</h2>
          <p>
            Most retired households we work with land somewhere in a familiar range. Essentials — the bills you have to pay — often come in between forty and sixty percent of the total monthly number. Flexible spending fills another twenty to forty percent. The rest acts as a cushion for surprises, which always come, especially in healthcare and home maintenance.
          </p>
          <p>
            The exercise is worth doing twice: once for the life you want in the first ten years, when energy and travel ambitions are highest, and once for a quieter chapter later. Two budgets make the plan more realistic than one. Take the monthly figure you land on into your next conversation about how the rest of the plan should be shaped — it is the number every other piece is built around. This article is part of the{" "}
            <Link href={PILLAR.href}>{PILLAR.title}</Link> guide.
          </p>
        </section>
      </ArticleShell>
    </main>
  );
}
