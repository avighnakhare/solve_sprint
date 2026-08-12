export const Role = {
  STUDENT: "STUDENT",
  ORGANIZATION: "ORGANIZATION",
  JUDGE: "JUDGE",
  ADMIN: "ADMIN"
} as const;
export type RoleValue = (typeof Role)[keyof typeof Role];

// Purified AccountStatus (General Account Lifecycle States Only)
export const AccountStatus = {
  PENDING_EMAIL_VERIFICATION: "PENDING_EMAIL_VERIFICATION",
  ACTIVE: "ACTIVE",
  SUSPENDED: "SUSPENDED",
  DEACTIVATED: "DEACTIVATED",
  DELETION_PENDING: "DELETION_PENDING"
} as const;
export type AccountStatusValue = (typeof AccountStatus)[keyof typeof AccountStatus];
export const UserStatus = AccountStatus;
export type UserStatusValue = AccountStatusValue;

// Minor Guardian Approval Status
export const GuardianApprovalStatus = {
  NOT_REQUIRED: "NOT_REQUIRED",
  PENDING_EMAIL: "PENDING_EMAIL",
  PENDING_GUARDIAN: "PENDING_GUARDIAN",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  REVOKED: "REVOKED"
} as const;
export type GuardianApprovalStatusValue = (typeof GuardianApprovalStatus)[keyof typeof GuardianApprovalStatus];

// Host Organization Verification Status
export const OrganizationVerificationStatus = {
  UNVERIFIED: "UNVERIFIED",
  SUBMITTED: "SUBMITTED",
  VERIFIED: "VERIFIED",
  REJECTED: "REJECTED",
  SUSPENDED: "SUSPENDED"
} as const;
export type OrganizationVerificationStatusValue = (typeof OrganizationVerificationStatus)[keyof typeof OrganizationVerificationStatus];
export const OrganizationStatus = OrganizationVerificationStatus;
export type OrganizationStatusValue = OrganizationVerificationStatusValue;

// Judge Verification Status
export const JudgeVerificationStatus = {
  UNVERIFIED: "UNVERIFIED",
  INVITED: "INVITED",
  VERIFIED: "VERIFIED",
  SUSPENDED: "SUSPENDED"
} as const;
export type JudgeVerificationStatusValue = (typeof JudgeVerificationStatus)[keyof typeof JudgeVerificationStatus];

export const OrganizationType = {
  COMPANY: "COMPANY",
  COLLEGE: "COLLEGE",
  NONPROFIT: "NONPROFIT",
  SPONSOR: "SPONSOR",
  OTHER: "OTHER"
} as const;
export type OrganizationTypeValue = (typeof OrganizationType)[keyof typeof OrganizationType];

export const ChallengeCategory = {
  BUSINESS: "BUSINESS",
  MARKETING: "MARKETING",
  PRODUCT_DESIGN: "PRODUCT_DESIGN",
  AI: "AI",
  TECH_FOR_GOOD: "TECH_FOR_GOOD",
  SUSTAINABILITY: "SUSTAINABILITY",
  SOCIAL_IMPACT: "SOCIAL_IMPACT",
  COLLEGE_OUTREACH: "COLLEGE_OUTREACH",
  OTHER: "OTHER"
} as const;
export type ChallengeCategoryValue = (typeof ChallengeCategory)[keyof typeof ChallengeCategory];

export const ChallengeStatus = {
  DRAFT: "DRAFT",
  SUBMITTED_FOR_REVIEW: "SUBMITTED_FOR_REVIEW",
  REQUESTED_EDITS: "REQUESTED_EDITS",
  REJECTED: "REJECTED",
  APPROVED: "APPROVED",
  SCHEDULED: "SCHEDULED",
  ACTIVE: "ACTIVE",
  SUBMISSIONS_CLOSED: "SUBMISSIONS_CLOSED",
  JUDGING: "JUDGING",
  RESULTS_READY: "RESULTS_READY",
  RESULTS_PUBLISHED: "RESULTS_PUBLISHED",
  COMPLETED: "COMPLETED",
  CLOSED: "CLOSED"
} as const;
export type ChallengeStatusValue = (typeof ChallengeStatus)[keyof typeof ChallengeStatus];

export const TeamStatus = {
  REGISTERED: "REGISTERED",
  CANCELED: "CANCELED",
  DISQUALIFIED: "DISQUALIFIED"
} as const;
export type TeamStatusValue = (typeof TeamStatus)[keyof typeof TeamStatus];

export const TeamRole = {
  LEAD: "LEAD",
  MEMBER: "MEMBER"
} as const;
export type TeamRoleValue = (typeof TeamRole)[keyof typeof TeamRole];

export const TeamMemberStatus = {
  ACCEPTED: "ACCEPTED",
  PENDING: "PENDING",
  DECLINED: "DECLINED"
} as const;
export type TeamMemberStatusValue = (typeof TeamMemberStatus)[keyof typeof TeamMemberStatus];

export const AwardType = {
  OVERALL_WINNER: "OVERALL_WINNER",
  RUNNER_UP: "RUNNER_UP",
  MOST_CREATIVE: "MOST_CREATIVE",
  MOST_PRACTICAL: "MOST_PRACTICAL",
  BEST_PRESENTATION: "BEST_PRESENTATION",
  JUDGE_RECOGNITION: "JUDGE_RECOGNITION"
} as const;
export type AwardTypeValue = (typeof AwardType)[keyof typeof AwardType];

export const AwardStatus = {
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
  REVOKED: "REVOKED"
} as const;
export type AwardStatusValue = (typeof AwardStatus)[keyof typeof AwardStatus];
