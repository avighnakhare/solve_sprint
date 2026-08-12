import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works | SolveSprint™ In-Person Event Process",
  description:
    "Learn how SolveSprint connects local organizations with high school student teams for in-person innovation challenges, live pitches, and professional judging."
};

const processSteps = [
  {
    number: "01",
    audience: "ORGANIZATIONS",
    heading: "Bring a problem worth solving.",
    paragraph:
      "A business, nonprofit, startup, university group, or community organization shares a real problem that is specific enough for students to explore. The problem cannot require confidential, regulated, or personally identifiable information.",
    details: [
      "A focused problem with useful background",
      "A representative available to answer limited questions"
    ]
  },
  {
    number: "02",
    audience: "SOLVESPRINT",
    heading: "Turn the problem into a fair student brief.",
    paragraph:
      "SolveSprint works with the organization to clarify the goal, expected deliverables, event rules, and judging criteria. The final brief should be understandable to students and realistic within the available time.",
    details: [
      "One consistent brief for every participating team",
      "Clear eligibility, safety, and evaluation rules"
    ]
  },
  {
    number: "03",
    audience: "STUDENTS",
    heading: "Register interest and form a team.",
    paragraph:
      "Students tell us they are interested in participating. Depending on the event, they may register with teammates or ask to be matched with other participants.",
    details: [
      "Exact eligibility and team size are published before registration",
      "An interest form does not guarantee a confirmed place"
    ]
  },
  {
    number: "04",
    audience: "EVENT DAY",
    heading: "Research, build, and prepare.",
    paragraph:
      "Teams study the brief, decide how to approach the problem, and develop a response. Their work may include research, a prototype, a campaign, a model, a process improvement, or another challenge-appropriate deliverable.",
    details: [
      "Teams manage their own approach and time",
      "Volunteers support logistics without solving the challenge for them"
    ]
  },
  {
    number: "05",
    audience: "FINAL PRESENTATIONS",
    heading: "Present the solution and receive feedback.",
    paragraph:
      "Teams explain their reasoning and proposed solution to a review panel. Judges use the published criteria, ask questions, and provide feedback. Recognition or awards depend on the rules of that specific event.",
    details: [
      "Presentation formats and judging criteria are announced in advance",
      "Student work is handled according to the event rules and participation terms"
    ]
  }
] as const;

const eventSchedule = [
  { step: "01", title: "Arrival and check-in" },
  { step: "02", title: "Challenge briefing" },
  { step: "03", title: "Team work period" },
  { step: "04", title: "Presentation preparation" },
  { step: "05", title: "Final pitches" },
  { step: "06", title: "Feedback and recognition" }
] as const;

export default function HowItWorksPage() {
  return (
    <div className="bg-[#FFF9F0] min-h-screen text-slate-900">
      {/* 1. Page Hero */}
      <section className="relative border-b border-slate-900/10 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left: Left-aligned editorial text */}
            <div className="lg:col-span-7">
              <span className="text-xs lg:text-sm font-semibold tracking-wider uppercase text-orange-600">
                HOW A SOLVESPRINT EVENT WORKS
              </span>
              <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                From a real brief to a live final pitch.
              </h1>
              <p className="mt-6 text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl">
                Local organizations bring the challenge. Student teams research, build, and present their response at an in-person SolveSprint event.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/get-involved"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-orange-600 px-6 py-3 text-[15px] font-semibold text-white transition-all hover:bg-orange-700 shadow-sm"
                >
                  Get Involved
                </Link>
                <Link
                  href="/student"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-slate-900/15 bg-white px-6 py-3 text-[15px] font-semibold text-slate-900 transition-all hover:bg-slate-50 shadow-sm"
                >
                  For Students
                </Link>
              </div>
            </div>

            {/* Right: Authentic Event-Related Image */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-2xl border border-slate-900/10 shadow-lg aspect-[4/3]">
                <Image
                  src="/images/about/student-team-building.png"
                  alt="Student team working together during an in-person event"
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

      {/* 2. Event Process Timeline */}
      <section className="py-20 lg:py-32 border-b border-slate-900/10">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            {/* Left Column (Sticky anchor heading) */}
            <div className="lg:col-span-4 lg:sticky lg:top-28">
              <span className="text-xs lg:text-sm font-semibold tracking-wider uppercase text-orange-600">
                EVENT PROCESS
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
                The path from problem to presentation
              </h2>
              <p className="mt-4 text-base lg:text-lg text-slate-600 leading-relaxed">
                Exact timing and rules may differ by event.
              </p>
              <div className="mt-8 hidden lg:block h-32 w-0.5 bg-gradient-to-b from-orange-500/40 to-transparent" />
            </div>

            {/* Right Column (Continuous timeline rows) */}
            <div className="lg:col-span-8 divide-y divide-slate-900/15">
              {processSteps.map((step) => (
                <div key={step.number} className="py-10 lg:py-14 first:pt-0 last:pb-0">
                  <div className="flex items-baseline gap-4">
                    <span className="text-5xl lg:text-6xl font-black text-orange-600 tracking-tight font-mono">
                      {step.number}
                    </span>
                    <span className="text-xs lg:text-sm font-bold tracking-widest uppercase text-slate-500">
                      {step.audience}
                    </span>
                  </div>

                  <h3 className="mt-3 text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
                    {step.heading}
                  </h3>

                  <p className="mt-4 text-base lg:text-lg text-slate-700 leading-relaxed max-w-3xl">
                    {step.paragraph}
                  </p>

                  <ul className="mt-6 space-y-2 text-sm lg:text-base text-slate-600">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-3">
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-orange-500 shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Event-Day Rhythm */}
      <section className="py-20 lg:py-28 bg-[#FFFDF9] border-b border-slate-900/10">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <span className="text-xs lg:text-sm font-semibold tracking-wider uppercase text-orange-600">
              EVENT SCHEDULE
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
              A look at event day
            </h2>
          </div>

          {/* Linear schedule flow with oversized numbers & connecting rules */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {eventSchedule.map((item) => (
              <div
                key={item.step}
                className="relative p-6 border-l-2 border-orange-500/40 bg-[#FFF9F0] rounded-r-xl"
              >
                <span className="text-xs font-mono font-bold tracking-wider text-orange-600 uppercase">
                  Phase {item.step}
                </span>
                <h3 className="mt-2 text-xl font-bold text-slate-900">{item.title}</h3>
              </div>
            ))}
          </div>

          <p className="mt-12 text-base lg:text-lg text-slate-600 leading-relaxed border-t border-slate-900/10 pt-6">
            The exact schedule, challenge format, eligibility requirements, team size, deliverables, and judging process will be provided for each event.
          </p>
        </div>
      </section>

      {/* 4. Audience Pathways */}
      <section className="py-20 lg:py-28 border-b border-slate-900/10">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-900/15">
            {/* Left: For Students */}
            <div className="lg:pr-12 pt-8 lg:pt-0">
              <span className="text-xs lg:text-sm font-semibold tracking-wider uppercase text-orange-600">
                FOR STUDENTS
              </span>
              <h2 className="mt-3 text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
                Interested in solving a real problem with a team?
              </h2>
              <p className="mt-4 text-base lg:text-lg text-slate-600 leading-relaxed">
                Share your interest and we will contact you when event details and registration are available.
              </p>
              <div className="mt-8">
                <Link
                  href="/student"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-orange-600 px-6 py-3 text-[15px] font-semibold text-white transition-all hover:bg-orange-700 shadow-sm"
                >
                  Student interest form
                </Link>
              </div>
            </div>

            {/* Right: For Organizations */}
            <div className="lg:pl-12 pt-8 lg:pt-0">
              <span className="text-xs lg:text-sm font-semibold tracking-wider uppercase text-orange-600">
                FOR ORGANIZATIONS
              </span>
              <h2 className="mt-3 text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
                Have a problem students could explore?
              </h2>
              <p className="mt-4 text-base lg:text-lg text-slate-600 leading-relaxed">
                Tell us about your organization and we will contact you to discuss whether it fits a future event.
              </p>
              <div className="mt-8">
                <Link
                  href="/organization"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-slate-900/15 bg-white px-6 py-3 text-[15px] font-semibold text-slate-900 transition-all hover:bg-slate-50 shadow-sm"
                >
                  Propose a challenge
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Final CTA */}
      <section className="py-20 lg:py-28 bg-[#101828] text-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              There is a place for you in the room.
            </h2>
            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed">
              Participate as a student, bring a challenge, volunteer at the event, or help coordinate outreach.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/get-involved"
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-orange-600 px-6 py-3 text-[15px] font-semibold text-white transition-all hover:bg-orange-700 shadow-sm"
              >
                Get involved
              </Link>
              <Link
                href="/about#contact"
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-[15px] font-semibold text-white transition-all hover:bg-white/20"
              >
                Contact SolveSprint
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
