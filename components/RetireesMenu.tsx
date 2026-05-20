"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  RETIREES_FEATURED,
  RETIREES_GROUPS,
  isRetireesRoute,
} from "@/lib/nav";

/**
 * Desktop dropdown / mobile accordion for the "For Retirees" nav cluster.
 *
 * Desktop: hover or click reveals a panel positioned below the nav bar.
 * Mobile: tap toggles an inline accordion within the mobile menu.
 *
 * Active-route highlighting: when the user is anywhere under
 * /retirement-income, the parent button renders with a terracotta underline.
 */
export default function RetireesMenu({
  variant,
  onNavigate,
}: {
  variant: "desktop" | "mobile";
  onNavigate?: () => void;
}) {
  const pathname = usePathname() || "/";
  const isActive = isRetireesRoute(pathname);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside-click / Escape (desktop only — mobile uses accordion).
  useEffect(() => {
    if (variant !== "desktop" || !open) return;
    function onDocClick(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, variant]);

  // Close panel when route changes (after a link click).
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (variant === "mobile") {
    return (
      <div className="border-b border-[var(--color-neutral-mid)]/25">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className={`w-full flex items-center justify-between py-3 text-[12px] tracking-[0.16em] uppercase font-semibold ${
            isActive
              ? "text-[var(--color-accent)]"
              : "text-stone-700"
          }`}
        >
          <span>For Retirees</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            className={`transition-transform ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
          >
            <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
        {open ? (
          <div className="pb-4 pt-1">
            <Link
              href={RETIREES_FEATURED.href}
              onClick={onNavigate}
              className="block py-2 text-base font-semibold"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--color-primary)",
              }}
            >
              <span
                className="block text-[10px] tracking-[0.22em] uppercase font-semibold mb-1"
                style={{ color: "var(--color-accent)" }}
              >
                Pillar Guide
              </span>
              {RETIREES_FEATURED.label}
            </Link>
            {RETIREES_GROUPS.map((group) => (
              <div key={group.label} className="mt-4">
                <div
                  className="text-[10px] tracking-[0.22em] uppercase font-semibold mb-2"
                  style={{
                    color: "var(--color-accent)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {group.label}
                </div>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={onNavigate}
                        className="block text-sm text-stone-700 hover:text-[var(--color-accent)] leading-snug"
                        title={link.title}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  // Desktop variant
  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className={`nav-link-hover transition-colors text-[12px] tracking-[0.16em] uppercase font-semibold inline-flex items-center gap-1.5 ${
          isActive
            ? "text-[var(--color-accent)]"
            : "text-stone-700 hover:text-[var(--color-primary)]"
        }`}
      >
        For Retirees
        <svg
          width="10"
          height="10"
          viewBox="0 0 12 12"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[min(92vw,820px)] z-50"
        >
          {/* Hover bridge so the panel stays open while crossing the gap. */}
          <div className="absolute -top-3 left-0 right-0 h-3" />
          <div
            className="rounded-xl bg-white border border-[var(--color-neutral-mid)]/30 shadow-[0_18px_50px_-18px_rgba(28,66,89,0.25)] p-7"
          >
            {/* Featured pillar */}
            <Link
              href={RETIREES_FEATURED.href}
              className="block group rounded-lg border border-[var(--color-accent)]/20 bg-[var(--color-accent-soft)] px-5 py-4 mb-6 hover:border-[var(--color-accent)]/45 hover:bg-[var(--color-accent-tint)]/40 transition-colors"
            >
              <span
                className="block text-[10px] tracking-[0.22em] uppercase font-semibold mb-1"
                style={{ color: "var(--color-accent)" }}
              >
                Pillar Guide
              </span>
              <span
                className="block text-lg font-semibold leading-snug"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--color-primary)",
                }}
              >
                {RETIREES_FEATURED.label}
              </span>
            </Link>

            {/* Groups in a 2-column grid on md+ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
              {RETIREES_GROUPS.map((group) => (
                <div key={group.label}>
                  <div
                    className="text-[10px] tracking-[0.22em] uppercase font-semibold mb-2"
                    style={{
                      color: "var(--color-accent)",
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    {group.label}
                  </div>
                  <ul className="space-y-1.5">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="block text-[13.5px] text-stone-700 leading-snug hover:text-[var(--color-accent)] py-0.5"
                          title={link.title}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
