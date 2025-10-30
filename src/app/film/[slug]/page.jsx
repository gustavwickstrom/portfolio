import fs from "fs";
import path from "path";
import Image from "next/image";
import { imageSize } from "image-size";
import { getFilm, getAllFilmSlugs } from "@/data/films";

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
    // (valfritt: kasta 404)
    return (
      <main className="mx-auto">Not found</main>
    );
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

  // Första bild som cover fallback (om du vill använda nedan i listvyn också)
  const cover =
    images.find((i) => i.file.toLowerCase() === "cover.jpg") || images[0];

 return (
   <main className="mx-auto">
     {/* Video från Vimeo */}
     {/* Video från Vimeo */}
     <div className="relative w-full mb-8" style={{ aspectRatio: "16 / 9" }}>
       <iframe
         src={`https://player.vimeo.com/video/${film.videoID}`}
         className="absolute inset-0 w-full h-full"
         frameBorder="0"
         allow="autoplay; fullscreen;"
         allowFullScreen
         title={film.title}
         loading="lazy"
       />
     </div>

     {/* Titel */}
     <h1 className="font-semibold">{film.title}</h1>

     {/* Beskrivning */}
     {film.credits && (
       <div className="mt-6 max-w-2xl text-base text-gray-700 whitespace-pre-line">
         {film.credits}
       </div>
     )}

     {/* Stills-galleri */}
     {/* Stills-galleri (grid + 16:9 crop) */}
     {images.length > 0 && (
       <section className="mt-10">
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           {images.map(({ file }) => {
             const src = `/images/film/${params.slug}/${file}`;
             return (
               <div
                 key={file}
                 className="relative w-full overflow-hidden"
                 style={{ aspectRatio: "16 / 9" }} // fixerar 16:9
               >
                 <Image
                   src={src}
                   alt={file}
                   fill // fyll hela 16:9-ytan
                   className="object-cover" // beskär (crop) istället för att pressa
                   sizes="(max-width: 640px) 100vw,
                     (max-width: 1024px) 50vw,
                     33vw"
                   priority={false}
                 />
               </div>
             );
           })}
         </div>
       </section>
     )}
   </main>
 );
}
