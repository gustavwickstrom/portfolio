"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import filmCatalogue from "@/data/filmCatalogue";
import PageWrapper from "../../components/PageWrapper";
import { useEffect, useRef, useState } from "react";

export default function FilmDetail(props) {
  const params = use(props.params); // ← unwrap params safely

  const film = filmCatalogue.find((f) => f.slug === params.slug);

  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  if (!film) return notFound();

  return (
    <PageWrapper>
      <section
        ref={sectionRef}
        className={`flex flex-col justify-center text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto gap-6 transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}
      >
        <img src={film.thumbnail} alt={film.title} className="w-full" />
        <h1 className="text-headline font-bold text-left">{film.title}</h1>
        <h2 className="text-big font-bold text-left">{film.client}</h2>
      </section>
    </PageWrapper>
  );
}
