import Link from "next/link";
import { TopoPattern } from "@/components/brand/TopoPattern";
import { ParticipationRow } from "@/components/editorial/ParticipationRow";
import { PhotoFrame } from "@/components/editorial/PhotoFrame";
import { SectionIntro } from "@/components/editorial/SectionIntro";
import { APPROVED_IMAGES } from "@/components/media/approved-media";
import { FORM_CONFIGS } from "@/lib/site-config";

export const metadata = {
  title: "Volunteer | SolveSprint™",
  description: "Help make the room feel possible. Explore volunteer and mentor roles for SolveSprint student innovation events.",
};

export default function VolunteerPage() {
  const volunteerForm = FORM_CONFIGS.volunteer;

  const roles = [
    {
      role: "Event Support",
      desc: "Help manage setup, directional signage, and general room organization on event day.",
      href: "/get-involved",
    },
    {
      role: "Student Guidance",
      desc: "Sit with student teams during ideation to ask clarifying questions and help them work through roadblocks.",
      href: "/get-involved",
    },
    {
      role: "Check-in & Logistics",
      desc: "Welcome participants, manage student check-in desks, and distribute event badges and materials.",
      href: "/get-involved",
    },
    {
      role: "Presentation-Room Support",
      desc: "Time student pitches, introduce teams, and assist panel judges with scoring rubrics.",
      href: "/get-involved",
    },
    {
      role: "Outreach Coordination",
      desc: "Assist before event day by sharing event flyers and announcements with local school networks.",
      href: "/get-involved",
    },
  ];

  return (
    <div className="w-full space-y-20 sm:space-y-28 py-12">
      {/* ── HERO ── */}
      <section className="site-container relative pt-12 sm:pt-16">
        <TopoPattern opacity={0.05} />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <p className="trail-label text-tangerine font-bold">VOLUNTEERS &amp; MENTORS</p>
            <h1 className="display-hero text-ink">
              Help make the room feel possible.
            </h1>
            <p className="body-large text-ink-muted">
              Volunteers provide encouragement, clear answers, and logistics support so high school teams can focus on building their ideas.
            </p>
            <div className="pt-2">
              {volunteerForm.url ? (
                <a
                  href={volunteerForm.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center min-h-[58px] min-w-[156px] rounded-[12px] border-2 border-tangerine bg-tangerine px-8 py-3.5 font-body font-bold text-[17px] leading-[1.1] text-ink hover:bg-sun hover:border-sun transition-all focus:outline-none focus-visible:ring-3 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper w-full sm:w-auto"
                >
                  {volunteerForm.buttonText}
                </a>
              ) : (
                <Link
                  href="/get-involved"
                  className="inline-flex items-center justify-center min-h-[58px] min-w-[156px] rounded-[12px] border-2 border-tangerine bg-tangerine px-8 py-3.5 font-body font-bold text-[17px] leading-[1.1] text-ink hover:bg-sun hover:border-sun transition-all focus:outline-none focus-visible:ring-3 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper w-full sm:w-auto"
                >
                  Volunteer at an event
                </Link>
              )}
            </div>
          </div>

          <div className="lg:col-span-5">
            <PhotoFrame
              image={APPROVED_IMAGES["mentor-reviewing-work"]}
              aspect="portrait"
              priority
              caption
              captionText="MENTOR REVIEWING STUDENT WORK"
            />
          </div>
        </div>
      </section>

      {/* ── ROLES LIST ── */}
      <section className="site-container space-y-8">
        <SectionIntro
          label="AVAILABLE ROLES"
          heading="Volunteer opportunities"
          supporting="Specific shift times, hours, and background verification details depend on the specific event venue and host guidelines."
        />

        <div className="border-t-2 border-ink">
          {roles.map((r) => (
            <ParticipationRow
              key={r.role}
              role={r.role}
              description={r.desc}
              href={volunteerForm.url || r.href}
              linkLabel={volunteerForm.url ? "Apply via form" : "Express interest"}
            />
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="site-container">
        <div className="rounded-[28px] border-2 border-ink bg-ink text-paper p-10 sm:p-16 text-center space-y-6 shadow-[8px_8px_0px_0px_#F47731]">
          <h2 className="display-section text-paper">Join our volunteer list</h2>
          <p className="body-large text-paper-light/90 max-w-xl mx-auto">
            {volunteerForm.description}
          </p>
          <div>
            {volunteerForm.url ? (
              <a
                href={volunteerForm.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center min-h-[58px] min-w-[156px] rounded-[14px] border-2 border-ink bg-sun px-8 py-3.5 font-body font-bold text-[17px] leading-[1.1] text-ink shadow-[3px_3px_0px_0px_#233047] hover:-translate-y-0.5 hover:bg-tangerine hover:shadow-[5px_5px_0px_0px_#233047] active:translate-y-0.5 transition-all w-full sm:w-auto"
              >
                {volunteerForm.buttonText}
              </a>
            ) : (
              <Link
                href="/get-involved"
                className="inline-flex items-center justify-center min-h-[58px] min-w-[156px] rounded-[14px] border-2 border-ink bg-sun px-8 py-3.5 font-body font-bold text-[17px] leading-[1.1] text-ink shadow-[3px_3px_0px_0px_#233047] hover:-translate-y-0.5 hover:bg-tangerine hover:shadow-[5px_5px_0px_0px_#233047] active:translate-y-0.5 transition-all w-full sm:w-auto"
              >
                Volunteer at an event
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
