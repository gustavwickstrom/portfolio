import Image from "next/image";
import RevealOnView from "@/components/RevealOnView";
import RevealItem from "@/components/RevealItem";

export default function Page() {
  return (
    <main className="mx-auto text-center sm:px-0">
      {/* Portrait */}
      <RevealItem
        delay={0}
        className="relative w-full aspect-[3/4] max-w-md mx-auto overflow-hidden"
      >
        <Image
          src="/images/profile.webp"
          alt="Portrait of Gustav Wickström"
          fill
          className="object-cover"
          priority
        />
      </RevealItem>

      <div className="py-12 space-y-6 sm:space-y-5">
        {/* Representation */}
        <RevealItem as="section" delay={120} className="space-y-2">
          <p className="text-base">
            Represented by{" "}
            <a
              href="https://www.gracestudio.se/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Grace Studio
            </a>{" "}
          </p>
        </RevealItem>

        {/* Location */}
        <RevealItem as="section" delay={60} className="space-y-2">
          <p>Småland, Sweden</p>
        </RevealItem>

        {/* Contact */}
        <RevealItem as="section" delay={180} className="space-y-2">
          <p className="text-base">
            <a
              href="mailto:gustav.wickstrom@gracestudio.se"
              className="hover:underline"
            >
              gustav.wickstrom@gracestudio.se
            </a>
            <br />
            <a href="tel:+46738329324" className="hover:underline">
              +46 73 832 93 24
            </a>
          </p>
        </RevealItem>

        {/* Socials */}
        <RevealItem as="section" delay={240} className="space-y-2">
          <p>
            <a
              href="https://www.instagram.com/gustavwickstrom/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Instagram
            </a>{" "}
            /{" "}
            <a
              href="https://www.linkedin.com/in/gustav-wickstr%C3%B6m-89350a208/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              LinkedIn
            </a>
          </p>
        </RevealItem>
      </div>

      {/* Kickar igång reveal vid sidmontage / SPA-nav */}
      <RevealOnView />
    </main>
  );
}
