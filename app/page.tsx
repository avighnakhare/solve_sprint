import Link from "next/link";
import { SunDisc } from "@/components/brand/SunDisc";
import { TopoPattern } from "@/components/brand/TopoPattern";
import { TrailMarker } from "@/components/brand/TrailMarker";
import { TrailPath } from "@/components/brand/TrailPath";
import { TrophySketch } from "@/components/brand/TrophySketch";
import { EventStatus } from "@/components/editorial/EventStatus";
import { ParticipationRow } from "@/components/editorial/ParticipationRow";
import { PhotoFrame } from "@/components/editorial/PhotoFrame";
import { SectionIntro } from "@/components/editorial/SectionIntro";
import { APPROVED_IMAGES } from "@/components/media/approved-media";

export default function HomePage() {
  return (
    <div className="w-full space-y-20 sm:space-y-32 pb-16">
      {/* ── SECTION 1: HERO ── */}
      <section className="relative min-h-[680px] pt-10 sm:pt-16 pb-16 overflow-hidden">
        <div className="site-container relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Copy: 6 cols lg for generous text & button width */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7">
            <p className="trail-label text-tangerine font-bold">
              A LOCAL CHALLENGE DAY FOR HIGH SCHOOL STUDENTS
            </p>

            <h1 className="display-hero text-ink">
              Bring a friend. Pick a problem. Build something real.
            </h1>

            <p className="body-large text-ink-muted">
              SolveSprint brings students and local organizations into the same room. Teams take on a real brief, shape an idea, and present what they made.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 pt-2">
              <Link
                href="/get-involved"
                className="inline-flex items-center justify-center min-h-[64px] rounded-[16px] border-2 border-ink bg-tangerine px-8 sm:px-9 py-4 font-body font-extrabold text-[18px] sm:text-[19px] leading-tight text-ink shadow-[5px_5px_0px_0px_#233047] hover:-translate-y-1 hover:bg-sun hover:shadow-[7px_7px_0px_0px_#233047] active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#233047] transition-all w-full sm:w-auto"
              >
                Join the interest list
              </Link>
              <Link
                href="/organization"
                className="inline-flex items-center justify-center min-h-[64px] rounded-[16px] border-2 border-ink bg-paper-light px-8 sm:px-9 py-4 font-body font-extrabold text-[18px] sm:text-[19px] leading-tight text-ink shadow-[5px_5px_0px_0px_#F47731] hover:-translate-y-1 hover:bg-sun/30 hover:shadow-[7px_7px_0px_0px_#F47731] active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#F47731] transition-all w-full sm:w-auto"
              >
                Bring us a challenge
              </Link>
            </div>

            <div className="pt-1">
              <p className="trail-label text-ink-muted">
                First Charlotte-area event in planning. Targeting October 2026.
              </p>
            </div>
          </div>

          {/* Right Visual: 6 cols lg for clean balanced SVG visual */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Topo Pattern behind visual */}
            <TopoPattern opacity={0.06} className="right-0 top-0 max-w-full" />

            {/* Sun Disc */}
            <div className="absolute -top-10 -right-10 z-0">
              <SunDisc color="sun" size={240} />
            </div>

            {/* Trail Path */}
            <div className="absolute -left-12 bottom-12 z-10 hidden sm:block w-72">
              <TrailPath variant="hero" strokeWidth={6} />
            </div>

            {/* Colorful Trophy Sketch Component */}
            <div className="relative z-10 w-full flex items-center justify-center">
              <TrophySketch />
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: EMOTIONAL RESET ── */}
      <section className="site-container">
        <div className="rounded-[24px] border-2 border-ink bg-sun text-ink p-8 sm:p-14 text-center max-w-4xl mx-auto space-y-4 shadow-[6px_6px_0px_0px_#233047]">
          <h2 className="display-section text-ink">
            You do not need a perfect idea to start.
          </h2>
          <p className="body-large text-ink font-semibold max-w-2xl mx-auto">
            Come curious. Bring a teammate, join one, or simply tell us you are interested.
          </p>
        </div>
      </section>

      {/* ── SECTION 3: THE EVENT TRAIL ── */}
      <section className="site-container space-y-12">
        <SectionIntro
          label="THE DAY, WITHOUT THE MYSTERY"
          heading="How a SolveSprint day flows"
          supporting="Every event may have different rules, but the basic rhythm stays simple."
        />

        {/* 4 Open Route Stops connected by trail line */}
        <div className="relative space-y-12 sm:space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {/* Stop 1 */}
            <div className="bg-white border-2 border-ink rounded-[20px] p-6 sm:p-8 space-y-4 shadow-[4px_4px_0px_0px_#F47731] hover:-translate-y-1 transition-all">
              <div className="flex items-center justify-between">
                <TrailMarker number="01" label="STAGE 1" size="md" />
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-[6px] bg-sun border border-ink shadow-[1px_1px_0px_0px_#233047]">
                  BRIEF RELEASE
                </span>
              </div>
              <h3 className="heading-support text-ink">Get the brief</h3>
              <p className="body-standard text-ink-muted">
                A local organization explains a real problem in plain language.
              </p>
            </div>

            {/* Stop 2 */}
            <div className="bg-white border-2 border-ink rounded-[20px] p-6 sm:p-8 space-y-4 shadow-[4px_4px_0px_0px_#233047] hover:-translate-y-1 transition-all">
              <div className="flex items-center justify-between">
                <TrailMarker number="02" label="STAGE 2" size="md" />
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-[6px] bg-lake border border-ink shadow-[1px_1px_0px_0px_#233047]">
                  IDEATION &amp; WORK
                </span>
              </div>
              <h3 className="heading-support text-ink">Build with your team</h3>
              <p className="body-standard text-ink-muted">
                Ask questions, choose a direction, and turn your thinking into something presentable.
              </p>
            </div>

            {/* Stop 3 */}
            <div className="bg-white border-2 border-ink rounded-[20px] p-6 sm:p-8 space-y-4 shadow-[4px_4px_0px_0px_#233047] hover:-translate-y-1 transition-all">
              <div className="flex items-center justify-between">
                <TrailMarker number="03" label="STAGE 3" size="md" />
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-[6px] bg-peach border border-ink shadow-[1px_1px_0px_0px_#233047]">
                  PITCH STAGE
                </span>
              </div>
              <h3 className="heading-support text-ink">Share what you made</h3>
              <p className="body-standard text-ink-muted">
                Walk judges and organization representatives through your idea.
              </p>
            </div>

            {/* Stop 4 */}
            <div className="bg-white border-2 border-ink rounded-[20px] p-6 sm:p-8 space-y-4 shadow-[4px_4px_0px_0px_#78A86B] hover:-translate-y-1 transition-all">
              <div className="flex items-center justify-between">
                <TrailMarker number="04" label="STAGE 4" size="md" />
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-[6px] bg-leaf border border-ink text-white shadow-[1px_1px_0px_0px_#233047]">
                  NEXT STEPS
                </span>
              </div>
              <h3 className="heading-support text-ink">Leave with feedback</h3>
              <p className="body-standard text-ink-muted">
                Hear what worked, what could improve, and what your team can do next.
              </p>
            </div>
          </div>

          <div className="pt-4">
            <TrailPath variant="horizontal" strokeWidth={5} />
          </div>
        </div>
      </section>

      {/* ── SECTION 4: STUDENT STORY ── */}
      <section className="site-container">
        <div className="rounded-[28px] border-2 border-ink bg-[#E2F1F5] p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-[6px_6px_0px_0px_#233047]">
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-block px-3 py-1 rounded-[8px] border-2 border-ink bg-white font-mono text-xs font-bold text-ink uppercase tracking-wider shadow-[2px_2px_0px_0px_#233047]">
              FOR HIGH SCHOOL STUDENTS
            </span>
            <h2 className="display-section text-ink">
              Built for students who want to try.
            </h2>
            <p className="body-large text-ink font-medium">
              You do not need competition experience or a finished project. SolveSprint gives your team a clear problem, a place to work, and a reason to finish.
            </p>
            <div>
              <Link
                href="/student"
                className="inline-flex items-center gap-2 font-body font-bold text-ink hover:text-tangerine transition-colors group"
              >
                <span>See the student experience</span>
                <span className="arrow-hover inline-block" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <PhotoFrame
              image={APPROVED_IMAGES["classroom-hands-on"]}
              aspect="wide"
              caption
              captionText="HANDS-ON CLASSROOM COLLABORATION"
            />
          </div>
        </div>
      </section>

      {/* ── SECTION 5: ORGANIZATION STORY ── */}
      <section className="site-container">
        <div className="rounded-[28px] border-2 border-ink bg-[#FFF6DB] p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-[6px_6px_0px_0px_#F47731]">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <PhotoFrame
              image={APPROVED_IMAGES["organization-whiteboard"]}
              aspect="portrait"
              caption
              captionText="ORGANIZATION PLANNING MEETING"
            />
          </div>

          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <span className="inline-block px-3 py-1 rounded-[8px] border-2 border-ink bg-white font-mono text-xs font-bold text-ink uppercase tracking-wider shadow-[2px_2px_0px_0px_#233047]">
              FOR LOCAL ORGANIZATIONS
            </span>
            <h2 className="display-section text-ink">
              A useful outside perspective.
            </h2>
            <p className="body-large text-ink font-medium">
              Organizations bring a focused problem that students can understand and explore safely. SolveSprint helps shape the brief before students see it.
            </p>
            <div>
              <Link
                href="/organization"
                className="inline-flex items-center gap-2 font-body font-bold text-ink hover:text-tangerine transition-colors group"
              >
                <span>Bring a challenge</span>
                <span className="arrow-hover inline-block" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: EVENT-DAY STORY ── */}
      <section className="site-container">
        <div className="rounded-[28px] border-2 border-ink bg-[#FDECE2] p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-[6px_6px_0px_0px_#233047]">
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-block px-3 py-1 rounded-[8px] border-2 border-ink bg-white font-mono text-xs font-bold text-ink uppercase tracking-wider shadow-[2px_2px_0px_0px_#233047]">
              IN-PERSON ATMOSPHERE
            </span>
            <h2 className="display-section text-ink">
              The room matters.
            </h2>
            <p className="body-large text-ink font-medium">
              Students build together, ask real questions, and share their work face to face. The event should feel focused without feeling intimidating.
            </p>
            <div>
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 font-body font-bold text-ink hover:text-tangerine transition-colors group"
              >
                <span>See how the day works</span>
                <span className="arrow-hover inline-block" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <PhotoFrame
              image={APPROVED_IMAGES["live-presentation"]}
              aspect="landscape"
              caption
              captionText="LIVE PRESENTATION DAY"
            />
          </div>
        </div>
      </section>

      {/* ── SECTION 7: WHAT STUDENTS LEAVE WITH ── */}
      <section className="site-container space-y-12">
        <SectionIntro
          label="OUTCOMES"
          heading="Something finished. Something learned."
          supporting="No inflated promises—just real practice and concrete takeaways."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-[18px] border-2 border-ink bg-white p-6 flex items-start gap-4 shadow-[3px_3px_0px_0px_#233047]">
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-[6px] bg-tangerine text-ink border border-ink">01</span>
            <p className="body-standard font-bold text-ink">
              A developed idea your team can explain
            </p>
          </div>
          <div className="rounded-[18px] border-2 border-ink bg-white p-6 flex items-start gap-4 shadow-[3px_3px_0px_0px_#233047]">
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-[6px] bg-sun text-ink border border-ink">02</span>
            <p className="body-standard font-bold text-ink">
              Feedback from adults who understand the problem
            </p>
          </div>
          <div className="rounded-[18px] border-2 border-ink bg-white p-6 flex items-start gap-4 shadow-[3px_3px_0px_0px_#233047]">
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-[6px] bg-lake text-ink border border-ink">03</span>
            <p className="body-standard font-bold text-ink">
              Practice working through uncertainty with other students
            </p>
          </div>
          <div className="rounded-[18px] border-2 border-ink bg-white p-6 flex items-start gap-4 shadow-[3px_3px_0px_0px_#233047]">
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-[6px] bg-leaf text-white border border-ink">04</span>
            <p className="body-standard font-bold text-ink">
              A clearer sense of what you want to build next
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 8: WAYS TO JOIN ── */}
      <section className="site-container space-y-8">
        <SectionIntro
          label="PARTICIPATION"
          heading="Choose your path"
        />

        <div className="border-t-2 border-ink">
          <ParticipationRow
            role="Students"
            description="Come with a team or join one on event day."
            href="/student"
            linkLabel="Student overview"
          />
          <ParticipationRow
            role="Organizations"
            description="Bring a problem worth exploring."
            href="/organization"
            linkLabel="Submit a proposal"
          />
          <ParticipationRow
            role="Volunteers"
            description="Help students and keep the day moving smoothly."
            href="/volunteer"
            linkLabel="Volunteer roles"
          />
          <ParticipationRow
            role="Coordinators"
            description="Help bring students into the room and organize outreach."
            href="/get-involved"
            linkLabel="Coordinator application"
          />
        </div>
      </section>

      {/* ── SECTION 9: HONEST EVENT STATUS ── */}
      <section className="site-container">
        <EventStatus />
      </section>

      {/* ── SECTION 10: FINAL INVITATION ── */}
      <section className="site-container">
        <div className="rounded-[28px] border-2 border-ink bg-ink text-paper p-10 sm:p-16 text-center space-y-6 relative overflow-hidden shadow-[8px_8px_0px_0px_#F47731]">
          <TopoPattern opacity={0.08} />

          <h2 className="display-section text-paper relative z-10">
            There is a place for you in the room.
          </h2>

          <p className="body-large text-paper-light/90 max-w-xl mx-auto relative z-10">
            Whether you want to solve a challenge, mentor a team, or bring a problem from your organization, we welcome your interest.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 relative z-10">
            <Link
              href="/get-involved"
              className="inline-flex items-center justify-center min-h-[58px] min-w-[156px] rounded-[14px] border-2 border-ink bg-sun px-8 py-3.5 font-body font-bold text-[17px] leading-[1.1] text-ink shadow-[3px_3px_0px_0px_#233047] hover:-translate-y-0.5 hover:bg-tangerine hover:shadow-[5px_5px_0px_0px_#233047] active:translate-y-0.5 transition-all w-full sm:w-auto"
            >
              Get involved
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 font-body font-bold text-paper hover:text-sun transition-colors py-2"
            >
              <span>Read how it works</span>
              <span className="arrow-hover inline-block" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
