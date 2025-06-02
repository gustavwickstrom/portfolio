"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import filmCatalogue from "@/data/filmCatalogue";
import PageWrapper from "../../components/PageWrapper";
import { useEffect, useRef, useState } from "react";

export default function FilmDetail(props) {
  const params = use(props.params);
  const film = filmCatalogue.find((f) => f.slug === params.slug);
  if (!film) return notFound();

  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);
  const [visibleStills, setVisibleStills] = useState([]);
  const stillRefs = useRef([]);

  // Fade in titel/video block
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

  // Fade in stills
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
        className={`flex flex-col justify-center my-20 mx-auto gap-6 transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}
      >
        <div className="flex flex-col gap-y-2 mt-10 text-left">
          <h1 className="text-6xl lg:text-9xl font-bold mb-8 uppercase">{film.title}</h1>
          <ul className="space-y-1 text-base md:text-headline">
            <li>
              Year: <span className="opacity-50">{film.year || "x"}</span>
            </li>
            <li>
              Client:{" "}
              <span className="opacity-50">
                {film.client || "Personal project"}
              </span>
            </li>
            <li>
              Agency:{" "}
              <span className="opacity-50">
                {film.agency || "Solo project"}
              </span>
            </li>
            <li>
              Role:{" "}
              <span className="opacity-50">{film.role || "Not specified"}</span>
            </li>
          </ul>
        </div>

        <video
          src={film.videoUrl}
          controls
          playsInline
          controlsList="nodownload noremoteplayback noplaybackrate"
          disablePictureInPicture
          onContextMenu={(e) => e.preventDefault()}
          className="w-full max-w-full h-auto mt-6"
        >
          Your browser does not support the video tag.
        </video>

        {film.stills && film.stills.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
