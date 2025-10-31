"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function StillsGallery({ images }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const open = (idx) => setSelectedIndex(idx);
  const close = () => setSelectedIndex(null);
  const next = () => setSelectedIndex((i) => (i + 1) % images.length);
  const prev = () =>
    setSelectedIndex((i) => (i - 1 + images.length) % images.length);

  // Tangentbordsnavigation (← → ESC)
  useEffect(() => {
    const onKey = (e) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") return close();
      if (e.key === "ArrowRight") return next();
      if (e.key === "ArrowLeft") return prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedIndex, images.length]);

  // Lås scroll när lightbox är öppen
  useEffect(() => {
    document.body.style.overflow = selectedIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  const selected = selectedIndex !== null ? images[selectedIndex] : null;

  return (
    <main className="mx-auto relative">
      {/* Masonry layout */}
      <div className="columns-2 lg:columns-3 gap-10">
        {images.map(({ file, width, height }, i) => {
          const src = `/images/stills/${file}`;
          return (
            <div
              key={file}
              className="mb-10 break-inside-avoid overflow-hidden cursor-zoom-in"
              onClick={() => open(i)}
            >
              <Image
                src={src}
                alt={file}
                width={width}
                height={height}
                className="w-full h-auto transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 33vw"
                priority={i < 3}
              />
            </div>
          );
        })}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4 cursor-zoom-out"
          onClick={close} // klick var som helst stänger
        >
          {/* Behåll luften runt bilden */}
          <div className="relative w-[92vw] max-w-6xl h-[82vh] pointer-events-none">
            <Image
              src={`/images/stills/${selected.file}`}
              alt={selected.file}
              fill
              className="object-contain select-none"
              sizes="100vw"
              priority
            />
          </div>

          {/* Caption (klick här stänger också) */}
          <p className="absolute bottom-6 text-sm text-gray-400 tracking-wide select-none">
            {selected.file}
          </p>
        </div>
      )}
    </main>
  );
}
