"use client";

import { useState, useEffect, useRef } from "react";
import catalogue from "../data/catalogue";
import PageWrapper from "./components/PageWrapper";
import LightboxOverlay from "./components/LightboxOverlay";

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

  const openLightbox = (index) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const mediaClasses = `h-full object-cover`;

  return (
    <PageWrapper>
      <section className="columns-2 md:columns-3 lg:columns-4 gap-x-4 lg:gap-x-8 pb-10">
        {catalogue.map(({ src, title, label, type = "image" }, index) => (
          <div
            key={index}
            ref={(el) => (imageRefs.current[index] = el)}
            data-index={index}
            className={`mb-5 lg:mb-8 break-inside-avoid transform transition-all duration-700 ease-out
  ${
    visibleIndexes.includes(index)
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-20"
  }
`}
          >
            <div
              onClick={() => openLightbox(index)}
              className="w-full overflow-hidden relative"
            >
              {type === "video" ? (
                <video
                  src={src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-auto transition-transform duration-300 hover:scale-110"
                />
              ) : (
                <img
                  src={src}
                  alt={label}
                  className="w-full h-auto transition-transform duration-300 hover:scale-110"
                />
              )}
            </div>
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
