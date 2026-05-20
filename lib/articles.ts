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
  source: "cjgeo",
  cjgeoArticleId: "46f22071-6075-417f-b4dc-37c32aa3510f",
  mainKeyword: "will my money last in retirement",
};

export const SATELLITES: ArticleMeta[] = [
  {
    slug: "monthly-income-needs",
    href: "/retirement-income/monthly-income-needs/",
    title: "How Much Monthly Income Do I Need in Retirement?",
    teaser: "Translate today's spending into a realistic monthly retirement number.",
    source: "cjgeo",
    cjgeoArticleId: "253c5ee8-1704-4b6e-88d1-d2fb839cb16c",
    mainKeyword: "retirement income",
  },
  {
    slug: "retirement-paycheck",
    href: "/retirement-income/retirement-paycheck/",
    title:
      "How to Build a Retirement Paycheck From Social Security, Savings, and Investments",
    teaser: "A simple, stackable approach to replacing your working-years paycheck.",
    source: "cjgeo",
    cjgeoArticleId: "c5f8abb9-4caf-495f-a832-447c425ac713",
    mainKeyword: "retirement paycheck",
  },
  {
    slug: "move-money-before-retirement",
    href: "/retirement-income/move-money-before-retirement/",
    title: "Should I Move Money Out of the Market Before Retirement?",
    teaser: "Sequence-of-returns risk, bucket strategies, and how much to de-risk.",
    source: "cjgeo",
    cjgeoArticleId: "d03cde8c-5aca-43ab-80f9-9bc898cb81f8",
    mainKeyword: "pre retirement portfolio",
  },
  {
    slug: "cds-bonds-annuities",
    href: "/retirement-income/cds-bonds-annuities/",
    title: "CDs vs Bonds vs Annuities: Which Is Better for Retirement Income?",
    teaser: "Side-by-side: yield, liquidity, taxes, guarantees, and inflation risk.",
    source: "cjgeo",
    cjgeoArticleId: "5c1c8043-ef29-4675-bfdd-fd457a85a849",
    mainKeyword: "safe retirement investments",
  },
  {
    slug: "annuity-downsides",
    href: "/retirement-income/annuity-downsides/",
    title: "What Are the Downsides of Annuities?",
    teaser: "The real trade-offs: complexity, fees, surrender, and lost upside.",
    source: "cjgeo",
    cjgeoArticleId: "dc22d86a-3cd0-4d7f-9041-5e0d9a8ea6f0",
    mainKeyword: "annuity downsides",
  },
  {
    slug: "annuity-fees-explained",
    href: "/retirement-income/annuity-fees-explained/",
    title:
      "Annuity Fees, Surrender Charges, and Guarantees Explained in Plain English",
    teaser: "What you actually pay, what's guaranteed, and what's marketing.",
    source: "cjgeo",
    cjgeoArticleId: "01a03fa4-6eec-41c5-ad11-1de0dfaa26b6",
    mainKeyword: "annuity fees",
  },
  {
    slug: "who-should-consider-annuity",
    href: "/retirement-income/who-should-consider-annuity/",
    title: "Who Should Consider an Annuity — and Who Should Probably Avoid One?",
    teaser: "A short fit-check based on income gap, risk tolerance, and time horizon.",
    source: "cjgeo",
    cjgeoArticleId: "0163f112-01e1-4954-b63b-6c257fc69564",
    mainKeyword: "annuity suitability",
  },
  {
    slug: "guaranteed-income-allocation",
    href: "/retirement-income/guaranteed-income-allocation/",
    title: "How Much of My Retirement Savings Should Be in Guaranteed Income?",
    teaser: "Sizing the guaranteed-income sleeve without over-locking your portfolio.",
    source: "cjgeo",
    cjgeoArticleId: "2a6ef640-8b5a-4da6-864c-c976e3b6e6ac",
    mainKeyword: "guaranteed retirement income",
  },
  {
    slug: "compare-annuity-options",
    href: "/retirement-income/compare-annuity-options/",
    title: "How to Compare Annuity Options Before You Buy",
    teaser: "The seven numbers and clauses that actually differ between products.",
    source: "cjgeo",
    cjgeoArticleId: "83ae9418-1798-4a4d-9238-ad3ae1572a92",
    mainKeyword: "annuity comparison",
  },
  {
    slug: "annuity-types-compared",
    href: "/retirement-income/annuity-types-compared/",
    title: "Fixed Annuity vs Fixed Indexed Annuity vs Income Annuity",
    teaser: "Three flavors, three jobs — picking the right one for the right role.",
    source: "cjgeo",
    cjgeoArticleId: "96b4d588-2eb9-46a0-9fc3-c0a2465abf34",
    mainKeyword: "annuity types",
  },
  {
    slug: "portfolio-planning",
    href: "/retirement-income/portfolio-planning/",
    title: "Retirement Income and Portfolio Planning",
    teaser: "Build a portfolio that does the income job you need — predictable monthly checks, fewer market knocks.",
    source: "cjgeo",
    cjgeoArticleId: "01c3334a-4f13-4a62-95d7-25bc784e74a5",
    mainKeyword: "retirement income annuity",
  },
  {
    slug: "portfolio-planning-2",
    href: "/retirement-income/portfolio-planning-2/",
    title: "Retirement Income and Portfolio Planning - 2",
    teaser:
      "Layer Social Security, savings, and guaranteed income so your plan can handle market dips without panic moves.",
    source: "cjgeo",
    cjgeoArticleId: "ff1b1af3-20e6-41e5-bada-140bda7ea55d",
    mainKeyword: "annuity portfolio",
  },
  {
    slug: "income-review-checklist",
    href: "/retirement-income/income-review-checklist/",
    title: "What to Bring to a Retirement Income Review",
    teaser: "The documents and questions that make a 60-minute review actually useful.",
    source: "cjgeo",
    cjgeoArticleId: "d362872f-23ac-424f-81a0-a771df51b2f8",
    mainKeyword: "retirement income review",
  },
];

// Utility (non-article) pages that are still CJGEO-hydrated.
// /about is a full editorial page; /contact uses an intro-block; the home page
// uses a "why this blog exists" intro block. /design-guide and /privacy stay
// native — see scripts/README or the BryanBlog skill book for reasoning.
export type UtilityArticleMeta = {
  key: "about" | "contact" | "home-why";
  title: string;
  source: "cjgeo";
  cjgeoArticleId?: string;
  mainKeyword?: string;
  adoptedAt?: string;
  contentPath: string; // relative to repo root
};

export const UTILITY_ARTICLES: Record<string, UtilityArticleMeta> = {
  about: {
    key: "about",
    title: "About This Blog",
    source: "cjgeo",
    cjgeoArticleId: "0be37653-7ab3-4aa1-8ebf-de12da714514",
    mainKeyword: "retirement planning blog",
    adoptedAt: "2026-05-20",
    contentPath: "content/about/index.html",
  },
  contact: {
    key: "contact",
    title: "Contact the Author",
    source: "cjgeo",
    cjgeoArticleId: "c1576088-5313-43ed-8b8d-ac806ac1278e",
    mainKeyword: "retirement income review",
    adoptedAt: "2026-05-20",
    contentPath: "content/contact/intro.html",
  },
  "home-why": {
    key: "home-why",
    title: "Why This Blog Exists",
    source: "cjgeo",
    cjgeoArticleId: "23fba853-8d26-4438-86be-0ebf1df3f211",
    mainKeyword: "plain english retirement planning advice",
    adoptedAt: "2026-05-20",
    contentPath: "content/home/why-this-blog-exists.html",
  },
};

export function getSatellite(slug: string): ArticleMeta | undefined {
  return SATELLITES.find((s) => s.slug === slug);
}

export function relatedFor(slugs: string[]) {
  return slugs
    .map((s) => SATELLITES.find((x) => x.slug === s))
    .filter((x): x is ArticleMeta => Boolean(x));
}
