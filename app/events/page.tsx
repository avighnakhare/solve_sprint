import Link from "next/link";
import { SunDisc } from "@/components/brand/SunDisc";
import { TopoPattern } from "@/components/brand/TopoPattern";
import { FAQItem } from "@/components/editorial/FAQItem";
import { SectionIntro } from "@/components/editorial/SectionIntro";
import { Badge, Card } from "@/components/ui";

export const metadata = {
  title: "Events & Sprints | SolveSprint™",
  description: "View upcoming SolveSprint challenge days, student sprint schedules, and event updates in Charlotte.",
};

export default function EventsPage() {
  const eventFaqs = [
    {
      q: "When will registration open for the next SolveSprint?",
      a: "We target October 2026 for our inaugural Charlotte-area SolveSprint. Student team registrations and volunteer sign-ups will open 6 to 8 weeks prior to the event date.",
    },
    {
      q: "How can my high school or organization participate?",
      a: "High schools can join our interest list to receive direct updates. Organizations interested in submitting a problem brief can visit our Organization page to get in touch.",
    },
    {
      q: "Are SolveSprint events free for high school students?",
      a: "Yes! All SolveSprint events are completely free for participating high school students, including workspace access, materials, and mentor support.",
    },
  ];

  const formatSteps = [
    {
      num: "01",
      title: "Morning Briefing",
      desc: "Local community organizations present real, age-appropriate problem statements directly to all participating teams.",
    },
    {
      num: "02",
      title: "Guided Ideation",
      desc: "Teams spend the day analyzing the problem, prototyping solutions, and refining pitch proposals with mentor feedback.",
    },
    {
      num: "03",
      title: "Live Showcase",
      desc: "Student teams present their solutions to community judges, receiving direct feedback and official recognition.",
    },
  ];

  return (
    <div className="w-full space-y-16 sm:space-y-24 pb-16">
      {/* ── HERO SECTION ── */}
      <section className="relative pt-12 sm:pt-16 pb-8 overflow-hidden bg-paper-light border-b border-line">
        <TopoPattern opacity={0.05} className="top-0 right-0 max-w-full" />
        <div className="site-container relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <p className="trail-label text-tangerine font-bold uppercase tracking-wider">
            EVENTS &amp; SPRINTS
          </p>

          <h1 className="display-hero text-ink">
            Upcoming Challenge Days
          </h1>

          <p className="body-large text-ink-muted max-w-2xl mx-auto">
            Stay tuned for live SolveSprint events, student challenge days, and community showcase dates in Charlotte.
          </p>
        </div>
      </section>

      {/* ── CURRENT EVENTS STATUS (NO ACTIVE EVENTS CARD) ── */}
      <section className="site-container">
        <div className="max-w-4xl mx-auto">
          <Card className="relative overflow-hidden bg-white p-8 sm:p-12 border-2 border-ink shadow-[6px_6px_0px_0px_#233047]">
            {/* Background Sun Disc graphic accent */}
            <div className="absolute -top-12 -right-12 z-0 opacity-40">
              <SunDisc color="sun" size={220} />
            </div>

            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-tangerine bg-peach px-3.5 py-1 text-xs font-bold text-ink uppercase tracking-wide">
                  <span className="w-2.5 h-2.5 rounded-full bg-tangerine animate-pulse" />
                  Charlotte Sprint in Planning
                </span>
              </div>

              <div className="space-y-3">
                <h2 className="display-section text-ink">
                  Currently, there are no active events.
                </h2>
                <p className="body-large text-ink-muted leading-relaxed">
                  We are actively organizing our inaugural Charlotte SolveSprint challenge day targeted for <strong className="text-ink font-bold">October 2026</strong>. Student team registrations, mentor applications, and organization challenge submissions will open closer to the launch date.
                </p>
              </div>

              {/* Informative highlight boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="rounded-[14px] border border-line bg-paper-light p-5 space-y-1.5">
                  <div className="flex items-center gap-2 text-ink font-bold font-body text-base">
                    <span className="w-2.5 h-2.5 rounded-full bg-tangerine" />
                    Target Launch
                  </div>
                  <p className="text-sm text-ink-muted font-body">
                    October 2026 in the Charlotte Metropolitan Area.
                  </p>
                </div>

                <div className="rounded-[14px] border border-line bg-paper-light p-5 space-y-1.5">
                  <div className="flex items-center gap-2 text-ink font-bold font-body text-base">
                    <span className="w-2.5 h-2.5 rounded-full bg-sun" />
                    Open Registrations
                  </div>
                  <p className="text-sm text-ink-muted font-body">
                    Will open 6 to 8 weeks prior to the event day.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 border-t border-line">
                <Link
                  href="/get-involved"
                  className="inline-flex items-center justify-center min-h-[56px] rounded-[14px] border-2 border-ink bg-tangerine px-8 py-3.5 font-body font-extrabold text-[17px] text-ink shadow-[4px_4px_0px_0px_#233047] hover:-translate-y-0.5 hover:bg-sun hover:shadow-[6px_6px_0px_0px_#233047] transition-all w-full sm:w-auto"
                >
                  Join the interest list
                </Link>
                <Link
                  href="/organization"
                  className="inline-flex items-center justify-center min-h-[56px] rounded-[14px] border-2 border-ink bg-paper-light px-8 py-3.5 font-body font-extrabold text-[17px] text-ink shadow-[4px_4px_0px_0px_#F47731] hover:-translate-y-0.5 hover:bg-sun/30 hover:shadow-[6px_6px_0px_0px_#F47731] transition-all w-full sm:w-auto"
                >
                  Bring us a challenge
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* ── EVENT DAY FORMAT PREVIEW ── */}
      <section className="site-container">
        <div className="space-y-10">
          <SectionIntro
            label="WHAT TO EXPECT"
            heading="The SolveSprint Event Experience"
            supporting="Here is what a typical one-day challenge event looks like for participants."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {formatSteps.map((step) => (
              <Card
                key={step.num}
                className="bg-white p-7 sm:p-8 space-y-4 border-2 border-ink shadow-[4px_4px_0px_0px_#233047] hover:-translate-y-1 transition-transform"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-bold text-tangerine">
                    {step.num}
                  </span>
                  <Badge tone="orange">1-Day Event</Badge>
                </div>
                <h3 className="heading-sub text-ink font-bold">
                  {step.title}
                </h3>
                <p className="body-regular text-ink-muted">
                  {step.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── STAY NOTIFIED CTA BOX ── */}
      <section className="site-container">
        <div className="rounded-[24px] border-2 border-ink bg-sun text-ink p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6 shadow-[6px_6px_0px_0px_#233047]">
          <h2 className="display-section text-ink">
            Want to be notified when event dates drop?
          </h2>
          <p className="body-large text-ink max-w-2xl mx-auto">
            Join our interest list to receive early announcements, venue locations, and registration notices directly in your inbox.
          </p>
          <div className="pt-2">
            <Link
              href="/get-involved"
              className="inline-flex items-center justify-center min-h-[58px] rounded-[14px] border-2 border-ink bg-tangerine px-9 py-3.5 font-body font-extrabold text-[18px] text-ink shadow-[4px_4px_0px_0px_#233047] hover:-translate-y-0.5 hover:bg-white hover:shadow-[6px_6px_0px_0px_#233047] transition-all"
            >
              Get notified first
            </Link>
          </div>
        </div>
      </section>

      {/* ── FREQUENTLY ASKED QUESTIONS ── */}
      <section className="site-container">
        <div className="max-w-3xl mx-auto space-y-8">
          <SectionIntro
            label="EVENT FAQ"
            heading="Event Questions & Answers"
            supporting="Got questions about how SolveSprint events work?"
            align="center"
          />

          <div className="space-y-4">
            {eventFaqs.map((faq, idx) => (
              <FAQItem key={idx} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
