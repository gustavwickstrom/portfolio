"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (saved === "dark" || (!saved && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  // Scroll lock när meny är öppen
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [menuOpen]);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  const handleNav = (href) => {
    setMenuOpen(false);
    setTimeout(() => router.push(href), 300);
  };

  const linkClass = (href) =>
    `transition-opacity duration-200 ${
      pathname === href ? "opacity-100" : "opacity-50 hover:opacity-100"
    }`;

  return (
    <>
      <header className="w-full pt-5 pb-6 grid grid-cols-2 lg:grid-cols-4 text-white mix-blend-difference lg:gap-8 mb-1">
        {/* Column 1: Namn */}
        <div className="flex flex-col">
          <Link
            href="/"
            className="w-fit text-big hover:opacity-50 transition-opacity duration-200"
          >
            GUSTAV WICKSTRÖM
          </Link>
        </div>

        {/* Column 2: Navigation – hidden until lg */}
        <div className="flex flex-col hidden lg:flex">
          <Link href="/" className={`w-fit ${linkClass("/")}`}>
            IMAGERY
          </Link>
          <Link href="/film" className={`w-fit ${linkClass("/film")}`}>
            FILMS
          </Link>
        </div>

        {/* Column 3: Info – hidden until lg */}
        <div className="hidden lg:block">
          <Link href="/info" className={`w-fit ${linkClass("/info")}`}>
            INFO
          </Link>
        </div>

        {/* Column 4: Social + toggle – hidden until lg */}
        <div className="flex justify-between hidden lg:flex">
          <div className="flex flex-col">
            <a
              href="https://www.instagram.com/gustavwickstrom/"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-50 hover:opacity-100 transition-all duration-200"
            >
              INSTAGRAM
            </a>
            <a
              href="https://www.youtube.com/@gustavwickstroms"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-50 hover:opacity-100 transition-all duration-200"
            >
              YOUTUBE
            </a>
          </div>
          <span
            onClick={toggleTheme}
            className="opacity-50 hover:opacity-100 transition-opacity duration-200"
          >
            {isDark ? "○ ●" : "● ○"}
          </span>
        </div>

        {/* Mobile: Menu + Toggle – only shown below lg */}
        <div className="flex justify-end items-start gap-6 lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="opacity-50 hover:opacity-100 transition-all duration-200"
          >
            {menuOpen ? "CLOSE" : "MENU"}
          </button>

          <span
            onClick={toggleTheme}
            className="opacity-50 hover:opacity-100 transition-opacity duration-200"
          >
            {isDark ? "○ ●" : "● ○"}
          </span>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-background text-foreground z-50 flex flex-col lg:hidden">
          {/* Mobil-header i menyn */}
          <div className="w-full px-4 pt-7 pb-6 grid grid-cols-2 text-white mix-blend-difference">
            <div className="flex flex-col">
              <Link
                href="/"
                className="text-big hover:opacity-50 transition-opacity duration-200 text-left"
              >
                GUSTAV WICKSTRÖM
              </Link>
            </div>

            <div className="flex justify-end items-start gap-6">
              <button
                onClick={() => setMenuOpen(false)}
                className="opacity-50 hover:opacity-100 transition-all duration-200"
              >
                CLOSE
              </button>
              <span
                onClick={toggleTheme}
                className="opacity-50 hover:opacity-100 transition-opacity duration-200"
              >
                {isDark ? "○ ●" : "● ○"}
              </span>
            </div>
          </div>

          {/* Menylänkar med borders och margin */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-xl text-center gap-y-12">
            <div className="flex flex-col gap-y-3">
              <Link
                href="/"
                onClick={() => handleNav("/")}
                className={`${linkClass("/")}`}
              >
                IMAGERY
              </Link>
              <Link
                href="/film"
                onClick={() => handleNav("/film")}
                className={`${linkClass("/film")}`}
              >
                FILMS
              </Link>
              <Link
                href="/info"
                onClick={() => handleNav("/info")}
                className={`${linkClass("/info")}`}
              >
                INFO
              </Link>
            </div>
            <div className="flex flex-col gap-y-3">
              <a
                href="https://www.instagram.com/gustavwickstrom/"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-50 hover:opacity-100 transition-all duration-200"
              >
                INSTAGRAM
              </a>
              <a
                href="https://www.youtube.com/@gustavwickstroms"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-50 hover:opacity-100 transition-all duration-200"
              >
                YOUTUBE
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
