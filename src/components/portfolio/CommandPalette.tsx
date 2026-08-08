import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Command,
  Copy,
  Download,
  Github,
  Linkedin,
  Moon,
  Search,
  Sun,
  Code2,
  Mail,
} from "lucide-react";
import { navLinks, profile } from "@/data/portfolio";
import resume from "@/assets/resume.pdf.asset.json";
import { getStoredTheme, setTheme } from "@/lib/theme";
import { toast } from "sonner";

type Item = {
  id: string;
  label: string;
  hint: string;
  group: "Navigate" | "Actions" | "Links";
  icon: React.ComponentType<{ className?: string }>;
  run: () => void;
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQ("");
    setActive(0);
  }, []);

  const items = useMemo<Item[]>(() => {
    const nav: Item[] = navLinks.map((l) => ({
      id: `nav-${l.href}`,
      label: `Go to ${l.label}`,
      hint: l.href,
      group: "Navigate",
      icon: ArrowRight,
      run: () => {
        document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth" });
      },
    }));

    const actions: Item[] = [
      {
        id: "resume",
        label: "Download resume",
        hint: "PDF",
        group: "Actions",
        icon: Download,
        run: () => {
          const a = document.createElement("a");
          a.href = resume.url;
          a.download = "Divyanshu_Tiwari_Resume.pdf";
          a.click();
        },
      },
      {
        id: "email",
        label: "Copy email address",
        hint: profile.email,
        group: "Actions",
        icon: Copy,
        run: () => {
          void navigator.clipboard.writeText(profile.email);
          toast.success("Email copied to clipboard");
        },
      },
      {
        id: "mail",
        label: "Send me an email",
        hint: "mailto",
        group: "Actions",
        icon: Mail,
        run: () => {
          window.location.href = `mailto:${profile.email}`;
        },
      },
      {
        id: "theme",
        label: "Toggle theme",
        hint: "T",
        group: "Actions",
        icon: getStoredTheme() === "dark" ? Sun : Moon,
        run: () => setTheme(getStoredTheme() === "dark" ? "light" : "dark"),
      },
    ];

    const links: Item[] = [
      { id: "gh", label: "Open GitHub", hint: profile.githubHandle, icon: Github, url: profile.github },
      { id: "li", label: "Open LinkedIn", hint: "divyanshu-tiwari", icon: Linkedin, url: profile.linkedin },
      { id: "lc", label: "Open LeetCode", hint: "300+ solved", icon: Code2, url: profile.leetcode },
    ].map((l) => ({
      id: l.id,
      label: l.label,
      hint: l.hint,
      group: "Links" as const,
      icon: l.icon,
      run: () => window.open(l.url, "_blank", "noopener,noreferrer"),
    }));

    return [...nav, ...actions, ...links];
  }, [open]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return items;
    return items.filter(
      (i) => i.label.toLowerCase().includes(term) || i.hint.toLowerCase().includes(term),
    );
  }, [items, q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (e.key === "Escape") {
        close();
        return;
      }
      if (!open && !typing) {
        if (e.key === "/") {
          e.preventDefault();
          setOpen(true);
        } else if (e.key.toLowerCase() === "t") {
          setTheme(getStoredTheme() === "dark" ? "light" : "dark");
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 30);
      document.body.style.overflow = "hidden";
      return () => {
        window.clearTimeout(t);
        document.body.style.overflow = "";
      };
    }
    return undefined;
  }, [open]);

  if (!open) return null;

  const groups: Item["group"][] = ["Navigate", "Actions", "Links"];
  let index = -1;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-start justify-center bg-background/80 p-5 pt-[12vh] backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onClick={close}
    >
      <div
        className="animate-fade-in w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setActive(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => (a + 1) % Math.max(filtered.length, 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => (a - 1 + filtered.length) % Math.max(filtered.length, 1));
              } else if (e.key === "Enter") {
                e.preventDefault();
                const it = filtered[active];
                if (it) {
                  close();
                  it.run();
                }
              }
            }}
            placeholder="Search sections, actions, links…"
            aria-label="Search commands"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="rounded-md border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">
            esc
          </kbd>
        </div>

        <div className="max-h-[52vh] overflow-y-auto py-2">
          {filtered.length === 0 && (
            <p className="px-4 py-6 text-center text-sm text-muted-foreground">No matches.</p>
          )}
          {groups.map((g) => {
            const rows = filtered.filter((i) => i.group === g);
            if (rows.length === 0) return null;
            return (
              <div key={g} className="px-2 pb-1">
                <p className="px-2 py-1.5 text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                  {g}
                </p>
                {rows.map((it) => {
                  index += 1;
                  const i = index;
                  const Icon = it.icon;
                  return (
                    <button
                      key={it.id}
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onClick={() => {
                        close();
                        it.run();
                      }}
                      className={`flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left text-sm transition-colors ${
                        active === i ? "bg-secondary text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      <Icon className="size-4 shrink-0" />
                      <span className="min-w-0 flex-1 truncate">{it.label}</span>
                      <span className="shrink-0 text-[11px] text-muted-foreground">{it.hint}</span>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Command className="size-3" /> K to toggle
          </span>
          <span>↑↓ navigate · ⏎ select · T theme</span>
        </div>
      </div>
    </div>
  );
}

export function CommandHint({ className = "" }: { className?: string }) {
  const openPalette = () => {
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true }),
    );
  };
  return (
    <button
      type="button"
      onClick={openPalette}
      aria-label="Open command palette"
      className={`inline-flex shrink-0 items-center gap-2 rounded-full border border-border px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground ${className}`}
    >
      <Search className="size-3.5" />
      <kbd className="font-sans text-[11px]">⌘K</kbd>
    </button>
  );
}
