import fs from "fs";
import path from "path";
import Image from "next/image";
import { imageSize } from "image-size";
import { notFound } from "next/navigation";

import { getFilm, getAllFilmSlugs } from "@/data/films";
import RevealItem from "@/components/RevealItem";
import LightboxGallery from "@/components/LightboxGallery";

// ✅ Tillåt att slugs som inte fanns vid build fortfarande kan fungera
export const dynamicParams = true;

// ✅ Bygg statiska paths (funkar oavsett om getAllFilmSlugs returnerar string eller {slug})
export function generateStaticParams() {
  const slugs = getAllFilmSlugs();

  return slugs.map((s) => {
    if (typeof s === "string") return { slug: s };
    if (s && typeof s === "object" && "slug" in s) return { slug: s.slug };
    return { slug: String(s) };
  });
}

// ✅ SEO
export function generateMetadata({ params }) {
  const slug = decodeURIComponent(params.slug);
  const film = getFilm(slug);

  return {
    title: film ? `${film.title} — Gustav Wickström` : "Projekt",
    description: film?.credits ?? "Projekt",
  };
}

export default function FilmPage({ params }) {
  const slug = decodeURIComponent(params.slug);
  const film = getFilm(slug);

  // ✅ Riktig Next 404
  if (!film) notFound();

  // ✅ Läs stillbilder från public/images/film/<slug>
  const dir = path.join(process.cwd(), "public/images/film", slug);
  const files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];

  const images = files
    .filter((f) => /\.(jpg|jpeg|png|webp|avif)$/i.test(f))
    .flatMap((file) => {
      try {
        const buffer = fs.readFileSync(path.join(dir, file));
        const { width = 0, height = 0 } = imageSize(buffer);
        return [{ file, width, height }];
      } catch {
        // Om någon fil är trasig/skum: hoppa över den istället för att krascha builden
        return [];
      }
    });

  // ✅ LightboxGallery-format
  const galleryItems = images.map(({ file, width, height }) => ({
    src: `/images/film/${slug}/${file}`,
    width,
    height,
    alt: file,
  }));

  return (
    <main className="mx-auto max-w-screen-lg">
      {/* Video (Vimeo) */}
      <RevealItem
        as="div"
        delay={0}
        className="relative w-full mb-8"
        style={{ aspectRatio: "16 / 9" }}
      >
        <iframe
          src={`https://player.vimeo.com/video/${film.videoID}?badge=0&autopause=0&title=0&byline=0&portrait=0`}
          className="absolute inset-0 w-full h-full"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={film.title}
          loading="lazy"
        />
      </RevealItem>

      {/* Titel */}
      <RevealItem as="h1" delay={60} className="font-semibold">
        {film.title}
      </RevealItem>

      {/* Credits */}
      {film.credits && (
        <RevealItem
          as="div"
          delay={120}
          className="mt-6 max-w-2xl text-base text-gray-300 whitespace-pre-line"
        >
          {film.credits}
        </RevealItem>
      )}

      {/* Stills */}
      {galleryItems.length > 0 && (
        <section className="mt-10">
          <LightboxGallery
            items={galleryItems}
            variant="grid-16x9"
            showHoverOverlay={true}
            showCaption={false}
            staggerBase={60}
          />
        </section>
      )}
    </main>
  );
}
