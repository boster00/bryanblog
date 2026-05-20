// Single source of truth for retirement-income article metadata.
// Used by the pillar page and satellite pages to render related-article cards.

export type ArticleMeta = {
  slug: string; // "" for pillar
  href: string;
  title: string;
  teaser: string;
  // CJGEO-hydrated satellites carry source tagging + traceability metadata.
  source?: "cjgeo";
  cjgeoArticleId?: string;
  mainKeyword?: string;
};

export const PILLAR: ArticleMeta = {
  slug: "",
  href: "/retirement-income/",
  title: "Will My Money Last in Retirement?",
  teaser:
    "The pillar guide: longevity, withdrawal plans, safe-vs-invested mix, and where annuities fit.",
};

export const SATELLITES: ArticleMeta[] = [
  {
    slug: "monthly-income-needs",
    href: "/retirement-income/monthly-income-needs/",
    title: "How Much Monthly Income Do I Need in Retirement?",
    teaser: "Translate today's spending into a realistic monthly retirement number.",
    source: "cjgeo",
    cjgeoArticleId: "30376b1c-18c8-425a-a28c-6ed444af656a",
    mainKeyword: "how much monthly income do I need in retirement",
  },
  {
    slug: "retirement-paycheck",
    href: "/retirement-income/retirement-paycheck/",
    title:
      "How to Build a Retirement Paycheck From Social Security, Savings, and Investments",
    teaser: "A simple, stackable approach to replacing your working-years paycheck.",
    source: "cjgeo",
    cjgeoArticleId: "8c0d38a4-e6ab-450a-aca5-6b9fef02e927",
    mainKeyword: "how to create a retirement paycheck",
  },
  {
    slug: "move-money-before-retirement",
    href: "/retirement-income/move-money-before-retirement/",
    title: "Should I Move Money Out of the Market Before Retirement?",
    teaser: "Sequence-of-returns risk, bucket strategies, and how much to de-risk.",
    source: "cjgeo",
    cjgeoArticleId: "3fc37aee-c003-4a31-971c-c4e997474a81",
    mainKeyword: "should I move money out of the market before retirement",
  },
  {
    slug: "cds-bonds-annuities",
    href: "/retirement-income/cds-bonds-annuities/",
    title: "CDs vs Bonds vs Annuities: Which Is Better for Retirement Income?",
    teaser: "Side-by-side: yield, liquidity, taxes, guarantees, and inflation risk.",
    source: "cjgeo",
    cjgeoArticleId: "361ee1e0-422c-4c40-8a2d-50de9ddd7d70",
    mainKeyword: "cds vs bonds vs annuities",
  },
  {
    slug: "annuity-downsides",
    href: "/retirement-income/annuity-downsides/",
    title: "What Are the Downsides of Annuities?",
    teaser: "The real trade-offs: complexity, fees, surrender, and lost upside.",
    source: "cjgeo",
    cjgeoArticleId: "01a3440b-e858-4d5e-ae71-0323044eaa4e",
    mainKeyword: "annuity downsides",
  },
  {
    slug: "annuity-fees-explained",
    href: "/retirement-income/annuity-fees-explained/",
    title:
      "Annuity Fees, Surrender Charges, and Guarantees Explained in Plain English",
    teaser: "What you actually pay, what's guaranteed, and what's marketing.",
    source: "cjgeo",
    cjgeoArticleId: "920fe91c-cd96-4094-a9e9-63a37190cafa",
    mainKeyword: "annuity fees explained",
  },
  {
    slug: "who-should-consider-annuity",
    href: "/retirement-income/who-should-consider-annuity/",
    title: "Who Should Consider an Annuity — and Who Should Probably Avoid One?",
    teaser: "A short fit-check based on income gap, risk tolerance, and time horizon.",
    source: "cjgeo",
    cjgeoArticleId: "c8417e2d-738e-4242-a2c8-72a09573d440",
    mainKeyword: "who should consider an annuity",
  },
  {
    slug: "guaranteed-income-allocation",
    href: "/retirement-income/guaranteed-income-allocation/",
    title: "How Much of My Retirement Savings Should Be in Guaranteed Income?",
    teaser: "Sizing the guaranteed-income sleeve without over-locking your portfolio.",
    source: "cjgeo",
    cjgeoArticleId: "8f14e4f3-6ec1-4d2e-bb92-c8c96cf3b3d8",
    mainKeyword: "how much retirement savings in guaranteed income",
  },
  {
    slug: "compare-annuity-options",
    href: "/retirement-income/compare-annuity-options/",
    title: "How to Compare Annuity Options Before You Buy",
    teaser: "The seven numbers and clauses that actually differ between products.",
    source: "cjgeo",
    cjgeoArticleId: "b38be866-0a1a-424e-9564-d26957810beb",
    mainKeyword: "how to compare annuity options",
  },
  {
    slug: "annuity-types-compared",
    href: "/retirement-income/annuity-types-compared/",
    title: "Fixed Annuity vs Fixed Indexed Annuity vs Income Annuity",
    teaser: "Three flavors, three jobs — picking the right one for the right role.",
    source: "cjgeo",
    cjgeoArticleId: "c1889821-d0c5-4a66-b96c-4abb2b5f17b8",
    mainKeyword: "fixed vs indexed vs income annuity",
  },
  {
    slug: "income-review-checklist",
    href: "/retirement-income/income-review-checklist/",
    title: "What to Bring to a Retirement Income Review",
    teaser: "The documents and questions that make a 60-minute review actually useful.",
    source: "cjgeo",
    cjgeoArticleId: "35bc1399-84e6-4c05-8260-b4f2bdeaf6a6",
    mainKeyword: "what to bring to a retirement income review",
  },
];

export function getSatellite(slug: string): ArticleMeta | undefined {
  return SATELLITES.find((s) => s.slug === slug);
}

export function relatedFor(slugs: string[]) {
  return slugs
    .map((s) => SATELLITES.find((x) => x.slug === s))
    .filter((x): x is ArticleMeta => Boolean(x));
}
