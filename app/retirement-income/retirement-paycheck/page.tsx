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
          For most of your life a paycheck took care of itself. Retirement asks you to build that paycheck on your own, from several sources stacked together. The good news is that the structure does not need to be complicated. With a clear monthly target and a simple framework, most retirees can put together an income plan that feels almost as steady as the one they had at work.
        </p>

        <section id="the-three-buckets">
          <h2>The three income buckets</h2>
          <p>
            A useful way to organize savings in retirement is to picture three buckets, each with a different job. The first is short-term cash. This is one to two years of essential spending, kept in a savings account or a money-market account. Its job is to pay the bills no matter what the markets do this year.
          </p>
          <p>
            The second is a medium-term bucket of safer assets — CDs, short and intermediate bonds, perhaps a fixed annuity. Its job is to feed the cash bucket as it gets drawn down, without exposing those near-term dollars to a sudden drop. The third is the long-term bucket of stocks and broadly diversified investments. Its job is growth. You do not need it for next month&apos;s groceries, so you can let it do its work over the long haul.
          </p>
          <p>
            This structure does not erase market risk, but it changes how the risk feels. When the market drops, you spend from the cash bucket while the long-term bucket recovers. That separation is the whole point.
          </p>
        </section>

        <section id="social-security-first">
          <h2>Start with Social Security</h2>
          <p>
            Social Security is the foundation of most retirement paychecks because it does something almost nothing else does: it pays a check, every month, for as long as you live, and the amount adjusts each year for inflation.
          </p>
          <p>
            The biggest decision is when to start. You can claim as early as 62, but the benefit is permanently reduced. You can claim at your full retirement age, generally 66 or 67, and receive the standard amount. Or you can wait until 70, with the benefit growing roughly eight percent for each year you delay past full retirement age. Delaying is not always the right answer — health, family longevity, the need for income, and a spouse&apos;s benefit all matter — but for many people, taking a smaller draw from savings in the early years so a larger Social Security check can start later turns out to be one of the most valuable choices they make.
          </p>
        </section>

        <section id="savings-and-investments">
          <h2>Savings and investments</h2>
          <p>
            After Social Security, the next layer of the paycheck comes from the accounts you have built up — 401(k) and 403(b) plans, IRAs, brokerage accounts, and savings. Most retirees pick a monthly amount to withdraw and automate the transfer to a checking account, so it lands on a predictable day each month, like a paycheck used to.
          </p>
          <p>
            Tax sequencing matters here. Drawing from a taxable brokerage account is taxed differently than drawing from a traditional IRA, and Roth withdrawals are different again. Required minimum distributions begin at age 73 for most retirees, so traditional IRAs and 401(k)s eventually have to be drawn down whether you want the money or not. Coordinating which account to tap in which year is one of the quieter wins in retirement planning. Many retirees find it useful to model two or three sequencing options with an advisor before settling on a default.
          </p>
        </section>

        <section id="optional-guaranteed">
          <h2>Optional: a guaranteed-income layer</h2>
          <p>
            Some retirees add a fourth layer to the paycheck: a guaranteed-income source beyond Social Security. The most common way to do this is to convert a portion of savings into an annuity that pays a monthly amount. The point is not to lock up the whole portfolio — it is to put a floor under essentials, so that even if the market has a bad year, the bills still get paid.
          </p>
          <p>
            This layer is optional. Plenty of retirees do fine without it, especially those with a meaningful pension or a relatively low spending target. For others, especially those without a pension or with a long family history of longevity, the predictability is worth the lost flexibility on that portion of the money. We work through whether this layer fits in{" "}
            <Link href="/retirement-income/who-should-consider-annuity/">
              who should consider an annuity
            </Link>{" "}
            and the sizing question in{" "}
            <Link href="/retirement-income/guaranteed-income-allocation/">
              how much should be in guaranteed income
            </Link>
            .
          </p>
        </section>

        <section id="stacking-the-paycheck">
          <h2>Stacking it into one paycheck</h2>
          <p>
            Once the pieces are in place, the simplest practice is to have everything flow into one checking account on roughly the same day each month. Social Security lands on a known date. A pension, if you have one, lands on another known date. Automated transfers from your investment accounts can land on a third. From the checking account, the bills get paid the same way they always did.
          </p>
          <p>
            This is not a tax strategy or an investment strategy. It is a comfort strategy. Money feels safer when it arrives on a schedule, and retirees who set the paycheck up this way often report a lower level of background worry within a few months. The accounts behind the scenes can still be doing the more complicated work; the day-to-day experience is just one familiar deposit, the same way it used to be. Part of the{" "}
            <Link href={PILLAR.href}>{PILLAR.title}</Link> guide.
          </p>
        </section>
      </ArticleShell>
    </main>
  );
}
