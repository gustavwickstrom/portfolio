import fs from "fs";
import path from "path";
import Image from "next/image";

export default function Page() {
  const dir = path.join(process.cwd(), "public/images/film");
  const files = fs.readdirSync(dir);
  const images = files.filter((file) => file.match(/\.(jpg|jpeg|png|webp)$/i));

  return (
    <main className="mx-auto">
      <div className="grid grid-cols-1 gap-4 md:gap-10">
        {images.map((file, i) => {
          const name = file.replace(/\.[^/.]+$/, "");

          return (
            <div key={i}>
              {/* Bildcontainer */}
              <div className="group relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={`/images/film/${file}`}
                  alt={name}
                  fill
                  className="object-cover transition-transform duration-300g"
                  sizes="100vw, 80vw"
                  priority={i === 0}
                />

                {/* Overlay text (hover på desktop) */}
                <div
                  className="
                    absolute inset-0 hidden sm:flex items-center justify-center
                    bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                  "
                >
                  <p className="text-white">
                    {name}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
