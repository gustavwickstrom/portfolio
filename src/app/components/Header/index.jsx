'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const links = [
  { href: '/', label: 'Work' },
  { href: '/info', label: 'Info' },
  { href: 'https://www.instagram.com/gustavwickstrom/', label: 'ig', external: true },
  { href: 'https://www.youtube.com/@gustavwickstroms', label: 'yt', external: true },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleNav = (href, external) => {
    if (external) return;

    setMenuOpen(false); // start fade-out
    setTimeout(() => router.push(href), 300); // wait for animation
  };

  return (
    <>
      {/* HEADER */}
      <header className="flex justify-between items-center py-4 mb-6 z-50 relative">
        <Link href="/" className="text-base hover:opacity-30 transition-opacity duration-200">
          Gustav Wickström
        </Link>

        <nav className="hidden lg:flex gap-6">
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

        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden hover:underline">
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </header>

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
