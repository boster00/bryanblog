import Link from "next/link";

export default function SiteNav() {
  return (
    <nav
      className="sticky top-0 w-full z-50 bg-[var(--color-page)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-page)]/85 border-b border-[var(--color-neutral-mid)]/25 transition-shadow duration-300"
      aria-label="Main"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
        <Link
          href="/"
          className="group inline-flex items-center transition-opacity hover:opacity-80"
        >
          <span
            className="text-xl md:text-[1.375rem] font-semibold tracking-tight leading-none"
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--color-primary)",
            }}
          >
            Bryan Blog
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-9 text-sm font-medium">
          <Link
            href="/retirement-income/"
            className="nav-link-hover text-stone-700 hover:text-[var(--color-primary)] transition-colors text-[12px] tracking-[0.16em] uppercase font-semibold"
          >
            Guides
          </Link>
          <Link
            href="/about"
            className="nav-link-hover text-stone-700 hover:text-[var(--color-primary)] transition-colors text-[12px] tracking-[0.16em] uppercase font-semibold"
          >
            About
          </Link>
          <Link
            href="/design-guide"
            className="nav-link-hover text-stone-700 hover:text-[var(--color-primary)] transition-colors text-[12px] tracking-[0.16em] uppercase font-semibold"
          >
            Resources
          </Link>
          <Link
            href="/contact"
            className="nav-link-hover text-stone-700 hover:text-[var(--color-primary)] transition-colors text-[12px] tracking-[0.16em] uppercase font-semibold"
          >
            Contact
          </Link>
        </div>

        {/* Mobile fallback: simple inline links */}
        <div className="md:hidden flex items-center gap-4 text-[11px] uppercase tracking-widest text-stone-700 font-semibold">
          <Link href="/retirement-income/" className="hover:text-[var(--color-primary)]">
            Guides
          </Link>
          <Link href="/contact" className="hover:text-[var(--color-primary)]">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
