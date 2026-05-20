import Link from "next/link";
import ArticleShell from "@/components/ArticleShell";
import { getSatellite, PILLAR, relatedFor } from "@/lib/articles";

const meta = getSatellite("who-should-consider-annuity")!;

export const metadata = {
  title: meta.title,
  description: meta.teaser,
};

const sections = [
  { id: "the-fit-question", heading: "The fit question" },
  { id: "good-fit-signals", heading: "Signals it's a good fit" },
  { id: "poor-fit-signals", heading: "Signals it's probably not" },
  { id: "income-gap", heading: "The income-gap test" },
  { id: "risk-tolerance", heading: "Risk tolerance and time horizon" },
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
          "guaranteed-income-allocation",
          "annuity-downsides",
        ])}
      >
        <p>
          Annuities are not for everyone, and they were never meant to be. The honest way to look at them is as a tool that does a specific job — turning a portion of savings into predictable income or protected principal. For some retirees, that job is exactly what their plan needs. For others, it is not, and that is fine. The point of this article is to help you tell which group you are in.
        </p>

        <section id="the-fit-question">
          <h2>The fit question</h2>
          <p>
            Instead of asking, &quot;should I buy an annuity,&quot; the better question is, &quot;does my plan need a piece of predictable income on top of what I already have?&quot; That single question replaces a lot of confusing comparison shopping.
          </p>
          <p>
            If your Social Security check and any pension already cover the bills you absolutely must pay, you may not need anything more on the predictable side. If they do not, an annuity is one of the tools that can close the gap. Other tools — bond ladders, dividend-focused investments, careful withdrawal strategies — can also do part of the job. An annuity is one option, not the only one.
          </p>
        </section>

        <section id="good-fit-signals">
          <h2>Signals it&apos;s a good fit</h2>
          <p>
            Annuities tend to fit better when several of these describe you:
          </p>
          <ul>
            <li>Social Security and any pension do not fully cover essential expenses</li>
            <li>You have a family history of longevity and a real chance of a thirty-year retirement</li>
            <li>You feel anxious about market swings to the point that you have considered going entirely to cash</li>
            <li>You want a check that arrives every month no matter what the markets do</li>
            <li>You want a spouse to be taken care of, with income that continues if you go first</li>
            <li>You have meaningful savings beyond what would go into the annuity, so flexibility elsewhere is preserved</li>
          </ul>
          <p>
            The thread running through these signals is the desire for a floor under essentials. When that floor matters more than the upside on every dollar, an annuity may fit one piece of the plan.
          </p>
        </section>

        <section id="poor-fit-signals">
          <h2>Signals it&apos;s probably not</h2>
          <p>
            Annuities tend to fit poorly when several of these describe you:
          </p>
          <ul>
            <li>Social Security, pension, and other guaranteed income already cover the bills with room to spare</li>
            <li>You value being able to move any dollar at any time more than you value monthly predictability</li>
            <li>You have a short retirement horizon for health or other reasons</li>
            <li>You enjoy managing investments and would find the contract&apos;s structure restrictive</li>
            <li>You do not yet have a clear monthly spending target — adding a product before the plan is built rarely ends well</li>
            <li>The dollars being considered are needed for something specific in the next few years</li>
          </ul>
          <p>
            None of these on its own rules out an annuity, but several together usually do. The kindest thing an advisor can do is tell someone in this profile, plainly, that an annuity is not what their plan needs.
          </p>
        </section>

        <section id="income-gap">
          <h2>The income-gap test</h2>
          <p>
            A practical way to test the fit is to do a one-page income-gap exercise. On the left side, write what you spend each month on essentials. On the right side, write what arrives each month in guaranteed income — Social Security and any pension.
          </p>
          <p>
            If the right side equals or exceeds the left, you already have your floor. Any additional predictable income would be a comfort feature, not a necessity. If the right side is meaningfully smaller, you have a real gap, and that gap can be closed several ways. An annuity is one of them. We work through how large the guaranteed sleeve should be in{" "}
            <Link href="/retirement-income/guaranteed-income-allocation/">
              how much should be in guaranteed income
            </Link>
            .
          </p>
        </section>

        <section id="risk-tolerance">
          <h2>Risk tolerance and time horizon</h2>
          <p>
            Risk tolerance is not just a number on a questionnaire. It shows up in how you sleep when the market falls fifteen percent in a month. Some retirees genuinely do not mind those years. Others lose sleep, change behavior, and sell at the wrong moment. Knowing which group you belong to is more valuable than any chart.
          </p>
          <p>
            Time horizon matters too. A retiree at sixty-five may be planning for thirty years. A retiree at seventy-eight has a different horizon. Annuities, especially income annuities, often look better the longer the planning window, because the predictability compounds over time. Either way, the right answer comes from a written plan that takes both factors into account — not from a sales pitch in isolation. This article is part of the{" "}
            <Link href={PILLAR.href}>{PILLAR.title}</Link> guide.
          </p>
        </section>
      </ArticleShell>
    </main>
  );
}
