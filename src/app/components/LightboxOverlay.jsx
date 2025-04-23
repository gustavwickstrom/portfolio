'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function LightboxOverlay({ images, initialIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const image = images[currentIndex];

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

    window.addEventListener('keydown', handleKey);
    document.body.classList.add('overflow-hidden');

    return () => {
      window.removeEventListener('keydown', handleKey);
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      onClick={closeWithAnimation}
    >
      {/* FADE-IN BACKGROUND */}
      <div
        className={`absolute inset-0 bg-background transition-opacity duration-300 ${
          isVisible && !isClosing ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* IMAGE FADE */}
      <div
        className={`relative z-10 max-h-[calc(100vh-160px)] w-auto transition-all duration-300 ease-out ${
          isVisible && !isClosing ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          key={currentIndex} // force re-render on index change
          src={image.src}
          alt={image.label}
          width={1600}
          height={1200}
          className={`max-h-[calc(100vh-160px)] w-auto h-auto object-contain mx-auto transition-opacity duration-300 ${
            isFadingOut ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>

      {/* CAPTION */}
      <div
        className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center text-sm pointer-events-none z-20 transition-opacity duration-300 ${
          isVisible && !isClosing ? 'opacity-80' : 'opacity-0'
        }`}
      >
        <p>
          <strong>{image.title}</strong> | {image.label}
        </p>
      </div>
    </div>
  );
}
