/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.{css}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontSize: {
        headline: ['34px', { lineHeight: '1.2', fontWeight: '400' }],
        base: ['13px', { lineHeight: '1.6', fontWeight: '400' }],
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'], // ← denna rad är viktig!
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
  ],
};
