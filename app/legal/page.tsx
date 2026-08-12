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
    <div className="bg-[#FFF9F0] min-h-screen text-slate-900">
      <section className="border-b border-slate-900/10 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <span className="text-xs lg:text-sm font-semibold tracking-wider uppercase text-orange-600">
              GOVERNANCE & DISCLOSURES
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Legal & Safety Hub
            </h1>
            <p className="mt-6 text-lg lg:text-xl text-slate-600 leading-relaxed">
              Find SolveSprint&apos;s event rules, privacy practices, safety standards, terms of use, and legal disclosures for in-person student innovation competitions.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 border-b border-slate-900/10 bg-[#FFFDF9]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="space-y-16">
            {groups.map((group) => (
              <div key={group.title}>
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 border-b border-slate-900/15 pb-4">
                  {group.title}
                </h2>
                <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {group.entries.map((entry) => (
                    <div key={entry.href} className="flex flex-col justify-between border-l-2 border-orange-500 pl-6">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">
                          <Link href={entry.href} className="hover:text-orange-600 transition-colors">
                            {entry.title}
                          </Link>
                        </h3>
                        <p className="mt-3 text-base text-slate-600 leading-relaxed">{entry.desc}</p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-slate-900/10 flex items-center justify-between text-sm text-slate-500">
                        <span>v{entry.version}</span>
                        <Link href={entry.href} className="font-semibold text-orange-600 hover:text-orange-700">
                          View document →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 border-t border-slate-900/10 pt-8 text-base text-slate-600">
            For legal inquiries, email our team or contact us through the{" "}
            <Link href="/get-involved" className="font-semibold text-orange-600 underline">
              Get Involved Hub
            </Link>.
          </div>
        </div>
      </section>
    </div>
  );
}
