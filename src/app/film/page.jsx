"use client";

import Link from "next/link";
import filmCatalogue from "@/data/filmCatalogue";
import PageWrapper from "../components/PageWrapper";

export default function Film() {
  return (
    <PageWrapper>
      <section className="grid grid-cols-1 lg:grid-cols-1 gap-8 pb-12">
        {filmCatalogue.map(({ title, thumbnail }, index) => (
          <Link
            key={title + index}
            href="#"
            className="group relative overflow-hidden aspect-[16/9]"
          >
            <div className="w-full h-full relative">
              <img
                src={thumbnail}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-lg">{title}</span>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </PageWrapper>
  );
}
