import Link from "next/link";
import { TopoPattern } from "@/components/brand/TopoPattern";
import { EventStatus } from "@/components/editorial/EventStatus";
import { FounderProfile } from "@/components/editorial/FounderProfile";
import { SectionIntro } from "@/components/editorial/SectionIntro";
import { APPROVED_IMAGES } from "@/components/media/approved-media";
import { CONTACT_CONFIG } from "@/lib/site-config";

export const metadata = {
  title: "About SolveSprint™",
  description: "Learn why SolveSprint was founded by high school students and how we are building an in-person challenge event for Charlotte-area students.",
};

export default function AboutPage() {
  const founders = [
    {
      name: CONTACT_CONFIG.avighna.name,
      role: CONTACT_CONFIG.avighna.role,
      title: CONTACT_CONFIG.avighna.title,
      bio: "Focuses on software architecture, website infrastructure, and participant outreach strategy for SolveSprint.",
      imageSrc: APPROVED_IMAGES["founder-avighna"].src,
    },
    {
      name: CONTACT_CONFIG.kavish.name,
      role: CONTACT_CONFIG.kavish.role,
      title: CONTACT_CONFIG.kavish.title,
      bio: "Leads organization partnerships and local community outreach to bring real challenge briefs to students.",
      imageSrc: APPROVED_IMAGES["founder-kavish"].src,
    },
  ];

  return (
    <div className="w-full space-y-20 sm:space-y-28 py-12">
      {/* ── HERO & WHY WE STARTED ── */}
      <section className="site-container relative pt-12 sm:pt-16">
        <TopoPattern opacity={0.05} />
        <div className="max-w-3xl space-y-6">
          <p className="trail-label text-tangerine font-bold">ABOUT SOLVESPRINT</p>
          <h1 className="display-hero text-ink">
            Why we started.
          </h1>
          <p className="body-large text-ink-muted">
            SolveSprint was started by high school students who wanted to create an honest, in-person space where students can tackle real community problems together.
          </p>
        </div>
      </section>

      {/* ── WHAT WE ARE BUILDING ── */}
      <section className="site-container">
        <div className="rounded-[28px] border-2 border-ink bg-[#E2F1F5] p-8 sm:p-12 space-y-6 shadow-[6px_6px_0px_0px_#233047]">
          <span className="inline-block px-3 py-1 rounded-[8px] border-2 border-ink bg-white font-mono text-xs font-bold text-ink uppercase tracking-wider shadow-[2px_2px_0px_0px_#233047]">
            EVENT CONCEPT
          </span>
          <h2 className="display-section text-ink">What we are building</h2>
          <p className="body-large text-ink max-w-3xl leading-relaxed font-medium">
            We are designing a 1-day, in-person challenge event. Local organizations bring real, unvarnished questions. High school teams collaborate, prototype solutions, and present what they built to community representatives.
          </p>
        </div>
      </section>

      {/* ── TWO FOUNDER PROFILES ── */}
      <section className="site-container space-y-12">
        <SectionIntro
          label="CO-FOUNDERS"
          heading="The team behind SolveSprint"
          supporting="Students working on event structure, organization partnerships, and platform setup."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8 lg:gap-12">
          {founders.map((f) => (
            <FounderProfile key={f.name} founder={f} />
          ))}
        </div>
      </section>

      {/* ── HONEST EVENT STATUS ── */}
      <section className="site-container">
        <EventStatus />
      </section>

      {/* ── CONTACT INFORMATION ── */}
      <section className="site-container max-w-2xl space-y-6 border-t-2 border-ink pt-12">
        <h2 className="heading-support text-ink">Contact SolveSprint</h2>
        <p className="body-standard text-ink-muted">
          Have a question about event planning, organization brief submission, or volunteering? Reach out directly.
        </p>

        <div className="space-y-3 body-standard text-ink font-medium">
          {CONTACT_CONFIG.avighna.email && (
            <p>
              <strong className="text-tangerine">{CONTACT_CONFIG.avighna.name}:</strong>{" "}
              <a href={`mailto:${CONTACT_CONFIG.avighna.email}`} className="underline hover:text-tangerine">
                {CONTACT_CONFIG.avighna.email}
              </a>
            </p>
          )}
          {CONTACT_CONFIG.kavish.email && (
            <p>
              <strong className="text-tangerine">{CONTACT_CONFIG.kavish.name}:</strong>{" "}
              <a href={`mailto:${CONTACT_CONFIG.kavish.email}`} className="underline hover:text-tangerine">
                {CONTACT_CONFIG.kavish.email}
              </a>
            </p>
          )}
          {CONTACT_CONFIG.generalEmail && (
            <p>
              <strong className="text-tangerine">General Inquiry:</strong>{" "}
              <a href={`mailto:${CONTACT_CONFIG.generalEmail}`} className="underline hover:text-tangerine">
                {CONTACT_CONFIG.generalEmail}
              </a>
            </p>
          )}
          {!CONTACT_CONFIG.avighna.email && !CONTACT_CONFIG.kavish.email && !CONTACT_CONFIG.generalEmail && (
            <div className="rounded-[14px] bg-paper-light border-2 border-ink p-4 space-y-2 shadow-[2px_2px_0px_0px_#233047]">
              <p className="text-ink">
                Direct email addresses are configured during event launch. To submit an inquiry or get involved, please visit our participation hub.
              </p>
              <Link href="/get-involved" className="inline-flex items-center gap-2 font-bold text-tangerine hover:underline">
                <span>Go to Get Involved Hub</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          )}
        </div>

        <p className="trail-label text-ink-muted pt-2">
          {CONTACT_CONFIG.privacyNotice}
        </p>
      </section>
    </div>
  );
}
