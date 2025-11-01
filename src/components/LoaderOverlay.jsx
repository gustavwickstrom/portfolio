"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function LoaderOverlay() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFadeOut(true), 1000); // efter varvet
    const t2 = setTimeout(() => setVisible(false), 1800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev;
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={[
        "fixed inset-0 z-[9999] bg-black text-white",
        "flex items-center justify-center select-none",
        "transition-opacity duration-700 ease-out",
        fadeOut ? "opacity-0" : "opacity-100",
      ].join(" ")}
    >
      <div
        className={[
          "origin-center will-change-transform",
          "motion-safe:animate-rotateOnce", // 👈 ny animering
          "transition-transform duration-700 ease-out",
          fadeOut ? "scale-110 opacity-90" : "scale-100 opacity-100",
        ].join(" ")}
      >
        <Image
          src="/images/sun.svg"
          alt="Loader icon"
          width={80}
          height={80}
          priority
        />
      </div>
    </div>
  );
}
