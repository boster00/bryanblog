import ArticleShell from "@/components/ArticleShell";

export const metadata = {
  title: "About",
  description: "About Bryan Blog.",
};

export default function AboutPage() {
  return (
    <main>
      <ArticleShell
        eyebrow="About"
        title="About Bryan Blog"
        intro="A small library of plain-English guides about retirement income."
        sections={[]}
      >
        {/* TODO: prose */}
        <p>About content will live here.</p>
      </ArticleShell>
    </main>
  );
}
