import type { Metadata } from "next";
import { LegalPage, LegalSection, LegalCallout } from "@/components/legal-page";
import { LEGAL_META } from "@/lib/legal-meta";

export const metadata: Metadata = {
  title: "Event Rules | SolveSprint™",
  description:
    "Participation standards, team formation, skill-based judging rubrics, original work requirements, and competition rules for SolveSprint in-person student innovation events.",
};

const TOC = [
  { id: "s1", label: "1. Event Purpose & Free Entry" },
  { id: "s2", label: "2. Student Eligibility" },
  { id: "s3", label: "3. Team Formation & Rules" },
  { id: "s4", label: "4. Original Work & AI Tools" },
  { id: "s5", label: "5. In-Person Pitch Presentations" },
  { id: "s6", label: "6. Skill-Based Judging & Rubrics" },
  { id: "s7", label: "7. Fair Play & Conduct" },
  { id: "s8", label: "8. Ownership & Portfolios" },
  { id: "s9", label: "9. Media Consent & Publicity" },
  { id: "s10", label: "10. Enforcement & Questions" },
];

export default function RulesPage() {
  return (
    <LegalPage
      eyebrow="Participation"
      title="Event Rules"
      summary="The baseline participation standards, team guidelines, original work expectations, and skill-based judging rules for SolveSprint in-person student innovation events."
      toc={TOC}
      meta={{
        version: LEGAL_META.version,
        effectiveDate: LEGAL_META.effectiveDate,
        lastUpdated: LEGAL_META.lastUpdated,
        contact: LEGAL_META.legalContact,
        relatedLinks: [
          { href: "/terms", label: "Terms of Use" },
          { href: "/privacy", label: "Privacy Policy" },
          { href: "/code-of-conduct", label: "Code of Conduct" },
          { href: "/legal", label: "Legal & Safety" },
        ],
      }}
    >
      <LegalCallout variant="warning">
        This document specifies standard rules for SolveSprint in-person student innovation events. Specific challenge prompts may include additional criteria provided in event briefs.
      </LegalCallout>

      <LegalSection id="s1" number={1} title="Event Purpose & Free Entry">
        <p>
          SolveSprint events are free skill-based innovation competitions for high school student teams. No entry fee or purchase is required to participate or receive recognition.
        </p>
      </LegalSection>

      <LegalSection id="s2" number={2} title="Student Eligibility">
        <p>
          Events are open to enrolled high school students (grades 9–12, ages 13–18). Minors must have permission from a parent or legal guardian to attend in-person competition sessions.
        </p>
      </LegalSection>

      <LegalSection id="s3" number={3} title="Team Formation & Rules">
        <p>
          Students may register as part of a pre-formed team (typically 2 to 5 members) or individually. Individual participants will be matched with teammates prior to or during event orientation.
        </p>
      </LegalSection>

      <LegalSection id="s4" number={4} title="Original Work & AI Tools">
        <p>
          All solutions, slide decks, prototypes, and recommendations presented at SolveSprint events must represent the original work of the student team created during the event.
        </p>
        <p>
          Generative AI tools (such as LLMs or design tools) may be used as research and drafting aids if permitted by the specific challenge brief, but must be disclosed and must not replace student analysis or pitch delivery.
        </p>
      </LegalSection>

      <LegalSection id="s5" number={5} title="In-Person Pitch Presentations">
        <p>
          Teams present their solutions live to a panel of judges on event day. Presentations must adhere strictly to allocated pitch time limits (typically 5 to 8 minutes).
        </p>
      </LegalSection>

      <LegalSection id="s6" number={6} title="Skill-Based Judging & Rubrics">
        <p>
          Judging is skill-based and conducted by qualified professionals using transparent evaluation rubrics. Criteria include problem analysis, feasibility, research evidence, originality, and presentation quality.
        </p>
      </LegalSection>

      <LegalSection id="s7" number={7} title="Fair Play & Conduct">
        <p>
          Teams must compete honestly and treat fellow participants, volunteers, organization hosts, and judges with respect. Any plagiarism, disruptive behavior, or harassment will result in immediate disqualification.
        </p>
      </LegalSection>

      <LegalSection id="s8" number={8} title="Ownership & Portfolios">
        <p>
          Student teams retain ownership of their original work created during the event. Students may feature their event solutions in personal portfolios, resumes, and college applications.
        </p>
      </LegalSection>

      <LegalSection id="s9" number={9} title="Media Consent & Publicity">
        <p>
          Photographs or video recordings taken during in-person events featuring minor participants require explicit parental/guardian media consent.
        </p>
      </LegalSection>

      <LegalSection id="s10" number={10} title="Enforcement & Questions">
        <p>
          Event coordinators enforce these rules to maintain a safe, fair, and encouraging environment. For questions regarding rules, reach out via the <a href="/get-involved">Get Involved page</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
