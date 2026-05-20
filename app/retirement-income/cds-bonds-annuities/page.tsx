import Link from "next/link";
import ArticleShell from "@/components/ArticleShell";
import { getSatellite, PILLAR, relatedFor } from "@/lib/articles";

const meta = getSatellite("cds-bonds-annuities")!;

export const metadata = {
  title: meta.title,
  description: meta.teaser,
};

const sections = [
  { id: "what-each-is", heading: "What each one actually is" },
  { id: "yield-comparison", heading: "Yield comparison" },
  { id: "liquidity-and-access", heading: "Liquidity and access" },
  { id: "taxes-and-guarantees", heading: "Taxes and guarantees" },
  { id: "inflation-risk", heading: "Inflation risk" },
  { id: "which-job", heading: "Which job each one is best for" },
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
          "annuity-downsides",
          "guaranteed-income-allocation",
        ])}
      >
        <p>
          CDs, bonds, and annuities all show up on the safer side of a retirement plan, but they are not the same tool. Each one does a different job, and the right choice depends less on which has the highest rate this month and more on what you need that money to do. A simple side-by-side helps the comparison.
        </p>

        <section id="what-each-is">
          <h2>What each one actually is</h2>
          <p>
            A certificate of deposit, or CD, is a deposit at a bank or credit union. You agree to leave the money in place for a set period — six months, a year, five years — and the bank pays you a fixed rate of interest. At the end of the term, you get your money back plus interest. CDs are insured by the FDIC up to the standard coverage limits.
          </p>
          <p>
            A bond is a loan you make, usually to a government or a company. The borrower pays you interest on a regular schedule and returns the principal on a stated maturity date. Bonds vary widely in safety. Treasury bonds are backed by the federal government. Corporate bonds depend on the financial strength of the issuer. Bond funds bundle many bonds together, which spreads the credit risk but also means the price moves with interest rates.
          </p>
          <p>
            An annuity is a contract with an insurance company. You give the insurer money, and in exchange the insurer agrees to pay you either a stated growth rate, a stream of income, or both, according to the terms of the contract. There are several types, with different jobs, which we cover in{" "}
            <Link href="/retirement-income/annuity-types-compared/">
              fixed vs fixed indexed vs income annuity
            </Link>
            .
          </p>
        </section>

        <section id="yield-comparison">
          <h2>Yield comparison</h2>
          <p>
            On any given day, the rates on CDs, high-quality bonds, and fixed annuities tend to sit in roughly the same neighborhood, because they are all influenced by broader interest rates. Annuities and longer bonds often pay a bit more than short CDs, in exchange for a longer commitment. The differences are real but rarely dramatic, and they move around as rates change.
          </p>
          <p>
            Comparing yields alone is misleading, though. A CD that pays a slightly lower rate but lets you out in twelve months is doing a different job than an annuity that pays a slightly higher rate but locks the money up for seven years. The right question is not which rate is highest — it is which trade matches what that money is for.
          </p>
        </section>

        <section id="liquidity-and-access">
          <h2>Liquidity and access</h2>
          <p>
            CDs are reasonably liquid. You can break one early, but you usually pay a penalty of a few months of interest. The penalty is unpleasant but predictable, and the principal itself stays intact.
          </p>
          <p>
            Individual bonds can be sold before maturity, but the price you get depends on what interest rates have done since you bought. Bond funds can be sold any day the market is open, again at whatever the current price happens to be. Liquidity is good, but the value can swing.
          </p>
          <p>
            Annuities are the least liquid of the three. Most fixed and fixed indexed annuities allow you to withdraw a portion each year, often around ten percent, without a penalty. Beyond that, surrender charges apply during the early years of the contract — usually five to ten years on a declining schedule. After the surrender period ends, the money becomes much more accessible. The trade is real: less flexibility, in exchange for the contract&apos;s guarantees.
          </p>
        </section>

        <section id="taxes-and-guarantees">
          <h2>Taxes and guarantees</h2>
          <p>
            Interest from a CD is taxed as ordinary income in the year it is earned, even if you leave it inside the CD. Most bond interest is taxed the same way, though municipal bond interest may be free of federal tax and sometimes state tax as well. Treasury interest is taxable at the federal level but exempt from state tax.
          </p>
          <p>
            Annuity growth is tax-deferred. You do not pay tax on the interest until you withdraw it, which is helpful if the money is not needed for income right away. When the money does come out, the growth portion is taxed as ordinary income.
          </p>
          <p>
            On the guarantee side, CDs are backed by FDIC insurance up to the standard limits. Treasury bonds carry the federal government&apos;s backing. Corporate bonds depend on the company. Annuity guarantees depend on the insurance company that issues the contract — subject to that insurer&apos;s claims-paying ability. State guaranty associations provide a backstop, but the limits vary, and the insurer&apos;s own financial strength matters a great deal.
          </p>
        </section>

        <section id="inflation-risk">
          <h2>Inflation risk</h2>
          <p>
            All three of these tools share a common weakness: their payments are usually fixed in dollar terms. A CD that pays a steady rate for five years pays the same number of dollars each year, and those dollars buy a little less each year as prices rise. The same is true of a fixed annuity with a level income payment.
          </p>
          <p>
            That does not make these tools bad. It means they belong alongside, not instead of, sources of income that can grow over time — Social Security, dividends from broadly diversified stocks, and certain rental income. The safer side of the plan provides stability; the growth side carries inflation.
          </p>
        </section>

        <section id="which-job">
          <h2>Which job each one is best for</h2>
          <p>
            CDs are best for short and medium horizons when you want predictability and federal insurance. They shine for money you may want within five years and want to know is intact.
          </p>
          <p>
            Bonds and bond ladders work well for medium-term needs and for a steady income stream that does not require a long commitment. They are also a meaningful piece of most retirees&apos; broader investment mix.
          </p>
          <p>
            Annuities are best when the job is long-term predictable income or principal protection on money you will not need to touch for years. They are less about beating CDs on rate and more about producing a check you can count on, often for life, on a portion of your savings. We work through how to size that portion in{" "}
            <Link href="/retirement-income/guaranteed-income-allocation/">
              how much of my savings should be in guaranteed income
            </Link>
            . Part of the{" "}
            <Link href={PILLAR.href}>{PILLAR.title}</Link> guide.
          </p>
        </section>
      </ArticleShell>
    </main>
  );
}
