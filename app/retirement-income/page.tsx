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
        <p>
          If you are within a few years of retirement, or already there, you have probably felt the worry that creeps in at three in the morning: will the money I worked decades to save actually last the rest of my life? It is one of the most common fears we hear, and it is a fair one to have. The good news is that this fear becomes much smaller once you can see your situation clearly on one page.
        </p>
        <p>
          The pages that follow walk through the questions retirees actually ask, in plain English. We start with longevity and the income gap, move into how to build a steady monthly paycheck from your savings, talk honestly about how much should stay safe versus invested, and look at when an annuity may or may not fit. There are no product pitches here. The goal is to give you enough vocabulary and structure to have a confident conversation about your own plan.
        </p>

        <section id="last-as-long-as-i-do">
          <h2>Will my money last as long as I do?</h2>
          <p>
            The deepest fear in retirement is running out of money before you run out of life. For decades you were in the saving phase, watching the account grow. Retirement flips that on its head. You are now in the spending phase, and instead of a paycheck coming in, withdrawals are going out. That shift, from building a nest egg to drawing from one, is one of the biggest financial changes a person ever makes.
          </p>
          <p>
            Today, a healthy 65-year-old couple has a real chance one of them will live into their nineties. That means the money may need to last 25, 30, even 35 years. Social Security usually covers part of the bill, but for most people it does not cover all of it. The first step in answering the question is simply to write down two numbers: what you spend in a typical month, and how much guaranteed income (Social Security, any pension) you will receive each month. The space between those two numbers is your income gap.
          </p>
          <p>
            Once the gap is on paper, the rest of the plan has a job to do. Some of your savings will cover essentials — housing, food, insurance, medicine. Some will cover the flexible parts of life — travel, gifts, hobbies, helping family. Some will sit in reserve for surprises. For some retirees, an annuity is one way to turn part of their savings into income they can count on, especially for essential expenses. We cover the budget side in detail in{" "}
            <Link href="/retirement-income/monthly-income-needs/">
              how much monthly income do I actually need
            </Link>
            .
          </p>
        </section>

        <section id="steady-income-plan">
          <h2>What&apos;s a simple plan for steady income in retirement?</h2>
          <p>
            For 30 or 40 years you got used to a paycheck showing up on the same day, every two weeks. The simplest mental model for retirement is to build yourself a new paycheck — one that shows up just as reliably, but comes from several sources stacked together. Most retirees use what we call an income-layer model.
          </p>
          <p>
            The common layers look like this:
          </p>
          <ul>
            <li>Social Security, usually the foundation</li>
            <li>A pension, if you are fortunate enough to have one</li>
            <li>Withdrawals from your 401(k), IRA, or brokerage account</li>
            <li>Cash and short-term savings for the next year or two of bills</li>
            <li>Interest and dividends from bonds, CDs, or dividend-paying stocks</li>
            <li>Rental income, if you own property</li>
            <li>Annuity income, if some of your savings has been turned into a contract that pays monthly</li>
          </ul>
          <p>
            Each of these does a different job. Some are flexible, some are predictable, some grow with the market, and some stay steady but offer less access to the underlying dollars. The art is matching the right layer to the right need: predictable income for predictable bills, flexible savings for everything else.
          </p>
          <p>
            An annuity may fit into the steady-income layer of the plan, not necessarily the whole plan. It is a tool, not a strategy by itself. For a fuller walk-through of how the layers stack together, see{" "}
            <Link href="/retirement-income/retirement-paycheck/">
              how to build a retirement paycheck from Social Security, savings, and investments
            </Link>
            .
          </p>
        </section>

        <section id="safe-versus-invested">
          <h2>How much should I keep safe versus invested?</h2>
          <p>
            This is the question that keeps people up at night the year before they retire. Should I move everything to cash? Should I stay invested? What if the market drops the month I leave my job? These are good questions, and the honest answer is somewhere between the two extremes.
          </p>
          <p>
            A market drop can hurt more when it happens right after you retire, because you may be selling investments to pay bills while the account is down. That makes the losses harder to recover from. At the same time, retirees still need growth. Over a 25- or 30-year retirement, the cost of living roughly doubles. Money that sits entirely in cash slowly loses ground to rising prices. So the question is not safe or invested — it is how much of each, and where.
          </p>
          <p>
            The most common safety options retirees consider are:
          </p>
          <ul>
            <li>A cash reserve covering one to two years of essential spending</li>
            <li>Certificates of deposit (CDs) for short and medium horizons</li>
            <li>Individual bonds or bond funds, sometimes structured as a ladder</li>
            <li>Fixed annuities and fixed indexed annuities for principal-protected growth (subject to the insurance company&apos;s claims-paying ability)</li>
            <li>Immediate or deferred income annuities for predictable monthly checks</li>
          </ul>
          <p>
            Annuities are often considered when someone wants part of their money protected from market loss or converted into predictable income. The tradeoff is that the money may be less flexible than money kept in a bank or brokerage account, and the guarantees rely on the insurance company that issues them. We talk through that decision in{" "}
            <Link href="/retirement-income/move-money-before-retirement/">
              should I move money out of the market before retirement
            </Link>{" "}
            and compare three of the most common safe-side tools in{" "}
            <Link href="/retirement-income/cds-bonds-annuities/">
              CDs vs bonds vs annuities
            </Link>
            .
          </p>
        </section>

        <section id="what-i-give-up">
          <h2>What do I give up to get more certainty?</h2>
          <p>
            If you have read anything about annuities online, you have probably seen strong opinions on both sides. Some headlines say they are the answer to retirement. Others say they are expensive, lock up your money, are too complicated, or only benefit the seller. The truth lives in between — and the honest way to think about it is this: more certainty usually comes with less flexibility.
          </p>
          <p>
            That tradeoff shows up in the real questions retirees ask:
          </p>
          <ul>
            <li>How quickly can I get to the money if I need it?</li>
            <li>What are the surrender charges if I change my mind?</li>
            <li>What are the ongoing fees, and what do they pay for?</li>
            <li>Which numbers in the brochure are guaranteed and which are just illustrated?</li>
            <li>Will the income keep up with inflation?</li>
            <li>What happens to the money when I die, or if my spouse outlives me?</li>
            <li>Can it help with long-term care costs?</li>
            <li>How strong is the insurance company behind the contract?</li>
          </ul>
          <p>
            Underneath those questions are a few structural tradeoffs. The protection an indexed product gives you against market losses is paid for through caps, participation rates, or spreads on the upside. The guaranteed lifetime income from an income rider or annuitization is paid for by giving up some control of the underlying balance. The extra-feature riders, like income or long-term care benefits, are paid for through ongoing fees. None of this is hidden — it is just often buried in language that is hard to read.
          </p>
          <p>
            The point is not that these tradeoffs are bad. The point is that they are real, and you should know what you are exchanging for what. For a candid look at the criticisms, see{" "}
            <Link href="/retirement-income/annuity-downsides/">
              what are the downsides of annuities
            </Link>
            . For a plain-English walkthrough of the fee categories, see{" "}
            <Link href="/retirement-income/annuity-fees-explained/">
              annuity fees, surrender charges, and guarantees explained
            </Link>
            .
          </p>
        </section>

        <section id="annuity-fit">
          <h2>How do I know whether an annuity actually fits my situation?</h2>
          <p>
            The wrong question is &quot;should I buy an annuity?&quot; The better question is &quot;what job does this part of my money need to do?&quot; When you start there, the answer becomes much clearer, because each dollar in your plan has a purpose.
          </p>
          <p>
            An annuity may fit when someone wants:
          </p>
          <ul>
            <li>A predictable monthly check that arrives no matter what the market does</li>
            <li>Less exposure to a market drop on part of their savings</li>
            <li>Coverage for essential expenses — housing, food, medicine — that cannot vary</li>
            <li>Income that continues for as long as they live, and often for as long as their spouse lives</li>
            <li>A conservative bucket inside a broader, more flexible plan</li>
          </ul>
          <p>
            An annuity may fit poorly when someone wants:
          </p>
          <ul>
            <li>Full liquidity — the ability to move every dollar on short notice</li>
            <li>A short-term place to park cash for a year or two</li>
            <li>Maximum growth potential and full participation in market gains</li>
            <li>The simplicity of a low-cost, do-it-yourself investing plan</li>
            <li>The freedom to change the plan substantially every few years</li>
          </ul>
          <p>
            An annuity is not a replacement for a full retirement plan. It is a tool that may fit one part of the plan — usually the part that needs to be predictable. Whether that part is small, medium, or large depends on your guaranteed income, your spending, and your comfort with market ups and downs. We work through the fit question in{" "}
            <Link href="/retirement-income/who-should-consider-annuity/">
              who should consider an annuity, and who should probably avoid one
            </Link>
            , and the sizing question in{" "}
            <Link href="/retirement-income/guaranteed-income-allocation/">
              how much of my savings should be in guaranteed income
            </Link>
            .
          </p>
        </section>

        <section id="compare-options">
          <h2>How do I compare options without getting lost in the fine print?</h2>
          <p>
            Once you decide a piece of your plan should be predictable, the comparison work begins. Annuities are not one product. There are fixed annuities, fixed indexed annuities, variable annuities, immediate income annuities, deferred income annuities, contracts with optional income riders, and contracts with long-term care riders. It is easy to get lost.
          </p>
          <p>
            The trick is to organize by need, not by product name. Sort your thinking into one of these jobs first:
          </p>
          <ul>
            <li>I want safe growth on principal that I do not plan to touch for several years</li>
            <li>I want lifetime income that starts now</li>
            <li>I want income that starts in five or ten years, larger than what would start today</li>
            <li>I want some market-linked growth without direct exposure to market losses</li>
            <li>I want help planning for long-term care costs</li>
            <li>I want income that continues to protect my spouse if I am the first to go</li>
          </ul>
          <p>
            Once the job is clear, the right product category usually narrows itself. Then you can compare contracts on the same questions: what is guaranteed in writing, what is illustrated and could change, how long the surrender period lasts, how much you can access each year without penalty, what happens at early death, how the contract behaves in up markets and in down markets, how strong the insurance company is, and whether the income it produces actually closes your gap. We walk through this side by side in{" "}
            <Link href="/retirement-income/compare-annuity-options/">
              how to compare annuity options before you buy
            </Link>{" "}
            and{" "}
            <Link href="/retirement-income/annuity-types-compared/">
              fixed vs fixed indexed vs income annuity
            </Link>
            .
          </p>
        </section>

        <section id="what-to-do-next">
          <h2>What should I do before making a decision?</h2>
          <p>
            If there is one piece of advice that holds for every retiree, it is this: do not make a decision about any single product until you have your whole picture on one page. The most expensive mistakes we see come from picking a product before mapping the plan.
          </p>
          <p>
            The simplest next step is a retirement income review. This is a sit-down conversation, often just an hour or two, where you and an advisor look at your income, your spending, and your savings together. The point is not to sell you anything. The point is to see whether the pieces you already have line up with the life you want — and to identify the gap, if there is one, before you decide how to close it.
          </p>
          <p>
            To make the review productive, bring as many of these as you can:
          </p>
          <ul>
            <li>A rough monthly spending number, broken into fixed and flexible</li>
            <li>Your most recent Social Security statement or benefits estimate</li>
            <li>Any pension paperwork, including survivor options</li>
            <li>Recent statements for your 401(k), IRA, brokerage, and savings accounts</li>
            <li>Current sources of income, including any part-time work</li>
            <li>A list of major debts, especially mortgages and lines of credit</li>
            <li>Notes on your spouse&apos;s needs and any survivor concerns</li>
            <li>Thoughts on how much money you want easily accessible</li>
            <li>Any worries about long-term care or family health history</li>
            <li>Goals for what, if anything, you want to leave behind</li>
          </ul>
          <p>
            Walking through the full list ahead of time is itself half the value. You can use{" "}
            <Link href="/retirement-income/income-review-checklist/">
              what to bring to a retirement income review
            </Link>{" "}
            as a printable starting point. From there, the conversation has somewhere to go.
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
