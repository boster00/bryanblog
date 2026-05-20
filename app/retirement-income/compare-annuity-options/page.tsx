import Link from "next/link";
import ArticleShell from "@/components/ArticleShell";
import { getSatellite, PILLAR, relatedFor } from "@/lib/articles";

const meta = getSatellite("compare-annuity-options")!;

export const metadata = {
  title: meta.title,
  description: meta.teaser,
};

const sections = [
  { id: "the-seven-numbers", heading: "The seven numbers that matter" },
  { id: "guaranteed-vs-illustrated", heading: "Guaranteed vs illustrated" },
  { id: "surrender-schedule", heading: "Surrender schedule and liquidity" },
  { id: "rider-details", heading: "Rider details" },
  { id: "insurer-strength", heading: "Insurer financial strength" },
  { id: "apples-to-apples", heading: "Building an apples-to-apples chart" },
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
          "annuity-fees-explained",
          "income-review-checklist",
        ])}
      >
        <p>
          Two annuity brochures can look almost identical at a glance and turn out to be very different on close reading. The difference rarely shows up in the headline number — it shows up in seven specific places. Knowing what to ask, and where to look, turns a confusing comparison into a manageable one. This article walks through the questions to bring to any proposal.
        </p>

        <section id="the-seven-numbers">
          <h2>The seven numbers that matter</h2>
          <p>
            When comparing annuities, focus on the same handful of numbers in every proposal you receive. They are the places where products actually differ.
          </p>
          <ul>
            <li>The guaranteed minimum interest rate or guaranteed income amount</li>
            <li>The current, non-guaranteed rate or income figure being illustrated</li>
            <li>The cap, participation rate, or spread that limits upside (on indexed products)</li>
            <li>The annual fee for any optional riders</li>
            <li>The surrender charge schedule, year by year</li>
            <li>The annual free-withdrawal amount</li>
            <li>The insurance company&apos;s financial strength ratings</li>
          </ul>
          <p>
            Lined up side by side, these seven numbers tell you most of what you need to know about how two contracts will actually behave. Brochures look more or less alike. These numbers are where the differences live.
          </p>
        </section>

        <section id="guaranteed-vs-illustrated">
          <h2>Guaranteed vs illustrated</h2>
          <p>
            Annuity proposals almost always show two sets of numbers. One set is guaranteed in writing inside the contract. The other set is illustrated, meaning it is an example of what could happen under certain assumptions. The illustrated numbers are usually larger, because they assume good conditions. The guaranteed numbers are usually smaller, because they have to be honored regardless of conditions.
          </p>
          <p>
            The honest comparison is between the guaranteed numbers. If you would still be comfortable with the contract assuming only the guaranteed amount, the product fits. If the only way the contract looks attractive is by assuming the illustrated number, the product is doing less for you than it appears.
          </p>
        </section>

        <section id="surrender-schedule">
          <h2>Surrender schedule and liquidity</h2>
          <p>
            The surrender schedule is one of the most important pages in any proposal. It tells you, year by year, what it would cost to take more than the free-withdrawal amount out of the contract. A typical schedule might step down from a higher charge in year one to zero after seven or ten years.
          </p>
          <p>
            Read this schedule with your real life in mind. If you can comfortably leave the money alone for the full surrender period, the charges are not really a cost to you — they are a feature that protects the insurer&apos;s pricing. If there is a real chance you will need the money in years three or four, a long surrender schedule is a problem regardless of how attractive the rest of the contract looks.
          </p>
        </section>

        <section id="rider-details">
          <h2>Rider details</h2>
          <p>
            Optional riders add features to a contract — most commonly guaranteed lifetime income, an enhanced death benefit, or an enhanced payout for long-term care. Each rider has a separate cost and a separate set of rules, and the rules differ enough between insurers that two riders with similar names can behave very differently.
          </p>
          <p>
            For any rider you are considering, ask: what does it cost each year, what does it actually pay, when can the benefit be turned on, how does it change if you take any withdrawals first, and what happens if you never use it. A rider that pays a strong income only after waiting ten years is a different product than one that pays a strong income immediately. Both can be reasonable; they are doing different jobs.
          </p>
        </section>

        <section id="insurer-strength">
          <h2>Insurer financial strength</h2>
          <p>
            Annuity guarantees are only as good as the insurance company that issues the contract. Several independent agencies — among them A.M. Best, S&amp;P, Moody&apos;s, and Fitch — rate insurers on financial strength. The ratings use different letter scales, so it is worth understanding what a particular rating means on the scale being used.
          </p>
          <p>
            A reasonable rule of thumb is to stay with insurers that hold high ratings from more than one agency, and to be cautious about products from insurers rated in the middle of the pack or lower. State guaranty associations provide a backstop within certain limits if an insurer fails, but choosing a strong insurer in the first place is the better protection. This is not optional homework. It is part of the comparison.
          </p>
        </section>

        <section id="apples-to-apples">
          <h2>Building an apples-to-apples chart</h2>
          <p>
            The simplest way to compare two or three proposals is to put the seven numbers from each into a single table, side by side. Once they are next to each other, the differences usually become obvious within a few minutes. A spread that sounded reasonable on its own becomes less attractive next to a competitor&apos;s cap. A surrender schedule that seemed long shows itself as standard, or unusually long, depending on the field.
          </p>
          <p>
            It is also worth bringing the comparison to someone other than the salesperson selling one of the products. A second opinion from an advisor who is not paid on the sale tends to catch the things a single proposal can miss. We list what to bring to that meeting in{" "}
            <Link href="/retirement-income/income-review-checklist/">
              what to bring to a retirement income review
            </Link>
            . Part of the{" "}
            <Link href={PILLAR.href}>{PILLAR.title}</Link> guide.
          </p>
        </section>
      </ArticleShell>
    </main>
  );
}
