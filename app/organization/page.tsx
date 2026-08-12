import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { CONTACT_CONFIG, FORM_CONFIGS, getFormLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "For Host Organizations | SolveSprint™ In-Person Event",
  description:
    "Propose a real challenge from your business, startup, or nonprofit to high school student teams at an in-person SolveSprint innovation event."
};

const suitabilityChecklist = [
  "Does the problem reflect a real operational, marketing, design, or strategic question?",
  "Can high school student teams understand the context with a brief background introduction?",
  "Can students generate meaningful recommendations or visual prototypes within event hours?",
  "Is the prompt free of confidential data, trade secrets, regulated personal information, or proprietary code?",
  "Is your team interested in hearing fresh perspectives from young people in the community?"
] as const;

export default function ForOrganizationsPage() {
  const orgForm = FORM_CONFIGS.organization;
  const formLink = getFormLink("organization");

  return (
    <div className="bg-[#FFF9F0] min-h-screen text-slate-900">
      {/* 1. Image & Copy Hero */}
      <section className="relative border-b border-slate-900/10 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="text-xs lg:text-sm font-semibold tracking-wider uppercase text-orange-600">
                FOR HOST ORGANIZATIONS
              </span>
              <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                Bring Your Real Problems to Student Teams
              </h1>
              <p className="mt-6 text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl">
                SolveSprint connects local businesses, startups, nonprofits, universities, and community organizations with motivated high school student teams. Propose a challenge prompt, see fresh perspectives, and support youth innovation.
              </p>

              <div className="mt-8">
                {formLink.isAvailable ? (
                  <a
                    href={formLink.url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-orange-600 px-6 py-3 text-[15px] font-semibold text-white transition-all hover:bg-orange-700 shadow-sm"
                  >
                    {orgForm.buttonText} (Google Form) ↗
                  </a>
                ) : (
                  <div className="inline-flex flex-col items-start gap-2">
                    <button
                      disabled
                      className="cursor-not-allowed rounded-xl bg-slate-300 px-6 py-3 text-[15px] font-semibold text-slate-600"
                    >
                      Organization Proposal Form Coming Soon
                    </button>
                    <p className="text-sm text-slate-500">Form links will be enabled when event details are finalized.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-2xl border border-slate-900/10 shadow-lg aspect-[4/3]">
                <Image
                  src="/images/about/organization-reviewing-work.png"
                  alt="Organization representative reviewing student work"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Role Comparison Grid */}
      <section className="py-20 lg:py-28 border-b border-slate-900/10 bg-[#FFFDF9]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <span className="text-xs lg:text-sm font-semibold tracking-wider uppercase text-orange-600">HOW HOSTING WORKS</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
              Clear Roles & Responsibilities
            </h2>
          </div>

          <div className="mt-14 grid gap-12 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-900/15">
            {/* What Organization Contributes */}
            <div className="lg:pr-10 pt-8 lg:pt-0">
              <span className="text-xs font-mono font-bold uppercase text-orange-600">YOUR ORGANIZATION</span>
              <h3 className="mt-2 text-2xl lg:text-3xl font-bold text-slate-900">What You Contribute</h3>
              <ul className="mt-6 space-y-5 text-base text-slate-700">
                <li className="flex items-start gap-4">
                  <span className="text-lg font-bold font-mono text-orange-600 shrink-0">01</span>
                  <div>
                    <strong className="font-bold text-slate-900">A Real Challenge Prompt:</strong>
                    <p className="mt-1 text-slate-600">Share an open strategic, operational, marketing, or tech question your team would value exploring.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-lg font-bold font-mono text-orange-600 shrink-0">02</span>
                  <div>
                    <strong className="font-bold text-slate-900">Context & Background:</strong>
                    <p className="mt-1 text-slate-600">Provide 1–2 pages of non-confidential background information for student reference.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-lg font-bold font-mono text-orange-600 shrink-0">03</span>
                  <div>
                    <strong className="font-bold text-slate-900">Optional Presentation Attendance:</strong>
                    <p className="mt-1 text-slate-600">Send 1–2 representatives to attend pitch presentations and share constructive feedback.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* What SolveSprint Handles */}
            <div className="lg:pl-10 pt-8 lg:pt-0">
              <span className="text-xs font-mono font-bold uppercase text-orange-600">SOLVESPRINT TEAM</span>
              <h3 className="mt-2 text-2xl lg:text-3xl font-bold text-slate-900">What We Handle</h3>
              <ul className="mt-6 space-y-5 text-base text-slate-700">
                <li className="flex items-start gap-4">
                  <span className="h-2 w-2 rounded-full bg-orange-500 mt-2 shrink-0" />
                  <div>
                    <strong className="font-bold text-slate-900">Challenge Structuring:</strong>
                    <p className="mt-1 text-slate-600">We adapt your prompt into an age-appropriate, clearly scoped high school challenge brief.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="h-2 w-2 rounded-full bg-orange-500 mt-2 shrink-0" />
                  <div>
                    <strong className="font-bold text-slate-900">Student Recruitment & Logistics:</strong>
                    <p className="mt-1 text-slate-600">We manage student team registration, room logistics, timekeeping, and event supervision.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="h-2 w-2 rounded-full bg-orange-500 mt-2 shrink-0" />
                  <div>
                    <strong className="font-bold text-slate-900">Judging & Evaluation:</strong>
                    <p className="mt-1 text-slate-600">We coordinate standardized rubric evaluation, judge orientation, and feedback collection.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Guidelines & Safeguards */}
      <section className="py-20 lg:py-28 border-b border-slate-900/10">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <span className="text-xs lg:text-sm font-semibold tracking-wider uppercase text-orange-600">POLICIES</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
              Guidelines & Intellectual Property
            </h2>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border-l-2 border-slate-900/20 pl-6">
              <h3 className="text-xl font-bold text-slate-900">No Confidential Data</h3>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                Organizations must not submit confidential company data, trade secrets, financial records, or regulated personal info.
              </p>
            </div>
            <div className="border-l-2 border-slate-900/20 pl-6">
              <h3 className="text-xl font-bold text-slate-900">IP Terms</h3>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                Participation does not automatically transfer student work IP unless explicit written terms are agreed upon prior to the event.
              </p>
            </div>
            <div className="border-l-2 border-slate-900/20 pl-6">
              <h3 className="text-xl font-bold text-slate-900">Minimal Commitment</h3>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                Requires minimal staff time: submitting the challenge brief + optional event presentation attendance.
              </p>
            </div>
            <div className="border-l-2 border-slate-900/20 pl-6">
              <h3 className="text-xl font-bold text-slate-900">Sponsorship Separate</h3>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                Financial sponsorship and challenge prompt hosting are separate pathways unless explicitly combined.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Challenge Suitability Checklist */}
      <section className="py-20 lg:py-28 border-b border-slate-900/10 bg-[#FFFDF9]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <span className="text-xs lg:text-sm font-semibold tracking-wider uppercase text-orange-600">CHECKLIST</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
              Challenge Suitability Checklist
            </h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Use this quick check to see if your organization&apos;s prompt is a great fit for a SolveSprint event.
            </p>
          </div>

          <div className="mt-14 space-y-4 max-w-4xl">
            {suitabilityChecklist.map((item) => (
              <div key={item} className="flex items-start gap-4 py-3 border-b border-slate-900/10">
                <span className="h-2 w-2 rounded-full bg-orange-500 mt-2.5 shrink-0" />
                <span className="text-lg text-slate-800 font-medium leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Contact & Form CTA */}
      <section className="py-20 lg:py-28 bg-[#101828] text-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <span className="text-xs lg:text-sm font-semibold tracking-wider uppercase text-orange-400">PROPOSE A CHALLENGE</span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Organization Challenge Proposal
            </h2>
            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed">
              Tell us about your business or nonprofit. Our team will follow up to discuss how your prompt can fit into a future SolveSprint event.
            </p>

            <div className="mt-10">
              {formLink.isAvailable ? (
                <a
                  href={formLink.url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-orange-600 px-6 py-3 text-[15px] font-semibold text-white transition-all hover:bg-orange-700 shadow-sm"
                >
                  {orgForm.buttonText} (Google Form) ↗
                </a>
              ) : (
                <div className="inline-flex flex-col items-start gap-2">
                  <button
                    disabled
                    className="cursor-not-allowed rounded-xl bg-slate-700 px-6 py-3 text-[15px] font-semibold text-slate-400"
                  >
                    Organization Proposal Form Coming Soon
                  </button>
                  <p className="text-sm text-slate-400">{orgForm.privacyNote}</p>
                </div>
              )}
            </div>

            <div className="mt-12 border-t border-slate-800 pt-8 text-sm text-slate-400">
              Direct email questions:{" "}
              <a href={`mailto:${CONTACT_CONFIG.avighna.email}`} className="text-orange-400 underline hover:text-orange-300">
                {CONTACT_CONFIG.avighna.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
