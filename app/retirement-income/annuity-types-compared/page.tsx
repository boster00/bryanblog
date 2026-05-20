import Link from "next/link";
import ArticleShell from "@/components/ArticleShell";
import { getSatellite, PILLAR, relatedFor } from "@/lib/articles";

const meta = getSatellite("annuity-types-compared")!;

export const metadata = {
  title: meta.title,
  description: meta.teaser,
};

const sections = [
  { id: "fixed-annuity", heading: "Fixed annuity" },
  { id: "fixed-indexed-annuity", heading: "Fixed indexed annuity" },
  { id: "income-annuity", heading: "Income annuity (SPIA / DIA)" },
  { id: "side-by-side", heading: "Side-by-side comparison" },
  { id: "picking-the-job", heading: "Picking the right one for the right job" },
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
          "compare-annuity-options",
          "cds-bonds-annuities",
          "guaranteed-income-allocation",
        ])}
      >
        <p>
          When people say &quot;annuity,&quot; they usually mean one of three quite different things. Each does a different job, and the labels matter. Knowing which type fits which job is the difference between a useful piece of a retirement plan and a product that just sits in the closet. This article walks through the three most common kinds without product names.
        </p>

        <section id="fixed-annuity">
          <h2>Fixed annuity</h2>
          <p>
            A fixed annuity works much like a certificate of deposit issued by an insurance company. You give the insurer a sum of money. The insurer agrees to pay a stated interest rate for a stated number of years. At the end of the term, you can withdraw the money, renew, or convert it to income.
          </p>
          <p>
            Fixed annuities tend to fit well when you want predictable, principal-protected growth on money you do not plan to touch for several years. The protection is subject to the insurance company&apos;s claims-paying ability. The trade-offs are limited liquidity during the term and a return that, while steady, does not grow with the market.
          </p>
          <p>
            They tend to fit poorly when you might need full access to the money in the next year or two, or when you are looking for high growth potential. Either way, a fixed annuity is one of the simpler products in this family — usually a few key numbers, a clear surrender schedule, and not much else.
          </p>
        </section>

        <section id="fixed-indexed-annuity">
          <h2>Fixed indexed annuity</h2>
          <p>
            A fixed indexed annuity, sometimes called an FIA, links its growth to a market index, while protecting principal from market losses. In a good year for the index, the contract credits some portion of that gain to the account — limited by a cap, a participation rate, or a spread. In a bad year for the index, the account does not lose value.
          </p>
          <p>
            FIAs tend to fit when someone wants some market-linked growth without the risk of a year ending below where it started. They often include optional riders that can guarantee a lifetime income stream. They tend to fit poorly when someone wants full participation in market upside, since the cap or spread will always hold the contract back in a strong year.
          </p>
          <p>
            FIAs are the most complex of the three types. The growth method, the index used, the cap, and the participation rate can all be changed by the insurer at renewal, within limits stated in the contract. The contract&apos;s details deserve more time than a single conversation usually allows.
          </p>
        </section>

        <section id="income-annuity">
          <h2>Income annuity (SPIA / DIA)</h2>
          <p>
            An income annuity is the simplest version conceptually. You hand the insurer a lump sum, and in return the insurer agrees to send you a check every month — either starting right away (a single-premium immediate annuity, or SPIA) or starting at a chosen future date (a deferred income annuity, or DIA). The payments continue for a fixed period, for your life, or for the life of you and your spouse.
          </p>
          <p>
            Income annuities tend to fit when the primary need is a paycheck that arrives no matter what. They produce more monthly income, dollar for dollar, than most alternatives, because the insurer is using the underlying principal to fund the payments over time.
          </p>
          <p>
            The trade-off is full or near-full loss of liquidity. Once income begins, the lump sum is no longer yours to access in the usual sense. Most income annuities include options that return the unpaid portion to heirs if you die early, but the underlying money is no longer flexible. That is the source of the predictability — and the reason size matters when choosing one.
          </p>
        </section>

        <section id="side-by-side">
          <h2>Side-by-side comparison</h2>
          <p>
            Put plainly:
          </p>
          <ul>
            <li>A fixed annuity is for steady, protected growth over a chosen number of years</li>
            <li>A fixed indexed annuity is for some market-linked growth with protection from market losses, often with an optional income feature</li>
            <li>An income annuity is for the largest possible monthly check, accepting that the underlying money is largely committed to producing it</li>
          </ul>
          <p>
            Each one carries an insurance-company-backed guarantee, subject to the insurer&apos;s ability to pay claims. Each one has its own kind of fee or implicit cost. Each one rewards a different priority. Comparing them is not really about which is best — it is about which job your money has in front of it.
          </p>
        </section>

        <section id="picking-the-job">
          <h2>Picking the right one for the right job</h2>
          <p>
            The most common mistake is choosing the type that sounded best in a sales meeting and trying to make it serve a job it was not designed for. A fixed indexed annuity bought because it sounded like a market alternative may disappoint someone who actually wanted the steady predictability of a fixed annuity. An income annuity chosen because it produced the biggest monthly check may leave a retiree without enough flexible savings to handle a surprise.
          </p>
          <p>
            The cleaner path is to decide what job a portion of money needs to do first, then choose the product type that fits the job. We compare these three with non-annuity alternatives in{" "}
            <Link href="/retirement-income/cds-bonds-annuities/">
              CDs vs bonds vs annuities
            </Link>
            , and walk through the contract-by-contract comparison in{" "}
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
