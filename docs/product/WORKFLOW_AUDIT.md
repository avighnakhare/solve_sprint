# SolveSprint workflow audit

## Implemented actors

- Visitor
- Student
- Student team leader/member (membership role)
- Organization representative
- Platform administrator

Judge/reviewer accounts, organization managers, and organization verification reviewers are not modeled.

## Challenge lifecycle mapping

The database stores:

`DRAFT → SUBMITTED_FOR_REVIEW → REQUESTED_EDITS | REJECTED | APPROVED | ACTIVE → CLOSED | COMPLETED`

Conceptual/public mapping:

| Stored state + dates | Operational meaning | Public language |
| --- | --- | --- |
| `DRAFT` | Host editing | Not public |
| `SUBMITTED_FOR_REVIEW` | Platform review requested | Not public |
| `REQUESTED_EDITS` | Correctable changes required | Not public |
| `REJECTED` | Publication rejected | Not public |
| `APPROVED`, before registration open | Approved, scheduled | Opens soon |
| `APPROVED`/`ACTIVE`, inside registration window | Registration available | Registration open |
| Registration closed, before submission deadline | Teams build and submit | Building in progress |
| After submission deadline, before judging starts | Submission locked | Submission closed |
| Judging start through winner announcement | Evaluation period | Under review |
| `COMPLETED` | Operational work is complete | Completed; this does not independently prove publication |
| `CLOSED` | Manually closed | Closed |

The current schema cannot represent `RESULTS_READY`, independently controlled `RESULTS_PUBLISHED`, or `ARCHIVED`. Public pages therefore must not claim those states beyond actual completed/award data.

## Student flow

1. Register or log in.
2. Browse a public challenge.
3. Create a team if registration is open.
4. Team leader is accepted automatically.
5. Invitees receive expiring single-purpose token links.
6. Invitees accept, decline, create an account, or recover from invalid/expired/wrong-account states.
7. The registered team lead may create or update the single team submission before the deadline.
8. Awards are shown through the leaderboard.

Gaps:

- No draft/final submission distinction or immutable version history.
- Team-leader-only submission ownership is enforced; immutable final snapshots are not.
- No member-removal workflow exists, which avoids post-deadline removal risk.
- No public portfolio or private feedback surface.
- No saved challenges, settings, or notifications.

## Organization flow

1. Register an organization-level account.
2. Create a complete challenge.
3. Valid challenge creation currently enters `SUBMITTED_FOR_REVIEW` directly.
4. Admin approves, requests edits, or rejects.
5. Organization may edit only `DRAFT`, `REQUESTED_EDITS`, or `REJECTED`.
6. Organization monitors teams and submitted links for records it owns.

Gaps:

- No separate organization-verification state/queue.
- No draft save or participant preview.
- No managers, judges, analytics, exports, communications, result publication, or challenge archive.

## Administration flow

1. Admin is granted only by a stored `ADMIN` role.
2. Admin sees the challenge review queue.
3. Negative/revision decisions require a reason.
4. Challenge decisions and award additions create audit logs.
5. Admin can add awards only after the deadline for registered teams with submissions.

Gaps:

- Admin transitions follow a server-side state matrix.
- Award uniqueness is represented in the database; request idempotency is not.
- No organization verification, assigned reviewer, safety report, suspension, decision-history UI, or results publication gate.

## Judge workflow

Blocked. There is no judge role, assignment, rubric score, conflict disclosure, review draft, finalized review, or feedback visibility model. Adding UI would fabricate functionality. Recommended future entities:

- `JudgeAssignment`
- `Review`
- `ReviewCriterionScore`
- `ConflictDisclosure`
- review visibility and finalization states

## Authorization summary

- Student reads/mutations call `requireStudent`.
- Organization reads filter by `organizationId`; mutations re-check ownership.
- Admin mutations call `requireAdmin`.
- Public challenge reads restrict to public status allowlist.
- Invite tokens are hashed at rest and expire.
- Organization public signup always stores `ORGANIZATION`.

See `PRODUCTION_READINESS.md` for risks that remain.
