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
        midnight: "#101828",
        ink: "#101828",
        muted: "#475467",
        cream: "#FFF9F0",
        peach: "#FFE4C2",
        coral: "#F97316",
        mint: "#BBF7D0",
        green: "#86EFAC",
        sky: "#DDF3FA",
        blue: "#38BDF8",
        lavender: "#E8E1FF",
        pink: "#FBCFE8",
        mist: "#FFFDF9",
        teal: "#0F766E"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"Kode Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
        display: ["Orbitron", "Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        premium: "0 24px 80px rgba(16, 24, 40, 0.16)",
        card: "0 18px 50px rgba(16, 24, 40, 0.08)",
        lift: "0 18px 32px rgba(16, 24, 40, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
