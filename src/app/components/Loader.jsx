"use client";

import { useEffect, useState } from "react";

export default function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.classList.add("overflow-hidden", "cursor-none");

    const timeout = setTimeout(() => {
      setVisible(false);
      document.body.classList.remove("overflow-hidden", "cursor-none");
    }, 2000);

    return () => {
      clearTimeout(timeout);
      document.body.classList.remove("overflow-hidden", "cursor-none"); // fallback
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center transition-opacity duration-700 bg-[var(--background)] text-[var(--foreground)]">
      <img
        src="/cursor.svg"
        alt="loading"
        className="w-24 h-24 spin-forever mix-blend-difference"
      />
    </div>
  );
}
