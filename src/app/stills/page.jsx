// src/app/stills/page.jsx
import fs from "fs";
import path from "path";
import { imageSize } from "image-size";
import LightboxGallery from "@/components/LightboxGallery";

export default function Page() {
  const dir = path.join(process.cwd(), "public/images/stills");
  const files = fs.readdirSync(dir);

  const items = files
    .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .map((file) => {
      const buffer = fs.readFileSync(path.join(dir, file));
      const { width = 0, height = 0 } = imageSize(buffer);
      return {
        src: `/images/stills/${file}`,
        width,
        height,
        alt: file,
      };
    });

  return <LightboxGallery items={items} variant="masonry" />;
}
