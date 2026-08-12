import Link from "next/link";
import type { Challenge, OrganizationProfile } from "@prisma/client";
import { labelFor } from "@/lib/constants";
import {
  publicChallengeLifecycle,
  publicChallengeLifecycleLabel,
  type PublicChallengeLifecycle
} from "@/lib/challenges";

type ChallengeCardProps = Challenge & {
  organization: OrganizationProfile;
  teamCount: number;
  participantCount: number;
};

function safeDate(value: Date) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date to be confirmed";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

export function ChallengeCard({
  challenge,
  lifecycle,
  index
}: {
  challenge: ChallengeCardProps;
  lifecycle?: PublicChallengeLifecycle;
  index?: number;
}) {
  const publicLifecycle = lifecycle || publicChallengeLifecycle(challenge);
  const href = `/challenges/${challenge.slug}`;

  return (
    <article className="challenge-result-card">
      <div className="challenge-result-card__topline">
        <div className="challenge-result-card__number" aria-hidden="true">
          <span>Brief</span>
          <strong>{String((index ?? 0) + 1).padStart(2, "0")}</strong>
        </div>
        <div className="challenge-result-card__metadata">
          <span className="challenge-lifecycle" data-lifecycle={publicLifecycle}>
            <i aria-hidden="true" />
            {publicChallengeLifecycleLabel(publicLifecycle)}
          </span>
          <span>{labelFor(challenge.organization.organizationType)}</span>
          <span>{labelFor(challenge.category)}</span>
        </div>
      </div>

      <div className="challenge-result-card__copy">
        <h2><Link href={href}>{challenge.title || "Untitled challenge"}</Link></h2>
        <p className="challenge-result-card__organization">
          {challenge.organization.organizationName || "Organization name unavailable"}
        </p>
        <p className="challenge-result-card__summary">
          {challenge.shortSummary || "A full challenge summary will be available in the brief."}
        </p>
      </div>

      <dl className="challenge-result-card__dates">
        <div>
          <dt>Register by</dt>
          <dd>{safeDate(challenge.registrationCloseAt)}</dd>
        </div>
        <div>
          <dt>Submit by</dt>
          <dd>{safeDate(challenge.submissionDeadline)}</dd>
        </div>
        <div>
          <dt>Team size</dt>
          <dd>{challenge.minTeamSize}–{challenge.maxTeamSize} students</dd>
        </div>
      </dl>

      <div className="challenge-result-card__footer">
        <span>{challenge.teamCount} registered {challenge.teamCount === 1 ? "team" : "teams"}</span>
        <Link href={href} className="challenge-result-card__link">
          View brief <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
