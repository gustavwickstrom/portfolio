"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function LightboxOverlay({ images, initialIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const videoRef = useRef(null);
  const media = images[currentIndex];

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") closeWithAnimation();
      else if (e.key === "ArrowRight")
        fadeToIndex((currentIndex + 1) % images.length);
      else if (e.key === "ArrowLeft")
        fadeToIndex((currentIndex - 1 + images.length) % images.length);
    };

    window.addEventListener("keydown", handleKey);
    document.body.classList.add("overflow-hidden");
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.classList.remove("overflow-hidden");
    };
  }, [currentIndex, images.length]);

  const fadeToIndex = (newIndex) => {
    setIsFadingOut(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsFadingOut(false);
    }, 300);
  };

  const closeWithAnimation = () => {
    setIsClosing(true);
    setTimeout(() => onClose(), 300);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-background text-foreground"
      onClick={closeWithAnimation}
    >
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          isVisible && !isClosing ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`relative z-10 flex flex-col md:flex-row h-full w-full transition-all duration-300 ease-out ${
          isVisible && !isClosing
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: Media */}
        <div className="w-full flex items-center justify-center p-6">
          {media.type === "video" ? (
            <video
              key={currentIndex}
              ref={(el) => (videoRef.current = el)}
              src={media.src}
              controls
              playsInline
              controlsList="nodownload nofullscreen noremoteplayback"
              className={`max-h-[90vh] w-auto h-auto object-contain transition-opacity duration-300 ${
                isFadingOut ? "opacity-0" : "opacity-100"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                const video = videoRef.current;
                video.paused ? video.play() : video.pause();
              }}
            />
          ) : (
            <Image
              key={currentIndex}
              src={media.src}
              alt={media.label}
              width={1600}
              height={1200}
              className={`max-h-[90vh] w-auto h-auto object-contain transition-opacity duration-300 ${
                isFadingOut ? "opacity-0" : "opacity-100"
              }`}
            />
          )}
        </div>

        {/* Navigation buttons (absolute on sides) */}
        <button
          onClick={() =>
            fadeToIndex((currentIndex - 1 + images.length) % images.length)
          }
          className="absolute left-36 top-1/2 -translate-y-1/2 text-sm hover:underline z-20"
        >
          ← Previous
        </button>
        <button
          onClick={() => fadeToIndex((currentIndex + 1) % images.length)}
          className="absolute right-36 top-1/2 -translate-y-1/2 text-sm hover:underline z-20"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
