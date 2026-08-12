import { Badge } from "@/components/ui";
import { labelFor } from "@/lib/constants";
import type { ChallengeStatusValue, OrganizationTypeValue } from "@/lib/db-types";

export function ChallengeStatusBadge({ status }: { status: ChallengeStatusValue | string }) {
  const tone =
    status === "ACTIVE"
      ? "green"
      : status === "SUBMITTED_FOR_REVIEW" || status === "APPROVED"
        ? "orange"
        : status === "REJECTED"
          ? "rose"
          : status === "COMPLETED"
            ? "lavender"
            : "slate";

  return <Badge tone={tone}>{labelFor(status)}</Badge>;
}

export function OrganizationTypeBadge({ type }: { type: OrganizationTypeValue | string }) {
  return <Badge tone="blue">{labelFor(type)}</Badge>;
}
