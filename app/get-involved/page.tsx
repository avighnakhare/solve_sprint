import Link from "next/link";
import type { Metadata } from "next";
import { CONTACT_CONFIG, FORM_CONFIGS, getFormLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Get Involved | SolveSprint™ In-Person Event Registration",
  description:
    "Register interest for upcoming SolveSprint in-person student innovation events as a high school student team, host organization, volunteer, or event coordinator."
};

export default function GetInvolvedPage() {
  const studentForm = FORM_CONFIGS.student;
  const studentLink = getFormLink("student");

  const orgForm = FORM_CONFIGS.organization;
  const orgLink = getFormLink("organization");

  const volunteerForm = FORM_CONFIGS.volunteer;
  const volunteerLink = getFormLink("volunteer");

  const coordinatorForm = FORM_CONFIGS.coordinator;
  const coordinatorLink = getFormLink("coordinator");

  const pathways = [
    {
      number: "01",
      title: "High School Student",
      role: "For students & team members",
      form: studentForm,
      link: studentLink,
      guideHref: "/student",
      guideLabel: "Read student guide"
    },
    {
      number: "02",
      title: "Host Organization",
      role: "For businesses & nonprofits",
      form: orgForm,
      link: orgLink,
      guideHref: "/organization",
      guideLabel: "Read organization guide"
    },
    {
      number: "03",
      title: "Event Volunteer",
      role: "For community members & adults",
      form: volunteerForm,
      link: volunteerLink,
      guideHref: "/volunteer#volunteers",
      guideLabel: "Read volunteer roles"
    },
    {
      number: "04",
      title: "Event Coordinator",
      role: "For student leads & project coordinators",
      form: coordinatorForm,
      link: coordinatorLink,
      guideHref: "/volunteer#coordinators",
      guideLabel: "Read coordinator pathway"
    }
  ] as const;

  return (
    <div className="bg-[#FFF9F0] min-h-screen text-slate-900">
      {/* 1. Hero */}
      <section className="relative border-b border-slate-900/10 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <span className="text-xs lg:text-sm font-semibold tracking-wider uppercase text-orange-600">
              REGISTRATION & PARTICIPATION HUB
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Get Involved with SolveSprint
            </h1>
            <p className="mt-6 text-lg lg:text-xl text-slate-600 leading-relaxed">
              SolveSprint brings local businesses, community organizations, and high school student teams together for in-person innovation competitions. Select your pathway below to submit your interest.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Numbered Editorial Pathway Rows */}
      <section className="py-20 lg:py-28 border-b border-slate-900/10">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="divide-y divide-slate-900/15">
            {pathways.map((item) => (
              <div key={item.number} className="py-12 lg:py-16 first:pt-0 last:pb-0">
                <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
                  <div className="lg:col-span-4">
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl lg:text-5xl font-black font-mono text-orange-600">
                        {item.number}
                      </span>
                      <span className="text-xs lg:text-sm font-mono font-bold tracking-wider uppercase text-slate-500">
                        {item.role}
                      </span>
                    </div>
                    <h2 className="mt-3 text-3xl font-bold text-slate-900">{item.title}</h2>
                  </div>

                  <div className="lg:col-span-5 space-y-4 text-base lg:text-lg text-slate-600 leading-relaxed">
                    <p>{item.form.description}</p>
                    <div className="text-sm text-slate-500 space-y-1 pt-2 border-t border-slate-900/10">
                      <p><strong>Who it is for:</strong> {item.form.whoItIsFor}</p>
                      <p><strong>Expected commitment:</strong> {item.form.commitment}</p>
                    </div>
                  </div>

                  <div className="lg:col-span-3 flex flex-col items-start lg:items-end gap-3">
                    {item.link.isAvailable ? (
                      <a
                        href={item.link.url!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[48px] w-full lg:w-auto items-center justify-center rounded-xl bg-orange-600 px-6 py-3 text-[15px] font-semibold text-white transition-all hover:bg-orange-700 shadow-sm"
                      >
                        {item.form.buttonText} ↗
                      </a>
                    ) : (
                      <div className="w-full lg:text-right">
                        <button
                          disabled
                          className="w-full lg:w-auto cursor-not-allowed rounded-xl bg-slate-300 px-6 py-3 text-[15px] font-semibold text-slate-600"
                        >
                          Form Coming Soon
                        </button>
                        <p className="mt-1.5 text-xs text-slate-500">Form will open when dates are confirmed.</p>
                      </div>
                    )}
                    <Link href={item.guideHref} className="text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors">
                      {item.guideLabel} →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Direct Contact Info */}
      <section className="py-20 lg:py-28 bg-[#101828] text-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <span className="text-xs lg:text-sm font-semibold tracking-wider uppercase text-orange-400">QUESTIONS?</span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Contact Event Coordinators
            </h2>
            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed">
              If you have specific questions regarding challenge hosting, student eligibility, or event sponsorship, reach out directly to our founding team.
            </p>

            <div className="mt-10 space-y-4 text-base lg:text-lg text-slate-300">
              <p>
                <strong className="text-white font-semibold">{CONTACT_CONFIG.avighna.name}</strong> · {CONTACT_CONFIG.avighna.title}:{" "}
                <a href={`mailto:${CONTACT_CONFIG.avighna.email}`} className="text-orange-400 underline hover:text-orange-300">
                  {CONTACT_CONFIG.avighna.email}
                </a>
              </p>
              <p>
                <strong className="text-white font-semibold">{CONTACT_CONFIG.kavish.name}</strong> · {CONTACT_CONFIG.kavish.title}:{" "}
                <a href={`mailto:${CONTACT_CONFIG.kavish.email}`} className="text-orange-400 underline hover:text-orange-300">
                  {CONTACT_CONFIG.kavish.email}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
