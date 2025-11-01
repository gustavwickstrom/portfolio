import fs from "fs";
import path from "path";
import Image from "next/image";
import { imageSize } from "image-size";
import { getFilm, getAllFilmSlugs } from "@/data/films";

// 👇 lägg till reveal-komponenterna
import RevealOnView from "@/components/RevealOnView";
import RevealItem from "@/components/RevealItem";

// SSG: builda alla sidor
export function generateStaticParams() {
  return getAllFilmSlugs().map((slug) => ({ slug }));
}

// SEO
export function generateMetadata({ params }) {
  const film = getFilm(params.slug);
  return {
    title: film ? `${film.title} — Gustav Wickström` : "Projekt",
    credits: film?.credits ?? "Projekt",
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

  // Första bild som cover fallback
  const cover =
    images.find((i) => i.file.toLowerCase() === "cover.jpg") || images[0];

  return (
    <main className="mx-auto">
      {/* Video – reveal on view */}
      <RevealItem
        as="div"
        delay={0}
        className="relative w-full mb-8"
        style={{ aspectRatio: "16 / 9" }}
      >
        <iframe
          // OBS: se till att din data har samma key (videoID vs videoId). Här använder vi videoID eftersom din kod gör det.
          src={`https://player.vimeo.com/video/${film.videoID}`}
          className="absolute inset-0 w-full h-full"
          frameBorder="0"
          allow="autoplay; fullscreen;"
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

      {/* Stills-galleri (grid + 16:9 crop) */}
      {images.length > 0 && (
        <section className="mt-10">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map(({ file }, i) => {
              const src = `/images/film/${params.slug}/${file}`;
              return (
                <RevealItem
                  key={file}
                  as="div"
                  delay={180 + Math.min(i * 60, 360)} // liten stagger
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: "16 / 9" }}
                >
                  <Image
                    src={src}
                    alt={file}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={false}
                  />
                </RevealItem>
              );
            })}
          </div>
        </section>
      )}

      {/* Kickar igång reveal varje gång sidan monteras (även vid SPA-nav) */}
      <RevealOnView />
    </main>
  );
}
