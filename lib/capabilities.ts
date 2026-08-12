import { Role, type RoleValue } from "@/lib/db-types";

export const Capability = {
  BROWSE_PUBLIC_CHALLENGES: "BROWSE_PUBLIC_CHALLENGES",
  MANAGE_STUDENT_PROFILE: "MANAGE_STUDENT_PROFILE",
  CREATE_TEAM: "CREATE_TEAM",
  MANAGE_TEAM_SUBMISSION: "MANAGE_TEAM_SUBMISSION",
  MANAGE_OWN_CHALLENGES: "MANAGE_OWN_CHALLENGES",
  REVIEW_CHALLENGES: "REVIEW_CHALLENGES",
  RECORD_AWARDS: "RECORD_AWARDS",
  VIEW_AUDIT_EVENTS: "VIEW_AUDIT_EVENTS",
  EVALUATE_SUBMISSIONS: "EVALUATE_SUBMISSIONS"
} as const;

export type CapabilityValue = (typeof Capability)[keyof typeof Capability];

const roleCapabilities: Record<RoleValue, ReadonlySet<CapabilityValue>> = {
  [Role.STUDENT]: new Set([
    Capability.BROWSE_PUBLIC_CHALLENGES,
    Capability.MANAGE_STUDENT_PROFILE,
    Capability.CREATE_TEAM,
    Capability.MANAGE_TEAM_SUBMISSION
  ]),
  [Role.ORGANIZATION]: new Set([
    Capability.BROWSE_PUBLIC_CHALLENGES,
    Capability.MANAGE_OWN_CHALLENGES
  ]),
  [Role.JUDGE]: new Set([
    Capability.BROWSE_PUBLIC_CHALLENGES,
    Capability.EVALUATE_SUBMISSIONS
  ]),
  [Role.ADMIN]: new Set([
    Capability.BROWSE_PUBLIC_CHALLENGES,
    Capability.REVIEW_CHALLENGES,
    Capability.RECORD_AWARDS,
    Capability.VIEW_AUDIT_EVENTS,
    Capability.EVALUATE_SUBMISSIONS
  ])
};

export function hasCapability(role: RoleValue, capability: CapabilityValue) {
  return roleCapabilities[role]?.has(capability) ?? false;
}

export function capabilitiesFor(role: RoleValue) {
  return [...(roleCapabilities[role] || [])];
}
