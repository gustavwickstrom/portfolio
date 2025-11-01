/** @type {import('tailwindcss').Config} */
import aspectRatio from "@tailwindcss/aspect-ratio";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.{css}",
  ],

  safelist: ["opacity-0", "opacity-100", "translate-y-0", "translate-y-20"],

  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontSize: {
        headline: ["36px", { lineHeight: "1.2", fontWeight: "400" }],
        big: ["20px", { lineHeight: "1.6", fontWeight: "400" }],
        base: ["14px", { lineHeight: "1.6", fontWeight: "400" }],
      },
      fontFamily: {
        sans: [
          "Helvetica",
          "Arial",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: ["Consolas", "Courier New", "monospace"],
      },
      spacing: {
        section: "6rem",
        gutter: "1.5rem",
      },

      // 👇 Lägg till detta
      keyframes: {
        rotateOnce: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        // 1 varv, 1s, ease-in-out, behåll sista frame ("both")
        rotateOnce: "rotateOnce 1s ease-in-out 1 both",
      },
    },
  },

  plugins: [require("tailwind-scrollbar-hide"), aspectRatio],
};
