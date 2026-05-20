import Link from "next/link";

export default function SiteNav() {
  return (
    <nav
      className="fixed top-0 w-full z-50 bg-[var(--color-page)] border-b border-[var(--color-primary)]/10 transition-shadow duration-500"
      aria-label="Main"
    >
      {/* Brand-accent top hairline */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-accent)]/60 to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
        <Link
          href="/"
          className="group flex items-center gap-2 transition-opacity hover:opacity-90"
        >
          <span
            className="text-xl md:text-2xl font-semibold tracking-tight"
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--color-primary)",
            }}
          >
            Bryan Blog
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <Link
            href="/"
            className="nav-link-hover hover:text-[var(--color-primary)] transition-colors uppercase tracking-widest text-[10px]"
          >
            Home
          </Link>
          <Link
            href="/retirement-income/"
            className="nav-link-hover hover:text-[var(--color-primary)] transition-colors uppercase tracking-widest text-[10px]"
          >
            Retirement Income
          </Link>
          <Link
            href="/about"
            className="nav-link-hover hover:text-[var(--color-primary)] transition-colors uppercase tracking-widest text-[10px]"
          >
            About
          </Link>
        </div>

        {/* Mobile fallback: simple inline links (no JS toggle for v1) */}
        <div className="md:hidden flex items-center gap-4 text-[11px] uppercase tracking-widest text-stone-600">
          <Link href="/" className="hover:text-[var(--color-primary)]">
            Home
          </Link>
          <Link
            href="/retirement-income/"
            className="hover:text-[var(--color-primary)]"
          >
            Income
          </Link>
        </div>
      </div>
    </nav>
  );
}
