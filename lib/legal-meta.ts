/**
 * Shared legal document metadata configuration.
 *
 * PLACEHOLDER POLICY: bracketed values below are NOT confirmed operator facts.
 * Never expose raw bracketed strings on a production public page.
 * Render `null` values as a neutral "Contact SolveSprint" link in the UI.
 * Fill every value here before removing MARKETING_ONLY guard.
 */

export const LEGAL_META = {
  /** Legal operator entity name — NOT yet confirmed. */
  operator: null as string | null,

  /** Effective date for current document versions. */
  effectiveDate: "Pending attorney review",

  /** Last-updated date shown in document headers. */
  lastUpdated: "July 26, 2026",

  /** Document version shown in headers. */
  version: "0.9 — counsel-review draft",

  /** General legal contact. Null until a monitored address is confirmed. */
  legalContact: null as string | null,

  /** Privacy contact. Null until confirmed. */
  privacyContact: null as string | null,

  /** Youth-safety contact. Null until confirmed. */
  safetyContact: null as string | null,

  /** Security / vulnerability-reporting contact. Null until confirmed. */
  securityContact: null as string | null,

  /** DMCA/copyright contact. Null until a registered agent is confirmed. */
  copyrightContact: null as string | null,

  /**
   * Governing jurisdiction for disputes.
   * County is not yet confirmed by counsel.
   */
  jurisdiction: "North Carolina (county to be confirmed by counsel)",

  /**
   * Archive location for previous document versions.
   * Null until an archive location is established.
   */
  archiveLocation: null as string | null,
} as const;

/** Render a contact address safely — returns null when unresolved. */
export function safeContact(value: string | null): string | null {
  return value;
}
