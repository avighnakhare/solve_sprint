"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ButtonLink } from "@/components/ui";
import { usePathname } from "next/navigation";
import { isCurrentRoute } from "@/components/desktop-nav-links";

type NavLink = {
  href: string;
  label: string;
};

export function MobileMenu({ links, cta }: { links: NavLink[]; cta: NavLink }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-300 bg-white text-ink focus:outline-none focus:ring-4 focus:ring-blue/20"
        aria-expanded={open}
        aria-label={open ? "Close navigation" : "Open navigation"}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      {open ? (
        <div className="absolute inset-x-4 top-16 z-50 rounded-lg border border-slate-300 bg-white p-4 shadow-lg">
          <div className="grid gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="mobile-site-nav-link"
                aria-current={isCurrentRoute(pathname, link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <ButtonLink href={cta.href} className="mt-3 w-full" onClick={() => setOpen(false)}>
            {cta.label}
          </ButtonLink>
        </div>
      ) : null}
    </div>
  );
}
