import { TopoPattern } from "@/components/brand/TopoPattern";
import { SectionIntro } from "@/components/editorial/SectionIntro";
import { FORM_CONFIGS, FormRole } from "@/lib/site-config";

export const metadata = {
  title: "Get Involved | SolveSprint™",
  description: "Choose how you want to be involved in SolveSprint student innovation events as a student, volunteer, organization partner, or coordinator.",
};

export default function GetInvolvedPage() {
  // Ordered as requested: 1st Student, 2nd Volunteer, then Organization & Coordinator at the bottom
  const roles: FormRole[] = ["student", "volunteer", "organization", "coordinator"];

  return (
    <div className="w-full space-y-16 sm:space-y-24 py-12">
      {/* ── HERO ── */}
      <section className="site-container relative pt-12 sm:pt-16">
        <TopoPattern opacity={0.05} />
        <div className="max-w-3xl space-y-6">
          <p className="trail-label text-tangerine font-bold">JOIN SOLVESPRINT</p>
          <h1 className="display-hero text-ink">
            Choose how you want to be involved.
          </h1>
          <p className="body-large text-ink-muted">
            High school students and volunteers can complete our interest forms below. Organizations and prospective coordinators can contact us directly by email.
          </p>
        </div>
      </section>

      {/* ── PARTICIPATION PATHS ── */}
      <section className="site-container space-y-8">
        <SectionIntro
          label="PARTICIPATION PATHS"
          heading="Select your role"
        />

        <div className="space-y-6">
          {roles.map((roleKey, idx) => {
            const config = FORM_CONFIGS[roleKey];
            const isGoogleForm = roleKey === "student" || roleKey === "volunteer";
            const targetUrl = config.url || (isGoogleForm
              ? roleKey === "student"
                ? "https://forms.gle/rwwLtgW6pSrJAxuHA"
                : "https://docs.google.com/forms/d/e/1FAIpQLSdegSPqSJDPExL3szxtFmfEmC0Flkre3QbcQHnxnzQOEyLu8g/viewform"
              : "mailto:avighna.khare1@gmail.com");

            return (
              <div
                key={roleKey}
                className="rounded-[24px] border-2 border-ink bg-white p-6 sm:p-10 shadow-[5px_5px_0px_0px_#233047] hover:-translate-y-1 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="max-w-2xl space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-tangerine">
                        0{idx + 1}
                      </span>
                      <span className="inline-block px-3 py-1 rounded-[8px] border-2 border-ink bg-sun font-mono text-xs font-bold text-ink uppercase tracking-wider shadow-[2px_2px_0px_0px_#233047]">
                        {config.label}
                      </span>
                    </div>

                    <h2 className="heading-support text-ink">
                      {config.whoItIsFor}
                    </h2>
                    <p className="body-standard text-ink-muted">
                      {config.description}
                    </p>
                    <p className="text-sm font-mono text-ink pt-1">
                      <strong>Expected Commitment:</strong> {config.commitment}
                    </p>
                  </div>

                  {/* Action Button & Availability Notice */}
                  <div className="shrink-0 space-y-3 min-w-[260px]">
                    <a
                      href={targetUrl}
                      target={isGoogleForm ? "_blank" : undefined}
                      rel={isGoogleForm ? "noopener noreferrer" : undefined}
                      className={`inline-flex items-center justify-center min-h-[58px] w-full rounded-[14px] border-2 border-ink px-6 py-3.5 font-body font-extrabold text-[17px] leading-tight text-ink shadow-[4px_4px_0px_0px_#233047] hover:-translate-y-0.5 active:translate-y-0.5 transition-all focus:outline-none ${
                        isGoogleForm
                          ? "bg-tangerine hover:bg-sun hover:shadow-[6px_6px_0px_0px_#233047]"
                          : "bg-paper-light hover:bg-sun hover:shadow-[6px_6px_0px_0px_#233047]"
                      }`}
                    >
                      {isGoogleForm ? `${config.buttonText} ↗` : `Email Avighna to Express Interest ✉️`}
                    </a>

                    {!isGoogleForm && (
                      <p className="text-xs font-medium text-ink bg-paper-light border border-line rounded-[10px] p-2.5 text-center">
                        To express interest, email <a href="mailto:avighna.khare1@gmail.com" className="font-bold text-tangerine underline">avighna.khare1@gmail.com</a>
                      </p>
                    )}

                    <p className="text-[11px] text-ink-muted text-center max-w-[260px] mx-auto">
                      {config.privacyNote}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
