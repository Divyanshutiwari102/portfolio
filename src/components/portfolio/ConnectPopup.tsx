import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, X } from "lucide-react";
import { profile } from "@/data/portfolio";

type Pitch = {
  id: "linkedin" | "github";
  href: string;
  line: string;
  cta: string;
};

const PITCHES: Pitch[] = [
  {
    id: "linkedin",
    href: profile.linkedin,
    line: "Psst… still scrolling? Let's connect on LinkedIn.",
    cta: "Go to LinkedIn",
  },
  {
    id: "github",
    href: profile.github,
    line: "Code speaks louder than words. Peek at my GitHub?",
    cta: "Open GitHub",
  },
  {
    id: "linkedin",
    href: profile.linkedin,
    line: "Hiring backend or AI folks? I'm one message away.",
    cta: "Connect on LinkedIn",
  },
  {
    id: "github",
    href: profile.github,
    line: "40+ repos, mostly Java, Spring & AI pipelines.",
    cta: "Browse repos",
  },
];

/** A little character that pops in from the corner every now and then while you scroll. */
export function ConnectPopup() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const dismissed = useRef(false);
  const shown = useRef(0);
  const lastAt = useRef(0);
  const hideTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    let scrolled = 0;
    let lastY = window.scrollY;

    const hideSoon = () => {
      window.clearTimeout(hideTimer.current);
      hideTimer.current = window.setTimeout(() => setOpen(false), 9000);
    };

    const onScroll = () => {
      if (dismissed.current) return;
      const y = window.scrollY;
      scrolled += Math.abs(y - lastY);
      lastY = y;

      const now = Date.now();
      const cooled = now - lastAt.current > 25000;
      // pops in after a decent stretch of scrolling, then only occasionally
      if (!open && scrolled > 2200 && cooled && shown.current < 4) {
        scrolled = 0;
        lastAt.current = now;
        shown.current += 1;
        setIndex((i) => (i + 1) % PITCHES.length);
        setOpen(true);
        hideSoon();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(hideTimer.current);
    };
  }, [open]);

  const close = () => {
    dismissed.current = true;
    setOpen(false);
  };

  const pitch = PITCHES[index] ?? PITCHES[0]!;
  const Icon = pitch.id === "linkedin" ? Linkedin : Github;

  return (
    <div
      aria-hidden={!open}
      className={`pointer-events-none fixed bottom-5 left-4 z-40 flex items-end gap-3 transition-all duration-500 sm:bottom-8 sm:left-8 ${
        open
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "translate-y-8 opacity-0"
      }`}
    >
      {/* peeking character */}
      <a
        href={pitch.href}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={pitch.cta}
        className="connect-peek grid size-16 shrink-0 place-items-center rounded-full border-2 border-highlight bg-card shadow-[var(--shadow-float)] transition-transform hover:scale-105"
      >
        <span className="text-2xl" role="img" aria-hidden="true">
          🙋‍♂️
        </span>
      </a>

      {/* speech bubble */}
      <div className="relative max-w-[17rem] rounded-2xl border border-border bg-card p-4 pr-9 shadow-[var(--shadow-float)]">
        <button
          type="button"
          onClick={close}
          aria-label="Dismiss"
          className="absolute right-2 top-2 grid size-6 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <X className="size-3.5" />
        </button>
        <p className="text-sm font-semibold leading-snug text-foreground">{pitch.line}</p>
        <a
          href={pitch.href}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-3 inline-flex items-center gap-2 rounded-xl border border-highlight px-3 py-1.5 text-xs font-bold text-foreground transition-colors hover:bg-secondary"
        >
          <Icon className="size-3.5" />
          {pitch.cta}
        </a>
      </div>
    </div>
  );
}
