import type { Metadata } from "next";
import { LegalPage, LegalSection, LegalCallout } from "@/components/legal-page";
import { LEGAL_META } from "@/lib/legal-meta";

export const metadata: Metadata = {
  title: "Security Reporting | SolveSprint",
  description:
    "How to responsibly disclose a security vulnerability or potential data exposure to the SolveSprint security team.",
};

const TOC = [
  { id: "s1", label: "1. Our commitment" },
  { id: "s2", label: "2. What to report" },
  { id: "s3", label: "3. How to report" },
  { id: "s4", label: "4. What to expect" },
  { id: "s5", label: "5. Rules of engagement" },
  { id: "s6", label: "6. Out of scope" },
];

export default function SecurityReportingPage() {
  return (
    <LegalPage
      eyebrow="Privacy and Trust"
      title="Security Reporting"
      summary="SolveSprint takes the security and privacy of its users seriously. If you discover a vulnerability or potential data exposure, we encourage you to report it responsibly. This page explains how."
      toc={TOC}
      meta={{
        version: LEGAL_META.version,
        effectiveDate: LEGAL_META.effectiveDate,
        lastUpdated: LEGAL_META.lastUpdated,
        contact: LEGAL_META.securityContact,
        relatedLinks: [
          { href: "/privacy", label: "Privacy Policy" },
          { href: "/legal", label: "Legal & Safety" },
        ],
      }}
    >
      <LegalCallout variant="important">
        This page contains only the public-facing vulnerability-reporting information. SolveSprint&apos;s internal incident response procedures are not published here.
      </LegalCallout>

      <LegalSection id="s1" number={1} title="Our commitment">
        <p>
          SolveSprint is committed to responsible security practices. We protect
          student accounts, submission content, and personal information as a core
          obligation. We welcome good-faith security research and responsible
          disclosure.
        </p>
        <p>
          We will not pursue legal action against researchers who discover and
          report security issues responsibly in accordance with this policy.
        </p>
      </LegalSection>

      <LegalSection id="s2" number={2} title="What to report">
        <p>
          We want to know about:
        </p>
        <ul>
          <li>vulnerabilities that allow unauthorized access to user accounts or private data;</li>
          <li>cross-site scripting (XSS), SQL injection, or other injection vulnerabilities;</li>
          <li>authentication or session-management flaws;</li>
          <li>insecure direct object references or broken access controls;</li>
          <li>sensitive data exposed in API responses, error messages, or logs;</li>
          <li>cross-site request forgery (CSRF) vulnerabilities; and</li>
          <li>any other issue that could compromise user privacy or platform integrity.</li>
        </ul>
      </LegalSection>

      <LegalSection id="s3" number={3} title="How to report">
        <p>
          Send a report to:{" "}
          {LEGAL_META.securityContact ? (
            <a href={`mailto:${LEGAL_META.securityContact}`}>{LEGAL_META.securityContact}</a>
          ) : (
            <a href="/legal#contact">Contact SolveSprint</a>
          )}
        </p>
        <p>
          Please include in your report:
        </p>
        <ul>
          <li>a clear description of the vulnerability;</li>
          <li>the URL, endpoint, or component affected;</li>
          <li>step-by-step instructions to reproduce the issue;</li>
          <li>the potential impact (what an attacker could accomplish);</li>
          <li>screenshots or a proof-of-concept, if helpful; and</li>
          <li>your contact information, if you would like a response.</li>
        </ul>
        <p>
          You may submit your report in plain text or encrypted email. If you
          would like to use PGP encryption, contact us first to request our
          public key.
        </p>
      </LegalSection>

      <LegalSection id="s4" number={4} title="What to expect">
        <p>
          After receiving your report, SolveSprint will:
        </p>
        <ul>
          <li>acknowledge receipt of your report;</li>
          <li>investigate and assess the reported vulnerability;</li>
          <li>keep you informed of our progress if you have provided contact information; and</li>
          <li>notify you when the issue has been addressed.</li>
        </ul>
        <LegalCallout variant="note">
          We do not currently offer a paid bug-bounty program. We are grateful for good-faith reports and will acknowledge researchers&apos; contributions where appropriate and with their permission.
        </LegalCallout>
        <p>
          We do not commit to specific response timelines because the time to
          investigate and resolve a vulnerability depends on its complexity and
          scope.
        </p>
      </LegalSection>

      <LegalSection id="s5" number={5} title="Rules of engagement">
        <p>
          When researching and reporting security issues, please:
        </p>
        <ul>
          <li>
            <strong>Do not access, download, modify, or delete</strong> data
            belonging to other users. Stop testing as soon as you can demonstrate
            the vulnerability.
          </li>
          <li>
            <strong>Do not disrupt</strong> platform availability or the
            experience of other users.
          </li>
          <li>
            <strong>Do not perform social engineering</strong> against SolveSprint
            staff, students, or users.
          </li>
          <li>
            <strong>Do not publish</strong> vulnerability details publicly before
            giving SolveSprint a reasonable opportunity to investigate and respond.
          </li>
          <li>
            <strong>Do use</strong> test accounts you own and control when possible.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="s6" number={6} title="Out of scope">
        <p>
          The following issues are generally out of scope for this policy:
        </p>
        <ul>
          <li>vulnerabilities in third-party services that SolveSprint does not control;</li>
          <li>spam or social-engineering attacks not involving a technical platform flaw;</li>
          <li>denial-of-service attacks;</li>
          <li>issues that require physical access to a user&apos;s device; and</li>
          <li>reports generated by automated scanners without manual verification.</li>
        </ul>
        <p>
          If you are unsure whether an issue is in scope, please report it anyway
          — we would rather investigate and dismiss a false positive than miss a
          real vulnerability.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
