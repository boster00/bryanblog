import Link from "next/link";
import Image from "next/image";

type HeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  cta?: { href: string; label: string };
  /** Optional editorial photo on the right column (desktop). */
  photoSrc?: string;
  photoAlt?: string;
};

export default function Hero({
  eyebrow,
  title,
  subtitle,
  cta,
  photoSrc,
  photoAlt,
}: HeroProps) {
  if (photoSrc) {
    return (
      <section className="relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6 pt-14 pb-16 md:pt-20 md:pb-24 grid grid-cols-1 md:grid-cols-[1fr_minmax(0,1.05fr)] gap-10 md:gap-14 items-center">
          <div className="md:pr-2">
            {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
            <h1
              className="text-4xl md:text-5xl lg:text-[3.5rem] font-semibold tracking-tight leading-[1.05]"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--color-primary)",
              }}
            >
              {title}
            </h1>
            {subtitle && (
              <p className="mt-6 text-base md:text-lg text-stone-700 max-w-xl leading-relaxed">
                {subtitle}
              </p>
            )}
            {cta && (
              <div className="mt-8">
                <Link
                  href={cta.href}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-[13px] font-semibold tracking-wide transition-transform hover:-translate-y-0.5 shadow-sm"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  {cta.label}
                </Link>
              </div>
            )}
          </div>
          <div className="relative aspect-[4/3] md:aspect-[5/4] w-full overflow-hidden rounded-2xl border border-[var(--color-neutral-mid)]/25 shadow-[0_20px_50px_-20px_rgba(28,66,89,0.18)]">
            <Image
              src={photoSrc}
              alt={photoAlt || ""}
              fill
              priority
              sizes="(min-width: 768px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    );
  }

  // Fallback: text-only hero
  return (
    <section className="relative overflow-hidden">
      <div className="relative max-w-5xl mx-auto px-6 py-20 md:py-28">
        {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
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
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              {cta.label}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
