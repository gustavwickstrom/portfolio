/** @type {import('tailwindcss').Config} */
import aspectRatio from '@tailwindcss/aspect-ratio';

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.{css}",
  ],
  safelist: [
    "opacity-0",
    "opacity-100",
    "translate-y-0",
    "translate-y-20"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontSize: {
        headline: ['36px', { lineHeight: '1.2', fontWeight: '400' }],
        big: ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        base: ['11px', { lineHeight: '1.6', fontWeight: '400' }],
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['Consolas', 'Courier New', 'monospace'],
      },
      spacing: {
        section: '6rem',
        gutter: '1.5rem',
      },
    },    
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    aspectRatio,
  ],
};
