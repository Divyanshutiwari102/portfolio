import { useEffect, useState } from "react";
import { Zap, ZapOff } from "lucide-react";
import { getReducedMotion, setMotionPreference, subscribeMotion } from "@/lib/motion-pref";

export function MotionToggle({ className = "" }: { className?: string }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const initial = getReducedMotion();
    setReduced(initial);
    document.documentElement.classList.toggle("reduce-motion", initial);
    return subscribeMotion(setReduced);
  }, []);

  const Icon = reduced ? ZapOff : Zap;

  return (
    <button
      type="button"
      onClick={() => setMotionPreference(reduced ? "on" : "off")}
      aria-pressed={reduced}
      aria-label={reduced ? "Enable animations" : "Reduce motion"}
      title={reduced ? "Enable animations" : "Reduce motion"}
      className={`grid size-9 shrink-0 place-items-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary ${className}`}
    >
      <Icon className="size-4" />
    </button>
  );
}
