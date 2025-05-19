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

  return (
    <PageWrapper>
      <main
        ref={sectionRef}
        className={`grid grid-cols-1 md:grid-cols-4 gap-8 text-base transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}
      >
        {/* Bild över 2 kolumner */}
        <div className="md:col-span-2">
          <Image
            src="/images/2024-August.jpg"
            alt="Gustav Wickström"
            width={1600}
            height={900}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Info i två spalter */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 py-12">
          {/* Om dig själv */}
          <div>
            <p className="opacity-50">ABOUT</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              rutrum arcu nunc, id ultrices nisl viverra in. Nunc et ornare dui.
              Duis congue tristique odio ut ultrices. Donec scelerisque tempor
              fermentum. Duis eu consequat nunc. Aliquam ornare sagittis
              consectetur. Pellentesque ultricies elementum mi vitae aliquet.
              Integer vestibulum sagittis risus vel iaculis. Phasellus in velit
              massa. Vivamus risus ligula, dictum malesuada mollis nec, pulvinar
              nec mi. Nullam sodales est in odio egestas, eu euismod ipsum
              volutpat. Etiam tincidunt eros eu luctus sagittis. Proin eu
              consectetur ante, in placerat lacus. Nulla laoreet quam quam. In
              viverra sollicitudin sem nec euismod. Ut sit amet sem nisl.
            </p>
          </div>

          {/* Kontaktinfo */}
          <div>
            <p className="opacity-50">CONTACT</p>
            <ul>
              <li>gustav.wickstrom@nystudio.se</li>
              <li>073 832 93 24</li>
            </ul>
          </div>

          {/* Valfri extra kolumn */}
          <div>
            <p className="opacity-50">AGENCY</p>
            <ul>
              <li>Ny Studio & Saga Production</li>
              <li>Skolgatan 18</li>
              <li>55318, Jönköping</li>
              <li>Sweden</li>
            </ul>
          </div>

          {/* Clients */}
          <div>
            <p className="opacity-50">CLIENTS</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
          </div>

          {/* Work experience */}
          <div>
            <p className="opacity-50">WORK EXPERIENCE</p>
            <ul>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
            </ul>
          </div>

          {/* Education */}
          <div>
            <p className="opacity-50">EDUCATION</p>
            <ul>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
            </ul>
          </div>

          {/* Awards */}
          <div>
            <p className="opacity-50">AWARDS</p>
            <ul>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
            </ul>
          </div>
        </div>
      </main>
    </PageWrapper>
  );
}
