"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import filmCatalogue from "@/data/filmCatalogue";
import PageWrapper from "../../components/PageWrapper";
import { useEffect, useRef, useState } from "react";

export default function FilmDetail(props) {
  const params = use(props.params); // ← unwrap params safely

  const film = filmCatalogue.find((f) => f.slug === params.slug);
  if (!film) return notFound();

  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  const [visibleStills, setVisibleStills] = useState([]);
  const stillRefs = useRef([]);

  // Första blocket (titel, video)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // Animation för varje still
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setVisibleStills((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    stillRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <PageWrapper>
      <section
        ref={sectionRef}
        className={`flex flex-col justify-center text-center sm:px-6 lg:px-8 max-w lg:max-w-7xl my-20 mx-auto gap-6 transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}
      >
        <div className="flex flex-col gap-y-2">
          <h1 className="text-headline font-bold text-left">{film.title}</h1>
          <h2 className="text-big text-left opacity-50r">{film.client}</h2>
        </div>

        <video
          src={film.videoUrl}
          controls
          playsInline
          controlsList="nodownload noremoteplayback noplaybackrate"
          disablePictureInPicture
          onContextMenu={(e) => e.preventDefault()}
          className="w-full max-w-full h-auto"
        >
          Your browser does not support the video tag.
        </video>

        {film.stills && film.stills.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
            {film.stills.map((src, i) => (
              <img
                key={i}
                data-index={i}
                ref={(el) => (stillRefs.current[i] = el)}
                src={src}
                alt={`${film.title} still ${i + 1}`}
                className={`w-full h-auto object-cover transform transition-all duration-700 ease-out ${
                  visibleStills.includes(i)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-20"
                }`}
              />
            ))}
          </div>
        )}
      </section>
    </PageWrapper>
  );
}
