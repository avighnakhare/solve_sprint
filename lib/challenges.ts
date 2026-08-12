import { Prisma } from "@prisma/client";
import { db } from "@/lib/prisma";
import { ChallengeStatus, TeamMemberStatus, TeamStatus, type ChallengeStatusValue } from "@/lib/db-types";

export const publicChallengeStatuses: ChallengeStatusValue[] = [
  ChallengeStatus.APPROVED,
  ChallengeStatus.SCHEDULED,
  ChallengeStatus.ACTIVE,
  ChallengeStatus.SUBMISSIONS_CLOSED,
  ChallengeStatus.JUDGING,
  ChallengeStatus.RESULTS_READY,
  ChallengeStatus.RESULTS_PUBLISHED,
  ChallengeStatus.COMPLETED
];

export type PublicChallengeLifecycle =
  | "opens-soon"
  | "registration-open"
  | "building"
  | "submission-closed"
  | "under-review"
  | "results-ready"
  | "completed"
  | "closed";

export function publicChallengeLifecycle(challenge: {
  status: ChallengeStatusValue | string;
  registrationOpenAt: Date;
  registrationCloseAt: Date;
  submissionDeadline: Date;
  judgingStartsAt?: Date;
  winnerAnnouncementAt?: Date;
}) {
  const now = new Date();
  if (challenge.status === ChallengeStatus.COMPLETED) return "completed" as const;
  if (challenge.status === ChallengeStatus.CLOSED) return "closed" as const;
  if (challenge.status === ChallengeStatus.RESULTS_PUBLISHED || challenge.status === ChallengeStatus.RESULTS_READY) return "results-ready" as const;
  if (now < challenge.registrationOpenAt) return "opens-soon" as const;
  if (isRegistrationOpen(challenge)) return "registration-open" as const;
  if (now <= challenge.submissionDeadline) return "building" as const;
  if (challenge.judgingStartsAt && now < challenge.judgingStartsAt) return "submission-closed" as const;
  return "under-review" as const;
}

export function publicChallengeLifecycleLabel(lifecycle: PublicChallengeLifecycle) {
  const labels: Record<PublicChallengeLifecycle, string> = {
    "opens-soon": "Opens soon",
    "registration-open": "Registration open",
    building: "Building in progress",
    "submission-closed": "Submission closed",
    "under-review": "Under review",
    "results-ready": "Results published",
    completed: "Completed",
    closed: "Closed"
  };
  return labels[lifecycle];
}

export function isRegistrationOpen(challenge: {
  status: ChallengeStatusValue | string;
  registrationOpenAt: Date;
  registrationCloseAt: Date;
}) {
  const now = new Date();
  return (
    (challenge.status === ChallengeStatus.APPROVED || challenge.status === ChallengeStatus.ACTIVE || challenge.status === ChallengeStatus.SCHEDULED) &&
    challenge.registrationOpenAt <= now &&
    challenge.registrationCloseAt >= now
  );
}

export async function getChallengeCounts(challengeId: string) {
  const [teams, participants] = await Promise.all([
    db.team.count({
      where: {
        challengeId,
        status: TeamStatus.REGISTERED
      }
    }),
    db.teamMember.count({
      where: {
        status: TeamMemberStatus.ACCEPTED,
        team: {
          challengeId,
          status: TeamStatus.REGISTERED
        }
      }
    })
  ]);

  return { teams, participants };
}

export async function getChallengeCards(args: {
  where?: Prisma.ChallengeWhereInput;
  orderBy?: Prisma.ChallengeOrderByWithRelationInput;
}) {
  const challenges = await db.challenge.findMany({
    where: args.where,
    orderBy: args.orderBy,
    include: {
      organization: true,
      teams: {
        where: { status: TeamStatus.REGISTERED },
        select: {
          id: true,
          members: {
            where: { status: TeamMemberStatus.ACCEPTED },
            select: { id: true }
          }
        }
      }
    }
  });

  return challenges.map((challenge) => ({
    ...challenge,
    teamCount: challenge.teams.length,
    participantCount: challenge.teams.reduce((sum, team) => sum + team.members.length, 0)
  }));
}

export async function userTeamForChallenge(challengeId: string, studentId: string, email: string) {
  return db.teamMember.findFirst({
    where: {
      status: { in: [TeamMemberStatus.ACCEPTED, TeamMemberStatus.PENDING] },
      team: { challengeId },
      OR: [{ studentId }, { invitedEmail: email }]
    },
    include: {
      team: {
        include: {
          challenge: true,
          submission: true,
          members: true
        }
      }
    }
  });
}
