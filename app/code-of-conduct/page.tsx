import type { Metadata } from "next";
import { LegalPage, LegalSection, LegalCallout } from "@/components/legal-page";
import { LEGAL_META } from "@/lib/legal-meta";

export const metadata: Metadata = {
  title: "Code of Conduct & Youth Safety | SolveSprint",
  description:
    "Expected behavior, prohibited conduct, youth safety standards, and how to report concerns on SolveSprint.",
};

const TOC = [
  { id: "s1", label: "1. Purpose" },
  { id: "s2", label: "2. Who this applies to" },
  { id: "s3", label: "3. Expected behavior" },
  { id: "s4", label: "4. Prohibited conduct" },
  { id: "s5", label: "5. Youth safety standards" },
  { id: "s6", label: "6. Adult conduct requirements" },
  { id: "s7", label: "7. Content standards" },
  { id: "s8", label: "8. Reporting" },
  { id: "s9", label: "9. Enforcement" },
  { id: "s10", label: "10. Contact" },
];

export default function CodeOfConductPage() {
  return (
    <LegalPage
      eyebrow="Community Standards"
      title="Code of Conduct & Youth Safety"
      summary="SolveSprint is committed to providing a safe, respectful, and inclusive environment for high-school innovators, host organizations, judges, and administrators. This document sets the standards everyone must follow."
      toc={TOC}
      meta={{
        version: LEGAL_META.version,
        effectiveDate: LEGAL_META.effectiveDate,
        lastUpdated: LEGAL_META.lastUpdated,
        contact: LEGAL_META.safetyContact,
        relatedLinks: [
          { href: "/rules", label: "League Rules" },
          { href: "/terms", label: "Terms of Use" },
          { href: "/legal", label: "Legal & Safety" },
        ],
      }}
    >
      <LegalCallout variant="warning">
        This document is a counsel-review draft. It must not be published unchanged. All bracketed placeholders must be replaced before real student data or entries are accepted.
      </LegalCallout>

      <LegalSection id="s1" number={1} title="Purpose">
        <p>
          SolveSprint brings together students, organizations, and adult
          professionals. Because many participants are minors, a clear and
          enforced code of conduct is essential. This document defines the
          standards of behavior that protect everyone and make the league a fair,
          productive, and safe place to compete and collaborate.
        </p>
      </LegalSection>

      <LegalSection id="s2" number={2} title="Who this applies to">
        <p>
          This Code of Conduct applies to all participants, including:
        </p>
        <ul>
          <li>students;</li>
          <li>guardians interacting with the platform;</li>
          <li>host organization representatives;</li>
          <li>judges;</li>
          <li>mentors, teachers, and advisors; and</li>
          <li>SolveSprint administrators and volunteers.</li>
        </ul>
        <p>
          It applies to all activity on SolveSprint, including challenge
          submissions, team communications, challenge channel discussions, and
          any SolveSprint-affiliated event.
        </p>
      </LegalSection>

      <LegalSection id="s3" number={3} title="Expected behavior">
        <p>All participants must:</p>
        <ul>
          <li>treat all participants with respect, professionalism, and courtesy;</li>
          <li>communicate constructively, even in disagreement;</li>
          <li>submit original work and accurately disclose outside help and AI use;</li>
          <li>follow all League Rules and applicable Challenge Rules;</li>
          <li>protect the privacy of other participants;</li>
          <li>report safety concerns rather than ignore them; and</li>
          <li>cooperate reasonably with SolveSprint moderation and safety reviews.</li>
        </ul>
      </LegalSection>

      <LegalSection id="s4" number={4} title="Prohibited conduct">
        <p>Participants may not:</p>
        <ul>
          <li>harass, threaten, bully, demean, or discriminate against any person based on race, color, national origin, sex, gender identity, sexual orientation, disability, religion, age, or any other protected characteristic;</li>
          <li>engage in or facilitate grooming, exploitation, or sexual conduct involving a minor;</li>
          <li>plagiarize, misrepresent authorship, or submit work they are not authorized to submit;</li>
          <li>manipulate judging, voting, or scoring systems;</li>
          <li>create fake accounts, use bots, or impersonate another person or organization;</li>
          <li>share, expose, or misuse another person&apos;s private information;</li>
          <li>upload malware, attempt unauthorized access, or disrupt platform systems;</li>
          <li>make false claims of school affiliation, endorsement, or credentials; or</li>
          <li>retaliate against a person who makes a good-faith report.</li>
        </ul>
      </LegalSection>

      <LegalSection id="s5" number={5} title="Youth safety standards">
        <p>
          Because most students are minors, SolveSprint enforces specific safety
          standards:
        </p>
        <ul>
          <li>
            All communications between adults and students must occur in
            moderator-visible SolveSprint channels.
          </li>
          <li>
            Adults may not request a student&apos;s personal phone number, home
            address, government ID, or social-media handle.
          </li>
          <li>
            Adults may not move a conversation with a student to a private
            external platform, personal email, or personal social media account.
          </li>
          <li>
            Adults may not privately promise a job offer, internship, travel,
            financial benefit, or any off-platform arrangement to a student.
          </li>
          <li>
            Students must not arrange unsupervised in-person meetings with hosts,
            judges, or mentors through SolveSprint.
          </li>
          <li>
            Physical events, travel, and direct mentoring relationships require
            separate guardian permission, appropriate screening, and safety
            planning.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="s6" number={6} title="Adult conduct requirements">
        <p>
          Adults in all roles — hosts, judges, mentors, advisors, and
          administrators — bear a heightened responsibility when interacting
          with minor students. Adults must:
        </p>
        <ul>
          <li>include a parent, guardian, teacher, or SolveSprint moderator when direct communication with a minor is genuinely necessary;</li>
          <li>disclose conflicts of interest before participating in judging or challenge approval;</li>
          <li>not use their role to request unpaid student labor or gain commercial benefit from student submissions without proper agreement; and</li>
          <li>not accept gifts, payments, or benefits in exchange for favorable judging or challenge decisions.</li>
        </ul>
      </LegalSection>

      <LegalSection id="s7" number={7} title="Content standards">
        <p>
          All submissions, profiles, and communications on SolveSprint must not
          contain:
        </p>
        <ul>
          <li>sexual content of any kind involving minors;</li>
          <li>instructions or materials intended to facilitate hacking, violence, self-harm, fraud, illegal drug use, or weapons manufacturing;</li>
          <li>private identifying information about another person (doxxing);</li>
          <li>malware, credential-harvesting tools, or destructive code; or</li>
          <li>spam, unauthorized advertising, or recruitment that evades SolveSprint safeguards.</li>
        </ul>
        <p>
          SolveSprint moderators may remove content that violates these standards
          without advance notice.
        </p>
      </LegalSection>

      <LegalSection id="s8" number={8} title="Reporting">
        <p>
          Report Code of Conduct violations, safety concerns, or suspected
          prohibited conduct to{" "}
          {LEGAL_META.safetyContact ? (
            <a href={`mailto:${LEGAL_META.safetyContact}`}>{LEGAL_META.safetyContact}</a>
          ) : (
            <a href="/legal#contact">SolveSprint</a>
          )}
          .
        </p>
        <p>
          If anyone is in immediate danger, contact local emergency services
          immediately.
        </p>
        <p>
          Reports are reviewed by SolveSprint safety administrators. SolveSprint
          will not retaliate against a person who makes a good-faith report.
          False or malicious reports may themselves be a violation of this Code.
        </p>
      </LegalSection>

      <LegalSection id="s9" number={9} title="Enforcement">
        <p>
          SolveSprint may, depending on the severity and nature of the violation:
        </p>
        <ul>
          <li>issue a warning;</li>
          <li>remove content;</li>
          <li>restrict account features;</li>
          <li>disqualify a challenge entry;</li>
          <li>suspend or permanently terminate an account;</li>
          <li>notify a student&apos;s guardian or school; or</li>
          <li>report conduct to law enforcement or child protective services.</li>
        </ul>
        <p>
          When feasible and safe, SolveSprint will explain the reason for an
          enforcement action and provide an opportunity to respond. Serious
          safety, exploitation, fraud, or legal concerns may require immediate
          action without advance notice.
        </p>
      </LegalSection>

      <LegalSection id="s10" number={10} title="Contact">
        <p>
          Safety and conduct concerns:{" "}
          {LEGAL_META.safetyContact ? (
            <a href={`mailto:${LEGAL_META.safetyContact}`}>{LEGAL_META.safetyContact}</a>
          ) : (
            <a href="/legal#contact">Contact SolveSprint</a>
          )}
        </p>
        <p>
          Legal and policy questions:{" "}
          {LEGAL_META.legalContact ? (
            <a href={`mailto:${LEGAL_META.legalContact}`}>{LEGAL_META.legalContact}</a>
          ) : (
            <a href="/legal#contact">Contact SolveSprint</a>
          )}
        </p>
      </LegalSection>
    </LegalPage>
  );
}
