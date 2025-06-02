"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import PageWrapper from "../components/PageWrapper";

export default function Info() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

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

  return (
    <PageWrapper>
      <main
        ref={sectionRef}
        className={`transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}
      >
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12 items-center">
          <div></div>
          
          {/* Bildkolumn – nu först */}
          <div className="flex justify-center md:justify-start">
            <Image
              src="/images/profilepic.jpg"
              alt="Gustav Wickström"
              width={800}
              height={900}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Textkolumn – nu efter */}
          <div className="space-y-6 text-base text-big">
            <h1 className="text-headline">
              Absolutely insane about telling stories.
            </h1>
            <p>
              Gustav Gunnar Alexander Wickström is a cinematographer and colorist based in
              Sweden, working across commercial, music video and artistic
              projects. His work is defined by a strong sense of mood, light,
              and texture — always aiming to serve the story first.
            </p>

            <p>Represented by Ny Studio & Saga Production</p>

            <div className="space-y-1">
              <p>gustav.wickstrom@nystudio.se</p>
              <p>073 832 93 24</p>
            </div>
          </div>
        </div>
      </main>
    </PageWrapper>
  );
}
