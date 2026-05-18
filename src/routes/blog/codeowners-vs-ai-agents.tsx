import { createFileRoute, Link } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/theme-toggle";

export const Route = createFileRoute("/blog/codeowners-vs-ai-agents")({
  head: () => ({
    meta: [
      { title: "CODEOWNERS vs AI agents — ZeroUI" },
      {
        name: "description",
        content:
          "How CODEOWNERS maps human ownership on a pull request — and why AI-authored changes need an explicit agent-aware policy layer.",
      },
    ],
  }),
  component: CodeownersVsAiAgentsPost,
});

function CodeownersVsAiAgentsPost() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5 lg:px-10">
          <Link to="/blog" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            ← Blog
          </Link>
          <ThemeToggle />
        </div>
      </header>
      <article className="mx-auto max-w-3xl px-6 py-16 lg:px-10 lg:py-24">
        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">May 18, 2026</p>
        <h1 className="mt-4 font-display text-4xl tracking-tight text-foreground lg:text-5xl">
          CODEOWNERS vs AI agents
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          CODEOWNERS is one of the best tools we have for mapping <em>people</em> to <em>paths</em>: when a pull request
          touches a region of the repo, the right humans get requested for review. That model assumes the author is
          another human on your team — or at least that the change is attributable in the same way as any other
          contributor account.
        </p>
        <div className="mt-12 space-y-6 text-base leading-relaxed text-muted-foreground">
          <p>
            AI coding agents break that assumption in subtle ways. The PR might still come from a familiar bot or
            service account, but the <span className="text-foreground">risk profile</span> is different: velocity is
            higher, context may be thinner, and the &quot;author&quot; never goes off-call. CODEOWNERS alone does not
            encode whether the change was agent-generated, which policy version should apply, or what evidence you need
            in the audit trail beyond &quot;someone with approve rights clicked approve.&quot;
          </p>
          <p>
            In practice, teams end up bolting on manual checklists or informal norms: &quot;if you used Copilot for
            this file, get an extra pair of eyes.&quot; Norms do not scale across repos, languages, and hundreds of
            engineers — and they are invisible to compliance when an auditor asks what happened on a specific merge.
          </p>
          <p className="text-foreground">
            Agent-aware governance is not a replacement for ownership rules; it is a layer on top. You still want
            CODEOWNERS (or equivalent) to express which areas of the system demand human judgment. The missing piece is
            detection and enforcement at the PR boundary: treat agent-authored changes as a first-class signal, apply
            policy automatically, route reviews deliberately, and log a tamper-evident record of what was decided and
            why.
          </p>
          <p>
            ZeroUI is built for that boundary — webhook-native on GitHub, GitLab, and Azure DevOps — so the next time
            an agent opens a PR against a sensitive path, the right reviewer and evidence trail are not optional
            extras. They are part of how the repo already works.
          </p>
        </div>
        <p className="mt-12 text-sm text-muted-foreground">
          <Link to="/blog" className="link-underline text-primary hover:text-primary/90">
            All posts
          </Link>
          {" · "}
          <Link to="/" className="link-underline hover:text-foreground">
            Home
          </Link>
        </p>
      </article>
    </div>
  );
}
