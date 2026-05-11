/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        // Display: Fraunces — warm serif for headlines, hero, and section
        // titles. Body stays Inter; code stays JetBrains Mono.
        display: [
          "Fraunces",
          "ui-serif",
          "Georgia",
          "Cambria",
          '"Times New Roman"',
          "Times",
          "serif",
        ],
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
        mono: [
          '"JetBrains Mono"',
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          '"Liberation Mono"',
          '"Courier New"',
          "monospace",
        ],
      },
      colors: {
        // Workbook surface palette. Promoted from arbitrary Tailwind values
        // so future work can reach for `bg-canvas` / `bg-surface` / etc.
        canvas: {
          DEFAULT: "#f6f3ec",
          dark: "#14161c",
        },
        surface: {
          DEFAULT: "#fdfaf3",
          raised: "#ffffff",
          dark: "#1b1e26",
          "dark-raised": "#222630",
        },
        ink: {
          // Primary text in light mode; muted in dark.
          DEFAULT: "#1c1a16",
          muted: "#6b6557",
          dark: "#e9e6df",
          "dark-muted": "#9ba0ab",
        },
      },
    },
  },
  plugins: [],
};
