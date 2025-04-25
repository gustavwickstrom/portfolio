'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const links = [
  { href: '/', label: 'INDEX' },
  { href: '/info', label: 'INFO' },
  { href: 'https://www.instagram.com/gustavwickstrom/', label: 'INSTA', external: true },
  { href: 'https://www.youtube.com/@gustavwickstroms', label: 'YT', external: true },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleNav = (href, external) => {
    if (external) return;
    setMenuOpen(false);
    setTimeout(() => router.push(href), 300);
  };

  return (
    <>
      {/* FIXED HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full flex justify-between px-12 py-8">
        <Link href="/" className="text-base hover:opacity-30 transition-opacity duration-200">
        GUSTAV WICKSTRÖM
        </Link>

        <nav className="hidden lg:flex flex-col text-right gap-6">
          {links.map(({ href, label, external }) =>
            external ? (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {label}
              </a>
            ) : (
              <Link key={label} href={href} className="hover:underline">
                {label}
              </Link>
            )
          )}
        </nav>

        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">
          {menuOpen ? 'CLOSE' : 'MENU'}
        </button>
      </header>

      {/* SPACER to offset fixed header height */}
      <div className="h-16" />

      {/* MOBILE MENU */}
      <div
        className={`
          fixed inset-0 bg-background text-foreground z-40 flex flex-col items-center justify-center gap-8 text-headline
          transition-opacity duration-300
          pointer-events-none
          ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0'}
        `}
      >
        {links.map(({ href, label, external }) =>
          external ? (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ) : (
            <button
              key={label}
              onClick={() => handleNav(href, external)}
              className="hover:underline"
            >
              {label}
            </button>
          )
        )}
      </div>
    </>
  );
}
