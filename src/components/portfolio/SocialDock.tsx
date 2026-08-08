import { useState } from "react";
import { Github, Linkedin, Code2, MapPin, FileText, Copy, Check } from "lucide-react";
import { profile } from "@/data/portfolio";
import resume from "@/assets/resume.pdf.asset.json";

const socials = [
  { label: "GitHub", tip: "let's build", Icon: Github, url: profile.github },
  { label: "LinkedIn", tip: "connect?", Icon: Linkedin, url: profile.linkedin },
  { label: "LeetCode", tip: "300+ solved", Icon: Code2, url: profile.leetcode },
];

export function SocialDock() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    void navigator.clipboard.writeText(profile.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="mt-8 max-w-md">
      <a
        href={resume.url}
        download="Divyanshu_Tiwari_Resume.pdf"
        className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-border bg-card px-5 py-3.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:border-highlight/50"
      >
        <FileText className="size-4 transition-transform duration-300 group-hover:-rotate-6" />
        Resume
      </a>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <div className="group/hire relative">
          <a
            href="#contact"
            className="inline-flex items-center rounded-2xl border border-border bg-secondary px-5 py-3 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5"
          >
            Hire Me
          </a>
          <span className="pointer-events-none absolute top-full left-0 mt-2 rounded-xl border border-border bg-card px-3 py-1.5 text-xs whitespace-nowrap opacity-0 transition-all duration-300 group-hover/hire:-translate-y-0.5 group-hover/hire:opacity-100">
            pls 🥺🙏
          </span>
        </div>

        {socials.map(({ label, tip, Icon, url }) => (
          <div key={label} className="group/s relative">
            <a
              href={url}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={label}
              className="grid size-12 place-items-center rounded-2xl border border-border bg-card text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-highlight/50 hover:text-foreground"
            >
              <Icon className="size-5" />
            </a>
            <span className="pointer-events-none absolute top-full left-1/2 mt-2 -translate-x-1/2 rounded-xl border border-border bg-card px-2.5 py-1.5 text-[11px] whitespace-nowrap opacity-0 transition-all duration-300 group-hover/s:-translate-y-0.5 group-hover/s:opacity-100">
              {tip}
            </span>
          </div>
        ))}

        <button
          type="button"
          onClick={copyEmail}
          aria-label="Copy email address"
          className="grid size-12 place-items-center rounded-2xl border border-border bg-card text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-highlight/50 hover:text-foreground"
        >
          {copied ? <Check className="size-5 text-highlight" /> : <Copy className="size-5" />}
        </button>

        <span className="inline-flex items-center gap-2 rounded-2xl border border-highlight/40 bg-highlight/10 px-4 py-3 text-sm font-medium">
          <MapPin className="size-4 text-highlight" />
          Greater Noida <span className="text-[11px] text-muted-foreground uppercase">in</span>
        </span>
      </div>
    </div>
  );
}
