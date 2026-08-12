import type { Metadata } from "next";
import { LegalPage, LegalSection, LegalCallout } from "@/components/legal-page";
import { LEGAL_META } from "@/lib/legal-meta";

export const metadata: Metadata = {
  title: "Cookie Policy | SolveSprint™",
  description:
    "Information on cookie use, third-party form cookies, and privacy controls on the SolveSprint website.",
};

const TOC = [
  { id: "s1", label: "1. Overview" },
  { id: "s2", label: "2. No Advertising or Behavioral Cookies" },
  { id: "s3", label: "3. Third-Party Forms (Google Forms)" },
  { id: "s4", label: "4. Cookie Controls & Contact" },
];

export default function CookiePolicyPage() {
  return (
    <LegalPage
      eyebrow="Privacy and Trust"
      title="Cookie Notice"
      summary="SolveSprint is an informational website supporting in-person student innovation events. We do not use advertising cookies, data brokers, or invasive tracking scripts."
      toc={TOC}
      meta={{
        version: LEGAL_META.version,
        effectiveDate: LEGAL_META.effectiveDate,
        lastUpdated: LEGAL_META.lastUpdated,
        contact: LEGAL_META.privacyContact,
        relatedLinks: [
          { href: "/privacy", label: "Privacy Policy" },
          { href: "/terms", label: "Terms of Use" },
          { href: "/legal", label: "Legal & Safety" },
        ],
      }}
    >
      <LegalCallout variant="warning">
        This document details cookie practices for the SolveSprint informational website. Qualified legal counsel should review before production deployment.
      </LegalCallout>

      <LegalSection id="s1" number={1} title="Overview">
        <p>
          Cookies are small text files stored on your browser. SolveSprint operates as an informational website for in-person student innovation events and does not require user account logins or store session authentication cookies for general website visitors.
        </p>
      </LegalSection>

      <LegalSection id="s2" number={2} title="No Advertising or Behavioral Cookies">
        <p>
          SolveSprint does not use Google Analytics, Facebook Pixels, behavioral tracking cookies, cross-site ad networks, or data brokers.
        </p>
      </LegalSection>

      <LegalSection id="s3" number={3} title="Third-Party Forms (Google Forms)">
        <p>
          When you click to access or fill out a SolveSprint interest form hosted by Google Forms (Google LLC), Google may set essential operational cookies on its domain. These cookies are subject to Google&apos;s Privacy Policy and Cookie Policy.
        </p>
      </LegalSection>

      <LegalSection id="s4" number={4} title="Cookie Controls & Contact">
        <p>
          You can block or clear cookies at any time using your web browser settings. For questions regarding our privacy practices, contact our team via the <a href="/get-involved">Get Involved page</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
