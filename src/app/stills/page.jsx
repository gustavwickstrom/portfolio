import fs from "fs";
import path from "path";
import { imageSize } from "image-size";
import StillsGallery from "./StillsGallery";

export default function Page() {
  const dir = path.join(process.cwd(), "public/images/stills");
  const files = fs.readdirSync(dir);

  const images = files
    .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .map((file) => {
      const buffer = fs.readFileSync(path.join(dir, file));
      const { width = 0, height = 0 } = imageSize(buffer);
      return { file, width, height };
    });

  return <StillsGallery images={images} />;
}
