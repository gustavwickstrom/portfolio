"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LightboxOverlay({ images, initialIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const media = images[currentIndex];

  useEffect(() => {
    const handleKey = (e) => {
      const key = e.key.toLowerCase();
      if (key === "escape" || key === "x") onClose();
      else if (e.key === "ArrowRight")
        setCurrentIndex((currentIndex + 1) % images.length);
      else if (e.key === "ArrowLeft")
        setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    };

    window.addEventListener("keydown", handleKey);
    document.body.classList.add("overflow-hidden");

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.classList.remove("overflow-hidden");
    };
  }, [currentIndex, images.length, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-background text-foreground flex flex-col justify-between"
      onClick={onClose}
    >
      {/* Header */}
      <header className="w-full pt-7 px-4 lg:pt-7 lg:px-8 text-big flex items-center justify-between">
        <Link
          href="/"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="hover:opacity-50 transition-opacity duration-200"
        >
          GUSTAV WICKSTRÖM
        </Link>

        {/* Close-knapp med olika innehåll beroende på storlek */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close lightbox"
          className="text-foreground text-base hover:opacity-50 transition-opacity duration-200"
        >
          <span className="lg:hidden">CLOSE</span>
          <span className="hidden lg:inline">[ X ] CLOSE</span>
        </button>
      </header>

      {/* Bild */}
      <main
        className="flex items-center justify-center px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-center h-[50vh] md:h-[75vh] w-full md:w-auto">
          <Image
            key={currentIndex}
            src={media.src}
            alt={media.title}
            width={1600}
            height={1200}
            className="object-contain h-full w-full md:w-auto"
          />
        </div>
      </main>

      {/* Info */}
      <div className="w-full px-4 sm:px-6 lg:px-8 pb-8 gap-8 text-base grid grid-cols-2 md:grid-cols-4 gap-y-4">
        <div>
          <p className="opacity-50">TITLE</p>
          <p>{media.title}</p>
        </div>
        <div>
          <p className="opacity-50">AGENCY</p>
          <p>{media.agency || "Solo work"}</p>
        </div>
        <div>
          <p className="opacity-50">CLIENT</p>
          <p>{media.client || "Personal project"}</p>
        </div>
        <div className="flex justify-between">
          <div>
            <p className="opacity-50">ROLE</p>
            <p>{media.role || "Not specified"}</p>
          </div>
          <div className="text-right">
            <p className="opacity-50">YEAR</p>
            <p>{media.year || "x"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
