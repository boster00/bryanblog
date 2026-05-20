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
          A retirement income review is more useful than most people expect, but only if both sides come prepared. The difference between a thirty-minute polite chat and a meeting that actually moves your plan forward is almost always preparation. The list below is what we ask people to bring when they sit down with us. Use it as a printable checklist before any income conversation, with us or anyone else.
        </p>

        <section id="documents-to-bring">
          <h2>Documents to bring</h2>
          <p>
            Paper and screenshots both work. The goal is to have the numbers in front of you, not to organize them perfectly. A folder or large envelope with the following is more than enough:
          </p>
          <ul>
            <li>Your most recent Social Security statement, or a printout from ssa.gov</li>
            <li>Any pension paperwork, including the survivor-benefit options if you have a spouse</li>
            <li>The most recent statement for each retirement account — 401(k), 403(b), IRA, Roth</li>
            <li>Recent statements for any brokerage or savings accounts</li>
            <li>A list of any annuities, CDs, or bonds you already own, with their key terms</li>
            <li>Your most recent tax return (last year is fine; two years is better)</li>
            <li>A list of major debts — mortgages, lines of credit, car loans</li>
            <li>Current health and long-term care insurance policy summaries</li>
          </ul>
          <p>
            You do not need to have organized any of this. Bring it as is. Half of a useful review is laying everything on the table for the first time.
          </p>
        </section>

        <section id="numbers-to-know">
          <h2>Numbers to know</h2>
          <p>
            Beyond the paperwork, a few numbers in your head go a long way. None of them need to be precise. A reasonable estimate is enough to anchor the conversation.
          </p>
          <ul>
            <li>Your typical monthly spending, separated roughly into essentials and flexible</li>
            <li>The age you would like to retire, or the age you actually retired</li>
            <li>An estimate of your monthly Social Security benefit and the age you plan to claim it</li>
            <li>An estimate of any pension and the survivor option you are leaning toward</li>
            <li>How much you have in cash and short-term savings</li>
            <li>Roughly how the rest of your savings is divided between stocks and bonds</li>
          </ul>
          <p>
            If you have not done a budget exercise in a while, a quick one before the meeting is worth the time. The article on{" "}
            <Link href="/retirement-income/monthly-income-needs/">
              monthly income needs
            </Link>{" "}
            walks through a simple way to do it in an afternoon.
          </p>
        </section>

        <section id="questions-to-ask">
          <h2>Questions to ask</h2>
          <p>
            A few questions, asked clearly, set the tone for the whole meeting. Some that consistently produce useful answers:
          </p>
          <ul>
            <li>Based on what I have, when can I realistically retire?</li>
            <li>How much income can my savings produce each month without running out?</li>
            <li>What happens to the plan if the market drops twenty percent next year?</li>
            <li>What happens to the plan if one of us lives to ninety-five?</li>
            <li>Where am I most exposed right now, and what would it cost to fix it?</li>
            <li>If I never buy another product, does the plan still work?</li>
            <li>If a product is suggested, what specifically does it solve, and what does it cost me each year?</li>
          </ul>
          <p>
            The last two questions tend to separate genuine planning from sales-led conversations more than any other. A good advisor will welcome them.
          </p>
        </section>

        <section id="what-good-looks-like">
          <h2>What a good review looks like</h2>
          <p>
            A good review walks through your current picture, identifies the gaps or risks, and shows two or three reasonable paths forward — usually including a do-nothing option for comparison. You should leave with a clearer sense of your numbers, not a more confused one.
          </p>
          <p>
            A red-flag review is one that focuses on a single product within the first half hour, treats your situation as identical to other clients, or pushes for a decision in the same meeting. None of these are normal in a careful planning process. The point of a first conversation is to understand the situation, not to close a sale.
          </p>
        </section>

        <section id="after-the-meeting">
          <h2>What to do after the meeting</h2>
          <p>
            Whatever you discuss, write down the three or four most important things you learned within twenty-four hours, while it is still fresh. If a product was suggested, get the proposal in writing and read it twice before deciding anything. If a strategy was suggested, ask for a one-page summary that you can show a trusted friend or family member.
          </p>
          <p>
            For most retirees, the right pace after the first review is a few weeks of thought, not a few days. Decisions made on paper, with time to sleep on them, almost always hold up better than decisions made in the room. We walk through how to compare specific options in{" "}
            <Link href="/retirement-income/compare-annuity-options/">
              how to compare annuity options before you buy
            </Link>
            . Part of the{" "}
            <Link href={PILLAR.href}>{PILLAR.title}</Link> guide.
          </p>
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
