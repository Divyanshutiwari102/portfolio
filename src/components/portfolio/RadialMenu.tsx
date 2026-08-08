import { useCallback, useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { getReducedMotion } from "@/lib/motion-pref";

type Item = { id: string; emoji: string; label: string; color: string };

const ITEMS: Item[] = [
  { id: "love", emoji: "❤️", label: "Love", color: "#ef4444" },
  { id: "laugh", emoji: "😂", label: "Haha", color: "#fbbf24" },
  { id: "wow", emoji: "😮", label: "Wow", color: "#3b82f6" },
  { id: "sad", emoji: "😢", label: "Sad", color: "#60a5fa" },
  { id: "angry", emoji: "😡", label: "Angry", color: "#f97316" },
  { id: "fire", emoji: "🔥", label: "Lit", color: "#f59e0b" },
];

const RADIUS = 78;
const DEAD_ZONE = 18;

export function RadialMenu() {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState<number | null>(null);
  const [waves, setWaves] = useState<{ id: string; x: number; y: number; color: string; emoji: string }[]>([]);
  const [hint, setHint] = useState(false);
  const openRef = useRef(false);
  const posRef = useRef({ x: 0, y: 0 });
  const activeRef = useRef<number | null>(null);
  const movedRef = useRef(false);

  useEffect(() => {
    openRef.current = open;
    posRef.current = pos;
    activeRef.current = active;
  }, [open, pos, active]);

  useEffect(() => {
    if (localStorage.getItem("radial-hint") === "1") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const t = window.setTimeout(() => setHint(true), 4000);
    const t2 = window.setTimeout(() => setHint(false), 12000);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(t2);
    };
  }, []);

  const burst = useCallback((x: number, y: number, item: Item) => {
    const emojiShape = confetti.shapeFromText({ text: item.emoji, scalar: 3 });
    confetti({
      particleCount: 24,
      spread: 90,
      origin: { x: x / window.innerWidth, y: y / window.innerHeight },
      shapes: [emojiShape],
      scalar: 3,
      startVelocity: 28,
      zIndex: 9999,
      disableForReducedMotion: true,
    });
    const id = `${Date.now()}`;
    setWaves((w) => [...w, { id, x, y, color: item.color, emoji: item.emoji }]);
    window.setTimeout(() => setWaves((w) => w.filter((s) => s.id !== id)), 1200);
  }, []);

  useEffect(() => {
    const onContext = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      if (el?.closest("a, button, input, textarea, select, img, [contenteditable]")) return;
      if (getReducedMotion()) return;
      e.preventDefault();
      setPos({ x: e.clientX, y: e.clientY });
      setActive(null);
      movedRef.current = false;
      setOpen(true);
      setHint(false);
      localStorage.setItem("radial-hint", "1");
    };

    const onMove = (e: MouseEvent) => {
      if (!openRef.current) return;
      const dx = e.clientX - posRef.current.x;
      const dy = e.clientY - posRef.current.y;
      const dist = Math.hypot(dx, dy);
      if (dist < DEAD_ZONE) {
        setActive(null);
        return;
      }
      movedRef.current = true;
      let angle = Math.atan2(dy, dx) + Math.PI / 2;
      if (angle < 0) angle += Math.PI * 2;
      setActive(Math.floor((angle / (Math.PI * 2)) * ITEMS.length) % ITEMS.length);
    };

    const onUp = () => {
      if (!openRef.current) return;
      // click-and-release without dragging keeps the menu open (click mode)
      if (!movedRef.current) return;
      const idx = activeRef.current;
      setOpen(false);
      if (idx !== null) {
        const item = ITEMS[idx];
        if (item) burst(posRef.current.x, posRef.current.y, item);
      }
    };

    const onClick = (e: MouseEvent) => {
      if (!openRef.current || !movedRef.current) return;
      const idx = activeRef.current;
      setOpen(false);
      if (idx !== null) {
        const item = ITEMS[idx];
        if (item) burst(e.clientX, e.clientY, item);
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("contextmenu", onContext);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("click", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("contextmenu", onContext);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [burst]);

  return (
    <>
      {hint && (
        <div className="animate-fade-in fixed bottom-20 left-1/2 z-[90] -translate-x-1/2 rounded-full border border-border bg-card/90 px-4 py-2 text-xs text-muted-foreground backdrop-blur">
          psst — right-click anywhere and drag to react 🔥
        </div>
      )}

      {open && (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-[160]">
          <div
            className="absolute"
            style={{ left: pos.x, top: pos.y }}
          >
            {ITEMS.map((it, idx) => {
              const angle = (idx / ITEMS.length) * Math.PI * 2 - Math.PI / 2;
              const x = Math.cos(angle) * RADIUS;
              const y = Math.sin(angle) * RADIUS;
              const isActive = active === idx;
              return (
                <span
                  key={it.id}
                  className="absolute grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-border bg-card text-lg transition-transform duration-150"
                  style={{
                    left: x,
                    top: y,
                    transform: `translate(-50%, -50%) scale(${isActive ? 1.35 : 1})`,
                    boxShadow: isActive ? `0 0 0 2px ${it.color}` : undefined,
                  }}
                >
                  {it.emoji}
                </span>
              );
            })}
            <span className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-highlight" />
          </div>
        </div>
      )}

      {waves.map((w) => (
        <span
          key={w.id}
          aria-hidden
          className="pointer-events-none fixed z-[159] size-6 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: w.x,
            top: w.y,
            border: `2px solid ${w.color}`,
            animation: "shockwave 1.1s ease-out forwards",
          }}
        />
      ))}
    </>
  );
}
