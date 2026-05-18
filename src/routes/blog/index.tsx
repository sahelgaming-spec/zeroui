import { createFileRoute, Link } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/theme-toggle";

const POSTS = [
  {
    to: "/blog/codeowners-vs-ai-agents" as const,
    title: "CODEOWNERS vs AI agents",
    description:
      "Why repository ownership rules built for humans do not fully cover autonomous code changes — and what is still missing.",
    date: "2026-05-18",
  },
];

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — ZeroUI" },
      {
        name: "description",
        content: "Articles on AI agent PR governance, policy-as-code, and safe merges on GitHub, GitLab, and Azure DevOps.",
      },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5 lg:px-10">
          <Link to="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            ← ZeroUI
          </Link>
          <ThemeToggle />
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-16 lg:px-10 lg:py-24">
        <p className="mb-4 text-sm uppercase tracking-[0.2em] text-muted-foreground">Blog</p>
        <h1 className="font-display text-4xl tracking-tight text-foreground lg:text-5xl">Writing</h1>
        <p className="mt-4 text-muted-foreground">Notes on PR governance, AI agents, and shipping safely.</p>
        <ul className="mt-16 divide-y divide-border border-y border-border">
          {POSTS.map((post) => (
            <li key={post.to}>
              <Link
                to={post.to}
                className="group block py-8 transition-colors hover:bg-accent/30"
              >
                <time className="text-xs text-muted-foreground" dateTime={post.date}>
                  {post.date}
                </time>
                <h2 className="mt-2 font-display text-2xl text-foreground transition-colors group-hover:text-primary">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
