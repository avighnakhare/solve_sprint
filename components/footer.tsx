import Link from "next/link";
import { SiteBrand } from "@/components/site-brand";
import { CONTACT_CONFIG } from "@/lib/site-config";

const footerGroups = [
  {
    title: "Explore",
    titleHref: undefined as string | undefined,
    links: [
      { href: "/", label: "Home" },
      { href: "/how-it-works", label: "How It Works" },
      { href: "/about", label: "About SolveSprint" }
    ]
  },
  {
    title: "Participate",
    titleHref: "/get-involved",
    links: [
      { href: "/student", label: "For Students" },
      { href: "/organization", label: "For Organizations" },
      { href: "/volunteer", label: "Volunteers & Coordinators" },
      { href: "/get-involved", label: "Get Involved Hub" }
    ]
  },
  {
    title: "Legal & Safety",
    titleHref: "/legal",
    links: [
      { href: "/terms", label: "Terms" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/rules", label: "Event Rules" },
      { href: "/cookie-policy", label: "Cookie Notice" },
      { href: "/code-of-conduct", label: "Code of Conduct" },
      { href: "/accessibility", label: "Accessibility" },
      { href: "/security-reporting", label: "Security Reporting" }
    ]
  }
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer border-t border-orange/20 bg-mist">
      <div className="site-footer__inner mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Brand and Description */}
          <div className="lg:col-span-4">
            <Link href="/" aria-label="SolveSprint™ home" className="inline-block">
              <SiteBrand descriptor="In-person student innovation event" />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              SolveSprint brings local businesses, community organizations, and high school student teams together for an intensive in-person problem-solving competition.
            </p>
            {/* Founders & Contact Info */}
            <div className="mt-6 border-t border-line/60 pt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink/70">Co-Founders & Event Leads</p>
              <div className="mt-2 space-y-1 text-sm text-ink/90">
                <p>
                  <strong className="font-medium text-ink">{CONTACT_CONFIG.avighna.name}</strong> · {CONTACT_CONFIG.avighna.title}
                  {CONTACT_CONFIG.avighna.email ? (
                    <a href={`mailto:${CONTACT_CONFIG.avighna.email}`} className="ml-2 text-accent underline hover:text-accent-hover">
                      {CONTACT_CONFIG.avighna.email}
                    </a>
                  ) : null}
                </p>
                <p>
                  <strong className="font-medium text-ink">{CONTACT_CONFIG.kavish.name}</strong> · {CONTACT_CONFIG.kavish.title}
                  {CONTACT_CONFIG.kavish.email ? (
                    <a href={`mailto:${CONTACT_CONFIG.kavish.email}`} className="ml-2 text-accent underline hover:text-accent-hover">
                      {CONTACT_CONFIG.kavish.email}
                    </a>
                  ) : null}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Columns */}
          <nav className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8" aria-label="Footer navigation">
            {footerGroups.map((group) => {
              const headingId = `footer-${group.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
              return (
                <section key={group.title} aria-labelledby={headingId}>
                  <h2 id={headingId} className="text-xs font-semibold uppercase tracking-wider text-ink/80">
                    {group.titleHref ? (
                      <Link href={group.titleHref} className="hover:text-accent">
                        {group.title}
                      </Link>
                    ) : (
                      group.title
                    )}
                  </h2>
                  <ul className="mt-4 space-y-2.5 text-sm text-muted">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="transition-colors hover:text-ink">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 text-xs text-muted sm:flex-row">
          <span>IN-PERSON COMPETITION · REAL PROBLEMS · HIGH SCHOOL TEAMS</span>
          <span>© {currentYear} SolveSprint™. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
