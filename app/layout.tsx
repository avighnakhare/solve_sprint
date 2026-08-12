import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

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
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
