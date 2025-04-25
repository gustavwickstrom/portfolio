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

  const mediaClasses = ` w-fulll h-full object-cover`;

  const getOrientationClass = (orientation) =>
    orientation === "portrait" ? "aspect-[3/4]" : "aspect-[3/2]";

  return (
    <PageWrapper>
      {/* <section className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7 gap-20 px-4 py-20 max-w-[2000px] mx-auto mt-20">
        {catalogue.map(({ src, title, label, type = 'image', orientation = 'landscape' }, index) => (
      </section> */}

      <section
        className="grid 
                          grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 
                          gap-x-4 lg:gap-x-20 
                          lg:gap-y-4 
                          mt-10 lg:mt-32
                          mx-4 xl:mx-20
                          mb-20
                          "
                          
      >
        {catalogue.map(
          (
            { src, title, label, type = "image", orientation = "landscape" },
            index
          ) => (
            <div
              key={index}
              ref={(el) => (imageRefs.current[index] = el)}
              data-index={index}
              className={`flex items-center justify-center transition-opacity duration-700 ease-out col-span-1 overflow-hidden aspect-[1/1] ${
                visibleIndexes.includes(index) ? "opacity-100" : "opacity-0"
              }`}
            >
              <div
                onClick={() => openLightbox(index)}
                className={`h-[70%] p-1 flex justify-center items-center hover:opacity-80 transition-opacity w-full `}
              >
                {type === "video" ? (
                  <video
                    src={src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className={`${mediaClasses} ${getOrientationClass(
                      orientation
                    )}`}
                  />
                ) : (
                  <img
                    src={src}
                    alt={label}
                    className={`${mediaClasses} ${getOrientationClass(
                      orientation
                    )}`}
                  />
                )}
              </div>
            </div>
          )
        )}
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
