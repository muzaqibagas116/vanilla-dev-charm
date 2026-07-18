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
  PhoneCall,
  Instagram,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import profileImg from "@/assets/profile.jpg";
import heroBg from "@/assets/hero-bg.jpg";

import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.png";
import project5 from "@/assets/project-5.png";

import html from "@/assets/html.png";
import css from "@/assets/css.png";
import javascript from "@/assets/javascript.png";
import typescript from "@/assets/typescript.png";
import php from "@/assets/php.png";

import laravel from "@/assets/laravel.png";
import angular from "@/assets/angular.png";
import express from "@/assets/express.png";

import mysql from "@/assets/mysql.png";
import dbeaver from "@/assets/dbeaver.png";

import github from "@/assets/github.png";
import figma from "@/assets/figma.png";
import vscode from "@/assets/vscode.png";

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
  { name: "HTML", cat: "Language", image: html },
  { name: "CSS", cat: "Language", image: css },
  { name: "JavaScript", cat: "Language", image: javascript },
  { name: "TypeScript", cat: "Language", image: typescript },
  { name: "PHP", cat: "Language", image: php },

  { name: "Laravel", cat: "framework", image: laravel },
  { name: "Angular", cat: "Framework", image: angular },    
  { name: "Express.js", cat: "framework", image: express },

  { name: "MySQL", cat: "Database", image: mysql },
  { name: "DBeaver", cat: "Database", image: dbeaver },
  
  { name: "GitHub", cat: "Tools", image: github },
  { name: "Figma", cat: "Tools", image: figma },
  { name: "VS Code", cat: "Tools", image: vscode },
];

const PROJECTS = [
  {
    title: "GearVenture",
    desc: "Admin analytics dashboard with real-time sales metrics, order management, and inventory tracking.",
    overview: [
      "GearVenture is a web-based outdoor equipment rental platform designed to make it easier for users to discover and rent various camping and hiking essentials. The application provides a catalog of outdoor equipment complete with product information and rental prices, allowing users to choose the gear that best suits their adventure needs.",

      "In addition to the product catalog, GearVenture provides promotional information, search functionality, customer testimonials, and contact services to enhance the user experience. With a responsive and user-friendly interface, GearVenture aims to provide a practical and efficient way for users to find information and rent outdoor equipment.",
    ],
    tech: [
      { name: "Angular", image: angular },
      { name: "TypeScript", image: typescript },
      { name: "MySQL", image: mysql },
    ],
    image: project5,
    modalImage: project4,
    live: "#",
    code: "#",
  },
  {
    title: "TaskFlow Kanban",
    desc: "Collaborative task manager with drag-and-drop kanban boards, teams, and progress reporting.",
    overview:
      "A productivity app tailored for distributed teams who need smooth task collaboration, deadline visibility, and clearer work tracking.",      
    tech: [
      { name: "Laravel", image: laravel },
      { name: "PHP", image: php },
      { name: "MySQL", image: mysql },
    ],
    image: project2,
    modalImage: project3,
    live: "#",
    code: "#",
  },
  {
    title: "Saveur Restaurant Site",
    desc: "Elegant restaurant landing page with online menu, reservation flow, and CMS-ready content.",
    overview:
      "A polished restaurant website crafted to showcase the brand, simplify reservations, and present the menu in a visually appealing format.",    
    tech: [
      { name: "JavaScript", image: javascript },
      { name: "HTML", image: html },
      { name: "CSS", image: css },
      { name: "Express.js", image: express },
    ],
    image: project3,
    modalImage: project2,
    live: "#",
    code: "#",
  },
];

const EXPERIENCE = [
  {
    role: "PT Amerta Indah Otsuka",
    company: "Fullstack Developer",
    period: "Feb 2026 - Present",
    desc: "Developed and maintained web application features using Angular and Express.js, including API integration and database management to support application stability.",
  },
  {
    role: "Web Developer",
    company: "Department of Forest Products, IPB University",
    period: "Jul 2025 - Dec 2025",
    desc: "Designed and developed SISTA DHH, a Laravel-based seminar and thesis information system with multi-role access, document management, and automated PDF/Excel export features.",
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
  const [selectedProject, setSelectedProject] = useState<(typeof PROJECTS)[number] | null>(null);

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
            <span>Anggito Rangkuti Bagas Muzaqi</span>
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
              <h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05]">
                Hi, I'm <span className="text-gradient">Anggito Rangkuti Bagas Muzaqi</span>
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
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Tangerang, ID</div>                                
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
          <SectionHeader eyebrow="About"/>
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
          <SectionHeader eyebrow="Skills"/>
          <div className="mt-12 grid gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" data-reveal>
            {SKILLS.map((s) => (                            
              <div
                key={s.name}                
                className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-card hover:border-primary/50 hover:-translate-y-1 transition-all duration-300"
              >           
                <img
                  src={s.image}
                  alt={s.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 object-contain"
                />
                <div>
                  <div className="text-xs font-mono text-muted-foreground">{s.cat}</div>
                  <div className="mt-1 font-display font-semibold group-hover:text-gradient transition-colors">
                    {s.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-24 border-t border-border">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeader eyebrow="Projects"/>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p) => (
              <article
                key={p.title}
                data-reveal
                role="button"
                tabIndex={0}
                onClick={() => setSelectedProject(p)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedProject(p);
                  }
                }}
                className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card hover:shadow-glow hover:-translate-y-1 transition-all duration-300"
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
                    {p.tech.map((tech) => (
                      <span
                        key={tech.name}
                        className="rounded-md border border-border bg-secondary px-2 py-0.5 text-xs font-mono text-secondary-foreground"
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex gap-2 pt-2 border-t border-border">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(p);
                      }}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md bg-gradient-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      View Details
                    </button>
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
          <SectionHeader eyebrow="Experience"/>
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
        <div className="mx-auto max-w-5xl px-6 text-center" data-reveal>
          <SectionHeader eyebrow="Contact" center />
          <p className="mt-4 text-muted-foreground">
            Have a project in mind or just want to say hello? My inbox is always open.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-4">
            <ContactCard icon={<Mail className="h-5 w-5" />} label="Email" value="bagasmuzaqi116@gmail.com" href="mailto:bagasmuzaqi116@gmail.com" />
            <ContactCard icon={<Linkedin className="h-5 w-5" />} label="LinkedIn" value="Anggito Rangkuti Bagas Muzaqi" href="https://www.linkedin.com/in/anggito-rangkuti-bagas-muzaqi/" />
            <ContactCard icon={<PhoneCall className="h-5 w-5" />} label="Whatsapp" value="Whatsapp" href="https://wa.me/6281380716742" />
            <ContactCard icon={<Instagram className="h-5 w-5" />} label="Instagram" value="Instagram" href="https://www.instagram.com/muzaqibagas" />
          </div>          
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>© {new Date().getFullYear()} Anggito Rangkuti Bagas Muzaqi. All rights reserved.</div>
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

      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        {selectedProject && (
          <DialogContent className="max-h-[85vh] max-w-5xl overflow-hidden p-0 sm:rounded-2xl">
            <div className="grid gap-0 lg:grid-cols-[1.2fr_1fr]">
              <div className="relative min-h-[300px] overflow-hidden bg-secondary lg:min-h-auto">
                <img
                  src={selectedProject.modalImage ?? selectedProject.image}
                  alt={selectedProject.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex max-h-[85vh] flex-col overflow-y-auto p-6 lg:p-8 hide-scrollbar">
                <DialogHeader className="text-left">
                  <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Project Detail</div>
                  <DialogTitle className="mt-3 font-display text-3xl font-semibold leading-tight">
                    {selectedProject.title}
                  </DialogTitle>                  
                </DialogHeader>

                <div className="mt-6 space-y-6">
                  <div>
                    <h4 className="font-semibold">{selectedProject.title}</h4>
                    <div className="mt-3">
                      {(Array.isArray(selectedProject.overview)
                        ? selectedProject.overview
                        : [selectedProject.overview]
                      ).map((paragraph, index) => (
                        <p
                          key={index}
                          className="mb-4 text-sm leading-7 text-muted-foreground text-justify"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold">Tech Stack</h4>
                    <div className="mt-3 flex flex-wrap items-center gap-4">
                      {selectedProject.tech.map((tech) => (
                        <img
                          key={tech.name}
                          src={tech.image}
                          alt={tech.name}
                          title={tech.name}
                          className="h-10 w-10 object-contain"
                        />
                      ))}
                    </div>
                  </div>
                </div>                
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>

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

function SectionHeader({ eyebrow, center }: { eyebrow: string; center?: boolean }) {
  return (
    <div className={center ? "text-center" : ""}>
      <div className="font-mono text-xs uppercase tracking-widest text-primary">— {eyebrow}</div>      
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
