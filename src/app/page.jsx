import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import { imageSize } from "image-size";
import { films } from "@/data/films";

function getCoverFor(slug) {
  const dir = path.join(process.cwd(), "public/images/film", slug);
  if (!fs.existsSync(dir)) return null;
  const files = fs
    .readdirSync(dir)
    .filter((f) => /\.(jpg|jpeg|png|webp|avif)$/i.test(f));

  // cover.jpg prioriteras
  const coverName =
    files.find((f) => f.toLowerCase() === "cover.jpg") || files[0];
  if (!coverName) return null;

  const buffer = fs.readFileSync(path.join(dir, coverName));
  const { width = 0, height = 0 } = imageSize(buffer);
  return { src: `/images/film/${slug}/${coverName}`, width, height };
}

export default function Page() {
  return (
    <main className="mx-auto">
      <div className="grid grid-cols-1 gap-6 md:gap-10">
        {films.map((film) => {
          const cover = getCoverFor(film.slug);
          return (
            <Link
              key={film.slug}
              href={`/film/${film.slug}`}
              className="group relative block"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
                {cover ? (
                  <Image
                    src={cover.src}
                    alt={film.title}
                    fill
                    className="object-cover transition-transform duration-500"
                    sizes="100vw"
                    priority={false}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-gray-400">
                    No cover
                  </div>
                )}
                <div
                  className="absolute inset-0 hidden sm:flex items-center justify-center
                                bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <p className="text-white text-lg font-medium">{film.title}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
