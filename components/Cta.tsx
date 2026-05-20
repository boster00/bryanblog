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
      className="not-prose my-14 rounded-2xl px-8 py-9 md:px-10 md:py-10 relative overflow-hidden"
      style={{
        backgroundColor: "var(--color-accent-tint)",
        border: "1px solid rgba(140, 58, 46, 0.18)",
      }}
    >
      <div className="max-w-2xl">
        <h3
          className="text-2xl md:text-3xl font-semibold tracking-tight"
          style={{
            fontFamily: "var(--font-serif)",
            color: "var(--color-primary)",
          }}
        >
          {heading}
        </h3>
        {body && (
          <p className="mt-3 text-stone-700 leading-relaxed">{body}</p>
        )}
        <div className="mt-6">
          <Link
            href={href}
            className="cta-button inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold tracking-wide transition-transform hover:-translate-y-0.5 no-underline"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "#ffffff",
              textDecoration: "none",
            }}
          >
            {label}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
