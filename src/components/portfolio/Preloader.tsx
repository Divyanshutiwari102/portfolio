import { useEffect, useState } from "react";

const greetings = [
  "Hello",
  "नमस्ते",
  "Bonjour",
  "こんにちは",
  "Hola",
  "Olá",
  "안녕하세요",
  "Ciao",
  "Divyanshu",
];

export function Preloader() {
  const [done, setDone] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [i, setI] = useState(0);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    let frame = 0;
    const start = performance.now();
    // ~0.55s per greeting so each language is readable before it swaps
    const DURATION = greetings.length * 550;

    const tick = (t: number) => {
      const p = Math.min((t - start) / DURATION, 1);
      setPct(Math.round(p * 100));
      setI(Math.min(greetings.length - 1, Math.floor(p * greetings.length)));
      if (p < 1) frame = requestAnimationFrame(tick);
      else {
        // hold on the final greeting for a beat before sliding away
        window.setTimeout(() => setLeaving(true), 600);
        window.setTimeout(() => {
          setDone(true);
          document.body.style.overflow = "";
        }, 1450);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[200] grid place-items-center bg-background transition-[transform,opacity] duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        leaving ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <div className="flex items-baseline gap-3">
        <span className="size-2 animate-pulse rounded-full bg-highlight" />
        <p key={i} className="animate-fade-in font-display text-3xl font-bold sm:text-5xl">
          {greetings[i]}
        </p>
      </div>
      <div className="absolute bottom-10 left-1/2 w-48 -translate-x-1/2">
        <div className="h-0.5 w-full overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full bg-highlight transition-[width] duration-100"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-2 text-center font-mono text-[11px] text-muted-foreground">{pct}%</p>
      </div>
    </div>
  );
}
