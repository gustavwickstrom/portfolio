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
        base: ['16px', { lineHeight: '1.6', fontWeight: '400' }],
      },      
      fontFamily: {
        mono: ['Consolas', 'Courier New', 'monospace'], // ← lägg till den här
      },
      
      spacing: {
        section: '6rem',
        gutter: '1.5rem',
      },
    },
  },
  plugins: [],
};
