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
          Annuity fees confuse a lot of people, and the brochures rarely help. The good news is that the costs sort into a small number of categories, each with a clear purpose. Once you can name the categories, comparing two contracts becomes much easier. This article walks through them in plain language.
        </p>

        <section id="the-fee-categories">
          <h2>The fee categories that matter</h2>
          <p>
            There are a few different fee types depending on what kind of annuity you are looking at.
          </p>
          <ul>
            <li>Mortality and expense (M&amp;E) charges — Found mainly in variable annuities, these pay for the insurance side of the contract and the administrative overhead. They are typically expressed as a percentage of the account value each year.</li>
            <li>Administrative fees — Sometimes a flat annual amount, sometimes a small percentage, charged to cover record-keeping.</li>
            <li>Investment fees — Inside a variable annuity, the underlying subaccounts have their own management fees, layered on top of the contract&apos;s charges.</li>
            <li>Rider fees — Optional benefits, such as income riders or long-term care riders, carry their own annual cost.</li>
            <li>Implicit costs — Fixed and fixed indexed annuities often have no annual fee line item, but the cost of their guarantees is built into caps, participation rates, and spreads that limit upside.</li>
          </ul>
          <p>
            Not every fee applies to every product. A simple fixed annuity may have none of the explicit fees on the list, while a feature-rich variable annuity may have several. The way to compare contracts is to ask, for each one, what does it really cost me per year on the way to the income I want.
          </p>
        </section>

        <section id="surrender-charges">
          <h2>How surrender charges actually work</h2>
          <p>
            A surrender charge is a fee you pay if you take out more than the contract&apos;s free-withdrawal amount during the early years of the contract. Most fixed and fixed indexed annuities allow you to withdraw something like ten percent of the account each year without penalty. Larger withdrawals, or fully cashing out, trigger the charge.
          </p>
          <p>
            The charge usually follows a declining schedule. A typical example might be nine percent in year one, eight percent in year two, and so on, stepping down each year until it reaches zero. After the surrender period ends, you can move the entire account with no penalty. The schedule and length vary widely from product to product, so this is one of the first things to read in any contract you are considering.
          </p>
        </section>

        <section id="rider-costs">
          <h2>Income and benefit rider costs</h2>
          <p>
            A rider is an optional add-on that gives the contract extra abilities. The most common riders provide a guaranteed lifetime income (subject to the insurer&apos;s claims-paying ability), an enhanced death benefit for heirs, or an enhanced payout for long-term care.
          </p>
          <p>
            Each rider has an annual cost, often somewhere between half a percent and one and a half percent of the benefit base each year. The fee is deducted from the account value even though the benefit applies to a separate calculation. Over time the deduction can be meaningful. Riders are not bad — sometimes they are the very reason to consider an annuity at all — but they should be chosen because they do a specific job in your plan, not because they sound nice in a sales meeting.
          </p>
        </section>

        <section id="what-guarantees-mean">
          <h2>What &quot;guaranteed&quot; actually means</h2>
          <p>
            The word guaranteed shows up everywhere in annuity brochures, and it does mean something — but it means different things in different places. A guarantee inside the contract is a promise from the insurance company, subject to that insurer&apos;s ability to pay claims. It is not backed by the federal government.
          </p>
          <p>
            There is also a difference between numbers that are guaranteed in writing and numbers that are illustrated. A guaranteed minimum rate is a floor the contract will not drop below. A guaranteed income amount is the dollar figure the contract will pay if you turn on the income feature, regardless of what the market does. An illustrated number, by contrast, is an example of what could happen under certain assumptions — and the actual result may be higher or lower. When reading a proposal, the most important question is: which numbers here are in writing in the contract, and which are illustrations.
          </p>
        </section>

        <section id="marketing-vs-contract">
          <h2>Marketing language vs the contract</h2>
          <p>
            Marketing language tends to emphasize the most attractive scenario. The contract itself reads more carefully, in part because the language has been reviewed by lawyers and regulators. The two should agree, but they can sound very different.
          </p>
          <p>
            A few practical habits help bridge the gap. Ask for the policy summary in writing, alongside any illustration. Underline the words guaranteed, minimum, current, and may. Look at the section that describes how the income amount is calculated, not just the headline number. Read the renewal terms — fixed annuity rates can change after the initial period — and confirm what happens if you simply leave the contract alone for ten years.
          </p>
          <p>
            None of this is to suggest that annuities are designed to mislead. It is to suggest that a careful reading replaces a lot of worry, and that anyone selling you a product should be willing to walk through the contract page by page. We walk through the comparison process in detail in{" "}
            <Link href="/retirement-income/compare-annuity-options/">
              how to compare annuity options before you buy
            </Link>
            . Part of the{" "}
            <Link href={PILLAR.href}>{PILLAR.title}</Link> guide.
          </p>
        </section>
      </ArticleShell>
    </main>
  );
}
