import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-base">
      <div className="mx-auto flex items-center justify-between py-8">
        <Link href="/" className="">
          Absolutely insane about telling stories.{" "}
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="https://www.instagram.com/gustavwickstrom/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Instagram
          </Link>
        </nav>
      </div>
    </footer>
  );
}
