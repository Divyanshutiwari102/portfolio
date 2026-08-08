const KEY = "motion-pref";

const listeners = new Set<(reduced: boolean) => void>();

export function getReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem(KEY);
  if (stored === "off") return true;
  if (stored === "on") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function setMotionPreference(pref: "on" | "off") {
  localStorage.setItem(KEY, pref);
  const reduced = pref === "off";
  document.documentElement.classList.toggle("reduce-motion", reduced);
  listeners.forEach((fn) => fn(reduced));
}

export function subscribeMotion(fn: (reduced: boolean) => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
