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
    email: process.env.NEXT_PUBLIC_AVIGHNA_EMAIL || "avighna.khare1@gmail.com",
  },
  kavish: {
    name: "Kavish Shah",
    role: "Co-Founder",
    title: "Outreach Specialist",
    email: process.env.NEXT_PUBLIC_KAVISH_EMAIL || null,
  },
  generalEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "avighna.khare1@gmail.com",
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
    buttonText: "Fill Student Interest Form",
    url: process.env.NEXT_PUBLIC_STUDENT_FORM_URL || "https://forms.gle/rwwLtgW6pSrJAxuHA",
    description:
      "Share your interest in joining a future SolveSprint event. Complete our official student form to receive direct event and registration updates.",
    commitment: "In-person event day + team prep",
    whoItIsFor: "High school students interested in hands-on problem solving, teamwork, and pitch feedback",
    privacyNote: "Information submitted is used exclusively to send event updates and registration links.",
  },
  volunteer: {
    role: "volunteer",
    label: "Event Volunteer Interest",
    buttonText: "Fill Volunteer Form",
    url: process.env.NEXT_PUBLIC_VOLUNTEER_FORM_URL || "https://docs.google.com/forms/d/e/1FAIpQLSdegSPqSJDPExL3szxtFmfEmC0Flkre3QbcQHnxnzQOEyLu8g/viewform",
    description:
      "Share your availability and areas of interest to help mentor or run event day logistics. Complete our official volunteer form to get involved.",
    commitment: "3–6 hours on event day",
    whoItIsFor: "Community members, professionals, parents, and university students",
    privacyNote: "Volunteer role assignments depend on event requirements, experience, and background verification.",
  },
  organization: {
    role: "organization",
    label: "Organization Challenge Proposal",
    buttonText: "Email Avighna to Express Interest",
    url: process.env.NEXT_PUBLIC_ORGANIZATION_FORM_URL || "mailto:avighna.khare1@gmail.com?subject=SolveSprint%20Organization%20Interest",
    description:
      "Interested in bringing a community challenge brief or partnering with SolveSprint? Email Avighna Khare directly at avighna.khare1@gmail.com to discuss options.",
    commitment: "Brief preparation + optional presentation attendance",
    whoItIsFor: "Local businesses, startups, nonprofits, universities, and community groups",
    privacyNote: "Direct email inquiry begins a conversation and does not obligate your organization to event hosting.",
  },
  coordinator: {
    role: "coordinator",
    label: "Event Coordinator Application",
    buttonText: "Email Avighna to Express Interest",
    url: process.env.NEXT_PUBLIC_COORDINATOR_FORM_URL || "mailto:avighna.khare1@gmail.com?subject=SolveSprint%20Coordinator%20Interest",
    description:
      "Want to help lead outreach, logistics, or student coordination for SolveSprint? Email Avighna Khare directly at avighna.khare1@gmail.com to get started.",
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
