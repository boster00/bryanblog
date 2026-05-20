import Link from "next/link";

type CtaProps = {
  heading: string;
  body?: string;
  href: string;
  label: string;
};

export default function Cta({ heading, body, href, label }: CtaProps) {
  return (
    <aside
      className="not-prose my-14 rounded-2xl px-7 py-8 md:px-10 md:py-10 relative overflow-hidden flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8 shadow-[0_8px_24px_-14px_rgba(140,58,46,0.25)]"
      style={{
        backgroundColor: "var(--color-accent-tint)",
        border: "1px solid rgba(140, 58, 46, 0.22)",
      }}
    >
      <div className="max-w-2xl">
        <h3
          className="text-2xl md:text-[1.75rem] font-semibold tracking-tight leading-tight"
          style={{
            fontFamily: "var(--font-serif)",
            color: "var(--color-primary)",
          }}
        >
          {heading}
        </h3>
        {body && (
          <p className="mt-2 text-stone-700 text-[15px] leading-relaxed">
            {body}
          </p>
        )}
      </div>
      <Link
        href={href}
        className="cta-button inline-flex items-center gap-2 px-6 py-3 rounded-full text-[13px] font-semibold tracking-wide whitespace-nowrap transition-transform hover:-translate-y-0.5 no-underline shadow-sm self-start md:self-center"
        style={{
          backgroundColor: "var(--color-accent)",
          color: "#ffffff",
          textDecoration: "none",
        }}
      >
        {label}
        <span aria-hidden>→</span>
      </Link>
    </aside>
  );
}
