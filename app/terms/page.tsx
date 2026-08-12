import type { Metadata } from "next";
import { LegalPage, LegalSection, LegalCallout } from "@/components/legal-page";
import { LEGAL_META } from "@/lib/legal-meta";

export const metadata: Metadata = {
  title: "Terms of Use | SolveSprint™",
  description:
    "Terms governing access to the SolveSprint website, event participation guidelines, organization challenge proposals, and website content.",
};

const TOC = [
  { id: "s1", label: "1. Agreement & Purpose" },
  { id: "s2", label: "2. Eligibility" },
  { id: "s3", label: "3. In-Person Event Participation" },
  { id: "s4", label: "4. Organization Challenge Proposals" },
  { id: "s5", label: "5. Student Work & Intellectual Property" },
  { id: "s6", label: "6. Code of Conduct & Safety" },
  { id: "s7", label: "7. Third-Party Forms & Links" },
  { id: "s8", label: "8. Disclaimers & Limitation of Liability" },
  { id: "s9", label: "9. Changes & Contact" },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Platform Terms"
      title="Terms of Use"
      summary="These Terms govern your use of the SolveSprint website and participation in SolveSprint in-person student innovation events, organization proposals, and volunteer programs."
      toc={TOC}
      meta={{
        version: LEGAL_META.version,
        effectiveDate: LEGAL_META.effectiveDate,
        lastUpdated: LEGAL_META.lastUpdated,
        contact: LEGAL_META.legalContact,
        jurisdiction: LEGAL_META.jurisdiction,
        relatedLinks: [
          { href: "/privacy", label: "Privacy Policy" },
          { href: "/rules", label: "Event Rules" },
          { href: "/code-of-conduct", label: "Code of Conduct" },
          { href: "/legal", label: "Legal & Safety" },
        ],
      }}
    >
      <LegalCallout variant="warning">
        This document is a counsel-review draft reflecting SolveSprint&apos;s updated model as an informational website supporting in-person student events. Formal legal review should be completed by qualified legal counsel before event execution.
      </LegalCallout>

      <LegalSection id="s1" number={1} title="Agreement & Purpose">
        <p>
          By accessing or using the SolveSprint website, submitting an interest form, or registering for an in-person event, you agree to these Terms of Use.
        </p>
        <p>
          SolveSprint provides event information, challenge details, and interest registration pathways for in-person high school student problem-solving competitions. SolveSprint does not operate an online SaaS competition dashboard or online user account creation service.
        </p>
      </LegalSection>

      <LegalSection id="s2" number={2} title="Eligibility">
        <p>
          Student event participation is intended for enrolled high school students (ages 13–18). Minors must obtain parent or guardian permission prior to participating in an in-person event.
        </p>
      </LegalSection>

      <LegalSection id="s3" number={3} title="In-Person Event Participation">
        <p>
          Event details published on this website—including dates, venues, schedules, host organizations, and prompt categories—are subject to final confirmation. Submitting an interest form registers your interest but does not guarantee event seat confirmation until official registration is finalized.
        </p>
      </LegalSection>

      <LegalSection id="s4" number={4} title="Organization Challenge Proposals">
        <p>
          Organizations proposing challenge prompts represent that their submissions do not contain trade secrets, confidential corporate data, regulated personal data, or infringing material. Submitting a proposal begins an evaluation conversation with SolveSprint organizers and does not guarantee event inclusion.
        </p>
      </LegalSection>

      <LegalSection id="s5" number={5} title="Student Work & Intellectual Property">
        <p>
          Student teams retain ownership of the original solutions, prototypes, and pitch presentations created during SolveSprint events unless specific written terms are agreed upon by participants prior to the challenge.
        </p>
      </LegalSection>

      <LegalSection id="s6" number={6} title="Code of Conduct & Safety">
        <p>
          All participants, volunteers, judges, and organization representatives must adhere to the SolveSprint Code of Conduct. Harassment, discrimination, dishonest competition practices, or unsafe behavior during in-person events will result in immediate disqualification and removal.
        </p>
      </LegalSection>

      <LegalSection id="s7" number={7} title="Third-Party Forms & Links">
        <p>
          This website may link to third-party forms (such as Google Forms) or partner websites. SolveSprint is not responsible for the privacy practices, terms, or content of third-party platforms.
        </p>
      </LegalSection>

      <LegalSection id="s8" number={8} title="Disclaimers & Limitation of Liability">
        <p>
          The website and event information are provided on an &quot;as-is&quot; basis. To the fullest extent permitted by applicable law, SolveSprint disclaims all warranties and shall not be liable for indirect or consequential damages arising from website use or event attendance.
        </p>
      </LegalSection>

      <LegalSection id="s9" number={9} title="Changes & Contact">
        <p>
          SolveSprint reserves the right to update these Terms at any time. For questions regarding these Terms, contact our team via the <a href="/get-involved">Get Involved page</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
