'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

export default function LightboxOverlay({ images, initialIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const isScrollingRef = useRef(false);

  const videoRef = useRef(null);

  const media = images[currentIndex];

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        closeWithAnimation();
      } else if (e.key === 'ArrowRight') {
        fadeToIndex((currentIndex + 1) % images.length);
      } else if (e.key === 'ArrowLeft') {
        fadeToIndex((currentIndex - 1 + images.length) % images.length);
      }
    };

    const handleWheel = (e) => {
      if (isScrollingRef.current) return;

      isScrollingRef.current = true;
      if (e.deltaY > 0) {
        fadeToIndex((currentIndex + 1) % images.length);
      } else {
        fadeToIndex((currentIndex - 1 + images.length) % images.length);
      }

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 800); // scroll delay för att blocka över-scroll
    };

    window.addEventListener('keydown', handleKey);
    window.addEventListener('wheel', handleWheel, { passive: true });
    document.body.classList.add('overflow-hidden');

    return () => {
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('wheel', handleWheel);
      document.body.classList.remove('overflow-hidden');
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
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={closeWithAnimation}>
      <div
        className={`absolute inset-0 bg-background transition-opacity duration-300 ${isVisible && !isClosing ? 'opacity-100' : 'opacity-0'
          }`}
      />
      <div
        className={`relative z-10 max-h-[calc(100vh-160px)] w-auto transition-all duration-300 ease-out ${isVisible && !isClosing ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        {media.type === 'video' ? (
          <video
            key={currentIndex}
            ref={(el) => (videoRef.current = el)}
            src={media.src}
            controls
            playsInline
            controlsList="nodownload nofullscreen noremoteplayback"
            onClick={(e) => {
              e.stopPropagation();
              const video = videoRef.current;
              if (video.paused) {
                video.play();
              } else {
                video.pause();
              }
            }}
            className={`max-h-[calc(100vh-160px)] w-auto h-auto object-contain mx-auto transition-opacity duration-300 ${isFadingOut ? 'opacity-0' : 'opacity-100'
              }`}
          />
        ) : (
          <Image
            key={currentIndex}
            src={media.src}
            alt={media.label}
            width={1600}
            height={1200}
            className={`max-h-[calc(100vh-160px)] w-auto h-auto object-contain mx-auto transition-opacity duration-300 ${isFadingOut ? 'opacity-0' : 'opacity-100'
              }`}
          />
        )}
      </div>

      <div
        className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center text-sm pointer-events-none z-20 transition-opacity duration-300 ${isVisible && !isClosing ? 'opacity-80' : 'opacity-0'
          }`}
      >
        <p>
          <strong>{media.title}</strong> | {media.label}
        </p>
      </div>
    </div>
  );
}
