export const interests = [
  "Business",
  "Marketing",
  "Product Design",
  "Coding",
  "AI",
  "Sustainability",
  "Entrepreneurship",
  "Writing/Pitching",
  "Other"
];

export const deliverables = [
  "Slide deck",
  "Written proposal",
  "Short video",
  "Prototype/mockup",
  "Code/demo link",
  "Research-backed recommendation",
  "Other"
];

export const categoryOptions = [
  { value: "BUSINESS", label: "Business" },
  { value: "MARKETING", label: "Marketing" },
  { value: "PRODUCT_DESIGN", label: "Product and design" },
  { value: "AI", label: "AI" },
  { value: "TECH_FOR_GOOD", label: "Tech for good" },
  { value: "SUSTAINABILITY", label: "Sustainability" },
  { value: "SOCIAL_IMPACT", label: "Social impact" },
  { value: "COLLEGE_OUTREACH", label: "College outreach" },
  { value: "OTHER", label: "Other" }
];

export const organizationTypeOptions = [
  { value: "COMPANY", label: "Company" },
  { value: "COLLEGE", label: "College" },
  { value: "NONPROFIT", label: "Nonprofit" },
  { value: "SPONSOR", label: "Sponsor" },
  { value: "OTHER", label: "Other" }
];

export const challengeStatusOptions = [
  { value: "APPROVED", label: "Approved" },
  { value: "ACTIVE", label: "Open" },
  { value: "CLOSED", label: "Closed" },
  { value: "COMPLETED", label: "Completed" }
];

export const rubricDefaults = [
  { label: "Originality", points: 20 },
  { label: "Usefulness", points: 25 },
  { label: "Feasibility", points: 20 },
  { label: "Clarity", points: 15 },
  { label: "Research/evidence", points: 10 },
  { label: "Presentation", points: 10 }
];

export const awardTypes = [
  { value: "OVERALL_WINNER", label: "Overall Winner" },
  { value: "RUNNER_UP", label: "Runner Up" },
  { value: "MOST_CREATIVE", label: "Most Creative" },
  { value: "MOST_PRACTICAL", label: "Most Practical" },
  { value: "BEST_PRESENTATION", label: "Best Presentation" },
  { value: "JUDGE_RECOGNITION", label: "Judge Recognition" }
];

const labels: Record<string, string> = {
  STUDENT: "Student",
  ORGANIZATION: "Organization",
  ADMIN: "Admin",
  COMPANY: "Company",
  COLLEGE: "College",
  NONPROFIT: "Nonprofit",
  SPONSOR: "Sponsor",
  BUSINESS: "Business",
  MARKETING: "Marketing",
  PRODUCT_DESIGN: "Product and design",
  AI: "AI",
  TECH_FOR_GOOD: "Tech for good",
  SUSTAINABILITY: "Sustainability",
  SOCIAL_IMPACT: "Social impact",
  COLLEGE_OUTREACH: "College outreach",
  DRAFT: "Draft",
  SUBMITTED_FOR_REVIEW: "Submitted for review",
  REQUESTED_EDITS: "Changes requested",
  APPROVED: "Approved",
  ACTIVE: "Open",
  CLOSED: "Closed",
  COMPLETED: "Completed",
  REJECTED: "Rejected",
  REGISTERED: "Registered",
  CANCELED: "Canceled",
  DISQUALIFIED: "Disqualified",
  ACCEPTED: "Accepted",
  PENDING: "Pending",
  DECLINED: "Declined",
  OVERALL_WINNER: "Overall Winner",
  RUNNER_UP: "Runner Up",
  MOST_CREATIVE: "Most Creative",
  MOST_PRACTICAL: "Most Practical",
  BEST_PRESENTATION: "Best Presentation",
  JUDGE_RECOGNITION: "Judge Recognition"
};

export function labelFor(value?: string | null) {
  if (!value) return "";
  return labels[value] ?? value.toLowerCase().replace(/_/g, " ");
}
