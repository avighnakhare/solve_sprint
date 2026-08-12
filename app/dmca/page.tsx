import type { Metadata } from "next";
import { LegalPage, LegalSection, LegalCallout } from "@/components/legal-page";
import { LEGAL_META } from "@/lib/legal-meta";

export const metadata: Metadata = {
  title: "Intellectual Property, Submissions, Copyright & DMCA | SolveSprint",
  description:
    "Students retain ownership of their original challenge work. This page explains submission licenses, copyright policy, and how to submit a DMCA takedown notice.",
};

const TOC = [
  { id: "s1", label: "1. Student ownership" },
  { id: "s2", label: "2. Operating license" },
  { id: "s3", label: "3. Public display and marketing" },
  { id: "s4", label: "4. Host IP rights" },
  { id: "s5", label: "5. Third-party material in submissions" },
  { id: "s6", label: "6. No confidentiality" },
  { id: "s7", label: "7. DMCA takedown notices" },
  { id: "s8", label: "8. Counter-notification" },
  { id: "s9", label: "9. Repeat infringement" },
  { id: "s10", label: "10. Contact" },
];

export default function DmcaPage() {
  return (
    <LegalPage
      eyebrow="Participation"
      title="Intellectual Property, Submissions, Copyright & DMCA"
      summary="Students retain full ownership of their original challenge submissions. SolveSprint and hosts receive only the limited operating licenses described below. This page also explains how to report copyright infringement under the DMCA."
      toc={TOC}
      meta={{
        version: LEGAL_META.version,
        effectiveDate: LEGAL_META.effectiveDate,
        lastUpdated: LEGAL_META.lastUpdated,
        contact: LEGAL_META.copyrightContact,
        relatedLinks: [
          { href: "/rules", label: "League Rules" },
          { href: "/terms", label: "Terms of Use" },
          { href: "/legal", label: "Legal & Safety" },
        ],
      }}
    >
      <LegalCallout variant="warning">
        This document is a counsel-review draft. It must not be published unchanged. The DMCA designated agent must be registered with the U.S. Copyright Office and confirmed before this policy is published.
      </LegalCallout>

      <LegalSection id="s1" number={1} title="Student ownership">
        <p>
          Students and teams keep ownership of their original submission content.
          Submitting work to a SolveSprint challenge does not transfer ownership
          to SolveSprint, to the challenge host, or to any other party.
        </p>
        <p>
          This ownership principle applies to all original text, code, designs,
          presentations, videos, images, and other creative work included in a
          submission.
        </p>
      </LegalSection>

      <LegalSection id="s2" number={2} title="Operating license">
        <p>
          By submitting work to a challenge, each contributing student grants
          SolveSprint a{" "}
          <strong>nonexclusive, worldwide, royalty-free license</strong> to host,
          copy, convert, privately display, transmit, back up, and share the
          submission with authorized administrators, judges, and the relevant host
          solely to:
        </p>
        <ul>
          <li>operate, secure, and administer the challenge;</li>
          <li>deliver evaluation and feedback to the team;</li>
          <li>
            retain required backup and evidence records for results, disputes,
            safety, fraud prevention, tax compliance, and legal compliance.
          </li>
        </ul>
        <p>
          This operating license ends when the submission and required backups are
          deleted, except for limited records retained for the purposes above.
        </p>
      </LegalSection>

      <LegalSection id="s3" number={3} title="Public display and marketing">
        <p>
          The operating license described in Section 2 does{" "}
          <strong>not</strong> authorize:
        </p>
        <ul>
          <li>public display of a submission;</li>
          <li>use of a submission in marketing, advertising, or promotional materials;</li>
          <li>publication of a student&apos;s name, image, school, or quotation; or</li>
          <li>creation of a public portfolio entry.</li>
        </ul>
        <p>
          These uses require a separate, explicit, opt-in permission from the
          student. For a minor, the parent or guardian must also approve. Refusing
          publicity permission does not affect scoring or prize eligibility.
        </p>
      </LegalSection>

      <LegalSection id="s4" number={4} title="Host IP rights">
        <p>
          A host organization receives the same limited, nonexclusive evaluation
          license described in Section 2. A host receives no ownership, exclusive
          license, assignment, first-look right, patent right, or implementation
          right over any submission unless:
        </p>
        <ul>
          <li>the applicable Challenge Official Rules state the exact right clearly and in plain language;</li>
          <li>those rules have been separately reviewed by counsel; and</li>
          <li>each affected student (and guardian, for a minor) has given specific, affirmative consent.</li>
        </ul>
        <p>
          Host IP rights may not be implied by a general platform policy or buried
          in a challenge brief.
        </p>
      </LegalSection>

      <LegalSection id="s5" number={5} title="Third-party material in submissions">
        <p>
          Teams are responsible for ensuring their submissions do not infringe
          copyright, trademark, patent, publicity, privacy, or other rights.
          Submissions must not:
        </p>
        <ul>
          <li>copy protected text, images, music, video, software, or data without permission or a valid legal basis;</li>
          <li>remove attribution or license notices; or</li>
          <li>include material covered by a nondisclosure agreement the team is not authorized to disclose.</li>
        </ul>
        <p>
          Open-source software, Creative Commons material, and public datasets may
          be used when the applicable Challenge Rules permit them and the team
          follows the applicable license. The submission must include a sources and
          licenses list.
        </p>
      </LegalSection>

      <LegalSection id="s6" number={6} title="No confidentiality">
        <p>
          SolveSprint challenges are not a confidential-disclosure channel.
          Students must not submit trade secrets, unreleased inventions requiring
          secrecy, private client data, medical records, passwords, security keys,
          or information covered by a nondisclosure agreement.
        </p>
        <p>
          If a host needs confidential submissions, that challenge requires a
          separate attorney-reviewed process and may not use the standard pilot
          rules.
        </p>
      </LegalSection>

      <LegalSection id="s7" number={7} title="DMCA takedown notices">
        <p>
          If you believe that material hosted on SolveSprint infringes your
          copyright under the Digital Millennium Copyright Act (DMCA), you may
          submit a written notice to SolveSprint&apos;s designated DMCA agent.
        </p>
        <p>A valid DMCA takedown notice must include:</p>
        <ul>
          <li>
            identification of the copyrighted work you claim has been infringed
            (or a representative list if multiple works are at issue);
          </li>
          <li>
            identification of the allegedly infringing material and enough
            information for SolveSprint to locate it (such as a URL);
          </li>
          <li>
            your name, mailing address, telephone number, and email address;
          </li>
          <li>
            a statement that you have a good-faith belief that the use of the
            material is not authorized by the copyright owner, its agent, or the
            law;
          </li>
          <li>
            a statement under penalty of perjury that the information in the notice
            is accurate and that you are the copyright owner or authorized to act
            on the owner&apos;s behalf; and
          </li>
          <li>your electronic or physical signature.</li>
        </ul>
        <LegalCallout variant="important">
          The DMCA designated agent address has not yet been confirmed. Do not publish this section with a fabricated agent name, phone number, or mailing address. Fill in the confirmed details from the DMCA Agent Registration before publication. Contact{" "}
          {LEGAL_META.copyrightContact ? (
            <a href={`mailto:${LEGAL_META.copyrightContact}`}>{LEGAL_META.copyrightContact}</a>
          ) : (
            <a href="/legal#contact">SolveSprint</a>
          )}{" "}
          to report copyright concerns in the meantime.
        </LegalCallout>
      </LegalSection>

      <LegalSection id="s8" number={8} title="Counter-notification">
        <p>
          If your content was removed because of a DMCA notice you believe was
          incorrect, you may submit a counter-notification. A valid
          counter-notification must include:
        </p>
        <ul>
          <li>identification of the removed material and its location before removal;</li>
          <li>a statement under penalty of perjury that you have a good-faith belief the material was removed by mistake or misidentification;</li>
          <li>
            your name, address, and telephone number, and a statement that you
            consent to jurisdiction in the federal district where your address is
            located; and
          </li>
          <li>your electronic or physical signature.</li>
        </ul>
        <p>
          SolveSprint will forward a valid counter-notification to the party that
          submitted the original takedown notice. The original complainant then
          has 10 business days to file a court action before the content may be
          restored.
        </p>
      </LegalSection>

      <LegalSection id="s9" number={9} title="Repeat infringement">
        <p>
          SolveSprint will terminate accounts of users who are found to be repeat
          copyright infringers in appropriate circumstances, as required by 17
          U.S.C. § 512(i).
        </p>
      </LegalSection>

      <LegalSection id="s10" number={10} title="Contact">
        <p>
          Copyright and DMCA notices:{" "}
          {LEGAL_META.copyrightContact ? (
            <a href={`mailto:${LEGAL_META.copyrightContact}`}>{LEGAL_META.copyrightContact}</a>
          ) : (
            <a href="/legal#contact">Contact SolveSprint</a>
          )}
        </p>
        <p>
          Legal questions:{" "}
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
