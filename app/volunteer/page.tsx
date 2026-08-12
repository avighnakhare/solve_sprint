import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { FORM_CONFIGS, getFormLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Volunteers & Coordinators | SolveSprint™ In-Person Event",
  description:
    "Support high school student innovation events as a volunteer or event coordinator with SolveSprint."
};

const volunteerRoles = [
  {
    title: "Check-in & Participant Support",
    description: "Welcome student teams, verify registration check-in, distribute event materials, and guide attendees to workspace rooms."
  },
  {
    title: "Timekeeping & Room Logistics",
    description: "Keep presentation schedules running on time during live student pitches and manage room transitions."
  },
  {
    title: "Team Guidance & Mentorship",
    description: "Conduct light mentor check-ins with student teams to offer general encouragement without giving unfair answers."
  },
  {
    title: "Judge Support & Rubric Handling",
    description: "Assist judge panels with score sheet distribution, timekeeping during pitch Q&A, and score compilation."
  },
  {
    title: "Tech & Presentation Support",
    description: "Help student teams connect display cables, test presentation audio/video, and troubleshoot projector equipment."
  },
  {
    title: "Setup & Event Cleanup",
    description: "Assist event staff with room arrangement, banner setup, signage, and end-of-day venue cleanup."
  }
] as const;

const coordinatorResponsibilities = [
  "School & Community Outreach: Connecting with local high school teachers, clubs, and counselors",
  "Student Recruitment: Assisting student teams with registration questions and team formation",
  "Partner Communication: Corresponding with host organization representatives and guest judges",
  "Event Day Logistics: Managing room assignments, volunteer schedules, and presentation order",
  "Challenge Materials Preparation: Formatting challenge briefs and judge rubric scorecards"
] as const;

export default function VolunteerPage() {
  const volunteerForm = FORM_CONFIGS.volunteer;
  const volunteerLink = getFormLink("volunteer");
  const coordinatorForm = FORM_CONFIGS.coordinator;
  const coordinatorLink = getFormLink("coordinator");

  return (
    <div className="bg-[#FFF9F0] min-h-screen text-slate-900">
      {/* 1. Hero */}
      <section className="relative border-b border-slate-900/10 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="text-xs lg:text-sm font-semibold tracking-wider uppercase text-orange-600">
                SUPPORT IN-PERSON EVENTS
              </span>
              <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                Volunteers & Event Coordinators
              </h1>
              <p className="mt-6 text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl">
                In-person student innovation events are powered by dedicated community members, educators, parents, and student leads. Explore how you can support our next competition.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#volunteers"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-orange-600 px-6 py-3 text-[15px] font-semibold text-white transition-all hover:bg-orange-700 shadow-sm"
                >
                  Volunteer Roles
                </a>
                <a
                  href="#coordinators"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-slate-900/15 bg-white px-6 py-3 text-[15px] font-semibold text-slate-900 transition-all hover:bg-slate-50 shadow-sm"
                >
                  Coordinator Pathway
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-2xl border border-slate-900/10 shadow-lg aspect-[4/3]">
                <Image
                  src="/images/home/student-project.png"
                  alt="Volunteers supporting students during event day"
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

      {/* 2. Day-of-Event Volunteers */}
      <section id="volunteers" className="py-20 lg:py-28 border-b border-slate-900/10 bg-[#FFFDF9]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="text-xs lg:text-sm font-semibold tracking-wider uppercase text-orange-600">
                DAY-OF SUPPORT (3–6 HOURS)
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
                Event Volunteer Roles
              </h2>
              <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                Volunteers provide crucial on-the-ground support to ensure student teams have a seamless competition experience.
              </p>
            </div>
            <div className="shrink-0">
              {volunteerLink.isAvailable ? (
                <a
                  href={volunteerLink.url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-orange-600 px-6 py-3 text-[15px] font-semibold text-white transition-all hover:bg-orange-700 shadow-sm"
                >
                  {volunteerForm.buttonText} (Google Form) ↗
                </a>
              ) : (
                <div className="inline-flex flex-col items-start gap-1">
                  <button disabled className="cursor-not-allowed rounded-xl bg-slate-300 px-6 py-3 text-[15px] font-semibold text-slate-600">
                    Volunteer Form Coming Soon
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {volunteerRoles.map((role) => (
              <div key={role.title} className="border-l-2 border-orange-500 pl-6">
                <h3 className="text-xl font-bold text-slate-900">{role.title}</h3>
                <p className="mt-3 text-base text-slate-600 leading-relaxed">{role.description}</p>
              </div>
            ))}
          </div>

          <p className="mt-12 text-sm text-slate-500 border-t border-slate-900/10 pt-6">
            <strong>Assignment Policy:</strong> Role assignments depend on event needs, availability, and required background supervision or consent checks.
          </p>
        </div>
      </section>

      {/* 3. Event Coordinators Pathway */}
      <section id="coordinators" className="py-20 lg:py-28 border-b border-slate-900/10">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <span className="text-xs lg:text-sm font-semibold tracking-wider uppercase text-orange-600">
                LEADERSHIP PATHWAY
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
                Event Coordinators
              </h2>
              <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                Coordinators take on higher-responsibility leadership roles before and during SolveSprint events.
              </p>

              <div className="mt-8">
                {coordinatorLink.isAvailable ? (
                  <a
                    href={coordinatorLink.url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-[15px] font-semibold text-white transition-all hover:bg-slate-800 shadow-sm"
                  >
                    {coordinatorForm.buttonText} (Google Form) ↗
                  </a>
                ) : (
                  <div className="inline-flex flex-col items-start gap-1">
                    <button disabled className="cursor-not-allowed rounded-xl bg-slate-300 px-6 py-3 text-[15px] font-semibold text-slate-600">
                      Coordinator Form Coming Soon
                    </button>
                    <p className="text-sm text-slate-500">Coordinator selection opens alongside event announcements.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-7">
              <h3 className="text-2xl font-bold text-slate-900">Key Responsibilities & Expectations</h3>
              <ul className="mt-6 space-y-4 text-base text-slate-700 divide-y divide-slate-900/10">
                {coordinatorResponsibilities.map((resp) => (
                  <li key={resp} className="pt-4 first:pt-0 flex items-start gap-3">
                    <span className="h-2 w-2 rounded-full bg-orange-500 mt-2 shrink-0" />
                    <span className="leading-relaxed">{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Final CTA */}
      <section className="py-20 lg:py-28 bg-[#101828] text-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <span className="text-xs lg:text-sm font-semibold tracking-wider uppercase text-orange-400">JOIN THE TEAM</span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mt-3">
              Support Student Innovation
            </h2>
            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed">
              Register your interest to help power the next SolveSprint competition.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/get-involved"
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-orange-600 px-6 py-3 text-[15px] font-semibold text-white transition-all hover:bg-orange-700 shadow-sm"
              >
                Get Involved Hub
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
