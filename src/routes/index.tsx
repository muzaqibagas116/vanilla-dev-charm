import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  ArrowUp,
  Moon,
  Sun,
  ExternalLink,
  Code2,
  Menu,
  X,
  MapPin,
  Sparkles,
} from "lucide-react";
import profileImg from "@/assets/profile.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

export const Route = createFileRoute("/")({
  component: PortfolioPage,
});

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const SKILLS = [
  { name: "HTML", cat: "Frontend" },
  { name: "CSS", cat: "Frontend" },
  { name: "JavaScript", cat: "Frontend" },
  { name: "TypeScript", cat: "Frontend" },
  { name: "Angular", cat: "Frontend" },
  { name: "Bootstrap", cat: "Frontend" },
  { name: "Node.js", cat: "Backend" },
  { name: "Express.js", cat: "Backend" },
  { name: "PHP", cat: "Backend" },
  { name: "Laravel", cat: "Backend" },
  { name: "MySQL", cat: "Database" },
  { name: "Git", cat: "Tools" },
  { name: "GitHub", cat: "Tools" },
];

const PROJECTS = [
  {
    title: "Nova Commerce Dashboard",
    desc: "Admin analytics dashboard with real-time sales metrics, order management, and inventory tracking.",
    tech: ["Angular", "TypeScript", "Node.js", "MySQL"],
    image: project1,
    live: "#",
    code: "#",
  },
  {
    title: "TaskFlow Kanban",
    desc: "Collaborative task manager with drag-and-drop kanban boards, teams, and progress reporting.",
    tech: ["Laravel", "PHP", "Bootstrap", "MySQL"],
    image: project2,
    live: "#",
    code: "#",
  },
  {
    title: "Saveur Restaurant Site",
    desc: "Elegant restaurant landing page with online menu, reservation flow, and CMS-ready content.",
    tech: ["JavaScript", "HTML", "CSS", "Express.js"],
    image: project3,
    live: "#",
    code: "#",
  },
];

const EXPERIENCE = [
  {
    role: "Full-Stack Web Developer",
    company: "Freelance",
    period: "2023 — Present",
    desc: "Building custom web applications for small businesses, focused on performance, accessibility, and clean UX.",
  },
  {
    role: "Web Developer",
    company: "PT Digital Nusantara",
    period: "2021 — 2023",
    desc: "Developed enterprise dashboards with Angular and Laravel, integrated with legacy MySQL systems.",
  },
  {
    role: "Junior Developer",
    company: "Kreatif Studio",
    period: "2020 — 2021",
    desc: "Built responsive marketing sites and internal tools with PHP, JavaScript, and Bootstrap.",
  },
];

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    try { localStorage.setItem("theme", next); } catch {}
    setTheme(next);
  };
  return { theme, toggle };
}

function PortfolioPage() {
  const { theme, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowTop(window.scrollY > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("animate-fade-up");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAVBAR */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#home" className="flex items-center gap-2 font-display font-bold text-lg">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-primary-foreground shadow-glow">
              <Code2 className="h-4 w-4" />
            </span>
            <span>Ahmad<span className="text-gradient">.dev</span></span>
          </a>

          <ul className="hidden md:flex items-center gap-1">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="grid h-9 w-9 place-items-center rounded-md border border-border hover:bg-secondary transition-colors"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
              className="md:hidden grid h-9 w-9 place-items-center rounded-md border border-border"
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur">
            <ul className="flex flex-col px-6 py-3">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
        <div
          className="absolute inset-0 -z-10 opacity-30 dark:opacity-40"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            maskImage: "linear-gradient(to bottom, black 30%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent 100%)",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-hero" />

        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 md:grid-cols-[1.3fr_1fr] md:items-center">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur px-3 py-1 text-xs font-medium text-muted-foreground">
                <Sparkles className="h-3 w-3 text-accent" />
                Available for new opportunities
              </span>
              <h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05]">
                Hi, I'm <span className="text-gradient">Ahmad Rizky</span>
                <br />
                <span className="text-foreground/90">a Web Developer.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
                I design and build modern, responsive web applications with a focus on clean code,
                delightful UX, and measurable performance. From landing pages to full-stack dashboards.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-2 rounded-lg bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
                >
                  View Projects
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-secondary transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  Contact Me
                </a>
              </div>

              <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Jakarta, ID</div>
                <div className="h-4 w-px bg-border" />
                <div className="font-mono">3+ years experience</div>
              </div>
            </div>

            <div className="relative mx-auto animate-float">
              <div className="absolute -inset-6 bg-gradient-primary opacity-20 blur-3xl rounded-full" />
              <div className="relative rounded-2xl border border-border bg-card p-4 shadow-card">
                <pre className="font-mono text-xs leading-relaxed text-muted-foreground overflow-hidden">
{`const dev = {
  name: "Ahmad Rizky",
  role: "Web Developer",
  stack: ["TS", "Angular",
          "Laravel", "Node"],
  coffee: true,
  shipping: "always" 
};`}
                </pre>
                <div className="mt-3 flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-destructive/70" />
                  <span className="h-2 w-2 rounded-full bg-accent/80" />
                  <span className="h-2 w-2 rounded-full bg-primary/80" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 border-t border-border">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeader eyebrow="About" title="A bit about me" />
          <div className="mt-12 grid gap-12 md:grid-cols-[auto_1fr] md:items-center" data-reveal>
            <div className="relative mx-auto md:mx-0">
              <div className="absolute -inset-3 bg-gradient-primary opacity-30 blur-2xl rounded-2xl" />
              <img
                src={profileImg}
                alt="Ahmad Rizky"
                width={280}
                height={280}
                loading="lazy"
                className="relative h-64 w-64 md:h-72 md:w-72 rounded-2xl object-cover border border-border shadow-card"
              />
            </div>
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-semibold">
                Building the web, one component at a time.
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                I'm a Web Developer with a passion for turning ideas into fast, accessible, and
                maintainable web experiences. I enjoy working across the stack — from crafting
                pixel-perfect interfaces to designing clean REST APIs.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                My focus is on modern JavaScript/TypeScript ecosystems, PHP/Laravel backends,
                and building products that people actually love to use. I care about code quality,
                developer experience, and shipping value continuously.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4 max-w-md">
                <Stat n="30+" label="Projects" />
                <Stat n="3+" label="Years" />
                <Stat n="15+" label="Clients" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-24 border-t border-border bg-secondary/30">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeader eyebrow="Skills" title="Tools I work with" />
          <div className="mt-12 grid gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" data-reveal>
            {SKILLS.map((s) => (
              <div
                key={s.name}
                className="group rounded-xl border border-border bg-card p-4 shadow-card hover:border-primary/50 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-xs font-mono text-muted-foreground">{s.cat}</div>
                <div className="mt-1 font-display font-semibold group-hover:text-gradient transition-colors">
                  {s.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-24 border-t border-border">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeader eyebrow="Projects" title="Selected work" />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p) => (
              <article
                key={p.title}
                data-reveal
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card hover:shadow-glow hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                  <img
                    src={p.image}
                    alt={p.title}
                    width={1024}
                    height={640}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-border bg-secondary px-2 py-0.5 text-xs font-mono text-secondary-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex gap-2 pt-2 border-t border-border">
                    <a
                      href={p.live}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md bg-gradient-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      View Project
                    </a>
                    <a
                      href={p.code}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-semibold hover:bg-secondary"
                    >
                      <Github className="h-3.5 w-3.5" />
                      Source Code
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="py-24 border-t border-border bg-secondary/30">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeader eyebrow="Experience" title="My journey so far" />
          <ol className="mt-12 relative border-l border-border pl-8 space-y-10">
            {EXPERIENCE.map((e, i) => (
              <li key={i} data-reveal className="relative">
                <span className="absolute -left-[41px] top-1 grid h-6 w-6 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow">
                  <span className="h-2 w-2 rounded-full bg-primary-foreground" />
                </span>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold">{e.role}</h3>
                  <span className="font-mono text-xs text-muted-foreground">{e.period}</span>
                </div>
                <div className="text-sm text-primary font-medium">{e.company}</div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{e.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 border-t border-border">
        <div className="mx-auto max-w-3xl px-6 text-center" data-reveal>
          <SectionHeader eyebrow="Contact" title="Let's build something together" center />
          <p className="mt-4 text-muted-foreground">
            Have a project in mind or just want to say hello? My inbox is always open.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <ContactCard icon={<Mail className="h-5 w-5" />} label="Email" value="ahmad@example.com" href="mailto:ahmad@example.com" />
            <ContactCard icon={<Github className="h-5 w-5" />} label="GitHub" value="@ahmadrizky" href="https://github.com" />
            <ContactCard icon={<Linkedin className="h-5 w-5" />} label="LinkedIn" value="Ahmad Rizky" href="https://linkedin.com" />
          </div>
          <a
            href="mailto:ahmad@example.com"
            className="mt-10 inline-flex items-center gap-2 rounded-lg bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:-translate-y-0.5 transition-transform"
          >
            <Mail className="h-4 w-4" />
            Say hello
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>© {new Date().getFullYear()} Ahmad Rizky. All rights reserved.</div>
          <div className="flex items-center gap-3">
            <a href="https://github.com" aria-label="GitHub" className="grid h-9 w-9 place-items-center rounded-md border border-border hover:bg-secondary transition-colors">
              <Github className="h-4 w-4" />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn" className="grid h-9 w-9 place-items-center rounded-md border border-border hover:bg-secondary transition-colors">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="mailto:ahmad@example.com" aria-label="Email" className="grid h-9 w-9 place-items-center rounded-md border border-border hover:bg-secondary transition-colors">
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </footer>

      {/* BACK TO TOP */}
      {showTop && (
        <a
          href="#home"
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 grid h-11 w-11 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow hover:-translate-y-1 transition-transform"
        >
          <ArrowUp className="h-4 w-4" />
        </a>
      )}
    </div>
  );
}

function SectionHeader({ eyebrow, title, center }: { eyebrow: string; title: string; center?: boolean }) {
  return (
    <div className={center ? "text-center" : ""}>
      <div className="font-mono text-xs uppercase tracking-widest text-primary">— {eyebrow}</div>
      <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold">{title}</h2>
    </div>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="font-display text-2xl font-bold text-gradient">{n}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}

function ContactCard({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href: string }) {
  return (
    <a
      href={href}
      className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-5 shadow-card hover:border-primary/50 hover:-translate-y-1 transition-all"
    >
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-primary text-primary-foreground">
        {icon}
      </div>
      <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{label}</div>
      <div className="text-sm font-semibold group-hover:text-gradient">{value}</div>
    </a>
  );
}
