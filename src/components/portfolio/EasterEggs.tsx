import { useEffect, useState } from "react";

type Cat = { id: string; top: number; dur: number };

export function EasterEggs() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [konami, setKonami] = useState(false);

  useEffect(() => {
    const names = ["divyanshu", "Divyanshu", "DIVYANSHU"];
    names.forEach((name) => {
      if (Object.prototype.hasOwnProperty.call(window, name)) return;
      try {
        Object.defineProperty(window, name, {
          get() {
            console.log(
              "%c✨ Abra Kadabra! ✨\n\nYou summoned Divyanshu Tiwari — backend + AI engineer.\nSpring Boot, Kafka, pgvector, LangGraph… and 300+ LeetCode problems.\nPsst: press 'n' on the page for a surprise 🐱",
              "color:#FF4500;font-size:15px;font-weight:bold;background:#000;padding:10px;border-radius:10px",
            );
            return "";
          },
        });
      } catch {
        /* ignore */
      }
    });

    console.log(
      "%cWhoa, look at you! 🕵️\nPeeking under the hood?\nType %cdivyanshu%c and hit enter for magic 🎩",
      "color:#FFD700;font-size:15px;font-weight:bold;background:#000;padding:10px;border-radius:10px",
      "color:#00FF00;font-size:15px;font-weight:bold;background:#000;padding:10px;border-radius:10px",
      "color:#FFD700;font-size:15px;font-weight:bold;background:#000;padding:10px;border-radius:10px",
    );
  }, []);

  useEffect(() => {
    const sequence = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let idx = 0;

    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;

      if (e.key.toLowerCase() === "n") {
        const id = `${Date.now()}-${Math.random()}`;
        const cat: Cat = { id, top: Math.random() * 70 + 10, dur: 4 + Math.random() * 2 };
        setCats((c) => [...c, cat]);
        window.setTimeout(() => setCats((c) => c.filter((x) => x.id !== id)), cat.dur * 1000);
      }

      if (e.key === sequence[idx] || e.key.toLowerCase() === sequence[idx]) {
        idx += 1;
        if (idx === sequence.length) {
          idx = 0;
          setKonami(true);
          window.setTimeout(() => setKonami(false), 5000);
        }
      } else {
        idx = e.key === sequence[0] ? 1 : 0;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[80] overflow-hidden">
      {cats.map((c) => (
        <span
          key={c.id}
          className="nyan absolute left-0 flex items-center"
          style={{ top: `${c.top}%`, animationDuration: `${c.dur}s` }}
        >
          <span className="nyan-trail block h-4 w-24 rounded-l-full" />
          <span className="text-3xl">🐱</span>
        </span>
      ))}

      {konami && (
        <div className="animate-fade-in fixed inset-x-0 top-24 z-[190] mx-auto w-fit rounded-full border border-highlight/50 bg-card/90 px-5 py-2.5 text-sm font-medium backdrop-blur">
          🎮 Konami code unlocked — 30 extra lives of clean code granted.
        </div>
      )}
    </div>
  );
}
