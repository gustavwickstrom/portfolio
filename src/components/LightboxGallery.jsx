"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import RevealOnView from "@/components/RevealOnView";
import RevealItem from "@/components/RevealItem";

/**
 * Reusable lightbox gallery
 * props:
 * - items: [{ src, width, height, alt }]  // width/height krävs för masonry
 * - variant: "masonry" | "grid-16x9"      // layout-variant
 * - staggerBase: number (ms)              // startdelays för reveal
 * - showHoverOverlay: boolean             // svart overlay på hover (desktop)
 * - showCaption: boolean                  // visa/dölj bildtext i lightbox
 */
export default function LightboxGallery({
  items,
  variant = "masonry",
  staggerBase = 60,
  showHoverOverlay = true,
  showCaption = true, // 👈 NY PROP (default: visa)
}) {
  const [selectedIndex, setSelectedIndex] = useState(null);
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
  const next = () => setSelectedIndex((i) => (i + 1) % items.length);
  const prev = () =>
    setSelectedIndex((i) => (i - 1 + items.length) % items.length);

  // keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") return close();
      if (e.key === "ArrowRight") return next();
      if (e.key === "ArrowLeft") return prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedIndex, items.length]);

  // scroll lock
  useEffect(() => {
    const mounted = selectedIndex !== null;
    document.body.style.overflow = mounted ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  const selected = selectedIndex !== null ? items[selectedIndex] : null;

  return (
    <main className="mx-auto relative">
      {variant === "masonry" ? (
        // Masonry – behåll originalproportioner
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 lg:gap-10">
          {items.map(({ src, width, height, alt = "" }, i) => (
            <RevealItem
              key={src}
              as="div"
              delay={i * staggerBase}
              className="group relative mb-4 sm:mb-6 lg:mb-10 break-inside-avoid overflow-hidden cursor-zoom-in"
              onClick={() => open(i)}
            >
              <Image
                src={src}
                alt={alt || src}
                width={width || 1200}
                height={height || 800}
                className="w-full h-auto"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={70}
                decoding="async"
                priority={i === 0}
              />
              {showHoverOverlay && (
                <div className="pointer-events-none absolute inset-0 hidden md:block bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
            </RevealItem>
          ))}
        </div>
      ) : (
        // 16:9 grid – croppad thumbnail i rutnätet
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6">
          {items.map(({ src, alt = "" }, i) => (
            <RevealItem
              key={src}
              as="div"
              delay={i * staggerBase}
              className="relative w-full overflow-hidden cursor-zoom-in"
              style={{ aspectRatio: "16 / 9" }}
              onClick={() => open(i)}
            >
              <Image
                src={src}
                alt={alt || src}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={70}
                decoding="async"
                priority={i === 0}
              />
              {showHoverOverlay && (
                <div className="pointer-events-none absolute inset-0 hidden md:block bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
            </RevealItem>
          ))}
        </div>
      )}

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
          <div
            className={[
              "relative w-[92vw] max-w-6xl h-[82vh] pointer-events-none",
              "transition-transform duration-200",
              lbVisible && !lbClosing ? "scale-100" : "scale-95",
            ].join(" ")}
          >
            <Image
              src={selected.src}
              alt={selected.alt || selected.src}
              fill
              className="object-contain select-none"
              sizes="100vw"
              priority
            />
          </div>

          {/* Caption (valfritt) */}
          {showCaption && (
            <p className="absolute bottom-6 text-sm text-gray-400 tracking-wide select-none">
              {selected.alt || selected.src}
            </p>
          )}
        </div>
      )}

      {/* Trigger reveal on mount / SPA-nav */}
      <RevealOnView />
    </main>
  );
}
