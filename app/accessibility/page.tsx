import type { Metadata } from "next";
import { LegalPage, LegalSection, LegalCallout } from "@/components/legal-page";
import { LEGAL_META } from "@/lib/legal-meta";

export const metadata: Metadata = {
  title: "Accessibility Statement | SolveSprint",
  description:
    "SolveSprint's commitment to WCAG 2.2 Level AA digital accessibility, known limitations, and how to request assistance.",
};

const TOC = [
  { id: "s1", label: "1. Our commitment" },
  { id: "s2", label: "2. Conformance status" },
  { id: "s3", label: "3. Technical approach" },
  { id: "s4", label: "4. Known limitations" },
  { id: "s5", label: "5. Feedback and assistance" },
  { id: "s6", label: "6. Formal complaints" },
];

export default function AccessibilityPage() {
  return (
    <LegalPage
      eyebrow="Privacy and Trust"
      title="Accessibility Statement"
      summary="SolveSprint is committed to ensuring digital accessibility for people of all abilities. Our target standard is WCAG 2.2 Level AA. This page describes our approach, known limitations, and how to report accessibility barriers."
      toc={TOC}
      meta={{
        version: LEGAL_META.version,
        effectiveDate: LEGAL_META.effectiveDate,
        lastUpdated: LEGAL_META.lastUpdated,
        contact: LEGAL_META.privacyContact,
        relatedLinks: [
          { href: "/legal", label: "Legal & Safety" },
        ],
      }}
    >
      <LegalSection id="s1" number={1} title="Our commitment">
        <p>
          SolveSprint is designed and built to be accessible across desktop and
          mobile devices. We are committed to providing an inclusive experience
          for students, guardians, host organizations, judges, and all visitors,
          regardless of disability or assistive technology used.
        </p>
        <p>
          Our target standard is the{" "}
          <strong>
            Web Content Accessibility Guidelines (WCAG) 2.2, Level AA
          </strong>
          , published by the World Wide Web Consortium (W3C).
        </p>
      </LegalSection>

      <LegalSection id="s2" number={2} title="Conformance status">
        <LegalCallout variant="note">
          SolveSprint is in active development. A formal accessibility audit against WCAG 2.2 Level AA has not yet been completed. This statement reflects our design intent and current known limitations. A full audit and updated conformance claim will be published before the platform opens for general enrollment.
        </LegalCallout>
      </LegalSection>

      <LegalSection id="s3" number={3} title="Technical approach">
        <p>We incorporate the following practices to support accessibility:</p>
        <ul>
          <li>
            <strong>Semantic HTML:</strong> Using appropriate HTML5 elements
            (headings, lists, landmarks, buttons, labels) to provide meaningful
            structure to assistive technologies.
          </li>
          <li>
            <strong>Keyboard navigation:</strong> All interactive elements are
            reachable and operable by keyboard. Focus states are visible and
            clearly indicated.
          </li>
          <li>
            <strong>Skip navigation:</strong> A &quot;Skip to main content&quot; link is
            present on every page for keyboard and screen-reader users.
          </li>
          <li>
            <strong>Color contrast:</strong> Text and interactive elements are
            designed to meet WCAG 2.2 AA contrast ratios (4.5:1 for normal text,
            3:1 for large text and UI components).
          </li>
          <li>
            <strong>Responsive design:</strong> Pages adapt to different viewport
            sizes and do not require horizontal scrolling on standard mobile
            devices.
          </li>
          <li>
            <strong>Readable text:</strong> Body text uses a legible typeface,
            adequate line spacing, and a controlled reading width for comfortable
            reading.
          </li>
          <li>
            <strong>Form labels:</strong> All form inputs have explicit or
            programmatically associated labels.
          </li>
          <li>
            <strong>ARIA:</strong> ARIA attributes are used where native HTML
            semantics are insufficient, following ARIA authoring best practices.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="s4" number={4} title="Known limitations">
        <p>
          We are aware of the following areas that may not yet fully meet WCAG 2.2
          Level AA:
        </p>
        <ul>
          <li>
            Complex interactive components (such as file-upload controls and
            challenge submission forms) have not been fully tested with all
            assistive technologies.
          </li>
          <li>
            Third-party content or embeds used in challenges may not be under
            our direct accessibility control.
          </li>
          <li>
            A formal audit has not yet been completed; additional issues may be
            identified.
          </li>
        </ul>
        <p>
          We are actively working to address these limitations. If you encounter
          a specific barrier, please report it using the contact information below.
        </p>
      </LegalSection>

      <LegalSection id="s5" number={5} title="Feedback and assistance">
        <p>
          If you encounter an accessibility barrier on SolveSprint or need
          assistance completing a task due to a disability, please contact us:
        </p>
        <p>
          Accessibility contact:{" "}
          {LEGAL_META.privacyContact ? (
            <a href={`mailto:${LEGAL_META.privacyContact}`}>{LEGAL_META.privacyContact}</a>
          ) : (
            <a href="/legal#contact">Contact SolveSprint</a>
          )}
        </p>
        <p>
          Please describe the barrier you encountered, the page or feature
          affected, and the assistive technology or browser you were using. We
          will respond as promptly as we can and work to provide an accessible
          alternative where possible.
        </p>
      </LegalSection>

      <LegalSection id="s6" number={6} title="Formal complaints">
        <p>
          If you are not satisfied with our response to an accessibility concern,
          you may contact the U.S. Department of Justice (ADA National Network)
          or another applicable regulatory body for your jurisdiction. We are
          committed to resolving accessibility issues in good faith.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
