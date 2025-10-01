import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-nunito)", "sans-serif"], // Nunito default
        mono: ["var(--font-geist-mono)", "monospace"], // Geist Mono
      },
    },
  },
  plugins: [],
}
export default config
