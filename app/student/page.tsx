import Link from "next/link";
import { TopoPattern } from "@/components/brand/TopoPattern";
import { TrailMarker } from "@/components/brand/TrailMarker";
import { FAQItem } from "@/components/editorial/FAQItem";
import { PhotoFrame } from "@/components/editorial/PhotoFrame";
import { SectionIntro } from "@/components/editorial/SectionIntro";
import { APPROVED_IMAGES } from "@/components/media/approved-media";
import { FORM_CONFIGS } from "@/lib/site-config";

export const metadata = {
  title: "For Students | SolveSprint™",
  description: "You bring the curiosity. We will give you a problem worth solving. Learn how high school students participate in SolveSprint events.",
};

export default function ForStudentsPage() {
  const studentForm = FORM_CONFIGS.student;

  const faqs = [
    {
      q: "Who can participate in SolveSprint?",
      a: "SolveSprint is designed for high school students (ages 13 to 18). No previous competition, coding, or business experience is required.",
    },
    {
      q: "What if I don't have a team yet?",
      a: "You can sign up individually or with friends. If you don't have a team, we will pair you with other students on the morning of the event.",
    },
    {
      q: "Does participation guarantee awards or scholarships?",
      a: "No. SolveSprint focuses on real-world learning, teamwork, and constructive feedback from community leaders rather than guaranteed trophies or admissions claims.",
    },
    {
      q: "How much does it cost?",
      a: "SolveSprint events are completely free for student participants.",
    },
  ];

  return (
    <div className="w-full space-y-20 sm:space-y-28 py-12">
      {/* ── HERO ── */}
      <section className="site-container relative pt-12 sm:pt-16">
        <TopoPattern opacity={0.05} />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <p className="trail-label text-tangerine font-bold">FOR HIGH SCHOOL STUDENTS</p>
            <h1 className="display-hero text-ink">
              You bring the curiosity. We will give you a problem worth solving.
            </h1>
            <p className="body-large text-ink-muted">
              SolveSprint is an in-person challenge day where you team up, tackle a real brief from a local organization, and present your ideas.
            </p>

            {/* Reassurance Callout */}
            <div className="rounded-[20px] border-2 border-ink bg-[#E2F1F5] p-6 space-y-3 shadow-[4px_4px_0px_0px_#233047]">
              <span className="inline-block px-2.5 py-1 rounded-[6px] border border-ink bg-white font-mono text-xs font-bold text-ink uppercase tracking-wider">
                GOOD TO KNOW
              </span>
              <ul className="space-y-2 body-standard text-ink font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-tangerine font-bold">•</span>
                  <span>No previous competition experience is required.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-tangerine font-bold">•</span>
                  <span>Students may express interest before having a full team.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-tangerine font-bold">•</span>
                  <span>Event-specific eligibility, team size, and deliverables will be posted with official event announcements.</span>
                </li>
              </ul>
            </div>

            <div className="pt-2">
              {studentForm.url ? (
                <a
                  href={studentForm.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center min-h-[58px] min-w-[156px] rounded-[14px] border-2 border-ink bg-tangerine px-8 py-3.5 font-body font-bold text-[17px] leading-[1.1] text-ink shadow-[3px_3px_0px_0px_#233047] hover:-translate-y-0.5 hover:bg-sun hover:shadow-[5px_5px_0px_0px_#233047] active:translate-y-0.5 transition-all w-full sm:w-auto"
                >
                  {studentForm.buttonText}
                </a>
              ) : (
                <Link
                  href="/get-involved"
                  className="inline-flex items-center justify-center min-h-[58px] min-w-[156px] rounded-[14px] border-2 border-ink bg-tangerine px-8 py-3.5 font-body font-bold text-[17px] leading-[1.1] text-ink shadow-[3px_3px_0px_0px_#233047] hover:-translate-y-0.5 hover:bg-sun hover:shadow-[5px_5px_0px_0px_#233047] active:translate-y-0.5 transition-all w-full sm:w-auto"
                >
                  Join the student interest list
                </Link>
              )}
            </div>
          </div>

          <div className="lg:col-span-5">
            <PhotoFrame
              image={APPROVED_IMAGES["students-collaborating"]}
              aspect="portrait"
              priority
              caption
              captionText="STUDENT TEAM COLLABORATION"
            />
          </div>
        </div>
      </section>

      {/* ── WHAT PARTICIPATION FEELS LIKE ── */}
      <section className="site-container space-y-12">
        <SectionIntro
          label="THE EXPERIENCE"
          heading="What participation feels like"
          supporting="An environment built for focus, collaboration, and practical problem solving."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-[20px] bg-white border-2 border-ink p-8 space-y-4 shadow-[4px_4px_0px_0px_#F47731] hover:-translate-y-1 transition-all">
            <TrailMarker number="01" size="sm" />
            <h3 className="heading-support text-ink">Collaborative, not intense</h3>
            <p className="body-standard text-ink-muted">
              You will work alongside other curious students and helpful mentors in an encouraging, open space.
            </p>
          </div>
          <div className="rounded-[20px] bg-white border-2 border-ink p-8 space-y-4 shadow-[4px_4px_0px_0px_#233047] hover:-translate-y-1 transition-all">
            <TrailMarker number="02" size="sm" />
            <h3 className="heading-support text-ink">Real-world context</h3>
            <p className="body-standard text-ink-muted">
              Problems come from actual organizations in your community, not abstract textbook scenarios.
            </p>
          </div>
          <div className="rounded-[20px] bg-white border-2 border-ink p-8 space-y-4 shadow-[4px_4px_0px_0px_#78A86B] hover:-translate-y-1 transition-all">
            <TrailMarker number="03" size="sm" />
            <h3 className="heading-support text-ink">Direct, helpful feedback</h3>
            <p className="body-standard text-ink-muted">
              Present your idea to adult leaders and hear genuine observations on how your team performed.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT TO BRING VS WHAT YOU DO NOT NEED ── */}
      <section className="site-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* What to bring */}
          <div className="rounded-[28px] border-2 border-ink bg-[#FFF6DB] p-8 sm:p-10 space-y-4 shadow-[5px_5px_0px_0px_#F47731]">
            <span className="inline-block px-3 py-1 rounded-[8px] border-2 border-ink bg-white font-mono text-xs font-bold text-ink uppercase tracking-wider shadow-[2px_2px_0px_0px_#233047]">
              PREPARATION CHECKLIST
            </span>
            <h2 className="heading-support text-ink">What to bring</h2>
            <ul className="space-y-3 body-standard text-ink font-medium">
              <li className="flex items-start gap-2">
                <span className="text-ink font-bold">•</span>
                <span>Curiosity and a willingness to work with a team</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ink font-bold">•</span>
                <span>A laptop or tablet if you have one (optional)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ink font-bold">•</span>
                <span>Signed student participant agreement / guardian consent if under 18</span>
              </li>
            </ul>
          </div>

          {/* What you do NOT need */}
          <div className="rounded-[28px] border-2 border-ink bg-[#FDECE2] p-8 sm:p-10 space-y-4 shadow-[5px_5px_0px_0px_#233047]">
            <span className="inline-block px-3 py-1 rounded-[8px] border-2 border-ink bg-white font-mono text-xs font-bold text-ink uppercase tracking-wider shadow-[2px_2px_0px_0px_#233047]">
              REASSURANCE
            </span>
            <h2 className="heading-support text-ink">What you do NOT need</h2>
            <ul className="space-y-3 body-standard text-ink font-medium">
              <li className="flex items-start gap-2">
                <span className="text-ink font-bold">•</span>
                <span>A pre-made business pitch or coding experience</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ink font-bold">•</span>
                <span>A fully pre-formed team of four friends</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ink font-bold">•</span>
                <span>Formal attire or expensive technology</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── STUDENT FAQ ── */}
      <section className="site-container max-w-3xl space-y-8">
        <SectionIntro
          label="STUDENT FAQ"
          heading="Questions students ask"
        />

        <div className="border-t-2 border-ink">
          {faqs.map((faq) => (
            <FAQItem key={faq.q} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </section>

      {/* ── INTEREST FORM CTA ── */}
      <section className="site-container">
        <div className="rounded-[28px] border-2 border-ink bg-ink text-paper p-10 sm:p-16 text-center space-y-6 shadow-[8px_8px_0px_0px_#F47731]">
          <h2 className="display-section text-paper">Want to join a future SolveSprint?</h2>
          <p className="body-large text-paper-light/90 max-w-xl mx-auto">
            {studentForm.description}
          </p>
          <div>
            {studentForm.url ? (
              <a
                href={studentForm.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center min-h-[58px] min-w-[156px] rounded-[14px] border-2 border-ink bg-sun px-8 py-3.5 font-body font-bold text-[17px] leading-[1.1] text-ink shadow-[3px_3px_0px_0px_#233047] hover:-translate-y-0.5 hover:bg-tangerine hover:shadow-[5px_5px_0px_0px_#233047] active:translate-y-0.5 transition-all w-full sm:w-auto"
              >
                {studentForm.buttonText}
              </a>
            ) : (
              <Link
                href="/get-involved"
                className="inline-flex items-center justify-center min-h-[58px] min-w-[156px] rounded-[14px] border-2 border-ink bg-sun px-8 py-3.5 font-body font-bold text-[17px] leading-[1.1] text-ink shadow-[3px_3px_0px_0px_#233047] hover:-translate-y-0.5 hover:bg-tangerine hover:shadow-[5px_5px_0px_0px_#233047] active:translate-y-0.5 transition-all w-full sm:w-auto"
              >
                Join the student interest list
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
