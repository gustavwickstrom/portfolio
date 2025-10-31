"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function StillsGallery({ images }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  // --- Lightbox animation state ---
  const [lbVisible, setLbVisible] = useState(false);  // styr fade/zoom in
  const [lbClosing, setLbClosing] = useState(false);  // styr fade/zoom ut

  const open = (idx) => {
    setSelectedIndex(idx);
    // vänta till overlay är monterad → trigga fade-in nästa frame
    requestAnimationFrame(() => setLbVisible(true));
  };

  const close = () => {
    // animera ut, avmontera efter duration (200ms)
    setLbClosing(true);
    setLbVisible(false);
    setTimeout(() => {
      setSelectedIndex(null);
      setLbClosing(false);
    }, 200);
  };

  const next = () => setSelectedIndex((i) => (i + 1) % images.length);
  const prev = () => setSelectedIndex((i) => (i - 1 + images.length) % images.length);

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
    return () => { document.body.style.overflow = ""; };
  }, [selectedIndex]);

  // --- Scroll reveal state ---
  const [visibleSet, setVisibleSet] = useState(() => new Set());
  const itemsRef = useRef([]);

  useEffect(() => {
    const els = itemsRef.current.filter(Boolean);
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        setVisibleSet((prev) => {
          const next = new Set(prev);
          entries.forEach((en) => {
            if (en.isIntersecting) next.add(Number(en.target.dataset.idx));
          });
          return next;
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [images?.length]);

  const selected = selectedIndex !== null ? images[selectedIndex] : null;

  return (
    <main className="mx-auto relative">
      {/* Masonry layout */}
      <div className="columns-2 lg:columns-3 gap-4 sm:gap-6 lg:gap-10">
        {images.map(({ file, width, height }, i) => {
          const src = `/images/stills/${file}`;
          const shown = visibleSet.has(i);
          return (
            <div
              key={file}
              ref={(el) => (itemsRef.current[i] = el)}
              data-idx={i}
              className={[
                "mb-4 sm:mb-6 lg:mb-10 break-inside-avoid overflow-hidden cursor-zoom-in",
                // scroll reveal (respekt för prefers-reduced-motion)
                "transition duration-700 ease-out will-change-transform motion-safe:",
                shown
                  ? "motion-safe:opacity-100 motion-safe:translate-y-0"
                  : "motion-safe:opacity-0 motion-safe:translate-y-4"
              ].join(" ")}
              onClick={() => open(i)}
            >
              <Image
                src={src}
                alt={file}
                width={width}
                height={height}
                className="w-full h-auto"
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
          className={[
            "fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4 cursor-zoom-out",
            "transition-opacity duration-200",
            lbVisible && !lbClosing ? "opacity-100" : "opacity-0"
          ].join(" ")}
          onClick={close}
        >
          {/* Bildcontainer – samma luft som tidigare */}
          <div
            className={[
              "relative w-[92vw] max-w-6xl h-[82vh] pointer-events-none",
              "transition-transform duration-200",
              lbVisible && !lbClosing ? "scale-100" : "scale-95"
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
    </main>
  );
}
