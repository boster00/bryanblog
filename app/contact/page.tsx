import ArticleShell from "@/components/ArticleShell";

export const metadata = {
  title: "Contact",
  description: "Get in touch.",
};

export default function ContactPage() {
  return (
    <main>
      <ArticleShell
        eyebrow="Contact"
        title="Get in touch"
        intro="Reach out about a retirement income review or a question on the site."
        sections={[]}
      >
        {/* TODO: prose */}
        <p>Contact details will live here.</p>
      </ArticleShell>
    </main>
  );
}
