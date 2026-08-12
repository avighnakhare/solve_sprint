import { getAppMode, AppMode } from "@/lib/app-config";
import { db } from "@/lib/prisma";
import { normalizeEmail } from "@/lib/utils";
import type { RoleValue, AccountStatusValue } from "@/lib/db-types";
import type { User } from "@prisma/client";

export type MutationAction =
  | "REGISTER_STUDENT"
  | "REGISTER_ORG"
  | "LOGIN"
  | "VERIFY_EMAIL"
  | "CREATE_TEAM"
  | "JOIN_TEAM"
  | "LEAVE_TEAM"
  | "SUBMIT_SOLUTION"
  | "CREATE_CHALLENGE"
  | "EDIT_CHALLENGE"
  | "SUBMIT_CHALLENGE_REVIEW"
  | "ADMIN_REVIEW_CHALLENGE"
  | "EVALUATE_SUBMISSION"
  | "PUBLISH_AWARDS"
  | "REVOKE_AWARD"
  | "ADMIN_VERIFY_ORG"
  | "ADMIN_MFA_ACTION"
  | "WITHDRAW_GUARDIAN_CONSENT";

export type AuthCheckResult = {
  allowed: boolean;
  reason?: string;
};

export async function assertAuthorized(args: {
  action: MutationAction;
  user?: (Pick<User, "id" | "email" | "role" | "status" | "deletedAt"> & {
    studentProfile?: { id: string; guardianApprovalStatus: string } | null;
    organizationProfile?: { id: string; verificationStatus: string } | null;
    judgeProfile?: { id: string; verificationStatus: string } | null;
  }) | null;
  targetEmail?: string;
  isMfaVerified?: boolean;
}): Promise<AuthCheckResult> {
  const mode = getAppMode();

  // 1. MARKETING_ONLY mode rejects EVERY write/mutation operation
  if (mode === "MARKETING_ONLY") {
    return {
      allowed: false,
      reason: "SolveSprint is currently in MARKETING_ONLY mode. All mutations are strictly disabled."
    };
  }

  const emailToVerify = args.user?.email || (args.targetEmail ? normalizeEmail(args.targetEmail) : null);

  // 2. PRIVATE_PILOT mode requires an unexpired, non-revoked PilotAccessGrant
  if (mode === "PRIVATE_PILOT") {
    if (!emailToVerify) {
      return {
        allowed: false,
        reason: "Email identification required to verify Pilot Access Grant."
      };
    }
    const grant = await db.pilotAccessGrant.findUnique({
      where: { email: normalizeEmail(emailToVerify) }
    });
    if (!grant) {
      return {
        allowed: false,
        reason: "Access restricted: email is not registered on the Private Pilot allowlist."
      };
    }
  }

  // 3. User account & status checks for authenticated mutations
  if (args.user) {
    if (args.user.deletedAt !== null) {
      return { allowed: false, reason: "Account has been soft-deleted." };
    }
    if (args.user.status === "SUSPENDED") {
      return { allowed: false, reason: "Account has been suspended." };
    }
  }

  // 4. Action-specific rules
  switch (args.action) {
    case "REGISTER_STUDENT":
    case "REGISTER_ORG":
    case "LOGIN":
    case "VERIFY_EMAIL":
      return { allowed: true };

    case "CREATE_TEAM":
    case "JOIN_TEAM":
    case "LEAVE_TEAM":
    case "SUBMIT_SOLUTION":
      if (!args.user) return { allowed: false, reason: "Authentication required." };
      if (args.user.role !== "STUDENT") {
        return { allowed: false, reason: "Only registered student accounts can perform team/submission actions." };
      }
      if (args.user.status === "PENDING_EMAIL_VERIFICATION") {
        return { allowed: false, reason: "Email verification required before participating in teams." };
      }
      if (args.user.studentProfile?.guardianApprovalStatus === "PENDING_GUARDIAN") {
        return { allowed: false, reason: "Parent/guardian approval is required before participating in teams or submitting work." };
      }
      if (args.user.studentProfile?.guardianApprovalStatus === "WITHDRAWN") {
        return { allowed: false, reason: "Guardian consent has been withdrawn. Minor participation is restricted." };
      }
      return { allowed: true };

    case "CREATE_CHALLENGE":
    case "EDIT_CHALLENGE":
    case "SUBMIT_CHALLENGE_REVIEW":
      if (!args.user) return { allowed: false, reason: "Authentication required." };
      if (args.user.role !== "ORGANIZATION" && args.user.role !== "ADMIN") {
        return { allowed: false, reason: "Only organization hosts or administrators can manage challenges." };
      }
      if (args.user.role === "ORGANIZATION" && args.user.organizationProfile?.verificationStatus !== "VERIFIED") {
        return { allowed: false, reason: "Your host organization account must be verified by an administrator before hosting challenges." };
      }
      return { allowed: true };

    case "EVALUATE_SUBMISSION":
      if (!args.user) return { allowed: false, reason: "Authentication required." };
      if (args.user.role !== "JUDGE" && args.user.role !== "ADMIN" && args.user.role !== "ORGANIZATION") {
        return { allowed: false, reason: "Unauthorized: judging requires assigned judge or host status." };
      }
      return { allowed: true };

    case "PUBLISH_AWARDS":
    case "REVOKE_AWARD":
    case "ADMIN_REVIEW_CHALLENGE":
    case "ADMIN_VERIFY_ORG":
    case "ADMIN_MFA_ACTION":
      if (!args.user) return { allowed: false, reason: "Authentication required." };
      if (args.user.role !== "ADMIN") {
        return { allowed: false, reason: "Administrative privileges required." };
      }
      if (!args.isMfaVerified) {
        return { allowed: false, reason: "Multi-Factor Authentication (MFA) verification required for sensitive admin operations." };
      }
      return { allowed: true };

    case "WITHDRAW_GUARDIAN_CONSENT":
      return { allowed: true };

    default:
      return { allowed: false, reason: "Unauthorized action." };
  }
}
