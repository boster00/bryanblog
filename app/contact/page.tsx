// /contact — CJGEO-hydrated intro + native form.
// Source of truth: content/contact/intro.html (CJGEO body only — the form is
// hand-written below). Hydration metadata: UTILITY_ARTICLES.contact in lib/articles.ts.

import { promises as fs } from "fs";
import path from "path";
import ArticleShell from "@/components/ArticleShell";
import { UTILITY_ARTICLES } from "@/lib/articles";
import { extractSections } from "@/lib/sections";

const meta = UTILITY_ARTICLES.contact;

export const metadata = {
  title: meta.title,
  description:
    "Reach out about a retirement income review — a low-pressure conversation, not a sales call.",
};

export default async function ContactPage() {
  const htmlPath = path.join(process.cwd(), meta.contentPath);
  const html = await fs.readFile(htmlPath, "utf8");
  const sections = extractSections(html);

  return (
    <main>
      <ArticleShell
        eyebrow="Contact"
        title={meta.title}
        sections={sections}
      >
        <div dangerouslySetInnerHTML={{ __html: html }} />

        {/* Native contact form — placeholder mailto submission. */}
        <div className="not-prose mt-12 md:mt-16">
          <div
            className="rounded-2xl bg-white p-7 md:p-9 border shadow-[0_10px_30px_-18px_rgba(28,66,89,0.18)]"
            style={{ borderColor: "rgba(28, 66, 89, 0.18)" }}
          >
            <p className="eyebrow mb-3">Send a note</p>
            <h2
              className="text-2xl md:text-[1.625rem] font-semibold tracking-tight leading-tight"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--color-primary)",
              }}
            >
              Request a retirement income review
            </h2>
            <p className="mt-2 text-stone-600 text-[15px] leading-relaxed">
              A 30-minute conversation, no pitch, no obligation.
            </p>

            <form
              action="mailto:bryan@example.com"
              method="post"
              encType="text/plain"
              className="mt-6 grid gap-4"
            >
              <label className="grid gap-1.5">
                <span className="text-[13px] font-semibold tracking-wide text-stone-700">
                  Your name
                </span>
                <input
                  type="text"
                  name="name"
                  required
                  className="rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-[15px] focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
                />
              </label>
              <label className="grid gap-1.5">
                <span className="text-[13px] font-semibold tracking-wide text-stone-700">
                  Your email
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  className="rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-[15px] focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
                />
              </label>
              <label className="grid gap-1.5">
                <span className="text-[13px] font-semibold tracking-wide text-stone-700">
                  What's on your mind?
                </span>
                <textarea
                  name="message"
                  rows={5}
                  className="rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-[15px] leading-relaxed focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
                />
              </label>
              <div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-[13px] font-semibold tracking-wide transition-transform hover:-translate-y-0.5 shadow-sm"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  Send the note <span aria-hidden>→</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </ArticleShell>
    </main>
  );
}
