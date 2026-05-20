// Single source of truth for retirement-income article metadata.
// Used by the pillar page and satellite pages to render related-article cards.

export type ArticleMeta = {
  slug: string; // "" for pillar
  href: string;
  title: string;
  teaser: string;
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
  },
  {
    slug: "retirement-paycheck",
    href: "/retirement-income/retirement-paycheck/",
    title:
      "How to Build a Retirement Paycheck From Social Security, Savings, and Investments",
    teaser: "A simple, stackable approach to replacing your working-years paycheck.",
  },
  {
    slug: "move-money-before-retirement",
    href: "/retirement-income/move-money-before-retirement/",
    title: "Should I Move Money Out of the Market Before Retirement?",
    teaser: "Sequence-of-returns risk, bucket strategies, and how much to de-risk.",
  },
  {
    slug: "cds-bonds-annuities",
    href: "/retirement-income/cds-bonds-annuities/",
    title: "CDs vs Bonds vs Annuities: Which Is Better for Retirement Income?",
    teaser: "Side-by-side: yield, liquidity, taxes, guarantees, and inflation risk.",
  },
  {
    slug: "annuity-downsides",
    href: "/retirement-income/annuity-downsides/",
    title: "What Are the Downsides of Annuities?",
    teaser: "The real trade-offs: complexity, fees, surrender, and lost upside.",
  },
  {
    slug: "annuity-fees-explained",
    href: "/retirement-income/annuity-fees-explained/",
    title:
      "Annuity Fees, Surrender Charges, and Guarantees Explained in Plain English",
    teaser: "What you actually pay, what's guaranteed, and what's marketing.",
  },
  {
    slug: "who-should-consider-annuity",
    href: "/retirement-income/who-should-consider-annuity/",
    title: "Who Should Consider an Annuity — and Who Should Probably Avoid One?",
    teaser: "A short fit-check based on income gap, risk tolerance, and time horizon.",
  },
  {
    slug: "guaranteed-income-allocation",
    href: "/retirement-income/guaranteed-income-allocation/",
    title: "How Much of My Retirement Savings Should Be in Guaranteed Income?",
    teaser: "Sizing the guaranteed-income sleeve without over-locking your portfolio.",
  },
  {
    slug: "compare-annuity-options",
    href: "/retirement-income/compare-annuity-options/",
    title: "How to Compare Annuity Options Before You Buy",
    teaser: "The seven numbers and clauses that actually differ between products.",
  },
  {
    slug: "annuity-types-compared",
    href: "/retirement-income/annuity-types-compared/",
    title: "Fixed Annuity vs Fixed Indexed Annuity vs Income Annuity",
    teaser: "Three flavors, three jobs — picking the right one for the right role.",
  },
  {
    slug: "income-review-checklist",
    href: "/retirement-income/income-review-checklist/",
    title: "What to Bring to a Retirement Income Review",
    teaser: "The documents and questions that make a 60-minute review actually useful.",
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
