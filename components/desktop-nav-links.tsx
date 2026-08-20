"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/student", label: "For students" },
  { href: "/organization", label: "For organizations" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/about", label: "About" },
];

export function DesktopNavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Main Navigation">
      {NAV_LINKS.map(({ href, label }) => {
        const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            className={`relative py-1 font-body font-medium text-15px text-ink transition-colors hover:text-tangerine focus:outline-none focus-visible:ring-2 focus-visible:ring-tangerine rounded-sm ${
              isActive ? "font-bold text-ink" : "text-ink-muted"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            {label}
            {isActive && (
              <span
                className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-tangerine"
                aria-hidden="true"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
