import type { Metadata } from "next";
import { LegalPage, LegalSection, LegalCallout } from "@/components/legal-page";
import { LEGAL_META } from "@/lib/legal-meta";

export const metadata: Metadata = {
  title: "Judge Agreement and Conflict-of-Interest Disclosure | SolveSprint",
  description:
    "Obligations, confidentiality duties, and conflict-of-interest rules for individuals serving as challenge judges on SolveSprint.",
};

const TOC = [
  { id: "s1", label: "1. Who this agreement applies to" },
  { id: "s2", label: "2. Role and duties" },
  { id: "s3", label: "3. Conflict-of-interest disclosure" },
  { id: "s4", label: "4. Confidentiality" },
  { id: "s5", label: "5. Student safety" },
  { id: "s6", label: "6. Data access and use" },
  { id: "s7", label: "7. Scoring and impartiality" },
  { id: "s8", label: "8. Prohibited conduct" },
  { id: "s9", label: "9. Enforcement" },
  { id: "s10", label: "10. Integration point" },
  { id: "s11", label: "11. Contact" },
];

export default function JudgeAgreementPage() {
  return (
    <LegalPage
      eyebrow="Platform Terms and Role Agreements"
      title="Judge Agreement and Conflict-of-Interest Disclosure"
      summary="Individuals serving as judges in SolveSprint challenges accept obligations of impartiality, confidentiality, conflict disclosure, and student safety. This document explains those duties and the process for disclosing and managing conflicts."
      toc={TOC}
      meta={{
        version: LEGAL_META.version,
        effectiveDate: LEGAL_META.effectiveDate,
        lastUpdated: LEGAL_META.lastUpdated,
        contact: LEGAL_META.legalContact,
        relatedLinks: [
          { href: "/rules", label: "League Rules" },
          { href: "/terms", label: "Terms of Use" },
          { href: "/legal/host-agreement", label: "Host Organization Agreement" },
          { href: "/legal", label: "Legal & Safety" },
        ],
      }}
    >
      <LegalCallout variant="warning">
        This document is a counsel-review draft. It must not be published unchanged. All placeholders must be filled and qualified legal review must be completed before judges are given access to student submissions. Agreement acceptance is not yet connected to the onboarding flow — see Section 10.
      </LegalCallout>

      <LegalSection id="s1" number={1} title="Who this agreement applies to">
        <p>
          This agreement applies to every individual who:
        </p>
        <ul>
          <li>
            is nominated, appointed, or invited to serve as a judge for any
            SolveSprint challenge; or
          </li>
          <li>
            accesses student submission content or scoring tools through
            SolveSprint in a judging capacity.
          </li>
        </ul>
        <p>
          Judges must be at least 18 years old. This agreement supplements the{" "}
          <a href="/terms">Terms of Use</a> and the <a href="/rules">League Rules</a>.
        </p>
      </LegalSection>

      <LegalSection id="s2" number={2} title="Role and duties">
        <p>
          A judge&apos;s role is to evaluate eligible entries using the published
          rubric and scoring criteria for the assigned challenge. Judges are
          expected to:
        </p>
        <ul>
          <li>
            read and understand the Official Rules and rubric for each assigned
            challenge before scoring begins;
          </li>
          <li>
            score entries promptly within the announced judging period;
          </li>
          <li>
            apply the published criteria consistently and impartially across all
            assigned entries;
          </li>
          <li>
            disclose conflicts before scoring, not after scores are submitted;
            and
          </li>
          <li>
            recuse themselves from scoring any entry where impartiality could
            reasonably be questioned.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="s3" number={3} title="Conflict-of-interest disclosure">
        <p>
          A judge must disclose and, where applicable, recuse themselves from
          scoring any entry submitted by:
        </p>
        <ul>
          <li>a student they know personally;</li>
          <li>a family or household member;</li>
          <li>a student they teach, coach, or mentor;</li>
          <li>a student from their employer&apos;s organization; or</li>
          <li>
            any team where the judge has provided substantial direct assistance
            with the submission.
          </li>
        </ul>
        <p>
          Judges must also disclose any financial interest, employment
          relationship, or other connection to the challenge sponsor, host
          organization, or prize provider that could affect their impartiality.
        </p>
        <p>
          Conflict disclosures are made to SolveSprint, which will assign a
          replacement judge according to a documented procedure. Undisclosed
          conflicts are grounds for score removal, judge termination, and
          disqualification of affected entries if the conflict materially
          affected scoring.
        </p>
      </LegalSection>

      <LegalSection id="s4" number={4} title="Confidentiality">
        <p>
          Judges must keep all submission content, team identities, and scoring
          deliberations confidential during and after the judging period, except
          as required by SolveSprint for results announcements or appeals.
        </p>
        <p>
          Judges may not:
        </p>
        <ul>
          <li>
            discuss individual submissions, scores, or deliberations with
            anyone outside the official judging process;
          </li>
          <li>
            copy, share, publish, or use student submission content for any
            purpose outside challenge evaluation;
          </li>
          <li>
            contact a student about their submission outside SolveSprint&apos;s
            official feedback channels; or
          </li>
          <li>
            use student ideas, designs, code, or research for the
            judge&apos;s own commercial or professional benefit.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="s5" number={5} title="Student safety">
        <p>
          Judges must communicate with students only through moderator-visible
          SolveSprint channels. Judges may not:
        </p>
        <ul>
          <li>
            request a student&apos;s personal phone number, home address,
            government ID, or social-media handle;
          </li>
          <li>
            move a conversation with a student to a private external platform;
          </li>
          <li>
            privately promise a job offer, internship, travel, financial
            benefit, or off-platform arrangement to a student; or
          </li>
          <li>
            arrange an unsupervised in-person meeting with a student through
            SolveSprint.
          </li>
        </ul>
        <p>
          Report safety concerns to{" "}
          {LEGAL_META.safetyContact ? (
            <a href={`mailto:${LEGAL_META.safetyContact}`}>{LEGAL_META.safetyContact}</a>
          ) : (
            <a href="/legal#contact">SolveSprint</a>
          )}
          .
        </p>
      </LegalSection>

      <LegalSection id="s6" number={6} title="Data access and use">
        <p>
          Judges may access only the submission content and team information
          assigned to them for scoring. Judges may not:
        </p>
        <ul>
          <li>
            access or attempt to access submissions not assigned to them;
          </li>
          <li>
            retain copies of student submissions after the judging period ends;
          </li>
          <li>
            use student information for recruiting, marketing, profiling, or
            any purpose other than challenge evaluation; or
          </li>
          <li>share student information with third parties.</li>
        </ul>
        <p>
          Judges must promptly report any suspected unauthorized access or data
          exposure to{" "}
          {LEGAL_META.securityContact ? (
            <a href={`mailto:${LEGAL_META.securityContact}`}>{LEGAL_META.securityContact}</a>
          ) : (
            <a href="/legal#contact">SolveSprint</a>
          )}
          .
        </p>
      </LegalSection>

      <LegalSection id="s7" number={7} title="Scoring and impartiality">
        <p>
          Judges must apply the published rubric criteria honestly and
          consistently. A judge may not:
        </p>
        <ul>
          <li>accept a gift, payment, or benefit in exchange for a favorable score;</li>
          <li>collude with other judges to predetermine outcomes;</li>
          <li>manipulate scores to influence team rankings;</li>
          <li>score an entry they have not reviewed; or</li>
          <li>retaliate against a team for a good-faith appeal or complaint.</li>
        </ul>
        <p>
          SolveSprint may normalize scores, remove an ineligible score, or
          assign a replacement judge according to a documented procedure.
          Judging involves reasonable professional judgment. An appeal may
          challenge only a claimed process error, arithmetic error, conflict, or
          eligibility mistake — not a good-faith difference of opinion.
        </p>
      </LegalSection>

      <LegalSection id="s8" number={8} title="Prohibited conduct">
        <p>
          Judges may not engage in or facilitate:
        </p>
        <ul>
          <li>grooming, harassment, bullying, or exploitation of any student;</li>
          <li>
            plagiarism, unauthorized use, or misappropriation of student work;
          </li>
          <li>
            false claims of endorsement, school affiliation, or professional
            credentials; or
          </li>
          <li>
            any conduct that violates the <a href="/code-of-conduct">Code of Conduct</a>,
            the <a href="/rules">League Rules</a>, or applicable law.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="s9" number={9} title="Enforcement">
        <p>
          SolveSprint may immediately revoke a judge&apos;s access, remove their
          scores, and report their conduct if they violate this agreement.
          SolveSprint may preserve evidence and notify affected students,
          guardians, or authorities when required.
        </p>
        <p>
          Termination of the judging role does not release a judge from
          confidentiality obligations or liability for prior misconduct.
        </p>
      </LegalSection>

      <LegalSection id="s10" number={10} title="Integration point">
        <LegalCallout variant="important">
          <strong>Integration point for future implementation:</strong> Agreement acceptance has not yet been connected to the judge onboarding or assignment workflow. Before judges are given access to student submissions, the system must record that the individual reviewed and accepted this agreement, the document version presented, and the server timestamp of acceptance. Do not display this agreement as accepted until that record exists.
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
