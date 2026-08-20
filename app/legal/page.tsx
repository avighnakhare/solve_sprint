import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL_META } from "@/lib/legal-meta";

export const metadata: Metadata = {
  title: "Legal & Safety Hub | SolveSprint™",
  description:
    "SolveSprint event rules, privacy practices, safety standards, terms of use, and legal disclosures for in-person student innovation competitions.",
};

interface HubEntry {
  title: string;
  desc: string;
  href: string;
  version: string;
  effectiveDate: string;
}

interface HubGroup {
  title: string;
  entries: HubEntry[];
}

const VERSION = LEGAL_META.version;
const EFFECTIVE = LEGAL_META.effectiveDate;

const groups: HubGroup[] = [
  {
    title: "Participation & Event Rules",
    entries: [
      {
        title: "Event Rules",
        desc: "Baseline participation standards, team formation guidelines, skill-based judging rubrics, and original work expectations for in-person events.",
        href: "/rules",
        version: VERSION,
        effectiveDate: EFFECTIVE,
      },
      {
        title: "Code of Conduct & Youth Safety",
        desc: "Expected behavior, prohibited conduct, adult-minor safety standards, and safety reporting instructions.",
        href: "/code-of-conduct",
        version: VERSION,
        effectiveDate: EFFECTIVE,
      },
    ],
  },
  {
    title: "Platform Agreements & Policies",
    entries: [
      {
        title: "Terms of Use",
        desc: "The agreement governing website access, in-person event participation, organization proposals, intellectual property, and disclaimers.",
        href: "/terms",
        version: VERSION,
        effectiveDate: EFFECTIVE,
      },
      {
        title: "Privacy Policy",
        desc: "How SolveSprint collects, uses, and protects personal data submitted through event interest forms.",
        href: "/privacy",
        version: VERSION,
        effectiveDate: EFFECTIVE,
      },
      {
        title: "Cookie Notice",
        desc: "Details on website cookies and third-party Google Form processing.",
        href: "/cookie-policy",
        version: VERSION,
        effectiveDate: EFFECTIVE,
      },
    ],
  },
  {
    title: "Accessibility & Security",
    entries: [
      {
        title: "Accessibility Statement",
        desc: "Our commitment to web accessibility standards and accommodation support for event participants.",
        href: "/accessibility",
        version: VERSION,
        effectiveDate: EFFECTIVE,
      },
      {
        title: "Security Reporting",
        desc: "Instructions for responsible security vulnerability disclosure.",
        href: "/security-reporting",
        version: VERSION,
        effectiveDate: EFFECTIVE,
      },
      {
        title: "DMCA & Copyright Policy",
        desc: "Procedures for submitting copyright infringement notices.",
        href: "/dmca",
        version: VERSION,
        effectiveDate: EFFECTIVE,
      },
    ],
  },
];

export default function LegalHubPage() {
  return (
    <div className="bg-paper min-h-screen text-ink">
      <section className="border-b border-line py-16 lg:py-24 bg-paper-light">
        <div className="site-container">
          <div className="max-w-3xl space-y-4">
            <span className="trail-label text-tangerine font-bold">
              GOVERNANCE &amp; DISCLOSURES
            </span>
            <h1 className="display-hero text-ink">
              Legal &amp; Safety Hub
            </h1>
            <p className="body-large text-ink-muted">
              Find SolveSprint&apos;s event rules, privacy practices, safety standards, terms of use, and legal disclosures for in-person student innovation competitions.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 border-b border-line bg-paper">
        <div className="site-container">
          <div className="space-y-16">
            {groups.map((group) => (
              <div key={group.title} className="space-y-8">
                <h2 className="display-section text-ink border-b border-line pb-4">
                  {group.title}
                </h2>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {group.entries.map((entry) => (
                    <div key={entry.href} className="flex flex-col justify-between border-l-2 border-tangerine pl-6 bg-paper-light p-6 rounded-r-[16px] border-y border-r border-line">
                      <div>
                        <h3 className="heading-support text-ink">
                          <Link href={entry.href} className="hover:text-tangerine transition-colors">
                            {entry.title}
                          </Link>
                        </h3>
                        <p className="mt-3 body-standard text-ink-muted">{entry.desc}</p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-line flex items-center justify-between font-mono text-xs text-ink-muted">
                        <span>v{entry.version}</span>
                        <Link href={entry.href} className="font-bold text-tangerine hover:text-ink">
                          View document →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 border-t border-line pt-8 body-standard text-ink-muted">
            For legal inquiries, contact us directly on our{" "}
            <Link href="/about" className="font-bold text-tangerine underline hover:text-ink">
              About &amp; Contact Page
            </Link>{" "}
            or through the{" "}
            <Link href="/get-involved" className="font-bold text-tangerine underline hover:text-ink">
              Get Involved Hub
            </Link>.
          </div>
        </div>
      </section>
    </div>
  );
}
