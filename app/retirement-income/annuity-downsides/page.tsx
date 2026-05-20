import Link from "next/link";
import ArticleShell from "@/components/ArticleShell";
import { getSatellite, PILLAR, relatedFor } from "@/lib/articles";

const meta = getSatellite("annuity-downsides")!;

export const metadata = {
  title: meta.title,
  description: meta.teaser,
};

const sections = [
  { id: "complexity", heading: "Complexity and product design" },
  { id: "fees-and-costs", heading: "Fees and ongoing costs" },
  { id: "liquidity-and-surrender", heading: "Liquidity and surrender charges" },
  { id: "lost-upside", heading: "Lost market upside" },
  { id: "insurer-risk", heading: "Insurer credit risk" },
  { id: "tax-treatment", heading: "Tax treatment quirks" },
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
          "annuity-fees-explained",
          "who-should-consider-annuity",
        ])}
      >
        <p>
          Annuities get a fair share of criticism, and a lot of it is deserved. Before deciding whether one fits your plan, it is worth looking honestly at the trade-offs. No product is right for everyone, and the downsides matter just as much as the benefits. This article walks through the most common criticisms so you can weigh them against your own situation.
        </p>

        <section id="complexity">
          <h2>Complexity and product design</h2>
          <p>
            The first complaint people raise about annuities is that they are complicated. That is a fair complaint. A modern annuity contract can run to a hundred pages, with definitions, riders, schedules, and conditions written in language that is hard to read on the first pass. Two contracts that look similar in a brochure can behave very differently in year seven.
          </p>
          <p>
            The complexity itself is not a reason to walk away from annuities entirely. It is a reason to slow down. Anyone considering one should be able to explain, in their own words, how the contract grows, what the income guarantee is, when fees apply, and how to get to the money if life changes. If the salesperson cannot translate the contract into a plain summary, that is a signal to take more time, not less.
          </p>
        </section>

        <section id="fees-and-costs">
          <h2>Fees and ongoing costs</h2>
          <p>
            Annuities can carry several layers of fees. Variable annuities, in particular, often have mortality and expense charges, administrative fees, and underlying investment fees that, added together, can be meaningfully higher than the cost of holding investments directly. Fixed and fixed indexed annuities typically have lower or no explicit annual fees, but they include implicit costs in the form of caps, spreads, or participation rates on the growth side.
          </p>
          <p>
            Optional benefit riders — income riders, enhanced death benefits, long-term care benefits — have their own annual costs, often a fraction of a percent to more than one percent each year. Riders are sometimes worth their cost and sometimes not. The honest review is to ask whether a specific rider does a job your plan actually needs.
          </p>
        </section>

        <section id="liquidity-and-surrender">
          <h2>Liquidity and surrender charges</h2>
          <p>
            Most fixed and fixed indexed annuities have a surrender period, often between five and ten years, during which large withdrawals trigger a charge. The schedule typically starts higher in the early years and steps down each year until it reaches zero.
          </p>
          <p>
            If life is steady and the money is genuinely set aside for the long term, the surrender period is not necessarily a problem. If circumstances change unexpectedly — a serious illness, a family emergency, a new home — having a significant chunk of savings tied up can be a real hardship. This is the single most common reason an annuity turns out to have been the wrong choice. Sizing the allocation conservatively, so that the money inside an annuity is money you genuinely do not need, is the best protection.
          </p>
        </section>

        <section id="lost-upside">
          <h2>Lost market upside</h2>
          <p>
            Fixed and fixed indexed annuities offer protection from market losses, but that protection is paid for through limits on the upside. Caps, participation rates, and spreads keep returns from matching a strong year in the market. Over long periods, a portion of money in a market-protected annuity will usually grow less than the same portion left fully invested.
          </p>
          <p>
            The point of an annuity is not to match market returns. It is to provide stability on a portion of your money. The mistake is putting too much into it and discovering, ten years later, that the bulk of the portfolio missed years of growth. As with most things in retirement, the size of the allocation matters as much as the choice of the product.
          </p>
        </section>

        <section id="insurer-risk">
          <h2>Insurer credit risk</h2>
          <p>
            Annuity guarantees rely on the insurance company that issues the contract — they are subject to the insurer&apos;s claims-paying ability. The federal government does not stand behind an annuity the way the FDIC stands behind a bank deposit. State guaranty associations provide a layer of protection up to certain limits, which vary by state, but those limits are not a substitute for choosing a strong insurer in the first place.
          </p>
          <p>
            Insurance companies are rated by independent agencies on their financial strength. Reading those ratings, understanding what they mean, and avoiding contracts from weaker insurers is a basic piece of due diligence. Sticking with insurers rated highly by multiple agencies is a reasonable rule of thumb.
          </p>
        </section>

        <section id="tax-treatment">
          <h2>Tax treatment quirks</h2>
          <p>
            Annuity growth is tax-deferred while inside the contract, which sounds like a benefit and sometimes is. The flip side is that when withdrawals begin, the growth portion comes out as ordinary income, not at long-term capital-gains rates the way a taxable brokerage account might.
          </p>
          <p>
            For some retirees, that ordinary-income treatment lines up fine with their overall plan. For others, it can be a less efficient way to draw on money than alternatives. There is also a complication when an annuity is funded with money from a traditional IRA or 401(k): the tax-deferral benefit of the annuity is duplicating the tax-deferral that already exists inside the retirement account, which removes one of the reasons to choose an annuity in the first place. That is not always a deal-breaker, but it is a question worth raising with an advisor.
          </p>
          <p>
            None of these downsides means an annuity is the wrong choice. They mean a thoughtful suitability review matters. If you have walked through these trade-offs and the product still fits one job in your plan, it can be a useful piece. If several of them push back hard against your situation, that is worth listening to as well. This article is part of the{" "}
            <Link href={PILLAR.href}>{PILLAR.title}</Link> guide.
          </p>
        </section>
      </ArticleShell>
    </main>
  );
}
