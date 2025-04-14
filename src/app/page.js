import Image from 'next/image';
import Link from 'next/link';
import projects from '../data/projects';
import PageWrapper from './components/PageWrapper';

export default function Home() {
  return (
    <PageWrapper>
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-y-3">
      {projects.map(({ title, slug, image, description }) => (
        <Link
          key={slug}
          href={`/case/${slug}`}
          className="block group w-full"
        >
          <div className="relative w-full aspect-[16/9] overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Overlay på hover för desktop */}
            <div className="hidden lg:flex absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center text-white text-center px-4">
              <div>
                <p className="text-base font-semibold">{title}</p>
              </div>
            </div>
          </div>

          {/* Text under bilden (mobil / tablet) */}
          <div className="mt-2 text-center lg:hidden">
            <p className="text-base font-medium">{title}</p>
          </div>
        </Link>
      ))}
    </section>
    </PageWrapper>
  );
}
