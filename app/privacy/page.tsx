import type { Metadata } from "next";
import { LegalPage, LegalSection, LegalCallout } from "@/components/legal-page";
import { LEGAL_META } from "@/lib/legal-meta";

export const metadata: Metadata = {
  title: "Privacy Policy | SolveSprint™",
  description:
    "Information on how SolveSprint collects, uses, and protects personal data submitted through interest forms for in-person student innovation events.",
};

const TOC = [
  { id: "s1", label: "1. Scope & Operating Model" },
  { id: "s2", label: "2. Information Collected via Interest Forms" },
  { id: "s3", label: "3. How Information is Used" },
  { id: "s4", label: "4. Third-Party Forms & Service Providers" },
  { id: "s5", label: "5. Student & Minor Privacy" },
  { id: "s6", label: "6. Children Under 13" },
  { id: "s7", label: "7. Data Retention & Security" },
  { id: "s8", label: "8. Your Rights & Contact" },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy and Trust"
      title="Privacy Policy"
      summary="A plain-language description of how SolveSprint collects, uses, and protects personal information submitted through event interest forms for our in-person student innovation competitions."
      toc={TOC}
      meta={{
        version: LEGAL_META.version,
        effectiveDate: LEGAL_META.effectiveDate,
        lastUpdated: LEGAL_META.lastUpdated,
        contact: LEGAL_META.privacyContact,
        relatedLinks: [
          { href: "/cookie-policy", label: "Cookie Policy" },
          { href: "/terms", label: "Terms of Use" },
          { href: "/security-reporting", label: "Security Reporting" },
          { href: "/legal", label: "Legal & Safety" },
        ],
      }}
    >
      <LegalCallout variant="warning">
        This document is a counsel-review draft reflecting SolveSprint&apos;s model as an informational website collecting interest for in-person events. Qualified legal review must be completed prior to hosting production events or collecting participant registration data.
      </LegalCallout>

      <LegalSection id="s1" number={1} title="Scope & Operating Model">
        <p>
          This Privacy Policy applies to visitors of the SolveSprint website and individuals who submit interest or registration forms for SolveSprint in-person student innovation competitions.
        </p>
        <p>
          SolveSprint operates as an informational platform supporting in-person student events. SolveSprint does not maintain public online user accounts, online student profile dashboards, online challenge submissions, or online judging scoring portals.
        </p>
      </LegalSection>

      <LegalSection id="s2" number={2} title="Information Collected via Interest Forms">
        <p>SolveSprint collects information submitted voluntarily through our role-based interest forms (including student, organization, volunteer, and coordinator forms):</p>
        <ul>
          <li>
            <strong>Student Interest Data:</strong> Student full name, email address, grade level, high school name, city/state, and challenge interest categories.
          </li>
          <li>
            <strong>Organization Proposal Data:</strong> Contact name, title, organizational email address, organization name and type, and proposed challenge descriptions.
          </li>
          <li>
            <strong>Volunteer & Coordinator Data:</strong> Name, contact email, availability, preferred volunteer roles, and outreach/event experience.
          </li>
          <li>
            <strong>Technical & Access Data:</strong> Basic web server request headers, IP address for security logging, and standard HTTPS session metadata.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="s3" number={3} title="How Information is Used">
        <p>Information submitted through interest forms is used strictly to:</p>
        <ul>
          <li>contact students, organizations, and volunteers with event announcements and registration updates;</li>
          <li>evaluate and prepare challenge prompts with host organizations;</li>
          <li>organize team logistics, venue capacity, and volunteer shifts for in-person events; and</li>
          <li>respond directly to inquiries sent to SolveSprint organizers.</li>
        </ul>
        <p>
          SolveSprint does not sell personal data, rent contact lists, or engage in third-party behavioral advertising.
        </p>
      </LegalSection>

      <LegalSection id="s4" number={4} title="Third-Party Forms & Service Providers">
        <p>
          Interest and registration forms offered on SolveSprint may be hosted via Google Forms (operated by Google LLC). When you submit information through an embedded or linked Google Form:
        </p>
        <ul>
          <li>Your submission is processed by Google in accordance with Google&apos;s Privacy Policy and Terms of Service.</li>
          <li>SolveSprint accesses and reviews response data collected in Google Forms for event organization purposes only.</li>
        </ul>
      </LegalSection>

      <LegalSection id="s5" number={5} title="Student & Minor Privacy">
        <p>
          High school student safety and privacy are paramount. Student contact details submitted through interest forms are kept private and are accessible only to authorized event organizers.
        </p>
        <p>
          Any public recognition, photograph, or video recording of a minor student participating in an in-person SolveSprint event requires prior explicit parental or guardian media consent.
        </p>
      </LegalSection>

      <LegalSection id="s6" number={6} title="Children Under 13">
        <p>
          SolveSprint in-person events are intended for high school students (ages 13–18). SolveSprint does not knowingly collect personal information from children under the age of 13.
        </p>
      </LegalSection>

      <LegalSection id="s7" number={7} title="Data Retention & Security">
        <p>
          Form responses and contact inquiry emails are retained only as long as necessary to coordinate upcoming in-person events and fulfill administrative requirements. Participants may request deletion of their contact information at any time.
        </p>
      </LegalSection>

      <LegalSection id="s8" number={8} title="Your Rights & Contact">
        <p>
          To update your contact information or request removal from event notifications, contact our co-founders via our{" "}
          <a href="/get-involved">Get Involved page</a> or by emailing our team.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
