"use client";

import { useEffect, useState } from "react";

export default function LoaderOverlay() {
  const [visible, setVisible] = useState(true); // styr om overlayen finns kvar
  const [fadeOut, setFadeOut] = useState(false); // triggar fade ut

  useEffect(() => {
    // vänta 1 sekund → börja fade ut
    const fadeTimer = setTimeout(() => setFadeOut(true), 1000);
    // vänta ytterligare 0.7 sek → ta bort overlayen
    const removeTimer = setTimeout(() => setVisible(false), 1700);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={[
        "fixed inset-0 z-[9999] bg-black text-white",
        "flex items-center justify-center",
        "transition-opacity duration-700",
        fadeOut ? "opacity-0" : "opacity-100", // fade ut men inte in
      ].join(" ")}
    >
      <span className="font-semibold tracking-tight select-none text-4xl sm:text-5xl">
        GW
      </span>
    </div>
  );
}
