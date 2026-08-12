import Link from "next/link";
import Image from "next/image";
import { ButtonLink } from "@/components/ui";
import { MobileMenu } from "@/components/mobile-menu";
import { DesktopNavLinks } from "@/components/desktop-nav-links";

const publicNavLinks = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/student", label: "For Students" },
  { href: "/organization", label: "For Organizations" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/about", label: "About" }
];

const cta = { href: "/get-involved", label: "Get Involved" };

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-900/10 bg-[#FFF9F0]/90 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-8 px-6 sm:px-8 lg:px-12">
        <Link href="/" aria-label="SolveSprint™ home" className="flex items-center gap-3 transition-opacity hover:opacity-90">
          <Image
            src="/brand/solvesprint-mark.png"
            alt="SolveSprint Logo"
            width={44}
            height={44}
            className="h-11 w-11 object-contain"
            priority
          />
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            SolveSprint<span className="text-xs align-top text-orange-600 ml-0.5 font-semibold">™</span>
          </span>
        </Link>

        <DesktopNavLinks links={publicNavLinks} />

        <div className="hidden items-center gap-4 lg:flex">
          <ButtonLink href={cta.href} variant="primary" className="min-h-[48px] px-6 py-2.5 text-[15px] font-semibold bg-orange-600 hover:bg-orange-700 text-white rounded-xl shadow-sm border-0">
            {cta.label}
          </ButtonLink>
        </div>

        <MobileMenu links={publicNavLinks} cta={cta} />
      </nav>
    </header>
  );
}
