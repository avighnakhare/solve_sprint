import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FFF8EC",
        "paper-light": "#FFFDF8",
        ink: "#233047",
        "ink-muted": "#526076",
        tangerine: "#F47731",
        sun: "#F6C74A",
        leaf: "#78A86B",
        lake: "#BFE3EC",
        peach: "#F4C4A7",
        line: "#D9D3C8",
        white: "#FFFFFF",
      },
      fontFamily: {
        display: ["var(--font-display)", "Fraunces", "Georgia", "serif"],
        body: ["var(--font-body)", "Instrument Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "IBM Plex Mono", "monospace"],
      },
      borderRadius: {
        button: "10px",
        control: "12px",
        media: "18px",
        photo: "28px",
        field: "28px",
      },
      boxShadow: {
        photo: "0 20px 60px rgba(35, 48, 71, 0.12)",
      },
    }
  },
  plugins: []
};

export default config;

