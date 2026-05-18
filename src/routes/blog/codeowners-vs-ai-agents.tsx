import { createFileRoute, Link } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/theme-toggle";

export const Route = createFileRoute("/blog/codeowners-vs-ai-agents")({
  head: () => ({
    meta: [
      { title: "Why CODEOWNERS Isn't Enough When Your Developers Are AI Agents — ZeroUI" },
      {
        name: "description",
        content:
          "CODEOWNERS enforces who reviews code. It doesn't know who wrote it. Here's why that gap matters when AI agents are opening PRs in your repo — and what to do about it.",
      },
      { property: "og:title", content: "Why CODEOWNERS Isn't Enough When Your Developers Are AI Agents" },
      {
        property: "og:description",
        content:
          "CODEOWNERS enforces who reviews code. It doesn't know who wrote it. Here's why that gap matters when AI agents are opening PRs in your repo.",
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
          Why CODEOWNERS Isn&apos;t Enough When Your Developers Are AI Agents
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          It started with a Slack message on a Tuesday morning.
        </p>
        <div className="mt-8 space-y-6 text-base leading-relaxed text-muted-foreground">
          <p>
            A senior engineer at a fintech startup noticed something odd: a PR touching the payments service had been
            merged the previous evening. The reviewer was a junior developer who&apos;d approved it in four minutes — at
            9pm. The PR had 340 lines of changes across six files.
          </p>
          <p>
            No one had flagged it. CODEOWNERS had fired correctly. The right team was requested as reviewers. A human
            had approved it.
          </p>
          <p>
            But the code had been written entirely by an AI agent. And the junior developer, under deadline pressure, had
            assumed a senior had already looked at it.
          </p>
          <p>They hadn&apos;t.</p>

          <h2 className="pt-6 font-display text-2xl text-foreground">CODEOWNERS Does Exactly What It Was Designed to Do</h2>
          <p>
            CODEOWNERS is a well-designed tool. You define which people or teams must approve changes to specific files
            or directories. GitHub, GitLab, and Azure DevOps all support it. It&apos;s been working reliably for years.
          </p>
          <p>
            The problem isn&apos;t CODEOWNERS. The problem is that CODEOWNERS was designed for a world where humans wrote
            all the code.
          </p>
          <p>
            In that world, the question was: <em>Did the right person review this?</em>
          </p>
          <p>That&apos;s still an important question. But it&apos;s no longer the only one.</p>
          <p>
            The new question is: <em>Did the right person review this, knowing that an AI agent wrote it?</em>
          </p>
          <p>Those are different questions. And right now, your pipeline only asks the first one.</p>

          <h2 className="pt-6 font-display text-2xl text-foreground">What CODEOWNERS Can&apos;t See</h2>
          <p>
            When a Copilot agent, Claude Code, or Devin opens a PR, it looks like any other commit. The author might be
            a service account, a bot user, or even a developer&apos;s own account if they accepted and pushed the
            suggestion. CODEOWNERS fires based on which files were changed — not who or what changed them.
          </p>
          <p>This creates a gap that&apos;s invisible until something goes wrong:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>A reviewer sees a PR, assumes a colleague wrote it, and does a surface-level check</li>
            <li>
              An agent makes a structural change to auth logic that looks syntactically correct but introduces a logic
              flaw
            </li>
            <li>
              The policy that should apply to AI-generated changes — require a senior engineer, require two approvals,
              require a security sign-off — never gets triggered because the pipeline doesn&apos;t know the code came from
              an agent
            </li>
          </ul>
          <p>
            Your CODEOWNERS file has no concept of provenance. It can&apos;t distinguish between a principal
            engineer&apos;s careful refactor and 400 lines generated by an autonomous agent at 2am.
          </p>

          <h2 className="pt-6 font-display text-2xl text-foreground">The Gap Is Growing Fast</h2>
          <p>A year ago, this was a theoretical concern. Today it&apos;s operational reality.</p>
          <p>
            GitHub Copilot&apos;s agent mode, Claude Code, and Devin are opening PRs autonomously across thousands of
            engineering teams. At some companies, AI agents now account for 30–50% of all commits. PR volume has doubled.
            Review queues are longer. Reviewers are moving faster.
          </p>
          <p>The conditions for something to slip through are better than they&apos;ve ever been.</p>
          <p>
            And when it does — when an agent-generated change causes a production incident, fails a compliance audit, or
            introduces a vulnerability that a proper security review would have caught — the post-mortem will ask:{" "}
            <em>Where was the governance layer?</em>
          </p>
          <p className="font-medium text-foreground">
            CODEOWNERS will have an alibi. It did its job. The gap was upstream.
          </p>

          <h2 className="pt-6 font-display text-2xl text-foreground">What the Governance Layer Looks Like</h2>
          <p>
            The fix isn&apos;t to remove CODEOWNERS — it&apos;s to add a layer that CODEOWNERS was never built to provide.
          </p>
          <p>When an AI agent opens a PR, you need:</p>
          <ol className="list-decimal space-y-3 pl-6">
            <li>
              <span className="font-medium text-foreground">Detection</span> — the pipeline identifies it as
              agent-authored automatically, without relying on the agent to label itself correctly
            </li>
            <li>
              <span className="font-medium text-foreground">Policy application</span> — a different, stricter set of
              rules applies: require a senior reviewer, require two approvals for sensitive paths, block merge to main
              without security sign-off
            </li>
            <li>
              <span className="font-medium text-foreground">Evidence</span> — a tamper-evident record of which policy
              triggered, who approved, and why — so your next SOC 2 audit has an answer when the assessor asks about
              AI-generated code
            </li>
          </ol>
          <p>
            This is what ZeroUI does. It connects to your SCM via webhook — GitHub, GitLab, or Azure DevOps — detects
            agent-authored PRs the moment they open, applies your policy rules automatically, and logs the full decision
            trail. No marketplace install. No changes to your existing CODEOWNERS setup. It runs alongside it.
          </p>

          <h2 className="pt-6 font-display text-2xl text-foreground">The Tuesday Morning Question</h2>
          <p>
            Back to that fintech team. After the incident, their VP Eng asked a simple question in the post-mortem:{" "}
            <em>Did anyone know that PR was written by an agent?</em>
          </p>
          <p>
            Nobody had. The reviewer hadn&apos;t known to ask. The pipeline hadn&apos;t surfaced it. CODEOWNERS had fired
            and done its job.
          </p>
          <p>The code went to production anyway.</p>
          <p>
            If your team is running AI coding agents today — and statistically, you are — that question is coming. The
            only variable is whether you have an answer ready before or after something goes wrong.
          </p>
        </div>

        <div className="mt-16 rounded-2xl border border-border bg-accent/20 p-8">
          <p className="font-display text-xl text-foreground">Ready to add the governance layer?</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            ZeroUI is in early access for engineering teams running AI coding agents on GitHub, GitLab, and Azure
            DevOps.
          </p>
          <a
            href="/#contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Request early access →
          </a>
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
