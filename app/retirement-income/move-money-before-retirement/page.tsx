import Link from "next/link";
import ArticleShell from "@/components/ArticleShell";
import { getSatellite, PILLAR, relatedFor } from "@/lib/articles";

const meta = getSatellite("move-money-before-retirement")!;

export const metadata = {
  title: meta.title,
  description: meta.teaser,
};

const sections = [
  { id: "the-real-question", heading: "The real question behind the worry" },
  { id: "sequence-of-returns", heading: "Sequence-of-returns risk" },
  { id: "bucket-strategy", heading: "The bucket strategy" },
  { id: "how-much-to-derisk", heading: "How much to de-risk" },
  { id: "common-mistakes", heading: "Common mistakes" },
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
          "cds-bonds-annuities",
          "guaranteed-income-allocation",
        ])}
      >
        <p>
          As retirement gets close, almost everyone feels the same pull: should I just move it all to cash and stop worrying? It is a fair instinct. After decades of saving, the idea of watching the account drop right when you start spending from it is genuinely unsettling. The honest answer, though, is that going all to cash usually creates a different problem — and the better path is somewhere in the middle.
        </p>

        <section id="the-real-question">
          <h2>The real question behind the worry</h2>
          <p>
            When people ask whether to move money out of the market, what they usually mean is: how do I make sure a bad market in the first few years of retirement does not wreck the rest of my retirement? That is a real question with a real answer, and it does not require an all-or-nothing move.
          </p>
          <p>
            The fear of losing money is rational. But the fear of running out of money over a thirty-year retirement is also rational. Going entirely to cash trades one risk for another. Cash feels safe in the short term, but its purchasing power slowly erodes through inflation. A dollar that buys a loaf of bread today will buy less in twenty years. Retirees usually need some growth to keep up.
          </p>
        </section>

        <section id="sequence-of-returns">
          <h2>Sequence-of-returns risk</h2>
          <p>
            The technical name for the worry is sequence-of-returns risk. In plainer language: a market drop hurts more when it happens right after you retire, because you may be withdrawing money while the account is down. Selling investments at a low price to pay bills locks in losses that the account never gets a chance to recover.
          </p>
          <p>
            Two retirees can earn the same average return over twenty years and end up in very different places, just because the bad years happened in a different order. The retiree who experienced a few rough years first often ends up with much less than the one who experienced them later. That is the engine behind most of the conservative advice given in the five years before and after retirement.
          </p>
          <p>
            The protection against this risk is not to abandon stocks. It is to make sure you do not have to sell them during a downturn. That is where a bucket strategy helps.
          </p>
        </section>

        <section id="bucket-strategy">
          <h2>The bucket strategy</h2>
          <p>
            A bucket strategy separates your savings by when you will need the money. Short-term spending money sits in cash and very safe instruments. Medium-term needs are met by bonds, CDs, or other relatively stable holdings. Long-term money — the dollars you do not plan to touch for a decade or more — stays invested in stocks and broader markets, where it can grow.
          </p>
          <p>
            The advantage is psychological as much as financial. When the market drops, you are not selling stocks to buy groceries. You are spending from the cash bucket, while the long-term bucket has time to recover. Over the years, the safer buckets get refilled from the long-term bucket when conditions allow. It is a way to stay invested without feeling exposed.
          </p>
        </section>

        <section id="how-much-to-derisk">
          <h2>How much to de-risk</h2>
          <p>
            There is no single number that fits everyone. The right amount to shift toward safer holdings depends on how much guaranteed income you have, how flexible your spending is, how comfortable you are with market swings, and how long the money may need to last. A retiree with a generous pension and modest spending may keep more in stocks than one whose entire income depends on the portfolio.
          </p>
          <p>
            The general idea, often called a glide path, is to gradually reduce stock exposure as retirement approaches, then continue adjusting once you are retired. The shift is rarely dramatic — most retirees end up with a meaningful mix of growth and safety, not all of one or the other. We compare three of the most common safety tools in{" "}
            <Link href="/retirement-income/cds-bonds-annuities/">
              CDs vs bonds vs annuities
            </Link>
            , and look at how a guaranteed-income sleeve fits into the broader picture in{" "}
            <Link href="/retirement-income/guaranteed-income-allocation/">
              how much should be in guaranteed income
            </Link>
            .
          </p>
        </section>

        <section id="common-mistakes">
          <h2>Common mistakes</h2>
          <p>
            The most common mistake is moving everything to cash in a moment of fear, usually after a bad market headline. The market eventually recovers, but the cash position misses that recovery, and the long-term shortfall begins quietly.
          </p>
          <p>
            The opposite mistake is staying fully invested with no plan for the first few years of withdrawals, then being forced to sell at a low point when bills come due. Both extremes are avoidable with a written plan made before the next downturn rather than during one. If you are within a few years of retirement, walking through your situation with an advisor — and putting the bucket structure on paper before you need it — is one of the higher-value uses of an hour you will find. This article is part of the{" "}
            <Link href={PILLAR.href}>{PILLAR.title}</Link> guide.
          </p>
        </section>
      </ArticleShell>
    </main>
  );
}
