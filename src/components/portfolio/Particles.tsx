import { useEffect, useRef, useState } from "react";
import { getReducedMotion, subscribeMotion } from "@/lib/motion-pref";

function deviceBudget() {
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    hardwareConcurrency?: number;
    connection?: { saveData?: boolean };
  };
  const smallScreen =
    typeof window !== "undefined" && window.innerWidth < 768;
  const coarse =
    typeof window !== "undefined" &&
    window.matchMedia?.("(pointer: coarse)").matches;
  const lowCores = (nav.hardwareConcurrency ?? 8) <= 4;
  const lowMem = (nav.deviceMemory ?? 8) <= 4;
  const saveData = !!nav.connection?.saveData;

  if (saveData) return { scale: 0, fps: 0, dpr: 1 };
  if (smallScreen || coarse || lowCores || lowMem)
    return { scale: 0.35, fps: 24, dpr: 1 };
  return { scale: 1, fps: 60, dpr: 2 };
}

export function Particles({ count = 60 }: { count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    setOn(!getReducedMotion());
    return subscribeMotion((r) => setOn(!r));
  }, []);

  useEffect(() => {
    if (!on) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const budget = deviceBudget();
    const total = Math.round(count * budget.scale);
    if (total <= 0) return;

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, budget.dpr);
    const dots = Array.from({ length: total }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.4 + 0.4,
      vx: (Math.random() - 0.5) * 0.00035,
      vy: (Math.random() - 0.5) * 0.00035,
      a: Math.random() * 0.5 + 0.15,
    }));

    let resizeTimer: number | undefined;
    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 150);
    };
    resize();
    window.addEventListener("resize", onResize, { passive: true });

    // cache theme colour instead of reading the DOM every frame
    let isDark = document.documentElement.classList.contains("dark");
    const themeObserver = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains("dark");
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const minDelta = 1000 / budget.fps;
    let frame = 0;
    let last = 0;
    let running = true;

    const draw = (now: number) => {
      frame = requestAnimationFrame(draw);
      if (now - last < minDelta) return;
      // scale motion by elapsed time so a lower fps still moves at one speed
      const step = Math.min((now - last) / 16.67, 3);
      last = now;

      ctx.clearRect(0, 0, w, h);
      const fill = isDark
        ? "rgba(255,255,255,"
        : "rgba(20,20,30,";
      for (const d of dots) {
        d.x += d.vx * step;
        d.y += d.vy * step;
        if (d.x < 0 || d.x > 1) d.vx *= -1;
        if (d.y < 0 || d.y > 1) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x * w, d.y * h, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `${fill}${isDark ? d.a : d.a * 0.6})`;
        ctx.fill();
      }
    };
    frame = requestAnimationFrame(draw);

    // pause while the tab is hidden, or while the visitor is busy with the
    // nav / contact form so those surfaces get the full frame budget
    const FOCUS_SELECTOR = "header, nav, form, #contact";
    let hovering = false;
    let focused = false;

    const apply = () => {
      const shouldRun = !document.hidden && !hovering && !focused;
      if (shouldRun === running) return;
      running = shouldRun;
      if (shouldRun) {
        last = 0;
        frame = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(frame);
        document.documentElement.dataset["bgPaused"] = "true";
      }
      if (shouldRun) delete document.documentElement.dataset["bgPaused"];
    };

    const onVisibility = () => apply();
    const onPointerOver = (e: Event) => {
      hovering = !!(e.target as Element | null)?.closest?.(FOCUS_SELECTOR);
      apply();
    };
    const onFocusIn = (e: Event) => {
      focused = !!(e.target as Element | null)?.closest?.(FOCUS_SELECTOR);
      apply();
    };
    const onFocusOut = () => {
      focused = false;
      apply();
    };

    document.addEventListener("visibilitychange", onVisibility);
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);

    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
      themeObserver.disconnect();
      window.clearTimeout(resizeTimer);
      cancelAnimationFrame(frame);
      delete document.documentElement.dataset["bgPaused"];

    };
  }, [on, count]);

  if (!on) return null;

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
