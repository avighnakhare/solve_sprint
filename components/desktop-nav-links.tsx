"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type PublicNavLink = {
  href: string;
  label: string;
};

export function isCurrentRoute(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
}

export function DesktopNavLinks({ links }: { links: PublicNavLink[] }) {
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex items-center gap-7 xl:gap-9">
      {links.map((link) => {
        const current = isCurrentRoute(pathname, link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={current ? "page" : undefined}
            className={`text-[15px] font-medium transition-colors relative py-1 ${
              current
                ? "text-slate-900 font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {link.label}
            {current && (
              <span className="absolute inset-x-0 -bottom-2 h-0.5 rounded-full bg-orange-600" />
            )}
          </Link>
        );
      })}
    </div>
  );
}
