"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import RevealOnView from "@/components/RevealOnView";
import RevealItem from "@/components/RevealItem";

export default function StillsGallery({ images }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  // --- Lightbox animation state ---
  const [lbVisible, setLbVisible] = useState(false);
  const [lbClosing, setLbClosing] = useState(false);

  const open = (idx) => {
    setSelectedIndex(idx);
    requestAnimationFrame(() => setLbVisible(true));
  };

  const close = () => {
    setLbClosing(true);
    setLbVisible(false);
    setTimeout(() => {
      setSelectedIndex(null);
      setLbClosing(false);
    }, 200);
  };

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

  // Lås scroll när lightbox är monterad
  useEffect(() => {
    const mounted = selectedIndex !== null;
    document.body.style.overflow = mounted ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  const selected = selectedIndex !== null ? images[selectedIndex] : null;

  return (
    <main className="mx-auto relative">
      {/* Masonry layout */}
      <div className="columns-2 lg:columns-3 gap-4 sm:gap-6 lg:gap-10">
        {images.map(({ file, width, height }, i) => {
          const src = `/images/stills/${file}`;
          return (
            <RevealItem
              key={file}
              as="div"
              delay={i * 60}
              className="group relative mb-4 sm:mb-6 lg:mb-10 break-inside-avoid overflow-hidden cursor-zoom-in"
              onClick={() => open(i)}
            >
              {/* Bild */}
              <Image
                src={src}
                alt={file}
                width={width}
                height={height}
                className="w-full h-auto"
                sizes="(max-width: 1024px) 100vw, 33vw"
                priority={i < 3}
              />

              {/* Hover overlay (endast desktop) */}
              <div
                className="
                  pointer-events-none absolute inset-0 
                  hidden sm:block bg-black/40 
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-300
                "
              />
            </RevealItem>
          );
        })}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className={[
            "fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4 cursor-zoom-out",
            "transition-opacity duration-200",
            lbVisible && !lbClosing ? "opacity-100" : "opacity-0",
          ].join(" ")}
          onClick={close}
        >
          {/* Bildcontainer – samma luft som tidigare */}
          <div
            className={[
              "relative w-[92vw] max-w-6xl h-[82vh] pointer-events-none",
              "transition-transform duration-200",
              lbVisible && !lbClosing ? "scale-100" : "scale-95",
            ].join(" ")}
          >
            <Image
              src={`/images/stills/${selected.file}`}
              alt={selected.file}
              fill
              className="object-contain select-none"
              sizes="100vw"
              priority
            />
          </div>

          {/* Caption */}
          <p className="absolute bottom-6 text-sm text-gray-400 tracking-wide select-none">
            {selected.file}
          </p>
        </div>
      )}

      {/* Kickar igång reveal vid sidmontage / SPA-nav */}
      <RevealOnView />
    </main>
  );
}
