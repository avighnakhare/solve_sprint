/**
 * Central SolveSprint Site Configuration
 *
 * Single source of truth for event status, verified contact records,
 * and interest form URLs.
 */

export type EventStatus = "PLANNING" | "INTEREST_OPEN" | "REGISTRATION_OPEN" | "REGISTRATION_CLOSED" | "COMPLETED";

export const EVENT_CONFIG = {
  status: "INTEREST_OPEN" as EventStatus,
  badgeText: "Event Planning in Progress • Interest Collection Open",
  shortTitle: "Upcoming In-Person Student Innovation Event",
  headline: "Real problems. Student-built solutions.",
  description:
    "SolveSprint brings local organizations and high school students together for an in-person problem-solving competition. Teams work on real challenges, present their ideas, and receive feedback from professionals.",
  dateAndVenueStatus: "Date & Location Being Finalized",
  statusNote:
    "Event dates, venue, and challenge briefs are currently being finalized. Submitting your interest form ensures early notification as soon as official registration and prompt details are released.",
} as const;

export type ContactPerson = {
  name: string;
  role: string;
  title: string;
  email: string | null;
};

export const CONTACT_CONFIG: {
  avighna: ContactPerson;
  kavish: ContactPerson;
  generalEmail: string | null;
  privacyNotice: string;
} = {
  avighna: {
    name: "Avighna Khare",
    role: "Co-Founder",
    title: "Software Specialist & Marketer",
    email: process.env.NEXT_PUBLIC_AVIGHNA_EMAIL || null,
  },
  kavish: {
    name: "Kavish Shah",
    role: "Co-Founder",
    title: "Outreach Specialist",
    email: process.env.NEXT_PUBLIC_KAVISH_EMAIL || null,
  },
  generalEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || null,
  privacyNotice:
    "We respect your privacy. Contact information is used solely to respond to inquiries regarding SolveSprint student innovation events.",
};

export type FormRole = "student" | "organization" | "volunteer" | "coordinator";

export type FormConfig = {
  role: FormRole;
  label: string;
  buttonText: string;
  url: string | null;
  description: string;
  commitment: string;
  whoItIsFor: string;
  privacyNote: string;
};

export const FORM_CONFIGS: Record<FormRole, FormConfig> = {
  student: {
    role: "student",
    label: "Student Interest",
    buttonText: "Tell us you're interested",
    url: process.env.NEXT_PUBLIC_STUDENT_FORM_URL || null,
    description:
      "Share your interest in joining a future SolveSprint event. We will contact you when event details and registration are available.",
    commitment: "In-person event day + team prep",
    whoItIsFor: "High school students interested in hands-on problem solving, teamwork, and pitch feedback",
    privacyNote: "Information submitted is used exclusively to send event updates and registration links.",
  },
  organization: {
    role: "organization",
    label: "Organization Challenge Proposal",
    buttonText: "Propose a challenge",
    url: process.env.NEXT_PUBLIC_ORGANIZATION_FORM_URL || null,
    description:
      "Tell us about your organization and the kind of problem students could explore. We will contact you to discuss suitability and next steps.",
    commitment: "Brief preparation + optional presentation attendance",
    whoItIsFor: "Local businesses, startups, nonprofits, universities, and community groups",
    privacyNote: "Submitting a proposal begins a conversation and does not commit your organization to event hosting.",
  },
  volunteer: {
    role: "volunteer",
    label: "Event Volunteer Interest",
    buttonText: "Volunteer at an event",
    url: process.env.NEXT_PUBLIC_VOLUNTEER_FORM_URL || null,
    description:
      "Share your availability and areas of interest. Roles will be assigned based on event needs.",
    commitment: "3–6 hours on event day",
    whoItIsFor: "Community members, professionals, parents, and university students",
    privacyNote: "Volunteer role assignments depend on event requirements, experience, and background verification.",
  },
  coordinator: {
    role: "coordinator",
    label: "Event Coordinator Application",
    buttonText: "Help coordinate SolveSprint",
    url: process.env.NEXT_PUBLIC_COORDINATOR_FORM_URL || null,
    description:
      "Tell us about your availability and experience with outreach or event planning. Submitting the form does not automatically assign a leadership position.",
    commitment: "Ongoing planning + event lead responsibilities",
    whoItIsFor: "Experienced student leaders, educators, and community organizers",
    privacyNote: "Prospective coordinators will be contacted directly to discuss availability and fit.",
  },
};

/** Utility helper for safe form links */
export function getFormLink(role: FormRole): { url: string | null; isAvailable: boolean } {
  const config = FORM_CONFIGS[role];
  return {
    url: config.url,
    isAvailable: Boolean(config.url && config.url.trim().length > 0),
  };
}
