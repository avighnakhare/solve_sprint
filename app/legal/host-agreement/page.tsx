import type { Metadata } from "next";
import { LegalPage, LegalSection, LegalCallout } from "@/components/legal-page";
import { LEGAL_META } from "@/lib/legal-meta";

export const metadata: Metadata = {
  title: "Host Organization Agreement | SolveSprint",
  description:
    "The additional duties, representations, and restrictions that apply to organizations proposing and administering SolveSprint challenges.",
};

const TOC = [
  { id: "s1", label: "1. Who this agreement applies to" },
  { id: "s2", label: "2. Challenge proposal and approval" },
  { id: "s3", label: "3. Truthfulness and authority" },
  { id: "s4", label: "4. Student safety and communications" },
  { id: "s5", label: "5. Data access and restrictions" },
  { id: "s6", label: "6. Prizes and funding" },
  { id: "s7", label: "7. Intellectual property" },
  { id: "s8", label: "8. Prohibited conduct" },
  { id: "s9", label: "9. Enforcement and termination" },
  { id: "s10", label: "10. Integration point" },
  { id: "s11", label: "11. Contact" },
];

export default function HostAgreementPage() {
  return (
    <LegalPage
      eyebrow="Platform Terms and Role Agreements"
      title="Host Organization Agreement"
      summary="Organizations that propose and administer challenges on SolveSprint accept additional duties, safety obligations, data restrictions, and prize commitments beyond the standard Terms of Use."
      toc={TOC}
      meta={{
        version: LEGAL_META.version,
        effectiveDate: LEGAL_META.effectiveDate,
        lastUpdated: LEGAL_META.lastUpdated,
        contact: LEGAL_META.legalContact,
        relatedLinks: [
          { href: "/terms", label: "Terms of Use" },
          { href: "/rules", label: "League Rules" },
          { href: "/legal/judge-agreement", label: "Judge Agreement" },
          { href: "/legal", label: "Legal & Safety" },
        ],
      }}
    >
      <LegalCallout variant="warning">
        This document is a counsel-review draft. It must not be published unchanged. All placeholders must be filled, and qualified legal review must be completed before organizations are onboarded or challenges are published. Agreement acceptance is not yet connected to the onboarding flow — see Section 10.
      </LegalCallout>

      <LegalSection id="s1" number={1} title="Who this agreement applies to">
        <p>
          This agreement applies to any organization or representative who
          submits a challenge proposal to SolveSprint, whose challenge is
          approved for publication, or who accesses submission, team, or
          student information through SolveSprint.
        </p>
        <p>
          The individual accepting this agreement on behalf of an organization
          represents that they are at least 18 years old and have authority to
          bind the organization to these terms.
        </p>
        <p>
          This agreement supplements the{" "}
          <a href="/terms">Terms of Use</a> and the{" "}
          <a href="/rules">League Rules</a>. In the event of conflict, the Terms
          of Use control general platform matters; this agreement controls
          host-specific obligations.
        </p>
      </LegalSection>

      <LegalSection id="s2" number={2} title="Challenge proposal and approval">
        <p>
          SolveSprint manually reviews every proposed challenge before approving
          it for publication. A host is responsible for:
        </p>
        <ul>
          <li>
            submitting an accurate, complete, and age-appropriate challenge
            brief;
          </li>
          <li>
            publishing Official Rules that satisfy the requirements of the
            League Rules before registration opens;
          </li>
          <li>
            communicating material changes clearly to registered teams and not
            unfairly disadvantaging teams that relied on the original rules; and
          </li>
          <li>
            providing accurate information about judging commitments, prize
            availability, and organizational authority.
          </li>
        </ul>
        <p>
          SolveSprint may reject, modify, or revoke approval for any challenge
          that does not meet platform standards, violates applicable law, or
          creates unreasonable risk to students.
        </p>
      </LegalSection>

      <LegalSection id="s3" number={3} title="Truthfulness and authority">
        <p>
          The host represents and warrants that:
        </p>
        <ul>
          <li>
            it has the legal authority to sponsor the challenge and deliver the
            stated prize;
          </li>
          <li>
            the challenge brief, problem statement, and deliverable requirements
            are accurate and not misleading;
          </li>
          <li>
            no false claims of school affiliation, government endorsement,
            partnership, or certification are made; and
          </li>
          <li>
            it will promptly notify SolveSprint if any representation becomes
            inaccurate during the challenge.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="s4" number={4} title="Student safety and communications">
        <p>
          Host representatives who communicate with student participants must:
        </p>
        <ul>
          <li>
            use only moderator-visible SolveSprint channels for challenge-related
            communications;
          </li>
          <li>
            not request a student&apos;s personal phone number, home address,
            government ID, or social-media handle;
          </li>
          <li>
            not move a conversation to a private external platform or personal
            account;
          </li>
          <li>
            not privately promise a job offer, internship, travel, financial
            benefit, or off-platform arrangement to a student; and
          </li>
          <li>
            include a parent, guardian, teacher, or SolveSprint moderator when
            direct communication with a minor is genuinely necessary.
          </li>
        </ul>
        <p>
          Physical events, travel, and direct mentoring relationships require
          separate agreements, guardian permission, appropriate screening, and
          safety planning.
        </p>
      </LegalSection>

      <LegalSection id="s5" number={5} title="Data access and restrictions">
        <p>
          A host may access only the team and submission information necessary to
          administer its approved challenge. Hosts may not:
        </p>
        <ul>
          <li>
            use student information for marketing, recruitment, profiling, or
            any purpose unrelated to the approved challenge;
          </li>
          <li>
            retain, copy, export, or share student information beyond what is
            needed for challenge evaluation and prize administration;
          </li>
          <li>
            contact students outside the SolveSprint platform using information
            obtained through SolveSprint; or
          </li>
          <li>sell, license, or transfer student data to any third party.</li>
        </ul>
        <p>
          Hosts must promptly report any suspected data breach or unauthorized
          access to{" "}
          {LEGAL_META.securityContact ? (
            <a href={`mailto:${LEGAL_META.securityContact}`}>{LEGAL_META.securityContact}</a>
          ) : (
            <a href="/legal#contact">SolveSprint</a>
          )}
          .
        </p>
      </LegalSection>

      <LegalSection id="s6" number={6} title="Prizes and funding">
        <p>
          Before a challenge with prizes may be published, the host must confirm
          to SolveSprint&apos;s satisfaction that:
        </p>
        <ul>
          <li>the prize is fully funded and available for delivery;</li>
          <li>
            the lawful entity responsible for payment is identified and has
            authorized the prize;
          </li>
          <li>
            the approximate retail value of each prize is disclosed in the
            Official Rules; and
          </li>
          <li>
            winner verification, guardian-signature requirements, and lawful
            tax-reporting obligations have been reviewed.
          </li>
        </ul>
        <p>
          A host that fails to deliver a stated prize remains responsible for
          that obligation. SolveSprint will take reasonable administrative steps
          but is not the guarantor of host prize obligations.
        </p>
        <p>
          No winner may be required to pay SolveSprint or the host to claim a
          prize.
        </p>
      </LegalSection>

      <LegalSection id="s7" number={7} title="Intellectual property">
        <p>
          Students retain ownership of their original work. Hosts receive only
          the limited, nonexclusive, royalty-free license set out in the League
          Rules to receive, copy, format, privately display, and evaluate
          submissions solely to administer the challenge.
        </p>
        <p>
          A host that seeks an exclusive license, assignment, first-look right,
          patent right, or implementation right must disclose this clearly and
          prominently before registration and obtain counsel-reviewed student and
          guardian consent through a process separately approved by SolveSprint.
          Such terms may not be hidden in a general platform policy.
        </p>
        <p>
          Hosts may not claim ownership of or commercialize any submission
          without a separately signed, reviewed agreement with the submitting
          students and their guardians.
        </p>
      </LegalSection>

      <LegalSection id="s8" number={8} title="Prohibited conduct">
        <p>
          Hosts may not use SolveSprint to:
        </p>
        <ul>
          <li>obtain unpaid production labor from minor students;</li>
          <li>
            require dangerous, illegal, medical, financial, adult, or
            privacy-invasive activity in a challenge brief;
          </li>
          <li>
            falsely imply school endorsement, government approval, or platform
            certification;
          </li>
          <li>engage in or facilitate grooming, harassment, or exploitation; or</li>
          <li>
            offer or accept a gift, payment, or benefit in exchange for
            preferential treatment in judging or challenge approval.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="s9" number={9} title="Enforcement and termination">
        <p>
          SolveSprint may immediately suspend or revoke a host&apos;s access if
          the host violates this agreement, the Terms of Use, the League Rules,
          or applicable law. SolveSprint may:
        </p>
        <ul>
          <li>remove a challenge from publication;</li>
          <li>preserve evidence for investigation;</li>
          <li>notify affected students and guardians; and</li>
          <li>contact authorities when required by law or necessary to protect students.</li>
        </ul>
        <p>
          Termination does not relieve a host of obligations to deliver prizes
          already committed or to comply with data-protection requirements for
          information already received.
        </p>
      </LegalSection>

      <LegalSection id="s10" number={10} title="Integration point">
        <LegalCallout variant="important">
          <strong>Integration point for future implementation:</strong> Agreement acceptance has not yet been connected to the host onboarding or challenge-proposal workflow. Before hosts are permitted to access student submission data or publish live challenges, the onboarding flow must record that the representative reviewed and accepted this agreement, the document version presented, and the server timestamp of acceptance. Do not display this agreement as accepted until that record exists.
        </LegalCallout>
      </LegalSection>

      <LegalSection id="s11" number={11} title="Contact">
        <p>
          Questions about this agreement:{" "}
          {LEGAL_META.legalContact ? (
            <a href={`mailto:${LEGAL_META.legalContact}`}>{LEGAL_META.legalContact}</a>
          ) : (
            <a href="/legal#contact">Contact SolveSprint</a>
          )}
        </p>
        <p>
          Safety concerns:{" "}
          {LEGAL_META.safetyContact ? (
            <a href={`mailto:${LEGAL_META.safetyContact}`}>{LEGAL_META.safetyContact}</a>
          ) : (
            <a href="/legal#contact">Contact SolveSprint</a>
          )}
        </p>
      </LegalSection>
    </LegalPage>
  );
}
