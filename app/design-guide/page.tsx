import Link from "next/link";
import Cta from "@/components/Cta";
import RelatedArticles from "@/components/RelatedArticles";

export const metadata = {
  title: "Design Guide",
  description:
    "Brand principles, design tokens, components, and article patterns for bryanblog.",
};

/* ──────────────────────────────────────────────────────────────
 * Small inline helpers (kept local — no need to bloat shared components/)
 * ────────────────────────────────────────────────────────────── */

type SectionProps = {
  id: string;
  name: string;
  subtitle: string;
  children: React.ReactNode;
};

function Section({ id, name, subtitle, children }: SectionProps) {
  return (
    <section
      id={id}
      className="section-card space-y-7 scroll-mt-24"
    >
      <header>
        <h2
          className="text-3xl md:text-4xl tracking-tight font-semibold"
          style={{
            fontFamily: "var(--font-serif)",
            color: "var(--color-primary)",
          }}
        >
          {name}
        </h2>
        <p className="text-stone-600 mt-2 text-[15px] leading-relaxed">{subtitle}</p>
      </header>
      <hr className="editorial-divider" />
      <div>{children}</div>
    </section>
  );
}

type Principle = {
  headline: string;
  body: string;
};

const PRINCIPLES: Principle[] = [
  {
    headline: "Written for near-retirees and recent retirees.",
    body:
      "Readers have $250K–$2M saved and one core worry: running out. Every page should speak directly to that anxiety.",
  },
  {
    headline: "Calm, plain-spoken, mature.",
    body:
      "Kitchen-table conversation — never salesy. No hype, no urgency tactics, no exclamation points.",
  },
  {
    headline: "8th-grade reading level.",
    body:
      "Define jargon the first time you use it. If a 65-year-old has to re-read a sentence, rewrite it.",
  },
  {
    headline: "Compliance-aware by default.",
    body:
      "No product names, no insurer names, no specific projections. Always caveat guarantees with “subject to the insurance company's claims-paying ability.”",
  },
  {
    headline: "CTA is a conversation, not a sale.",
    body:
      "“Request a retirement income review” — never “buy.” The reader's next step is a discussion, not a transaction.",
  },
  {
    headline: "Search the way a layperson talks.",
    body:
      "Section headings phrased as the questions a real person would type: “How much do I need?” not “Income sufficiency thresholds.”",
  },
];

type Token = {
  name: string;
  cssVar: string;
  hex: string;
};

const COLOR_TOKENS: Token[] = [
  { name: "Primary (teal-navy)", cssVar: "--color-primary", hex: "#1C4259" },
  { name: "Accent (muted oxblood)", cssVar: "--color-accent", hex: "#8C3A2E" },
  { name: "Page background (warm cream)", cssVar: "--color-page", hex: "#FAF9F8" },
  { name: "Accent tint", cssVar: "--color-accent-tint", hex: "#F4D9C9" },
  { name: "Neutral mid", cssVar: "--color-neutral-mid", hex: "#B5A99A" },
];

const SPACING_SCALE: { token: string; px: string }[] = [
  { token: "p-1", px: "4px" },
  { token: "p-2", px: "8px" },
  { token: "p-4", px: "16px" },
  { token: "p-6", px: "24px" },
  { token: "p-8", px: "32px" },
  { token: "p-12", px: "48px" },
  { token: "p-16", px: "64px" },
];

const VOICE_PAIRS: { good: string; bad: string }[] = [
  {
    good: "Your money may need to last 25 years or more.",
    bad: "Unlock the secret to retirement abundance!",
  },
  {
    good: "An annuity is one tool that may fit part of your plan.",
    bad: "Annuities are the ultimate retirement solution.",
  },
  {
    good: "Subject to the insurance company's claims-paying ability.",
    bad: "100% guaranteed forever.",
  },
  {
    good: "Let's look at what you'd give up.",
    bad: "Don't worry about the details — we've got you covered.",
  },
  {
    good: "A retirement income review can help you decide.",
    bad: "Buy now before rates change!",
  },
  {
    good: "Some retirees prefer to keep two years of spending in cash.",
    bad: "Smart retirees always choose cash buffers.",
  },
  {
    good: "Depending on your situation, this may or may not fit.",
    bad: "This will work for you.",
  },
];

const TOC: { id: string; label: string }[] = [
  { id: "principles", label: "Brand Principles" },
  { id: "colors", label: "Color Palette" },
  { id: "typography", label: "Typography" },
  { id: "spacing", label: "Spacing Scale" },
  { id: "components", label: "Components" },
  { id: "article-patterns", label: "Article Patterns" },
  { id: "voice-and-tone", label: "Voice & Tone" },
];

export default function DesignGuidePage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-14 md:py-20">
      {/* Header */}
      <header className="mb-12 md:mb-16 max-w-3xl">
        <p className="eyebrow mb-4">Internal · Brand Reference</p>
        <h1
          className="text-5xl md:text-6xl font-semibold tracking-tight leading-[1.02]"
          style={{
            fontFamily: "var(--font-serif)",
            color: "var(--color-primary)",
          }}
        >
          Design Guide
        </h1>
        <p className="mt-5 text-lg text-stone-700 leading-relaxed">
          How bryanblog looks, sounds, and feels.
        </p>
      </header>

      <div className="grid md:grid-cols-[minmax(0,1fr)_220px] gap-12">
        {/* Body */}
        <div className="space-y-10">
          {/* 1. Principles */}
          <Section
            id="principles"
            name="Brand Principles"
            subtitle="Six rules every page honors."
          >
            <ol className="grid gap-7 md:grid-cols-2 list-none p-0 m-0">
              {PRINCIPLES.map((p, i) => (
                <li key={p.headline} className="flex flex-col gap-2.5">
                  <span aria-hidden className="terracotta-hairline" />
                  <p
                    className="font-semibold text-[1.0625rem] leading-snug"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {i + 1}. {p.headline}
                  </p>
                  <p className="text-stone-700 leading-relaxed text-[15px]">
                    {p.body}
                  </p>
                </li>
              ))}
            </ol>
          </Section>

          {/* 2. Colors */}
          <Section
            id="colors"
            name="Color Palette"
            subtitle="Five tokens — teal-navy + muted oxblood on warm cream."
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-stone-600 border-b border-[var(--color-neutral-mid)]/30">
                    <th className="py-3 pr-4 font-semibold">Token</th>
                    <th className="py-3 pr-4 font-semibold">CSS variable</th>
                    <th className="py-3 pr-4 font-semibold">Hex</th>
                    <th className="py-3 pr-4 font-semibold">Swatch</th>
                  </tr>
                </thead>
                <tbody>
                  {COLOR_TOKENS.map((t) => (
                    <tr
                      key={t.cssVar}
                      className="border-b border-[var(--color-neutral-mid)]/20"
                    >
                      <td className="py-4 pr-4 font-medium text-stone-800">
                        {t.name}
                      </td>
                      <td className="py-4 pr-4 font-mono text-xs text-stone-700">
                        {t.cssVar}
                      </td>
                      <td className="py-4 pr-4 font-mono text-xs text-stone-700">
                        {t.hex}
                      </td>
                      <td className="py-4 pr-4">
                        <div
                          className="h-16 w-16 rounded-lg border border-[var(--color-neutral-mid)]/30"
                          style={{ background: t.hex }}
                          aria-label={`${t.name} swatch`}
                        />
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="py-4 pr-4 font-medium text-stone-800">
                      Body text
                    </td>
                    <td className="py-4 pr-4 font-mono text-xs text-stone-700">
                      stone-800
                    </td>
                    <td className="py-4 pr-4 font-mono text-xs text-stone-700">
                      #292524
                    </td>
                    <td className="py-4 pr-4">
                      <div
                        className="h-16 w-16 rounded-lg border border-[var(--color-neutral-mid)]/30"
                        style={{ background: "#292524" }}
                        aria-label="Body text swatch"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-stone-600 mt-5 leading-relaxed">
              Primary (#1C4259) on page (#FAF9F8) clears WCAG AA for body and
              headings. Accent (#8C3A2E) on page clears AA for body text. Avoid
              accent text on accent-tint backgrounds at small sizes — contrast
              drops below AA.
            </p>
          </Section>

          {/* 3. Typography */}
          <Section
            id="typography"
            name="Typography"
            subtitle="Fraunces for narrative weight; Inter for clean body reads."
          >
            <div className="space-y-8">
              {/* Display */}
              <div>
                <p
                  className="text-5xl tracking-tight font-semibold"
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: "var(--color-primary)",
                  }}
                >
                  Display heading
                </p>
                <p className="mt-2 text-xs font-mono text-stone-600">
                  font-serif · text-5xl · tracking-tight · color: primary
                </p>
              </div>

              {/* H1 */}
              <div>
                <h1
                  className="text-4xl font-semibold tracking-tight"
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: "var(--color-primary)",
                  }}
                >
                  H1 — page title
                </h1>
                <p className="mt-2 text-xs font-mono text-stone-600">
                  font-serif · text-4xl · tracking-tight
                </p>
              </div>

              {/* H2 */}
              <div>
                <h2
                  className="text-3xl font-semibold tracking-tight"
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: "var(--color-primary)",
                  }}
                >
                  H2 — section heading
                </h2>
                <p className="mt-2 text-xs font-mono text-stone-600">
                  font-serif · text-3xl · tracking-tight
                </p>
              </div>

              {/* H3 */}
              <div>
                <h3
                  className="text-xl font-semibold tracking-tight"
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: "var(--color-primary)",
                  }}
                >
                  H3 — subsection
                </h3>
                <p className="mt-2 text-xs font-mono text-stone-600">
                  font-serif · text-xl · tracking-tight
                </p>
              </div>

              {/* Body */}
              <div>
                <p className="text-base leading-relaxed text-stone-800">
                  Body — the quick brown fox jumps over the lazy dog. A
                  retirement income plan should turn savings into reliable,
                  predictable cashflow.
                </p>
                <p className="mt-2 text-xs font-mono text-stone-600">
                  font-sans · text-base · leading-relaxed · stone-800
                </p>
              </div>

              {/* Body small */}
              <div>
                <p className="text-sm leading-relaxed text-stone-700">
                  Body small — used for captions, footnotes, and the “last
                  updated” line at the foot of a page.
                </p>
                <p className="mt-2 text-xs font-mono text-stone-600">
                  font-sans · text-sm · leading-relaxed · stone-700
                </p>
              </div>

              {/* Eyebrow */}
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "var(--color-accent)" }}
                >
                  Eyebrow label
                </p>
                <p className="mt-2 text-xs font-mono text-stone-600">
                  text-xs · uppercase · tracking-widest · color: accent
                </p>
              </div>
            </div>
          </Section>

          {/* 4. Spacing */}
          <Section
            id="spacing"
            name="Spacing Scale"
            subtitle="Tailwind's default scale — used consistently across cards, prose, and nav."
          >
            <div className="flex flex-wrap items-end gap-6">
              {SPACING_SCALE.map((s) => {
                // Map token to a fixed pixel width so the strip is visual, not class-driven
                const pxNum = parseInt(s.px, 10);
                return (
                  <div key={s.token} className="flex flex-col items-center">
                    <div
                      className="rounded"
                      style={{
                        width: `${pxNum}px`,
                        height: "64px",
                        background: "var(--color-accent-tint)",
                        border: "1px solid rgba(140, 58, 46, 0.18)",
                      }}
                      aria-hidden
                    />
                    <span className="mt-2 text-xs font-mono text-stone-700">
                      {s.token}
                    </span>
                    <span className="text-[10px] font-mono text-stone-500">
                      {s.px}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="text-sm text-stone-600 mt-5 leading-relaxed">
              bryanblog uses Tailwind's default 4-px-based spacing scale —
              nothing custom. Cards favor p-8; prose favors generous vertical
              rhythm (mb-6 to mb-10).
            </p>
          </Section>

          {/* 5. Components */}
          <Section
            id="components"
            name="Components"
            subtitle="Live specimens of the components used across the site."
          >
            <div className="space-y-10">
              {/* Primary button (just the button) */}
              <div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold tracking-wide no-underline transition-transform hover:-translate-y-0.5"
                  style={{
                    backgroundColor: "var(--color-accent)",
                    color: "#ffffff",
                  }}
                >
                  Request a Retirement Income Review
                  <span aria-hidden>→</span>
                </Link>
                <p className="mt-3 text-sm text-stone-600">
                  Primary button — terracotta pill, white text, gentle hover
                  lift. Used as the page-level CTA.
                </p>
              </div>

              {/* Link in prose */}
              <div>
                <div className="prose-article">
                  <p>
                    This is a sample paragraph showing an{" "}
                    <a href="/retirement-income/">
                      inline link inside prose
                    </a>{" "}
                    — terracotta underline that intensifies on hover.
                  </p>
                </div>
                <p className="mt-2 text-sm text-stone-600">
                  Link in prose — underline-on-hover, accent color, used inside{" "}
                  <code className="font-mono text-xs bg-stone-100 px-1 rounded">
                    .prose-article
                  </code>{" "}
                  containers.
                </p>
              </div>

              {/* Nav link */}
              <div>
                <Link
                  href="/about"
                  className="nav-link-hover hover:text-[var(--color-primary)] transition-colors uppercase tracking-widest text-[10px] text-stone-600 font-medium"
                >
                  About
                </Link>
                <p className="mt-3 text-sm text-stone-600">
                  Nav link — uppercase, tracking-widest, animated terracotta
                  underline on hover.
                </p>
              </div>

              {/* Related article card */}
              <div>
                <RelatedArticles
                  heading="Related-article card example"
                  items={[
                    {
                      href: "/retirement-income/monthly-income-needs/",
                      title:
                        "How Much Monthly Income Do I Need in Retirement?",
                      teaser:
                        "A simple way to estimate your real monthly need — and how Social Security fits in.",
                    },
                    {
                      href: "/retirement-income/cds-bonds-annuities/",
                      title:
                        "CDs vs Bonds vs Annuities: Which Is Better for Retirement Income?",
                      teaser:
                        "Three tools, three different jobs. Here's how they actually compare.",
                    },
                  ]}
                />
                <p className="mt-3 text-sm text-stone-600">
                  Related-article card — warm-shadow card with serif title,
                  body teaser, and a small accent “Read article” pointer.
                </p>
              </div>

              {/* CTA block */}
              <div>
                <Cta
                  heading="Sample CTA"
                  body="Sample body copy explaining what to do next."
                  href="/contact"
                  label="Request a Retirement Income Review"
                />
                <p className="mt-3 text-sm text-stone-600">
                  CTA block — accent-tint background, serif heading,
                  terracotta pill button with white text. Drop into long-form
                  articles every 800–1200 words.
                </p>
              </div>
            </div>
          </Section>

          {/* 6. Article patterns */}
          <Section
            id="article-patterns"
            name="Article Patterns"
            subtitle="The editorial patterns that ride on top of .prose-article."
          >
            <div className="space-y-10">
              {/* H2 with terracotta underline */}
              <div>
                <div className="prose-article">
                  <h2>How long should my income plan last?</h2>
                  <p className="!text-base">
                    The accent rule under each H2 is automatic — it's a
                    pseudo-element on{" "}
                    <code>.prose-article h2</code>.
                  </p>
                </div>
                <p className="mt-2 text-sm text-stone-600">
                  H2 with terracotta underline — use for the primary sections
                  of any retirement-income article.
                </p>
              </div>

              {/* Drop-cap paragraph */}
              <div>
                <div className="prose-article">
                  <p>
                    Retirement income planning starts with a simple question:
                    will the money last? The first letter of the first
                    paragraph in any <code>.prose-article</code> container
                    automatically becomes a serif drop-cap in muted oxblood —
                    no extra markup needed.
                  </p>
                </div>
                <p className="mt-2 text-sm text-stone-600">
                  Drop-cap paragraph — auto-applied to the first{" "}
                  <code className="font-mono text-xs bg-stone-100 px-1 rounded">
                    &lt;p&gt;
                  </code>{" "}
                  of every article body.
                </p>
              </div>

              {/* Inline deep-dive link */}
              <div>
                <div className="prose-article">
                  <p>
                    <em>
                      → Deep dive:{" "}
                      <a href="/retirement-income/annuity-types-compared/">
                        Fixed Annuity vs Fixed Indexed Annuity vs Income
                        Annuity
                      </a>
                    </em>
                  </p>
                </div>
                <p className="mt-2 text-sm text-stone-600">
                  Inline deep-dive link — drops a reader into a satellite
                  article without breaking the flow of the pillar.
                </p>
              </div>

              {/* Blockquote */}
              <div>
                <div className="prose-article">
                  <blockquote>
                    A guarantee is only as strong as the company standing
                    behind it. That's worth saying out loud.
                  </blockquote>
                </div>
                <p className="mt-2 text-sm text-stone-600">
                  Blockquote — left-bordered terracotta, italic Fraunces.
                  Reserve for one or two punchy lines per article.
                </p>
              </div>

              {/* Lists */}
              <div>
                <div className="prose-article">
                  <ul>
                    <li>Bulleted list with terracotta markers.</li>
                    <li>Used for parallel ideas of equal weight.</li>
                    <li>Keep each item to one line where possible.</li>
                  </ul>
                  <ol>
                    <li>Numbered list — for sequenced steps.</li>
                    <li>Same terracotta marker color.</li>
                    <li>Useful in checklists and how-to flows.</li>
                  </ol>
                </div>
                <p className="mt-2 text-sm text-stone-600">
                  Lists — bulleted for parallel ideas, numbered for ordered
                  steps. Both use accent-colored markers.
                </p>
              </div>

              {/* Inline strong */}
              <div>
                <div className="prose-article">
                  <p>
                    The job of an income plan is{" "}
                    <strong>predictable cashflow</strong>, not maximum return.
                    That distinction matters more than most people realize.
                  </p>
                </div>
                <p className="mt-2 text-sm text-stone-600">
                  Inline strong — tightens to stone-900, semibold. Use
                  sparingly: one or two emphases per paragraph at most.
                </p>
              </div>

              {/* Compliance caveat */}
              <div>
                <div className="prose-article">
                  <p>
                    Income annuities offer payments that continue for life —{" "}
                    <em>
                      subject to the insurance company's claims-paying
                      ability
                    </em>
                    . That caveat is part of the product, not a footnote.
                  </p>
                </div>
                <p className="mt-2 text-sm text-stone-600">
                  Compliance caveat — every mention of a guarantee gets this
                  italic qualifier inline, never relegated to a footer.
                </p>
              </div>
            </div>
          </Section>

          {/* 7. Voice & Tone */}
          <Section
            id="voice-and-tone"
            name="Voice & Tone"
            subtitle="Calm > clever. Concrete > vague. Honest trade-offs > absolutes."
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{ color: "var(--color-primary)" }}
                >
                  Sounds like
                </p>
                <ul className="space-y-3">
                  {VOICE_PAIRS.map((p) => (
                    <li
                      key={p.good}
                      className="rounded-lg p-3 text-stone-800 leading-relaxed"
                      style={{
                        background: "rgba(28, 66, 89, 0.05)",
                        borderLeft: "3px solid var(--color-primary)",
                      }}
                    >
                      {p.good}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{ color: "var(--color-accent)" }}
                >
                  Doesn't sound like
                </p>
                <ul className="space-y-3">
                  {VOICE_PAIRS.map((p) => (
                    <li
                      key={p.bad}
                      className="rounded-lg p-3 text-stone-700 leading-relaxed line-through decoration-[var(--color-accent)]/40"
                      style={{
                        background: "rgba(140, 58, 46, 0.06)",
                        borderLeft: "3px solid var(--color-accent)",
                      }}
                    >
                      {p.bad}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-sm text-stone-600 mt-6 leading-relaxed">
              Calm &gt; clever. Concrete &gt; vague. Honest trade-offs &gt;
              absolutes.
            </p>
          </Section>
        </div>

        {/* Sticky right-rail TOC (desktop only) */}
        <aside className="hidden md:block">
          <nav
            className="pillar-toc"
            aria-label="On this page"
          >
            <p className="pillar-toc__title">On this page</p>
            {TOC.map((t) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                className="pillar-toc__link"
              >
                {t.label}
              </a>
            ))}
          </nav>
        </aside>
      </div>

      {/* Last updated */}
      <p className="mt-16 text-xs text-stone-500 font-mono">
        Last updated: May 19, 2026
      </p>
    </main>
  );
}
