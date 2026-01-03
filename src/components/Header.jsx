"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [menuMounted, setMenuMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = () => {
    setMenuMounted(true);
    requestAnimationFrame(() => setMenuOpen(true));
  };
  const closeMenu = () => {
    setMenuOpen(false);
    setTimeout(() => setMenuMounted(false), 200);
  };

  useEffect(() => {
    document.body.style.overflow = menuMounted ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuMounted]);

  return (
    <header className="text-base relative z-40">
      <div className="mx-auto flex justify-between py-8">
        {/* Vänster: Namn + undertitel */}
        <div>
          <Link href="/" className="text-big leading-tight">
            Gustav Wickström
          </Link>
          <p className="text-sm text-gray-500">
            Photographer & Filmmaker
          </p>
        </div>

        {/* Desktop-nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="hover:underline">
            Film
          </Link>
          <Link href="/stills" className="hover:underline">
            Stills
          </Link>
          <Link href="/info" className="hover:underline">
            Info / Contact
          </Link>
        </nav>

        {/* Mobil: Menu-knapp */}
        <button
          className="md:hidden hover:underline"
          onClick={openMenu}
          aria-expanded={menuMounted}
          aria-label="Open menu"
        >
          Menu
        </button>
      </div>

      {/* Mobil overlay (monteras/demonteras med fade) */}
      {menuMounted && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={closeMenu}
          className={[
            "fixed inset-0 z-50 bg-black text-white flex items-center justify-center",
            "transition-opacity duration-200",
            menuOpen ? "opacity-100" : "opacity-0",
          ].join(" ")}
        >
          <button
            className="absolute top-6 right-6 text-3xl leading-none hover:opacity-70 transition"
            onClick={(e) => {
              e.stopPropagation();
              closeMenu();
            }}
            aria-label="Close menu"
          >
            ×
          </button>

          <nav
            onClick={(e) => e.stopPropagation()}
            className={[
              "flex flex-col items-center gap-8",
              "transition-all duration-200",
              menuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-1",
            ].join(" ")}
          >
            <Link
              href="/"
              onClick={closeMenu}
              className="text-big sm:text-4xl hover:opacity-80"
            >
              Film
            </Link>
            <Link
              href="/stills"
              onClick={closeMenu}
              className="text-big sm:text-4xl hover:opacity-80"
            >
              Stills
            </Link>
            <Link
              href="/info"
              onClick={closeMenu}
              className="text-big sm:text-4xl hover:opacity-80"
            >
              Info / Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
