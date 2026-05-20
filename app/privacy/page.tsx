import ArticleShell from "@/components/ArticleShell";

export const metadata = {
  title: "Privacy",
  description: "Privacy policy.",
};

export default function PrivacyPage() {
  return (
    <main>
      <ArticleShell
        eyebrow="Privacy"
        title="Privacy policy"
        intro="How this site handles your information."
        sections={[]}
      >
        {/* TODO: prose */}
        <p>Privacy policy details will live here.</p>
      </ArticleShell>
    </main>
  );
}
