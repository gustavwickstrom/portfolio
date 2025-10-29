import Link from "next/link";

export default function Header() {
  return (
    <header className="text-base">
      <div className="mx-auto flex items-start justify-between py-8">
        {/* Vänster: Namn + undertitel */}
        <div>
          <Link href="/" className="text-blue-600">
            Gustav Wickström
          </Link>
          <p className="text-sm text-gray-500">Photographer and Filmmaker</p>
        </div>

        {/* Höger: Navigation */}
        <nav className="flex items-center gap-8">
          <Link href="/" className="hover:underline">
            Film
          </Link>

          <Link href="/stills" className="hover:underline">
            Stills
          </Link>

          <Link href="/info" className="hover:underline">
            Info
          </Link>

          <Link href="/info" className="hover:underline">
            IG
          </Link>
        </nav>
      </div>
    </header>
  );
}
