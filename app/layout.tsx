import type { Metadata } from "next";
import { Fraunces, Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  axes: ["SOFT", "WONK"],
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "SolveSprint™ | In-Person Student Innovation Events",
  description:
    "SolveSprint is an in-person student innovation competition connecting high school teams with real challenges from local organizations.",
  icons: {
    icon: [{ url: "/brand/solvesprint-mark.png", type: "image/png" }],
    shortcut: "/brand/solvesprint-mark.png",
    apple: "/brand/solvesprint-mark.png"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${instrumentSans.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <Navbar />
        <main id="main-content" className="pt-4 sm:pt-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

