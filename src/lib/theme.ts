export type Theme = "light" | "dark";

const listeners = new Set<(t: Theme) => void>();
const STORAGE_KEY = "theme";

export function getSystemTheme(): Theme {
  if (typeof window === "undefined" || !window.matchMedia) return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

/** Explicit user choice, if any. `null` means "follow the system". */
export function getStoredPreference(): Theme | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
}

/** The theme that should actually be on screen. Defaults to system preference. */
export function getStoredTheme(): Theme {
  return getStoredPreference() ?? getSystemTheme();
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.add("theme-anim");
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  window.setTimeout(() => root.classList.remove("theme-anim"), 400);
}

export function setTheme(theme: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* storage unavailable — still switch for this session */
  }
  applyTheme(theme);
  listeners.forEach((fn) => fn(theme));
}

/** Forget the explicit choice and follow the OS again. */
export function useSystemTheme() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
  const theme = getSystemTheme();
  applyTheme(theme);
  listeners.forEach((fn) => fn(theme));
}

export function subscribeTheme(fn: (t: Theme) => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

/** Live-follow the OS while the visitor has made no explicit choice. */
export function subscribeSystemTheme() {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mq = window.matchMedia("(prefers-color-scheme: light)");
  const onChange = () => {
    if (getStoredPreference()) return;
    const theme = getSystemTheme();
    applyTheme(theme);
    listeners.forEach((fn) => fn(theme));
  };
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
