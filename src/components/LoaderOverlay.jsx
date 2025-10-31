"use client";

import { useEffect, useState } from "react";

export default function LoaderOverlay() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  // Starta tidslinjen: visa direkt → efter 1s börja fadea → ta bort efter 1.8s
  useEffect(() => {
    const t1 = setTimeout(() => setFadeOut(true), 1000);
    const t2 = setTimeout(() => setVisible(false), 1800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Mjuk scroll-lock: bara overflow hidden på <html> under overlay
  useEffect(() => {
    if (visible) {
      const html = document.documentElement;
      const prev = html.style.overflow;
      html.style.overflow = "hidden";
      return () => {
        html.style.overflow = prev;
      };
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={[
        "fixed inset-0 z-[9999] bg-black text-white",
        "flex items-center justify-center select-none",
        "transition-opacity duration-500 ease-out",
        fadeOut ? "opacity-0" : "opacity-100",
      ].join(" ")}
      // vi behöver inte blockera wheel/touch — overflow:hidden räcker
    >
      <span
        className={[
          "font-semibold tracking-tight",
          "transition-transform duration-700 ease-out",
          fadeOut ? "scale-110 opacity-90" : "scale-100 opacity-100",
          "text-4xl sm:text-5xl",
        ].join(" ")}
      >
        🟦 GW
      </span>
    </div>
  );
}
