import Link from "next/link";
import { TopoPattern } from "@/components/brand/TopoPattern";
import { FAQItem } from "@/components/editorial/FAQItem";
import { PhotoFrame } from "@/components/editorial/PhotoFrame";
import { SectionIntro } from "@/components/editorial/SectionIntro";
import { APPROVED_IMAGES } from "@/components/media/approved-media";
import { FORM_CONFIGS } from "@/lib/site-config";

export const metadata = {
  title: "For Organizations | SolveSprint™",
  description: "Bring a real question. Hear how students approach it. Partner with SolveSprint to submit challenge briefs for student innovation events.",
};

const faqs = [
  {
    q: "What kinds of problems work best for a SolveSprint event?",
    a: "Problems that are real, specific to your organization or community, and open to creative problem-solving without requiring deep proprietary technical knowledge.",
  },
  {
    q: "Does our organization own the ideas students create?",
    a: "Students retain ownership of their original work. Organizations receive fresh perspectives and may follow up directly with teams if they wish to explore ideas further.",
  },
  {
    q: "What is required from our team on event day?",
    a: "We ask for one representative to present or clarify the challenge brief and participate in listening to team pitches.",
  },
];

export default function ForOrganizationsPage() {
  const orgForm = FORM_CONFIGS.organization;

  return (
    <div className="w-full space-y-20 sm:space-y-28 py-12">
      {/* ── HERO ── */}
      <section className="site-container relative pt-12 sm:pt-16">
        <TopoPattern opacity={0.05} />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <p className="trail-label text-tangerine font-bold">FOR LOCAL ORGANIZATIONS</p>
            <h1 className="display-hero text-ink">
              Bring a real question. Hear how students approach it.
            </h1>
            <p className="body-large text-ink-muted">
              SolveSprint connects local businesses, startups, nonprofits, and community groups with high school student teams looking for authentic problem-solving experience.
            </p>
            <div className="pt-2">
              {orgForm.url ? (
                <a
                  href={orgForm.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center min-h-[58px] min-w-[156px] rounded-[12px] border-2 border-tangerine bg-tangerine px-8 py-3.5 font-body font-bold text-[17px] leading-[1.1] text-ink hover:bg-sun hover:border-sun transition-all focus:outline-none focus-visible:ring-3 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper w-full sm:w-auto"
                >
                  {orgForm.buttonText}
                </a>
              ) : (
                <Link
                  href="/get-involved"
                  className="inline-flex items-center justify-center min-h-[58px] min-w-[156px] rounded-[12px] border-2 border-tangerine bg-tangerine px-8 py-3.5 font-body font-bold text-[17px] leading-[1.1] text-ink hover:bg-sun hover:border-sun transition-all focus:outline-none focus-visible:ring-3 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper w-full sm:w-auto"
                >
                  Propose a challenge
                </Link>
              )}
            </div>
          </div>

          <div className="lg:col-span-5">
            <PhotoFrame
              image={APPROVED_IMAGES["organization-whiteboard"]}
              aspect="portrait"
              priority
              caption
              captionText="ORGANIZATION STRATEGY MEETING"
            />
          </div>
        </div>
      </section>

      {/* ── SUITABLE CHALLENGE & PREPARATION ── */}
      <section className="site-container space-y-12">
        <SectionIntro
          label="CHALLENGE SHAPING"
          heading="What makes a suitable student brief"
          supporting="Good briefs are open-ended, clear, and realistic for a single challenge day."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-[24px] bg-paper-light border border-line p-8 space-y-3">
            <h3 className="heading-support text-ink">Clear, open problem statement</h3>
            <p className="body-standard text-ink-muted">
              A specific question or community need that allows multiple creative approaches rather than a single fixed answer.
            </p>
          </div>

          <div className="rounded-[24px] bg-paper-light border border-line p-8 space-y-3">
            <h3 className="heading-support text-ink">Age-appropriate context</h3>
            <p className="body-standard text-ink-muted">
              Scenarios high school students can grasp without needing specialized professional jargon or financial disclosures.
            </p>
          </div>

          <div className="rounded-[24px] bg-paper-light border border-line p-8 space-y-3">
            <h3 className="heading-support text-ink">Measurable scope</h3>
            <p className="body-standard text-ink-muted">
              A problem that can be explored, prototyped, and presented within the span of a 4-to-6 hour event day.
            </p>
          </div>
        </div>
      </section>

      {/* ── SAFETY & BOUNDARIES ── */}
      <section className="site-container">
        <div className="rounded-[32px] bg-peach p-8 sm:p-12 space-y-6">
          <div className="space-y-2">
            <p className="trail-label text-ink font-bold">SAFETY &amp; CONFIDENTIALITY BOUNDARIES</p>
            <h2 className="display-section text-ink">Non-negotiable challenge rules</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 body-standard text-ink font-medium">
            <div className="flex items-start gap-3">
              <span className="text-tangerine font-bold">•</span>
              <span>No confidential, regulated, private, or personally identifiable information may be shared in briefs.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-tangerine font-bold">•</span>
              <span>Challenges must not replace paid professional labor or internal workforce requirements.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-tangerine font-bold">•</span>
              <span>No hazardous physical activities, lab work, or high-risk field tasks.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-tangerine font-bold">•</span>
              <span>No requirement that student participants purchase products, software licenses, or services.</span>
            </div>
            <div className="flex items-start gap-3 md:col-span-2">
              <span className="text-tangerine font-bold">•</span>
              <span>No misleading representation or promise that your organization is obligated to implement student proposals.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXAMPLE CHALLENGE SHAPES ── */}
      <section className="site-container space-y-8">
        <SectionIntro
          label="EXAMPLES"
          heading="Example challenge shapes"
          supporting="These plain-language examples demonstrate how local questions can be framed for high school teams."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-[20px] bg-white border-2 border-ink p-8 space-y-3 shadow-[4px_4px_0px_0px_#F47731] hover:-translate-y-1 transition-all">
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-[6px] bg-sun text-ink border border-ink">COMMUNITY / NONPROFIT</span>
            <h3 className="heading-support text-ink">Increasing Youth Volunteer Engagement</h3>
            <p className="body-standard text-ink-muted">
              How might a local food bank design a weekend volunteer experience that encourages high school students to return regularly?
            </p>
          </div>

          <div className="rounded-[20px] bg-white border-2 border-ink p-8 space-y-3 shadow-[4px_4px_0px_0px_#233047] hover:-translate-y-1 transition-all">
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-[6px] bg-lake text-ink border border-ink">LOCAL BUSINESS</span>
            <h3 className="heading-support text-ink">Sustainable Packaging Communication</h3>
            <p className="body-standard text-ink-muted">
              How can a neighborhood cafe effectively explain its transition to compostable packaging to teenage and young adult customers?
            </p>
          </div>
        </div>
      </section>

      {/* ── EXPECTATIONS ── */}
      <section className="site-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* What we ask from you */}
          <div className="rounded-[28px] border-2 border-ink bg-[#FFF6DB] p-8 sm:p-10 space-y-4 shadow-[5px_5px_0px_0px_#F47731]">
            <span className="inline-block px-3 py-1 rounded-[8px] border-2 border-ink bg-white font-mono text-xs font-bold text-ink uppercase tracking-wider shadow-[2px_2px_0px_0px_#233047]">
              ORGANIZATION COMMITMENT
            </span>
            <h2 className="heading-support text-ink">What we ask from you</h2>
            <ul className="space-y-3 body-standard text-ink font-medium">
              <li className="flex items-start gap-2">
                <span className="text-ink font-bold">•</span>
                <span>A brief problem description and relevant background info</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ink font-bold">•</span>
                <span>One representative available to answer student questions (in-person or async)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ink font-bold">•</span>
                <span>Constructive feedback for presenting student teams on event day</span>
              </li>
            </ul>
          </div>

          {/* What SolveSprint provides */}
          <div className="rounded-[28px] border-2 border-ink bg-[#E2F1F5] p-8 sm:p-10 space-y-4 shadow-[5px_5px_0px_0px_#233047]">
            <span className="inline-block px-3 py-1 rounded-[8px] border-2 border-ink bg-white font-mono text-xs font-bold text-ink uppercase tracking-wider shadow-[2px_2px_0px_0px_#233047]">
              SOLVESPRINT SUPPORT
            </span>
            <h2 className="heading-support text-ink">What SolveSprint provides</h2>
            <ul className="space-y-3 body-standard text-ink font-medium">
              <li className="flex items-start gap-2">
                <span className="text-ink font-bold">•</span>
                <span>Help structuring your raw problem into an age-appropriate brief</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ink font-bold">•</span>
                <span>Student outreach, registration, and team coordination</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ink font-bold">•</span>
                <span>Event venue, schedule management, and youth safety oversight</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="site-container max-w-3xl space-y-8">
        <SectionIntro
          label="ORGANIZATION FAQ"
          heading="Questions organizations ask"
        />

        <div className="border-t-2 border-ink">
          {faqs.map((faq) => (
            <FAQItem key={faq.q} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </section>

      {/* ── PROPOSAL FORM CTA ── */}
      <section className="site-container">
        <div className="rounded-[28px] border-2 border-ink bg-ink text-paper p-10 sm:p-16 text-center space-y-6 shadow-[8px_8px_0px_0px_#F47731]">
          <h2 className="display-section text-paper">Propose a challenge for a future event</h2>
          <p className="body-large text-paper-light/90 max-w-xl mx-auto">
            {orgForm.description}
          </p>
          <div>
            {orgForm.url ? (
              <a
                href={orgForm.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center min-h-[58px] min-w-[156px] rounded-[14px] border-2 border-ink bg-sun px-8 py-3.5 font-body font-bold text-[17px] leading-[1.1] text-ink shadow-[3px_3px_0px_0px_#233047] hover:-translate-y-0.5 hover:bg-tangerine hover:shadow-[5px_5px_0px_0px_#233047] active:translate-y-0.5 transition-all w-full sm:w-auto"
              >
                {orgForm.buttonText}
              </a>
            ) : (
              <Link
                href="/get-involved"
                className="inline-flex items-center justify-center min-h-[58px] min-w-[156px] rounded-[14px] border-2 border-ink bg-sun px-8 py-3.5 font-body font-bold text-[17px] leading-[1.1] text-ink shadow-[3px_3px_0px_0px_#233047] hover:-translate-y-0.5 hover:bg-tangerine hover:shadow-[5px_5px_0px_0px_#233047] active:translate-y-0.5 transition-all w-full sm:w-auto"
              >
                Submit organization proposal interest
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
