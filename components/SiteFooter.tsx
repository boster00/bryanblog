import Link from "next/link";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#0F1522] border-t border-white/[0.06] relative overflow-hidden mt-24">
      <div
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-accent)]/35 to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-gradient-to-b from-[var(--color-accent)]/[0.04] to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-5xl mx-auto px-6 pt-12 pb-8 flex flex-col items-center gap-5 text-center">
        <p
          className="text-white/85 text-lg"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Bryan Blog
        </p>

        <p className="max-w-xl text-white/55 text-[12px] leading-[1.7]">
          Plain-English answers about retirement income, annuities, and the
          trade-offs between safety and growth.
        </p>

        <div className="flex items-center gap-3">
          <div className="h-px w-12 bg-white/15" />
          <div className="w-1 h-1 rounded-full bg-[var(--color-accent)]/50" />
          <div className="h-px w-12 bg-white/15" />
        </div>

        <div className="flex flex-wrap justify-center gap-x-7 gap-y-2 text-white/55 text-[11px] font-medium tracking-widest uppercase">
          <Link
            href="/"
            className="hover:text-white/85 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            href="/retirement-income/"
            className="hover:text-white/85 transition-colors duration-300"
          >
            Retirement Income
          </Link>
          <Link
            href="/about"
            className="hover:text-white/85 transition-colors duration-300"
          >
            About
          </Link>
          <Link
            href="/privacy"
            className="hover:text-white/85 transition-colors duration-300"
          >
            Privacy
          </Link>
          <Link
            href="/contact"
            className="hover:text-white/85 transition-colors duration-300"
          >
            Contact
          </Link>
        </div>

        <p className="text-white/35 text-[9.5px] tracking-[0.3em] uppercase mt-1">
          © {year} Bryan Blog — Educational content, not personalized financial advice.
        </p>
      </div>
    </footer>
  );
}
