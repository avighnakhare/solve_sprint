import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About SolveSprint™ | Student Innovation Events",
  description:
    "SolveSprint was started by three North Carolina high school students to bridge the gap between classroom learning and real-world problem solving through in-person student innovation events."
};

const processSteps = [
  {
    number: "01",
    title: "A host organization brings a real problem",
    description:
      "A local business, startup, nonprofit, or community group turns a real operational or strategic need into a focused challenge prompt."
  },
  {
    number: "02",
    title: "Student teams register & review the brief",
    description:
      "High school students form teams around shared interests, review prompt requirements, and prepare for event day."
  },
  {
    number: "03",
    title: "Teams collaborate during event day",
    description:
      "Students spend event day brainstorming, developing solutions, and building pitch presentation decks."
  },
  {
    number: "04",
    title: "Live presentations & professional feedback",
    description:
      "Teams pitch their solutions to a panel of judges and organization representatives, receiving direct feedback and category recognition."
  }
] as const;

const founders = [
  {
    name: "Avighna Khare",
    school: "Incoming NCSSM student • Previously attended William Amos Hough High School",
    bio: "Avighna helped start SolveSprint™ after seeing how difficult it can be for students to find projects connected to real people and real problems. He wanted students to leave a challenge with something finished, useful, and worth showing.",
    portrait: "/images/about/avighna-khare.png",
    alt: "Portrait of SolveSprint™ cofounder Avighna Khare"
  },
  {
    name: "Kavish Shah",
    school: "Incoming NCSSM student • Olympic High School",
    bio: "Kavish is part of the founding team building the experience around how students discover challenges, work with teammates, and move from an early idea to a complete in-person presentation.",
    portrait: "/images/about/kavish-shah.png",
    alt: "Portrait of SolveSprint™ cofounder Kavish Shah"
  }
] as const;

export default function AboutPage() {
  return (
    <div className="bg-[#FFF9F0] min-h-screen text-slate-900">
      {/* 1. Hero */}
      <section className="relative border-b border-slate-900/10 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <span className="text-xs lg:text-sm font-semibold tracking-wider uppercase text-orange-600">ABOUT SOLVESPRINT™</span>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              We wanted student work to feel real.
            </h1>
            <p className="mt-6 text-lg lg:text-xl text-slate-600 leading-relaxed">
              Students are constantly told to build experience, but finding a real problem, a committed team, and someone willing to take the work seriously is much harder. SolveSprint™ started because we wanted that process to be clearer and anchored in real, in-person collaboration.
            </p>
            <p className="mt-4 text-base lg:text-lg text-slate-600 leading-relaxed">
              Local businesses and community organizations bring focused challenges. High school student teams choose a prompt, build a solution during event day, and pitch live to earn direct feedback and recognition from industry professionals.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/get-involved" className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-orange-600 px-6 py-3 text-[15px] font-semibold text-white transition-all hover:bg-orange-700 shadow-sm">
                Get Involved
              </Link>
              <Link href="/how-it-works" className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-slate-900/15 bg-white px-6 py-3 text-[15px] font-semibold text-slate-900 transition-all hover:bg-slate-50 shadow-sm">
                See how it works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Why SolveSprint Exists */}
      <section className="py-20 lg:py-28 border-b border-slate-900/10 bg-[#FFFDF9]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <span className="text-xs lg:text-sm font-semibold tracking-wider uppercase text-orange-600">WHY WE STARTED</span>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
                Bridging classroom learning & real-world problems.
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-6 text-base lg:text-lg text-slate-600 leading-relaxed">
              <p>
                A lot of student projects end when the class or competition finishes. Even when the work is good, students do not always have a real audience, useful professional feedback, or a finished result they can carry forward.
              </p>
              <p>
                At the same time, companies, startups, and community groups have operational questions that students are excited to explore. The hard part is turning those questions into structured briefs that are focused enough for high school teams to tackle.
              </p>
              <p>
                SolveSprint brings both sides together in an in-person event format. The goal is simple: give students serious experience they can present with confidence, and give host organizations structured ideas from young people.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Competition Model */}
      <section className="py-20 lg:py-28 border-b border-slate-900/10">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <span className="text-xs lg:text-sm font-semibold tracking-wider uppercase text-orange-600">THE EVENT MODEL</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
              One clear sequence from brief to presentation.
            </h2>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <div key={step.number} className="border-l-2 border-orange-500 pl-6">
                <span className="text-sm font-mono font-bold text-orange-600">{step.number}</span>
                <h3 className="mt-2 text-xl font-bold text-slate-900">{step.title}</h3>
                <p className="mt-3 text-base text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Founding Team Profiles */}
      <section className="py-20 lg:py-28 border-b border-slate-900/10 bg-[#FFFDF9]" id="contact">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <span className="text-xs lg:text-sm font-semibold tracking-wider uppercase text-orange-600">FOUNDING TEAM</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
              Built by students for the work students want to do.
            </h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              SolveSprint was started by North Carolina students who wanted a better way to move from an idea to a real, finished project.
            </p>
          </div>

          <div className="mt-14 grid gap-10 sm:grid-cols-2 max-w-4xl">
            {founders.map((founder) => (
              <div key={founder.name} className="flex flex-col items-start">
                <div className="relative h-72 w-full overflow-hidden rounded-2xl bg-slate-200 border border-slate-900/10 shadow-sm">
                  <Image
                    src={founder.portrait}
                    alt={founder.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-5 text-xl font-bold text-slate-900">{founder.name}</h3>
                <p className="mt-1 text-sm font-semibold text-orange-600">{founder.school}</p>
                <p className="mt-3 text-base text-slate-600 leading-relaxed">{founder.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Stage of Development & Next Steps */}
      <section className="py-20 lg:py-28 bg-[#101828] text-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <span className="text-xs lg:text-sm font-semibold tracking-wider uppercase text-orange-400">DEVELOPMENT STAGE</span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Building a trusted local competition model.
            </h2>
            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed">
              SolveSprint is currently preparing our upcoming in-person student innovation events. The goal is to establish a dependable local competition where completed student work, constructive evaluation, and real presentation experience give high school students a strong foundation for future academic and career goals.
            </p>

            <div className="mt-10">
              <Link href="/get-involved" className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-orange-600 px-6 py-3 text-[15px] font-semibold text-white transition-all hover:bg-orange-700 shadow-sm">
                Register Your Interest →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
