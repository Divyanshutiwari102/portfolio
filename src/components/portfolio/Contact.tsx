import { Mail, Github, Linkedin, Code2, Phone, ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { profile } from "@/data/portfolio";
import { ContactForm } from "./ContactForm";

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: Mail },
  { label: "GitHub", value: profile.githubHandle, href: profile.github, Icon: Github },
  { label: "LinkedIn", value: "divyanshu-tiwari", href: profile.linkedin, Icon: Linkedin },
  { label: "LeetCode", value: "300+ solved", href: profile.leetcode, Icon: Code2 },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phone}`, Icon: Phone },
];

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <SectionHeading index="07" label="contact" title="Let's talk" />
      <Reveal delay={60}>
        <p className="mt-6 max-w-xl text-muted-foreground">
          Open to internships, full-time roles, and interesting backend or AI
          projects. The fastest way to reach me is email.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr]">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {channels.map(({ label, value, href, Icon }, i) => (
          <Reveal key={label} delay={i * 70}>
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer noopener"
              className="card-hover glass grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-2xl p-5"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-border text-highlight">
                <Icon className="size-4" />
              </span>
              <span className="min-w-0">
                <span className="eyebrow block">{label}</span>
                <span className="mt-1 block truncate text-sm">{value}</span>
              </span>
              <ArrowUpRight className="size-4 shrink-0 text-muted-foreground" />
            </a>
          </Reveal>
        ))}
      </div>
      <Reveal delay={120}>
        <ContactForm />
      </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-8 sm:px-8">
        <p className="min-w-0 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>

        <nav className="flex shrink-0 items-center gap-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="size-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Linkedin className="size-4" />
          </a>
          <a
            href="#home"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Back to top
          </a>
        </nav>
      </div>
    </footer>
  );
}
