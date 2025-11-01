import fs from "fs";
import path from "path";
import { imageSize } from "image-size";
import LightboxGallery from "@/components/LightboxGallery";

export default function Page() {
  const dir = path.join(process.cwd(), "public/images/stills");
  const files = fs.readdirSync(dir);

  // Läs in mtime och sortera nyast först
  const sorted = files
    .filter((f) => /\.(jpg|jpeg|png|webp|avif)$/i.test(f))
    .map((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      return { file, mtime: stat.mtimeMs };
    })
    .sort((a, b) => b.mtime - a.mtime);

  const items = sorted.map(({ file }) => {
    const filePath = path.join(dir, file);
    const { width = 0, height = 0 } = imageSize(fs.readFileSync(filePath));
    return {
      src: `/images/stills/${file}`,
      width,
      height,
      alt: file,
    };
  });

  // Viktigt: ta bort ev. persistOrderKey så vi följer sorteringen varje gång
  return <LightboxGallery items={items} variant="masonry" />;
}
