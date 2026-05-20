import Link from "next/link";

type HeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  cta?: { href: string; label: string };
};

export default function Hero({ eyebrow, title, subtitle, cta }: HeroProps) {
  return (
    <section className="relative overflow-hidden mesh-accent">
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-5xl mx-auto px-6 py-20 md:py-28">
        {eyebrow && (
          <p
            className="mb-5 text-[11px] font-semibold tracking-[0.22em] uppercase"
            style={{ color: "var(--color-accent)" }}
          >
            {eyebrow}
          </p>
        )}
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] max-w-3xl"
          style={{
            fontFamily: "var(--font-serif)",
            color: "var(--color-primary)",
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 text-lg md:text-xl text-stone-700 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
        {cta && (
          <div className="mt-9">
            <Link
              href={cta.href}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white text-sm font-semibold tracking-wide transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              {cta.label}
              <span aria-hidden>→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
