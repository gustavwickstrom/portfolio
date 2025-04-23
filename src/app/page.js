'use client';

import { useState, useEffect, useRef } from 'react';
import catalogue from '../data/catalogue';
import PageWrapper from './components/PageWrapper';
import LightboxOverlay from './components/LightboxOverlay';

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [visibleIndexes, setVisibleIndexes] = useState([]);
  const imageRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setVisibleIndexes((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const openLightbox = (index) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  return (
    <PageWrapper>
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7 gap-10 px-4 py-20 max-w-[2000px] mx-auto mt-20">
        {catalogue.map(({ src, title, label }, index) => (
          <div
            key={index}
            ref={(el) => (imageRefs.current[index] = el)}
            data-index={index}
            className={`flex items-end justify-center transition-opacity duration-700 ease-out ${
              visibleIndexes.includes(index) ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={src}
              alt={label}
              onClick={() => openLightbox(index)}
              className="h-[200px] w-auto object-scale-down hover:opacity-80"
            />
          </div>
        ))}
      </section>

      {selectedIndex !== null && (
        <LightboxOverlay
          images={catalogue}
          initialIndex={selectedIndex}
          onClose={closeLightbox}
        />
      )}
    </PageWrapper>
  );
}
