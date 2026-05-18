import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef } from "react";
import {
  Menu,
  X,
  ArrowRight,
  Sparkles,
  Workflow,
  Shield,
  Bot,
  ShieldCheck,
} from "lucide-react";
import { motion, useScroll, useTransform, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/theme-toggle";
import zeroUiLogo from "@/assets/zeroui-logo.png";

function ZeroUiWordmark({ className = "" }: { className?: string }) {
  return (
    <img
      src={zeroUiLogo}
      alt="ZeroUI"
      className={`h-7 w-auto object-contain dark:brightness-200 dark:contrast-200 ${className}`}
    />
  );
}

export const Route = createFileRoute("/")({
  component: Index,
});

const NAV = [
  { label: "How it works", href: "#services" },
  { label: "Use cases", href: "#use-cases" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

function Nav() {
  const [open, setOpen] = useState(false);

  const handleClick = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-10">
        <a href="#top" className="flex items-center gap-2.5">
          <ZeroUiWordmark />
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV.map((item) =>
            item.href.startsWith("/") ? (
              <Link
                key={item.href}
                to={item.href}
                className="link-underline text-sm text-primary/80 transition-colors hover:text-accent"
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.href}
                type="button"
                onClick={() => handleClick(item.href)}
                className="link-underline text-sm text-primary/80 transition-colors hover:text-accent"
              >
                {item.label}
              </button>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Button onClick={() => handleClick("#contact")} className="group rounded-full px-5">
            Request Early Access
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden border-t border-border/60 bg-background md:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col px-6 py-4">
              {NAV.map((item, i) =>
                item.href.startsWith("/") ? (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    className="border-b border-border/40 last:border-0"
                  >
                    <Link
                      to={item.href}
                      onClick={() => setOpen(false)}
                      className="block py-4 text-left text-base text-foreground"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.button
                    key={item.href}
                    type="button"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    onClick={() => handleClick(item.href)}
                    className="border-b border-border/40 py-4 text-left text-base text-foreground last:border-0"
                  >
                    {item.label}
                  </motion.button>
                ),
              )}
              <Button onClick={() => handleClick("#contact")} className="mt-4 rounded-full">
                Request Early Access
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };


  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMove}
      className="spotlight relative overflow-hidden"
    >
      <div className="aurora" aria-hidden />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-20 lg:px-10 lg:pb-40 lg:pt-32"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-accent"
        >
          <span className="inline-block h-px w-8 bg-accent/60" />
          SCM-native · Policy-as-code · Agent-aware
        </motion.p>

        <h1 className="font-display text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
          Stop AI agent PRs from merging without the right policy, reviewer, and evidence.
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 max-w-2xl text-lg leading-relaxed text-muted-foreground lg:text-xl"
        >
          ZeroUI connects to your SCM via webhook — GitHub, GitLab, or Azure DevOps — detects AI-agent-authored PRs, applies your policy rules, blocks merge until the right reviewer approves, and logs a tamper-evident evidence trail. No marketplace install. No platform lock-in.
        </motion.p>

        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground/70">
          For engineering teams on GitHub, GitLab, or Azure DevOps running Copilot, Claude Code, Devin, or any AI coding agent.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-12 flex flex-col gap-3 sm:flex-row"
        >
          <MagneticButton onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}>
            <Button size="lg" className="group rounded-full px-7">
              Request Early Access
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </MagneticButton>
          <Button
            size="lg"
            variant="ghost"
            className="rounded-full px-7"
            onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}
          >
            Explore product
          </Button>
        </motion.div>

      </motion.div>

      <Marquee />
    </section>
  );
}

function MagneticButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
  };
  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      className="inline-block transition-transform duration-300 ease-out"
    >
      {children}
    </div>
  );
}

const LOGOS = ["Agent PR blocked", "Policy applied", "Reviewer assigned", "Evidence logged", "Merge approved", "Audit trail created", "Risk prevented", "Change governed"];

function Marquee() {
  return (
    <div className="relative z-10 border-y border-border/50 bg-background/40 py-6 backdrop-blur">
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="marquee-track flex w-max gap-16 whitespace-nowrap pr-16">
          {[...LOGOS, ...LOGOS].map((l, i) => (
            <span
              key={i}
              className="font-display text-lg tracking-[0.18em] text-muted-foreground/70"
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const SERVICES = [
  {
    icon: Shield,
    title: "Change Governance",
    body: "ZeroUI connects to your existing SCM via webhook — no marketplace install, no platform lock-in. Every AI-agent PR is evaluated against your policy the moment it opens, before any human has to remember to check.\n\nWorks with GitHub, GitLab, and Azure DevOps out of the box.",
  },
  {
    icon: Workflow,
    title: "Policy Enforcement",
    body: "Define which code paths require which reviewers when an agent makes a change. ZeroUI enforces it automatically — no checklists, no manual routing, no relying on developers to remember the rule.",
  },
  {
    icon: Sparkles,
    title: "Agent PR Detection",
    body: "ZeroUI identifies agent-authored PRs from Copilot, Claude Code, Devin, and any service account — the moment they open, not after they merge. No per-agent configuration required.",
  },
  {
    icon: ShieldCheck,
    title: "Evidence Trail",
    body: "Every governed PR gets a tamper-evident record: which policy triggered, who approved, when, and why. One-click audit trail for SOC 2, ISO 27001, and customer security reviews — without any manual documentation.",
  },
];

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SocialProof() {
  return (
    <div className="border-t border-border/60 bg-accent/20 py-8 px-6 text-center">
      <p className="text-sm text-muted-foreground">
        Trusted by engineering teams at Series B–D fintechs and developer-tools companies running AI coding agents.
      </p>
    </div>
  );
}

function HowItWorks() {
  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-muted-foreground">How it works</p>
          <h2 className="mb-16 max-w-2xl font-display text-4xl leading-tight tracking-tight lg:text-5xl">
            Up and running in minutes
          </h2>
        </Reveal>
        <div className="grid gap-12 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Install",
              body: "Connect ZeroUI to your SCM in minutes via webhook — GitHub, GitLab, or Azure DevOps. No marketplace install, no platform approval process required.",
            },
            {
              step: "02",
              title: "Define Policy",
              body: "Add a .zeroui.yml file to your repo. Specify which code paths require which reviewers when an AI agent makes a change.",
            },
            {
              step: "03",
              title: "Enforce",
              body: "ZeroUI detects agent-authored PRs, blocks merge until policy is satisfied, and logs a full evidence trail automatically.",
            },
          ].map((item, i) => (
            <Reveal key={item.step} delay={i * 0.1}>
              <div className="group relative border-t border-border pt-8">
                <span className="mb-4 block font-display text-5xl text-muted-foreground/20 transition-colors group-hover:text-primary/20">
                  {item.step}
                </span>
                <h3 className="font-display text-2xl">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{item.body}</p>
                <span className="absolute left-0 top-0 h-px w-0 bg-primary transition-all duration-500 group-hover:w-16" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr] lg:gap-24">
          <Reveal>
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.2em] text-muted-foreground">Product</p>
              <h2 className="font-display text-4xl leading-tight tracking-tight lg:text-5xl">
                The governed path from agent PR to safe merge
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-12 sm:grid-cols-1 lg:grid-cols-1">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="group relative border-t border-border pt-8"
                >
                  <motion.div
                    whileHover={{ rotate: -8, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="mb-6 inline-flex"
                  >
                    <s.icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="font-display text-2xl transition-colors group-hover:text-primary">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-xl whitespace-pre-line leading-relaxed text-muted-foreground">{s.body}</p>
                  <span className="absolute left-0 top-0 h-px w-0 bg-primary transition-all duration-500 group-hover:w-16" />
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


const USE_CASES = [
  {
    icon: Sparkles,
    tag: "AI-Generated Code",
    title: "An agent just opened a PR touching your payments service",
    body: "Without ZeroUI: merged by whoever reviews it first, no policy check, no record.\nWith ZeroUI: right reviewer assigned automatically, merge blocked until approved, decision logged.",
  },
  {
    icon: Bot,
    tag: "Autonomous Agents",
    title: "Your pipeline doesn't know if a human or an agent wrote the code",
    body: "Copilot, Claude Code, and Devin all look like normal commits. ZeroUI identifies agent-authored changes and applies a different policy — automatically, across GitHub, GitLab, and Azure DevOps.",
  },
  {
    icon: ShieldCheck,
    tag: "Release & Compliance",
    title: "Your auditor asks which PRs were AI-generated last quarter",
    body: "Most teams have no answer. ZeroUI maintains a complete evidence trail — which agent, which policy, which reviewer, which decision — queryable from day one.",
  },
];

function UseCases() {
  return (
    <section id="use-cases" className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-muted-foreground">Use cases</p>
          <h2 className="mb-16 max-w-2xl font-display text-4xl leading-tight tracking-tight lg:text-5xl">
            The moments ZeroUI prevents
          </h2>
        </Reveal>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {USE_CASES.map((u, i) => (
            <Reveal key={u.tag} delay={i * 0.1}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 200, damping: 22 }}
                className="group relative flex h-full flex-col gap-6 overflow-hidden bg-background p-8 lg:p-10"
              >
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/0 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:from-primary/5 group-hover:to-transparent group-hover:opacity-100" />
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <u.icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
                </motion.div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{u.tag}</p>
                  <h3 className="mt-3 font-display text-2xl leading-snug">{u.title}</h3>
                </div>
                <p className="leading-relaxed text-muted-foreground">{u.body}</p>
                <div className="mt-auto flex items-center gap-2 text-sm text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Learn more <ArrowRight className="h-4 w-4" />
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = {
      name,
      email,
      company,
      message,
    };

    try {
      const res = await fetch("https://4yka445exg.execute-api.eu-north-1.amazonaws.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Message sent.");
        setName("");
        setEmail("");
        setCompany("");
        setMessage("");
      } else {
        toast.error("Failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="border-t border-border/60 bg-accent/40">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.2em] text-muted-foreground">Contact</p>
              <h2 className="font-display text-4xl leading-tight tracking-tight lg:text-5xl">
                Get early access
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
                We're setting up ZeroUI for a small group of engineering teams right now. Tell us about your SCM setup and we'll be in touch within 24 hours.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium">Name</label>
                  <Input
                    id="name"
                    name="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 rounded-lg bg-background transition-shadow focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_15%,transparent)]"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="mb-2 block text-sm font-medium">Company</label>
                  <Input
                    id="company"
                    name="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="h-12 rounded-lg bg-background transition-shadow focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_15%,transparent)]"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium">Email</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-lg bg-background transition-shadow focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_15%,transparent)]"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium">Tell us about your AI agent setup</label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="rounded-lg bg-background transition-shadow focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_15%,transparent)]"
                />
              </div>
              <MagneticButton>
                <Button type="submit" size="lg" disabled={submitting} className="group rounded-full px-7">
                  {submitting ? "Sending..." : "Send message"}
                  {!submitting && <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />}
                </Button>
              </MagneticButton>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="flex flex-col items-start gap-1 text-sm">
          <div className="flex items-center gap-3">
            <ZeroUiWordmark className="!text-xl" />
            <span className="text-muted-foreground">{"\u00A9"} {new Date().getFullYear()}</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground/60">
            Built for engineering teams running Copilot, Claude Code, and Devin on GitHub, GitLab, and Azure DevOps.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground">
          <a href="#services" className="link-underline hover:text-foreground">Product</a>
          
          <a href="#use-cases" className="link-underline hover:text-foreground">Use cases</a>
          <a href="/blog" className="link-underline hover:text-foreground">Blog</a>
          <a href="#contact" className="link-underline hover:text-foreground">Contact</a>
        </nav>
      </div>
    </footer>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed left-0 right-0 top-0 z-[60] h-0.5 origin-left bg-primary"
    />
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <SocialProof />
        <Services />
        
        <UseCases />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
