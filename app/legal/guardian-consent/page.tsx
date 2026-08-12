import type { Metadata } from "next";
import { LegalPage, LegalSection, LegalCallout } from "@/components/legal-page";
import { LEGAL_META } from "@/lib/legal-meta";

export const metadata: Metadata = {
  title: "Parent or Guardian Consent and Minor Participation | SolveSprint",
  description:
    "How SolveSprint handles guardian approval for participants under 18, consent records, withdrawal rights, and privacy protections for minors.",
};

const TOC = [
  { id: "s1", label: "1. Who needs guardian approval" },
  { id: "s2", label: "2. What consent covers" },
  { id: "s3", label: "3. How approval is obtained" },
  { id: "s4", label: "4. Consent records" },
  { id: "s5", label: "5. Publicity and opt-in permissions" },
  { id: "s6", label: "6. Withdrawing consent" },
  { id: "s7", label: "7. Guardian access and deletion rights" },
  { id: "s8", label: "8. Children under 13" },
  { id: "s9", label: "9. Contacts" },
];

export default function GuardianConsentPage() {
  return (
    <LegalPage
      eyebrow="Participation"
      title="Parent or Guardian Consent and Minor Participation"
      summary="SolveSprint requires a parent or legal guardian to approve participation before a student under 18 may join a team or submit work. This page explains the consent process, what it covers, and how guardians may review, update, or withdraw permission."
      toc={TOC}
      meta={{
        version: LEGAL_META.version,
        effectiveDate: LEGAL_META.effectiveDate,
        lastUpdated: LEGAL_META.lastUpdated,
        contact: LEGAL_META.privacyContact,
        relatedLinks: [
          { href: "/privacy", label: "Privacy Policy" },
          { href: "/rules", label: "League Rules" },
          { href: "/terms", label: "Terms of Use" },
        ],
      }}
    >
      <LegalCallout variant="warning">
        This document is a counsel-review draft. It must not be published unchanged. All bracketed placeholders must be replaced, the guardian approval process must be fully operational, and qualified legal review must be completed before real student data or entries are accepted.
      </LegalCallout>

      <LegalSection id="s1" number={1} title="Who needs guardian approval">
        <p>
          Any student under 18 years old must have the affirmative approval of a
          parent or legal guardian before:
        </p>
        <ul>
          <li>joining a team in any SolveSprint challenge;</li>
          <li>submitting work to a challenge;</li>
          <li>appearing in any public recognition or portfolio display; or</li>
          <li>receiving a prize.</li>
        </ul>
        <p>
          A student who is 18 or older may participate without guardian approval
          but must still satisfy all age and eligibility requirements.
        </p>
        <p>
          Children under 13 may not create an account or provide personal
          information to SolveSprint under any circumstances.
        </p>
      </LegalSection>

      <LegalSection id="s2" number={2} title="What consent covers">
        <p>
          Guardian approval for a student under 18 covers participation in
          SolveSprint challenges, including:
        </p>
        <ul>
          <li>account creation and profile maintenance;</li>
          <li>joining and collaborating with a team;</li>
          <li>uploading and submitting challenge work;</li>
          <li>receiving evaluation and feedback from judges and hosts;</li>
          <li>receiving recognition, awards, and non-cash prizes; and</li>
          <li>
            communications through SolveSprint&apos;s moderated channels.
          </li>
        </ul>
        <p>
          Guardian approval for participation does <strong>not</strong>{" "}
          automatically authorize public display of the student&apos;s name,
          image, school, work, or quotations. Public publicity requires a
          separate, explicit, opt-in permission. See Section 5.
        </p>
        <p>
          Guardian approval does not cover physical events, travel, internships,
          or direct mentoring relationships outside the platform. These require
          separate agreements, screening, and safety review.
        </p>
      </LegalSection>

      <LegalSection id="s3" number={3} title="How approval is obtained">
        <p>
          SolveSprint uses a double-opt-in process for guardian approval:
        </p>
        <ul>
          <li>
            When a student under 18 registers, they provide a guardian&apos;s
            email address and their relationship to that guardian.
          </li>
          <li>
            SolveSprint sends a verification message to the guardian&apos;s
            email address containing a description of SolveSprint, a link to
            these policies, and a unique approval link.
          </li>
          <li>
            The guardian must affirmatively click the approval link and confirm
            their relationship and identity.
          </li>
          <li>
            Only after guardian approval is the student&apos;s account fully
            activated for team participation and submissions.
          </li>
        </ul>
        <p>
          SolveSprint does not rely solely on the student&apos;s self-report
          that a guardian has given permission.
        </p>
      </LegalSection>

      <LegalSection id="s4" number={4} title="Consent records">
        <p>
          For each approved minor participant, SolveSprint records:
        </p>
        <ul>
          <li>the guardian&apos;s email address;</li>
          <li>the guardian&apos;s stated relationship to the student;</li>
          <li>the exact version and text of the consent presented;</li>
          <li>the server timestamp when approval was given; and</li>
          <li>the IP address or other identity signal available at approval time.</li>
        </ul>
        <p>
          Consent records are retained for the duration of the student&apos;s
          account and for a reasonable period after account closure, as required
          for legal compliance, challenge integrity, and dispute resolution.
        </p>
      </LegalSection>

      <LegalSection id="s5" number={5} title="Publicity and opt-in permissions">
        <p>
          Public display of a minor student&apos;s name, image, voice, school
          reference, quotation, or challenge work is never automatic. A
          guardian must provide separate, affirmative permission that identifies:
        </p>
        <ul>
          <li>the exact content to be displayed;</li>
          <li>where it may appear (SolveSprint website, press release, social media, etc.);</li>
          <li>the duration of the permission; and</li>
          <li>how to withdraw permission for future use.</li>
        </ul>
        <p>
          Refusing publicity permission will not reduce a student&apos;s score,
          disqualify an otherwise eligible team, or affect prize eligibility.
        </p>
        <p>
          Withdrawal of publicity permission cannot always remove copies already
          lawfully printed or shared by a third party, but SolveSprint will stop
          new use within a reasonable period after receiving a written withdrawal.
        </p>
      </LegalSection>

      <LegalSection id="s6" number={6} title="Withdrawing consent">
        <p>
          A guardian may withdraw participation consent at any time by
          contacting{" "}
          {LEGAL_META.privacyContact ? (
            <a href={`mailto:${LEGAL_META.privacyContact}`}>{LEGAL_META.privacyContact}</a>
          ) : (
            <a href="/legal#contact">SolveSprint</a>
          )}
          .
        </p>
        <p>
          Withdrawal will deactivate the student&apos;s ability to join teams
          and submit work. It will not automatically invalidate challenge
          participation already completed in good faith before withdrawal.
          Submitted work that was accepted before withdrawal may be retained for
          challenge integrity, dispute resolution, legal compliance, or safety
          purposes as described in the Privacy Policy.
        </p>
        <p>
          If a student turns 18 while participating, guardian approval is no
          longer required for ongoing participation. The student may continue
          using their existing account.
        </p>
      </LegalSection>

      <LegalSection id="s7" number={7} title="Guardian access and deletion rights">
        <p>
          A verified guardian may request:
        </p>
        <ul>
          <li>access to a description of the personal information SolveSprint holds about their minor child;</li>
          <li>correction of inaccurate information;</li>
          <li>deletion of the student&apos;s account and personal information, subject to retention required for legal compliance and challenge integrity; and</li>
          <li>a copy of the consent record.</li>
        </ul>
        <p>
          SolveSprint will verify the guardian&apos;s identity and relationship
          before responding to these requests. Contact{" "}
          {LEGAL_META.privacyContact ? (
            <a href={`mailto:${LEGAL_META.privacyContact}`}>{LEGAL_META.privacyContact}</a>
          ) : (
            <a href="/legal#contact">SolveSprint</a>
          )}{" "}
          to make a request.
        </p>
      </LegalSection>

      <LegalSection id="s8" number={8} title="Children under 13">
        <p>
          SolveSprint does not knowingly collect personal information from
          children under 13. If SolveSprint discovers that a child under 13 has
          created an account, the account will be immediately deactivated and
          the associated personal information deleted, except for limited
          records needed to prevent future registration.
        </p>
        <p>
          If you believe a child under 13 has created a SolveSprint account,
          please contact{" "}
          {LEGAL_META.privacyContact ? (
            <a href={`mailto:${LEGAL_META.privacyContact}`}>{LEGAL_META.privacyContact}</a>
          ) : (
            <a href="/legal#contact">SolveSprint</a>
          )}
          {" "}immediately.
        </p>
      </LegalSection>

      <LegalSection id="s9" number={9} title="Contacts">
        <p>
          Privacy and guardian requests:{" "}
          {LEGAL_META.privacyContact ? (
            <a href={`mailto:${LEGAL_META.privacyContact}`}>{LEGAL_META.privacyContact}</a>
          ) : (
            <a href="/legal#contact">Contact SolveSprint</a>
          )}
        </p>
        <p>
          Youth safety concerns:{" "}
          {LEGAL_META.safetyContact ? (
            <a href={`mailto:${LEGAL_META.safetyContact}`}>{LEGAL_META.safetyContact}</a>
          ) : (
            <a href="/legal#contact">Contact SolveSprint</a>
          )}
        </p>
        <p>
          If anyone is in immediate danger, contact local emergency services.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
