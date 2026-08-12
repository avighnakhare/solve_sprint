import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { LeaguePathwaysHero } from "@/components/hero/LeaguePathwaysHero";
import { HomeMedia, homeImages } from "@/components/home/HomeMedia";
import { EVENT_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "SolveSprint™ | In-Person Student Innovation Event",
  description:
    "SolveSprint is an in-person student innovation competition connecting high school teams with real challenges from local organizations.",
  openGraph: {
    title: "SolveSprint™ | In-Person Student Innovation Event",
    description:
      "SolveSprint brings local organizations and high school students together for an in-person problem-solving competition.",
  }
};

const founders = [
  {
    number: "01",
    name: "Avighna Khare",
    role: "Software Specialist & Marketer",
    portrait: "/images/about/avighna-khare.png"
  },
  {
    number: "02",
    name: "Kavish Shah",
    role: "Outreach Specialist",
    portrait: "/images/about/kavish-shah.png"
  }
] as const;

const processRows = [
  {
    number: "01",
    title: "Organizations propose a real problem",
    body: "Local businesses, startups, nonprofits, and community groups submit real operational challenges for students to explore."
  },
  {
    number: "02",
    title: "Student teams register & receive the brief",
    body: "High school teams review the challenge requirements, guidelines, and context materials before the event."
  },
  {
    number: "03",
    title: "Teams develop solutions & pitch materials",
    body: "Students collaborate on event day to build practical prototypes, recommendations, and presentation decks."
  },
  {
    number: "04",
    title: "Live presentations & professional feedback",
    body: "Teams pitch their work directly to a panel of judges, organization representatives, and community leaders."
  }
] as const;

const eventTimeline = [
  {
    time: "8:30 AM – 9:15 AM",
    title: "Check-in & Kickoff Orientation",
    description: "Teams arrive, collect event materials, and participate in the welcome briefing."
  },
  {
    time: "9:15 AM – 12:30 PM",
    title: "Sprint Session & Mentor Check-ins",
    description: "Student teams brainstorm, prototype, and consult with volunteer mentors."
  },
  {
    time: "12:30 PM – 1:15 PM",
    title: "Lunch & Presentation Prep",
    description: "Teams finalize their slides, rehearsing speeches and pitch delivery."
  },
  {
    time: "1:15 PM – 3:30 PM",
    title: "Live Presentations & Judge Q&A",
    description: "Each team pitches their solution to judges and answers questions."
  },
  {
    time: "3:30 PM – 4:00 PM",
    title: "Deliberation, Feedback & Awards",
    description: "Judges share constructive feedback and recognize standout student work."
  }
] as const;

const getInvolvedChoices = [
  {
    role: "Student",
    title: "For Students",
    description: "Form a team or join individually to tackle real challenges, build project experience, and present your ideas.",
    href: "/student",
    cta: "Student Information & Interest",
    badge: "High School Students"
  },
  {
    role: "Organization",
    title: "For Organizations",
    description: "Propose a real challenge from your business or nonprofit and hear practical solutions from energetic student teams.",
    href: "/organization",
    cta: "Organization Proposal Details",
    badge: "Businesses & Nonprofits"
  },
  {
    role: "Volunteer",
    title: "For Volunteers",
    description: "Support event logistics, check-in, timekeeping, room coordination, or tech setup on event day.",
    href: "/volunteer",
    cta: "Volunteer Roles & Signup",
    badge: "Community Volunteers"
  },
  {
    role: "Coordinator",
    title: "For Event Coordinators",
    description: "Take on higher-responsibility leadership roles in student outreach, partner communication, or event planning.",
    href: "/volunteer#coordinators",
    cta: "Coordinator Pathway",
    badge: "Student Leads & Coordinators"
  }
] as const;

export default function HomePage() {
  return (
    <div className="bg-[#FFF9F0] text-slate-900">
      {/* 1. Hero */}
      <LeaguePathwaysHero />

      {/* 2. Program Overview */}
      <section className="border-b border-slate-900/10 bg-[#FFFDF9] py-20 lg:py-28" aria-labelledby="home-about-title">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <span className="text-xs lg:text-sm font-semibold tracking-wider uppercase text-orange-600">What is SolveSprint?</span>
            <h2 id="home-about-title" className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              An in-person innovation competition for high school students.
            </h2>
            <p className="mt-5 text-lg lg:text-xl leading-relaxed text-slate-600">
              SolveSprint replaces online tasks with hands-on, face-to-face collaboration. Local businesses and community organizations bring real challenges. High school teams develop solutions, present their work live, and receive direct feedback from professionals.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            <div className="border-t-2 border-orange-500 pt-6">
              <span className="text-sm font-mono font-bold text-orange-600">01</span>
              <h3 className="mt-2 text-xl font-bold text-slate-900">Real Local Problems</h3>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                Challenges come from actual local businesses and community groups—not artificial textbook prompts.
              </p>
            </div>
            <div className="border-t-2 border-orange-500 pt-6">
              <span className="text-sm font-mono font-bold text-orange-600">02</span>
              <h3 className="mt-2 text-xl font-bold text-slate-900">In-Person Collaboration</h3>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                Teams spend event day working together, refining prototypes, and practicing public presentation skills.
              </p>
            </div>
            <div className="border-t-2 border-orange-500 pt-6">
              <span className="text-sm font-mono font-bold text-orange-600">03</span>
              <h3 className="mt-2 text-xl font-bold text-slate-900">Professional Feedback</h3>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                Judges evaluate pitches against clear rubrics and share constructive guidance teams can build on.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Event Process Section */}
      <section className="border-b border-slate-900/10 py-20 lg:py-28" aria-labelledby="home-process-title">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="text-xs lg:text-sm font-semibold tracking-wider uppercase text-orange-600">How the Event Works</span>
              <h2 id="home-process-title" className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
                From organizational problem to live presentation.
              </h2>
            </div>
            <Link href="/how-it-works" className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-slate-900/15 bg-white px-6 py-2.5 text-[15px] font-semibold text-slate-900 transition-all hover:bg-slate-50 shadow-sm shrink-0">
              Explore step-by-step process →
            </Link>
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-2">
            <div className="flex flex-col justify-between rounded-2xl border border-slate-900/10 bg-white p-8 shadow-sm">
              <HomeMedia slot={homeImages.studentsBuilding} sizes="(max-width: 767px) 100vw, 50vw" className="rounded-xl" />
              <div className="mt-8 space-y-6">
                {processRows.slice(0, 2).map((step) => (
                  <div key={step.number} className="flex gap-4">
                    <span className="text-2xl font-black font-mono text-orange-600 shrink-0">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                      <p className="mt-2 text-base text-slate-600 leading-relaxed">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-2xl border border-slate-900/10 bg-white p-8 shadow-sm">
              <HomeMedia slot={homeImages.submissionReview} sizes="(max-width: 767px) 100vw, 50vw" className="rounded-xl" />
              <div className="mt-8 space-y-6">
                {processRows.slice(2).map((step) => (
                  <div key={step.number} className="flex gap-4">
                    <span className="text-2xl font-black font-mono text-orange-600 shrink-0">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                      <p className="mt-2 text-base text-slate-600 leading-relaxed">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Pathways for Students & Organizations */}
      <section className="border-b border-slate-900/10 bg-[#FFFDF9] py-20 lg:py-28" aria-labelledby="home-audiences-title">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <h2 id="home-audiences-title" className="sr-only">
            SolveSprint pathways for students and organizations
          </h2>

          <div className="grid gap-12 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-900/15">
            {/* For Students */}
            <div className="lg:pr-10 pt-8 lg:pt-0">
              <span className="text-xs lg:text-sm font-semibold tracking-wider uppercase text-orange-600">For Students</span>
              <h3 className="mt-3 text-3xl font-bold text-slate-900">Build something real you can explain and present.</h3>
              <p className="mt-4 text-base lg:text-lg text-slate-600 leading-relaxed">
                Gather a team of high school classmates or sign up individually. Work on a real challenge, refine your pitch, and present live to judges.
              </p>
              <ul className="mt-6 space-y-3 text-base text-slate-700">
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-orange-500" /> Hands-on problem solving with team members
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-orange-500" /> Live pitch experience in front of professional judges
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-orange-500" /> Constructive feedback and team recognition
                </li>
              </ul>
              <div className="mt-8">
                <Link
                  href="/student"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-orange-600 px-6 py-3 text-[15px] font-semibold text-white transition-all hover:bg-orange-700 shadow-sm"
                >
                  Learn about student participation →
                </Link>
              </div>
            </div>

            {/* For Organizations */}
            <div className="lg:pl-10 pt-8 lg:pt-0">
              <span className="text-xs lg:text-sm font-semibold tracking-wider uppercase text-orange-600">For Host Organizations</span>
              <h3 className="mt-3 text-3xl font-bold text-slate-900">Propose a challenge to high school student teams.</h3>
              <p className="mt-4 text-base lg:text-lg text-slate-600 leading-relaxed">
                Bring a manageable operational or strategic question to SolveSprint. See fresh perspectives and support local youth innovation.
              </p>
              <ul className="mt-6 space-y-3 text-base text-slate-700">
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-orange-500" /> SolveSprint helps structure your idea into a student brief
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-orange-500" /> Manageable time commitment for host representatives
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-orange-500" /> Attend live presentations and provide constructive feedback
                </li>
              </ul>
              <div className="mt-8">
                <Link
                  href="/organization"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-slate-900/15 bg-white px-6 py-3 text-[15px] font-semibold text-slate-900 transition-all hover:bg-slate-50 shadow-sm"
                >
                  Learn about organization hosting →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Volunteer & Coordinator Summary */}
      <section className="border-b border-slate-900/10 py-16 lg:py-20" aria-labelledby="home-volunteers-title">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between border-l-4 border-orange-600 pl-6 lg:pl-10">
            <div className="max-w-3xl">
              <span className="text-xs lg:text-sm font-semibold tracking-wider uppercase text-orange-600">Community Involvement</span>
              <h2 id="home-volunteers-title" className="mt-2 text-3xl font-bold text-slate-900">
                Volunteers & Event Coordinators
              </h2>
              <p className="mt-3 text-base lg:text-lg text-slate-600 leading-relaxed">
                Successful in-person student events rely on dedicated volunteers for check-in, timekeeping, logistics, and presentation support, as well as coordinators for outreach and planning.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href="/volunteer"
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-[15px] font-semibold text-white transition-all hover:bg-slate-800 shadow-sm"
              >
                View volunteer & coordinator roles →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Event Day Experience */}
      <section className="border-b border-slate-900/10 py-20 lg:py-28" aria-labelledby="home-timeline-title">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <span className="text-xs lg:text-sm font-semibold tracking-wider uppercase text-orange-600">Event Day Timeline</span>
            <h2 id="home-timeline-title" className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
              What happens on competition day.
            </h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              SolveSprint is designed as a single-day, focused in-person experience balancing team work sessions with pitch presentations.
            </p>
          </div>

          <div className="mt-14 divide-y divide-slate-900/15">
            {eventTimeline.map((item, index) => (
              <div key={item.time} className="py-6 sm:flex sm:items-baseline sm:justify-between gap-8 first:pt-0 last:pb-0">
                <div className="sm:w-1/3 flex items-baseline gap-3">
                  <span className="text-sm font-mono font-bold text-orange-600">0{index + 1}</span>
                  <span className="text-base font-bold text-slate-900">{item.time}</span>
                </div>
                <div className="sm:w-2/3 mt-2 sm:mt-0">
                  <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-base text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Credibility & Founding Team */}
      <section className="border-b border-slate-900/10 bg-[#FFFDF9] py-20 lg:py-28" aria-labelledby="home-founders-title">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <span className="text-xs lg:text-sm font-semibold tracking-wider uppercase text-orange-600">Founding Team</span>
            <h2 id="home-founders-title" className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
              Started by high school students in North Carolina.
            </h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              SolveSprint was founded by high school students in North Carolina who experienced firsthand how difficult it is to find real, hands-on project experience before college.
            </p>
          </div>

          <div className="mt-14 grid gap-10 sm:grid-cols-2 max-w-4xl">
            {founders.map((founder) => (
              <div key={founder.name} className="flex flex-col items-start">
                <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-slate-200 border border-slate-900/10 shadow-sm">
                  <Image
                    src={founder.portrait}
                    alt={`Portrait of SolveSprint cofounder ${founder.name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-5 text-xl font-bold text-slate-900">{founder.name}</h3>
                <p className="mt-1 text-sm font-semibold text-orange-600">{founder.role}</p>
                <p className="mt-1 text-sm text-slate-500">Co-Founder & Event Lead</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Final Get Involved Choices */}
      <section className="py-20 lg:py-28 bg-[#101828] text-white" aria-labelledby="home-get-involved-title">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <span className="text-xs lg:text-sm font-semibold tracking-wider uppercase text-orange-400">Get Involved</span>
            <h2 id="home-get-involved-title" className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Choose your path to participate.
            </h2>
            <p className="mt-4 text-lg text-slate-300 leading-relaxed">
              Whether you want to solve a problem, propose a challenge, volunteer, or coordinate, select a pathway to register your interest.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {getInvolvedChoices.map((choice) => (
              <div key={choice.role} className="flex flex-col justify-between border-t border-white/20 pt-6">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-orange-400">
                    {choice.badge}
                  </span>
                  <h3 className="mt-2 text-2xl font-bold text-white">{choice.title}</h3>
                  <p className="mt-3 text-base text-slate-300 leading-relaxed">{choice.description}</p>
                </div>
                <div className="mt-8">
                  <Link
                    href={choice.href}
                    className="inline-flex min-h-[44px] items-center text-[15px] font-semibold text-orange-400 hover:text-orange-300 transition-colors"
                  >
                    {choice.cta} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
