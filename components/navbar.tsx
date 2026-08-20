import Link from "next/link";
import { DesktopNavLinks } from "./desktop-nav-links";
import { MobileMenu } from "./mobile-menu";
import { SiteBrand } from "./site-brand";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full bg-paper-light border-b border-line isolation-auto">
      <div className="site-container h-[72px] md:h-[88px] flex items-center justify-between gap-4">
        {/* Left: Brand */}
        <SiteBrand />

        {/* Center: Nav links */}
        <DesktopNavLinks />

        {/* Right: Primary Action CTA & Mobile Menu */}
        <div className="flex items-center gap-3">
          <Link
            href="/get-involved"
            className="hidden sm:inline-flex items-center justify-center min-h-[50px] min-w-[150px] rounded-[12px] border-2 border-ink bg-tangerine px-6 font-body font-extrabold text-[16px] leading-tight text-ink shadow-[3px_3px_0px_0px_#233047] hover:-translate-y-0.5 hover:bg-sun hover:shadow-[4px_4px_0px_0px_#233047] active:translate-y-0 active:shadow-[1px_1px_0px_0px_#233047] transition-all focus:outline-none focus-visible:ring-3 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
          >
            Get involved
          </Link>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
