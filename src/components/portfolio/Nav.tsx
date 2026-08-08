import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, profile } from "@/data/portfolio";
import { ThemeToggle } from "./ThemeToggle";
import { ResumeButton } from "./ResumeButton";
import { CommandHint } from "./CommandPalette";
import { MotionToggle } from "./MotionToggle";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.6, 1] },
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass" : "bg-transparent"
      }`}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 sm:px-8">
        <a
          href="#home"
          className="min-w-0 truncate font-display text-sm font-bold tracking-tight sm:text-base"
        >
          {profile.name}
        </a>

        <div className="hidden items-center gap-6 md:flex">
        <CommandHint />
        <ResumeButton />
        <MotionToggle />
        <ThemeToggle />
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="flex shrink-0 items-center gap-2 rounded-full border-2 border-foreground px-4 py-2 font-display text-sm font-bold text-foreground transition-colors hover:bg-secondary"
        >
          {open ? "Close" : "Menu"}
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
        <MotionToggle />
        <ThemeToggle />

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="flex shrink-0 items-center gap-2 rounded-full border border-border px-3 py-2 text-sm text-foreground transition-colors hover:bg-secondary"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 top-0 z-40 animate-in fade-in duration-300"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-background/70 backdrop-blur-xl" />
          <nav
            className="relative flex h-full flex-col justify-center gap-2 px-5 pt-24 sm:px-8"
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="mx-auto flex max-w-6xl flex-wrap items-baseline gap-x-8 gap-y-2">
              {navLinks.map((l, i) => {
                const active = activeId === l.href.slice(1);
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      style={{ animationDelay: `${i * 45}ms` }}
                      className={`animate-in fade-in slide-in-from-bottom-4 font-display text-5xl font-extrabold uppercase leading-none tracking-tight transition-colors duration-300 sm:text-7xl lg:text-8xl ${
                        active
                          ? "text-foreground underline decoration-4 underline-offset-8"
                          : "text-muted-foreground/60 hover:text-foreground"
                      }`}
                    >
                      {l.label}
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className="mx-auto mt-10 w-full max-w-6xl md:hidden">
              <ResumeButton className="w-full justify-center" />
            </div>
          </nav>
        </div>
      )}

    </header>
  );
}
