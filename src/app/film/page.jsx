"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import filmCatalogue from "@/data/filmCatalogue";
import PageWrapper from "../components/PageWrapper";

export default function Film() {
  const [visibleIndexes, setVisibleIndexes] = useState([]);
  const itemRefs = useRef([]);

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

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <PageWrapper>
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-8 pb-12">
        {filmCatalogue.map(({ title, client, thumbnail, slug }, index) => (
          <Link
            key={slug || `${title}-${index}`}
            href={`/film/${slug}`}
            ref={(el) => (itemRefs.current[index] = el)}
            data-index={index}
            className={`
              group relative overflow-hidden aspect-[16/9] transform transition-all duration-700 ease-out
              ${
                visibleIndexes.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-20"
              }
            `}
          >
            <div className="w-full h-full relative">
              <img
                src={thumbnail}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white text-center">
                <span className="text-lg">{title}</span>
                {client && (
                  <span className="text-sm opacity-80">{client}</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </section>
    </PageWrapper>
  );
}
