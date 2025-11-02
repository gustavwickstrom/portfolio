"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import RevealOnView from "@/components/RevealOnView";
import RevealItem from "@/components/RevealItem";

/**
 * Reusable lightbox gallery
 * props:
 * - items: [{ src, width, height, alt }]
 * - variant: "masonry" | "grid-16x9"
 * - staggerBase: number
 * - showHoverOverlay: boolean
 * - showCaption: boolean
 */
export default function LightboxGallery({
  items,
  variant = "masonry",
  staggerBase = 60,
  showHoverOverlay = true,
  showCaption = true,
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

  // Tangentbord
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

  // 🔒 Robust scroll-lock (iOS-säkert + bevarar scrollposition)
  const scrollYRef = useRef(0);
  useEffect(() => {
    if (selectedIndex === null) return;

    const html = document.documentElement;
    const body = document.body;

    scrollYRef.current = window.scrollY;

    const prevHtmlOverflow = html.style.overflow;
    const prevHtmlOverscroll = html.style.overscrollBehavior;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyPos = body.style.position;
    const prevBodyTop = body.style.top;
    const prevBodyWidth = body.style.width;

    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "contain"; // stoppa rubber-band
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollYRef.current}px`;
    body.style.width = "100%";

    return () => {
      html.style.overflow = prevHtmlOverflow;
      html.style.overscrollBehavior = prevHtmlOverscroll;
      body.style.overflow = prevBodyOverflow;
      body.style.position = prevBodyPos;
      body.style.top = prevBodyTop;
      body.style.width = prevBodyWidth;
      window.scrollTo(0, scrollYRef.current);
    };
  }, [selectedIndex]);

  const selected = selectedIndex !== null ? items[selectedIndex] : null;

  return (
    <main className="mx-auto relative max-w-screen-lg">
      {variant === "masonry" ? (
        // Masonry – behåll originalproportioner
        <div className="columns-2 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 lg:gap-10">
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
            // fyll alltid hela visuella viewporten (även när URL-baren gömmer sig)
            "fixed left-0 top-0 w-screen h-[100dvh] z-50",
            "bg-black/90 flex items-center justify-center px-4 cursor-zoom-out",
            "transition-opacity duration-200",
            lbVisible && !lbClosing ? "opacity-100" : "opacity-0",
            // blockera touch-scroll på overlayen
            "touch-none select-none",
            // safe area i botten
            "pb-[env(safe-area-inset-bottom)]",
          ].join(" ")}
          onClick={close}
          onTouchMove={(e) => e.preventDefault()}
          onWheel={(e) => e.preventDefault()}
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

      {/* Kickar igång reveal vid sidmontage / SPA-nav */}
      <RevealOnView />
    </main>
  );
}
