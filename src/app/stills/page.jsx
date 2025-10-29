import fs from "fs";
import path from "path";
import Image from "next/image";
import { imageSize } from "image-size"; // <-- viktig import

export default function Page() {
  const dir = path.join(process.cwd(), "public/images/stills");
  const files = fs.readdirSync(dir);

  const images = files
    .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .map((file) => {
      const filePath = path.join(dir, file);
      const buffer = fs.readFileSync(filePath); // <-- läs som Buffer
      const { width = 0, height = 0 } = imageSize(buffer); // <-- skicka Buffer
      return { file, width, height };
    });

  return (
    <main className="mx-auto max-w-screen-xl">
      <div className="columns-2 lg:columns-3 gap-10">
        {images.map(({ file, width, height }, i) => {
          const name = file.replace(/\.[^/.]+$/, "");
          return (
            <div
              key={file}
              className="mb-10 break-inside-avoid overflow-hidden"
            >
              <Image
                src={`/images/stills/${file}`}
                alt={name}
                width={width}
                height={height}
                className="w-full h-auto transition-transform duration-300"
                sizes="(max-width: 1024px) 100vw, 33vw"
                priority={i < 3}
              />
            </div>
          );
        })}
      </div>
    </main>
  );
}
