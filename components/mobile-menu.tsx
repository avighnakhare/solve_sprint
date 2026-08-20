"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "./desktop-nav-links";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll and handle Escape key when open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-controls="mobile-menu-panel"
        aria-label={isOpen ? "Close menu" : "Open main menu"}
        className="flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg border border-line bg-paper-light text-ink hover:bg-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-tangerine"
      >
        <span className="font-mono text-xl font-bold" aria-hidden="true">
          {isOpen ? "✕" : "☰"}
        </span>
      </button>

      {isOpen && (
        <div
          id="mobile-menu-panel"
          ref={menuRef}
          className="fixed inset-x-0 top-[72px] bottom-0 z-50 bg-paper-light border-t border-line p-6 overflow-y-auto flex flex-col justify-between"
          role="dialog"
          aria-modal="true"
          aria-label="Main Navigation Menu"
        >
          <nav className="flex flex-col divide-y divide-line">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center min-h-[56px] py-3.5 text-[18px] font-body font-bold text-ink transition-colors hover:text-tangerine ${
                    isActive ? "text-tangerine" : "text-ink"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="flex-1">{label}</span>
                  {isActive && <span className="text-sm font-mono text-tangerine">• ACTIVE</span>}
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-line space-y-4">
            <Link
              href="/get-involved"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center w-full min-h-[56px] rounded-[12px] border-2 border-tangerine bg-tangerine px-6 font-body font-bold text-[17px] text-ink hover:bg-sun hover:border-sun transition-colors focus:outline-none focus-visible:ring-3 focus-visible:ring-ink"
            >
              Get involved
            </Link>
            <p className="text-center trail-label text-ink-muted">
              SolveSprint • Charlotte Area
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
