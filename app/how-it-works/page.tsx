import Link from "next/link";
import { TopoPattern } from "@/components/brand/TopoPattern";
import { TrailMarker } from "@/components/brand/TrailMarker";
import { TrailPath } from "@/components/brand/TrailPath";
import { FAQItem } from "@/components/editorial/FAQItem";
import { PhotoFrame } from "@/components/editorial/PhotoFrame";
import { SectionIntro } from "@/components/editorial/SectionIntro";
import { APPROVED_IMAGES } from "@/components/media/approved-media";

export const metadata = {
  title: "How It Works | SolveSprint™",
  description: "A clear path from problem to presentation. Learn how a SolveSprint challenge day works for students, organizations, and volunteers.",
};

export default function HowItWorksPage() {
  const steps = [
    {
      num: "01",
      title: "Receive the Challenge Brief",
      desc: "At the start of the event day, local organization leaders present real, age-appropriate problem statements directly to all participating student teams.",
    },
    {
      num: "02",
      title: "Team Formation & Brainstorming",
      desc: "Students work in small teams (typically 2 to 4 students). Volunteers and mentors are available in the room to help clarify questions and guide ideation.",
    },
    {
      num: "03",
      title: "Prototype & Solution Shaping",
      desc: "Teams organize their thoughts into a concrete proposal, pitch outline, or basic visual prototype using provided materials and workspace tools.",
    },
    {
      num: "04",
      title: "Live Student Presentations",
      desc: "Each team presents their concept to a panel of community judges, mentor advisors, and organization representatives in a supportive atmosphere.",
    },
    {
      num: "05",
      title: "Feedback & Recognition",
      desc: "Teams receive structured feedback, certificate recognition, and actionable advice on how their project ideas could be carried forward.",
    },
  ];

  const faqs = [
    {
      q: "Do students need to prepare anything before the event?",
      a: "No prior preparation is required. Challenge briefs are introduced at the start of the event day, giving all participants an equal starting point.",
    },
    {
      q: "What is the typical team size?",
      a: "Teams are usually made up of 2 to 4 high school students. You can sign up with friends or be placed with a team on event morning.",
    },
    {
      q: "How long does a SolveSprint event last?",
      a: "Specific event schedules vary by location, but most challenge days run for approximately 4 to 6 hours, including brief release, building time, presentations, and lunch.",
    },
    {
      q: "Are there entry fees or costs to attend?",
      a: "No. SolveSprint events are free for high school students.",
    },
  ];

  return (
    <div className="w-full space-y-20 sm:space-y-28 py-12">
      {/* ── HERO ── */}
      <section className="site-container relative pt-12 sm:pt-16">
        <TopoPattern opacity={0.05} />
        <div className="max-w-3xl space-y-6">
          <p className="trail-label text-tangerine font-bold">
            EVENT FORMAT &amp; TIMELINE
          </p>
          <h1 className="display-hero text-ink">
            A clear path from problem to presentation.
          </h1>
          <p className="body-large text-ink-muted">
            SolveSprint challenge days are structured to give high school students a focused, hands-on experience without confusion or unrealistic pressure.
          </p>
        </div>
      </section>

      {/* ── 5-STEP VERTICAL ROUTE ── */}
      <section className="site-container space-y-12">
        <SectionIntro
          label="THE 5-STEP TRAIL"
          heading="What happens on event day"
        />

        <div className="relative pl-4 sm:pl-8 space-y-10 sm:space-y-12">
          {/* Vertical Trail SVG line */}
          <div className="absolute left-7 top-4 bottom-4 w-1 hidden sm:block pointer-events-none">
            <TrailPath variant="vertical" strokeWidth={5} />
          </div>

          {steps.map((step) => (
            <div key={step.num} className="relative flex flex-col sm:flex-row items-start gap-4 sm:gap-8 bg-white border-2 border-ink rounded-[20px] p-6 sm:p-8 shadow-[4px_4px_0px_0px_#233047] hover:-translate-y-1 transition-all">
              <TrailMarker number={step.num} size="lg" />
              <div className="space-y-2">
                <h3 className="heading-support text-ink">{step.title}</h3>
                <p className="body-standard text-ink-muted">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHAT STUDENTS RECEIVE BEFORE & DURING ── */}
      <section className="site-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Before */}
          <div className="rounded-[28px] border-2 border-ink bg-[#E2F1F5] p-8 sm:p-10 space-y-4 shadow-[5px_5px_0px_0px_#233047]">
            <span className="inline-block px-3 py-1 rounded-[8px] border-2 border-ink bg-white font-mono text-xs font-bold text-ink uppercase tracking-wider shadow-[2px_2px_0px_0px_#233047]">
              BEFORE THE EVENT
            </span>
            <h3 className="heading-support text-ink">What you receive</h3>
            <ul className="space-y-3 body-standard text-ink font-medium">
              <li className="flex items-start gap-2">
                <span className="text-tangerine font-bold">•</span>
                <span>Early event schedule and venue arrival details</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-tangerine font-bold">•</span>
                <span>Team registration confirmation or matching options</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-tangerine font-bold">•</span>
                <span>Participant checklist and Code of Conduct</span>
              </li>
            </ul>
          </div>

          {/* During */}
          <div className="rounded-[28px] border-2 border-ink bg-[#FDECE2] p-8 sm:p-10 space-y-4 shadow-[5px_5px_0px_0px_#233047]">
            <span className="inline-block px-3 py-1 rounded-[8px] border-2 border-ink bg-white font-mono text-xs font-bold text-ink uppercase tracking-wider shadow-[2px_2px_0px_0px_#233047]">
              DURING THE EVENT
            </span>
            <h3 className="heading-support text-ink">What is provided</h3>
            <ul className="space-y-3 body-standard text-ink font-medium">
              <li className="flex items-start gap-2">
                <span className="text-tangerine font-bold">•</span>
                <span>Dedicated workspace, paper, markers, and digital resources</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-tangerine font-bold">•</span>
                <span>Access to volunteer mentors and organization representatives</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-tangerine font-bold">•</span>
                <span>Snacks, refreshments, and presentation stage time</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── PHOTO FEATURE ── */}
      <section className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-[28px] border-2 border-ink bg-[#FFF6DB] p-8 sm:p-12 shadow-[6px_6px_0px_0px_#F47731]">
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-block px-3 py-1 rounded-[8px] border-2 border-ink bg-white font-mono text-xs font-bold text-ink uppercase tracking-wider shadow-[2px_2px_0px_0px_#233047]">
              ORGANIZATIONS &amp; VOLUNTEERS
            </span>
            <h2 className="display-section text-ink">Guidance without micro-management.</h2>
            <p className="body-large text-ink font-medium">
              Adults in the room serve as sounding boards and logistics supporters. Students retain full ownership of their ideas and presentations.
            </p>
          </div>
          <div className="lg:col-span-6">
            <PhotoFrame
              image={APPROVED_IMAGES["live-presentation"]}
              aspect="landscape"
              caption
              captionText="PRESENTATION STAGE IN ACTION"
            />
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="site-container max-w-3xl space-y-8">
        <SectionIntro
          label="FREQUENTLY ASKED QUESTIONS"
          heading="Common questions about the day"
        />

        <div className="border-t-2 border-ink">
          {faqs.map((faq) => (
            <FAQItem key={faq.q} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </section>

      {/* ── GET INVOLVED CTA ── */}
      <section className="site-container">
        <div className="rounded-[28px] border-2 border-ink bg-ink text-paper p-10 sm:p-16 text-center space-y-6 shadow-[8px_8px_0px_0px_#F47731]">
          <h2 className="display-section text-paper">Ready to experience a challenge day?</h2>
          <p className="body-large text-paper-light/90 max-w-xl mx-auto">
            Submit your interest to receive notification as soon as the first event date and location are confirmed.
          </p>
          <div>
            <Link
              href="/get-involved"
              className="inline-flex items-center justify-center min-h-[58px] min-w-[156px] rounded-[14px] border-2 border-ink bg-sun px-8 py-3.5 font-body font-bold text-[17px] leading-[1.1] text-ink shadow-[3px_3px_0px_0px_#233047] hover:-translate-y-0.5 hover:bg-tangerine hover:shadow-[5px_5px_0px_0px_#233047] active:translate-y-0.5 transition-all w-full sm:w-auto"
            >
              Get involved
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
