import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import {
  applyTheme,
  getStoredTheme,
  setTheme,
  subscribeSystemTheme,
  subscribeTheme,
  type Theme,
} from "@/lib/theme";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setLocal] = useState<Theme>("dark");
  const [asking, setAsking] = useState(false);

  useEffect(() => {
    const initial = getStoredTheme();
    setLocal(initial);
    applyTheme(initial);
    const offTheme = subscribeTheme(setLocal);
    const offSystem = subscribeSystemTheme();
    return () => {
      offTheme();
      offSystem();
    };
  }, []);

  useEffect(() => {
    if (!asking) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAsking(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [asking]);

  const toggle = () => {
    if (theme === "dark") {
      setAsking(true);
      return;
    }
    setTheme("dark");
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggle}
        title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
        aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
        aria-pressed={theme === "dark"}
        aria-expanded={asking}
        className={`relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-full border border-border text-foreground transition-colors hover:bg-secondary ${className}`}
      >
        <Sun
          className={`absolute size-4 transition-all duration-300 ${
            theme === "dark" ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
          }`}
        />
        <Moon
          className={`absolute size-4 transition-all duration-300 ${
            theme === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
          }`}
        />
      </button>

      {asking && (
        <>
          <div
            className="fixed inset-0 z-40"
            aria-hidden="true"
            onClick={() => setAsking(false)}
          />
          <div
            role="dialog"
            aria-label="Caution: light mode ahead"
            className="absolute right-0 top-[calc(100%+0.6rem)] z-50 w-[19rem] rounded-2xl border border-border bg-card p-5 text-center shadow-[var(--shadow-float)]"
          >
            <p className="text-sm font-semibold leading-relaxed text-foreground">
              Caution: Light mode ahead! Only trained professionals can handle this much
              brightness. Proceed with sunglasses!
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setTheme("light");
                  setAsking(false);
                }}
                className="rounded-xl border-2 border-highlight px-5 py-2 text-sm font-bold text-foreground transition-colors hover:bg-secondary"
              >
                Go Light
              </button>
              <button
                type="button"
                onClick={() => setAsking(false)}
                className="rounded-xl px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Stay dark
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

