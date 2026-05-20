// Top-nav structure for The Mysterious Author.
// Built from the canonical article list in `lib/articles.ts` to avoid
// duplicating titles/slugs in two places.
//
// `For Retirees` is a hover/click-reveal mega-menu of grouped satellites,
// with the pillar promoted at the top. About + Contact stay top-level.
// /design-guide and /privacy are intentionally NOT linked here (internal /
// legal-only; the privacy link lives in the footer).

import { PILLAR, getSatellite, type ArticleMeta } from "./articles";

export type NavLink = {
  href: string;
  // Short label used in the nav (shorter than the full article title).
  label: string;
  // Optional full title for tooltips / aria-label, falling back to label.
  title?: string;
};

export type NavGroup = {
  label: string;
  links: NavLink[];
};

// Helper: build a NavLink from a satellite slug, picking a concise label.
function fromSlug(slug: string, label: string): NavLink {
  const sat = getSatellite(slug);
  if (!sat) {
    throw new Error(`nav.ts: unknown satellite slug "${slug}"`);
  }
  return { href: sat.href, label, title: sat.title };
}

export const RETIREES_FEATURED: NavLink = {
  href: PILLAR.href,
  label: PILLAR.title, // "Will My Money Last in Retirement?"
  title: PILLAR.title,
};

export const RETIREES_GROUPS: NavGroup[] = [
  {
    label: "Income Basics",
    links: [
      fromSlug("monthly-income-needs", "How Much Monthly Income Do I Need?"),
      fromSlug("retirement-paycheck", "How to Build a Retirement Paycheck"),
      fromSlug(
        "move-money-before-retirement",
        "Should I Move Money Out of the Market Before Retirement?",
      ),
      fromSlug("cds-bonds-annuities", "CDs vs Bonds vs Annuities"),
    ],
  },
  {
    label: "Annuities",
    links: [
      fromSlug("annuity-downsides", "Annuity Downsides"),
      fromSlug("annuity-fees-explained", "Annuity Fees Explained"),
      fromSlug("who-should-consider-annuity", "Who Should Consider an Annuity?"),
      fromSlug("guaranteed-income-allocation", "How Much in Guaranteed Income?"),
      fromSlug("compare-annuity-options", "Compare Annuity Options"),
      fromSlug("annuity-types-compared", "Fixed vs Indexed vs Income Annuity"),
    ],
  },
  {
    label: "Portfolio Planning",
    links: [
      fromSlug("portfolio-planning", "Retirement Income and Portfolio Planning"),
      fromSlug("portfolio-planning-2", "Retirement Income and Portfolio Planning (II)"),
    ],
  },
  {
    label: "Action",
    links: [
      fromSlug("income-review-checklist", "What to Bring to a Retirement Income Review"),
    ],
  },
];

// All hrefs under "For Retirees" — used by the nav to decide whether the
// parent button should render in active state.
export function isRetireesRoute(pathname: string): boolean {
  if (!pathname) return false;
  // Strip trailing slash for consistent compare (but keep root "/" as is).
  const normalized = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  if (normalized === "/retirement-income") return true;
  return normalized.startsWith("/retirement-income/");
}

// Convenience: flat list of every article-ish href the nav exposes.
// Useful for sanity tests.
export const RETIREES_ALL_HREFS: string[] = [
  RETIREES_FEATURED.href,
  ...RETIREES_GROUPS.flatMap((g) => g.links.map((l) => l.href)),
];

// Top-level (outside dropdown).
export const TOP_LEVEL_LINKS: NavLink[] = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
