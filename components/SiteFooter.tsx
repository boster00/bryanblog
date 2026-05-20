import Link from "next/link";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[var(--color-page)] border-t border-[var(--color-neutral-mid)]/25 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="text-xs text-stone-600 tracking-wide">
          &copy; {year} Bryan Blog. All rights reserved.
        </p>

        <div className="flex items-center gap-7 text-[11px] tracking-[0.16em] uppercase text-stone-600 font-semibold">
          <Link
            href="/privacy"
            className="hover:text-[var(--color-primary)] transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="hover:text-[var(--color-primary)] transition-colors"
          >
            Terms
          </Link>
          <Link
            href="/disclaimer"
            className="hover:text-[var(--color-primary)] transition-colors"
          >
            Disclaimer
          </Link>
        </div>
      </div>
    </footer>
  );
}
