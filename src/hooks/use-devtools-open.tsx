import { useEffect, useState } from "react";


export const useDevToolsOpen = () => {
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let stopFn: (() => void) | undefined;
    // devtools-detector is CJS and browser-only — load it lazily after hydration.
    void import("devtools-detector").then((mod) => {
      const { addListener, launch, stop } = (mod as any).default ?? mod;
      stopFn = stop;
      addListener((isOpen: boolean) => {
        if (isOpen) {
          setIsDevToolsOpen(true);
          stop();
        }
      });
      launch();
    });
    return () => {
      stopFn?.();
    };
  }, []);
  return { isDevToolsOpen };
};
