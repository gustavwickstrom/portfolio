import fs from "fs";
import path from "path";
import Image from "next/image";
import { imageSize } from "image-size";
import { getFilm, getAllFilmSlugs } from "@/data/films";

// Reveal för video/titel/credits
import RevealItem from "@/components/RevealItem";
// Återanvändbart galleri med lightbox + reveal
import LightboxGallery from "@/components/LightboxGallery";

// Bygg statiska paths
export function generateStaticParams() {
  return getAllFilmSlugs().map((slug) => ({ slug }));
}

// SEO
export function generateMetadata({ params }) {
  const film = getFilm(params.slug);
  return {
    title: film ? `${film.title} — Gustav Wickström` : "Projekt",
    description: film?.credits ?? "Projekt",
  };
}

export default function FilmPage({ params }) {
  const film = getFilm(params.slug);
  if (!film) {
    return <main className="mx-auto">Not found</main>;
  }

  // Läs stillbilder från public/images/film/<slug>
  const dir = path.join(process.cwd(), "public/images/film", params.slug);
  const files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
  const images = files
    .filter((f) => /\.(jpg|jpeg|png|webp|avif)$/i.test(f))
    .map((file) => {
      const buffer = fs.readFileSync(path.join(dir, file));
      const { width = 0, height = 0 } = imageSize(buffer);
      return { file, width, height };
    });

  // Mappa om till LightboxGallerys format
  const galleryItems = images.map(({ file, width, height }) => ({
    src: `/images/film/${params.slug}/${file}`,
    width,
    height,
    alt: file,
  }));

  return (
    <main className="mx-auto">
      {/* Video (Vimeo) med reveal */}
      <RevealItem
        as="div"
        delay={0}
        className="relative w-full mb-8"
        style={{ aspectRatio: "16 / 9" }}
      >
        <iframe
          // OBS: säkerställ att din data använder "videoID" (eller byt här till videoId om din data gör det)
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

      {/* Credits / beskrivning */}
      {film.credits && (
        <RevealItem
          as="div"
          delay={120}
          className="mt-6 max-w-2xl text-base text-gray-700 whitespace-pre-line"
        >
          {film.credits}
        </RevealItem>
      )}

      {/* Stills-galleri – 16:9 rutnät (croppade thumbs) med lightbox som visar original (contain) */}
      {galleryItems.length > 0 && (
        <section className="mt-10">
          <LightboxGallery
            items={galleryItems}
            variant="grid-16x9" // croppad 16:9 i gridet
            showHoverOverlay={true}
            showCaption={false}
            staggerBase={60}
          />
        </section>
      )}
    </main>
  );
}
