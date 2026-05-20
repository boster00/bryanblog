"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import RetireesMenu from "./RetireesMenu";
import { TOP_LEVEL_LINKS } from "@/lib/nav";

export default function SiteNav() {
  const pathname = usePathname() || "/";
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu when route changes.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  function topLevelClasses(href: string) {
    const active = pathname === href || pathname === href + "/";
    return `nav-link-hover transition-colors text-[12px] tracking-[0.16em] uppercase font-semibold ${
      active
        ? "text-[var(--color-accent)]"
        : "text-stone-700 hover:text-[var(--color-primary)]"
    }`;
  }

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
            The Mysterious Author
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-9 text-sm font-medium">
          <RetireesMenu variant="desktop" />
          {TOP_LEVEL_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={topLevelClasses(link.href)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation"
          className="md:hidden inline-flex items-center justify-center w-9 h-9 -mr-2 text-stone-700 hover:text-[var(--color-primary)]"
        >
          {mobileOpen ? (
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
              <path
                d="M4 7h14M4 11h14M4 15h14"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile panel */}
      {mobileOpen ? (
        <div className="md:hidden border-t border-[var(--color-neutral-mid)]/25 bg-[var(--color-page)]">
          <div className="max-w-6xl mx-auto px-6 py-2">
            <RetireesMenu variant="mobile" onNavigate={() => setMobileOpen(false)} />
            {TOP_LEVEL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block py-3 border-b border-[var(--color-neutral-mid)]/25 text-[12px] tracking-[0.16em] uppercase font-semibold ${
                  pathname === link.href || pathname === link.href + "/"
                    ? "text-[var(--color-accent)]"
                    : "text-stone-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </nav>
  );
}
