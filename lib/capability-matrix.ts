import { RoleValue, AccountStatusValue } from "@/lib/db-types";
import { getAppMode, AppMode } from "@/lib/app-config";

export type ActionContext =
  | "VIEW_PUBLIC"
  | "REGISTER_STUDENT"
  | "REGISTER_ORG"
  | "LOGIN"
  | "CREATE_TEAM"
  | "JOIN_TEAM"
  | "SUBMIT_SOLUTION"
  | "CREATE_CHALLENGE"
  | "PUBLISH_CHALLENGE"
  | "EVALUATE_SUBMISSION"
  | "PUBLISH_AWARDS"
  | "VERIFY_ORG"
  | "ADMIN_ACTION";

export function evaluateCapability(args: {
  role?: RoleValue | null;
  status?: AccountStatusValue | string | null;
  action: ActionContext;
  appMode?: AppMode;
}): { allowed: boolean; reason?: string } {
  const mode = args.appMode || getAppMode();

  // Public view actions are allowed in all modes
  if (args.action === "VIEW_PUBLIC") {
    return { allowed: true };
  }

  // In MARKETING_ONLY mode, all mutation and participant actions are blocked server-side
  if (mode === "MARKETING_ONLY") {
    return {
      allowed: false,
      reason: "SolveSprint is currently in Preview / Marketing Mode. Registration, publishing, team creation, and solution submissions are disabled."
    };
  }

  // In PRIVATE_PILOT mode, require verified accounts
  if (mode === "PRIVATE_PILOT" && args.status === "PENDING_GUARDIAN_APPROVAL") {
    return {
      allowed: false,
      reason: "Account is pending parent/guardian approval. Action restricted during pilot."
    };
  }

  // Action-specific role & status rules
  switch (args.action) {
    case "REGISTER_STUDENT":
    case "REGISTER_ORG":
    case "LOGIN":
      return { allowed: true };

    case "CREATE_TEAM":
    case "JOIN_TEAM":
    case "SUBMIT_SOLUTION":
      if (args.role !== "STUDENT") {
        return { allowed: false, reason: "Only registered student accounts can perform team and submission actions." };
      }
      if (args.status === "PENDING_GUARDIAN_APPROVAL") {
        return { allowed: false, reason: "Parent/guardian approval is required before participating in teams or submitting work." };
      }
      if (args.status !== "ACTIVE") {
        return { allowed: false, reason: "Your student account is not currently active." };
      }
      return { allowed: true };

    case "CREATE_CHALLENGE":
    case "PUBLISH_CHALLENGE":
      if (args.role !== "ORGANIZATION" && args.role !== "ADMIN") {
        return { allowed: false, reason: "Only organization hosts or administrators can manage challenges." };
      }
      if (args.role === "ORGANIZATION" && args.status !== "ACTIVE") {
        return { allowed: false, reason: "Your host organization profile is pending administrative verification." };
      }
      return { allowed: true };

    case "EVALUATE_SUBMISSION":
      if (args.role !== "JUDGE" && args.role !== "ADMIN" && args.role !== "ORGANIZATION") {
        return { allowed: false, reason: "Only assigned judges or host organizations can evaluate submissions." };
      }
      return { allowed: true };

    case "PUBLISH_AWARDS":
    case "VERIFY_ORG":
    case "ADMIN_ACTION":
      if (args.role !== "ADMIN") {
        return { allowed: false, reason: "Administrative access required." };
      }
      return { allowed: true };

    default:
      return { allowed: false, reason: "Unauthorized action." };
  }
}
