# SolveSprint migration checklist

## Phase 1: audit

- [x] Enumerate every route and route state
- [x] Inspect data entities and stored statuses
- [x] Inspect server actions and authorization boundaries
- [x] Inspect fixtures and suspicious public data
- [x] Identify unsupported workflows

## Phase 2: system

- [x] Define semantic tokens
- [x] Consolidate public/auth/workspace shells
- [x] Flatten cards, controls, notices, badges, and empty states
- [x] Add skip navigation and security headers

## Phase 3: public

- [x] Homepage
- [x] Challenge directory
- [x] Challenge detail
- [x] Leaderboard
- [x] Rules
- [x] Privacy
- [x] Terms

## Phase 4: authentication

- [x] Login
- [x] Student signup
- [x] Organization signup
- [x] Invitation acceptance/decline/signup states
- [ ] Password recovery — blocked by missing token/email model
- [ ] Email verification — blocked by missing verification model

## Phase 5: student

- [x] My challenges
- [x] Profile
- [x] Team registration
- [x] Submission
- [ ] Public portfolio — not in current feature scope
- [ ] Settings/notifications — no supporting model

## Phase 6: organization

- [x] Dashboard
- [x] New challenge
- [x] Challenge detail
- [x] Challenge edit
- [ ] Organization verification — missing workflow model
- [ ] Managers/judges/analytics/exports — missing workflow models

## Phase 7: judging

- [ ] Entire phase blocked by missing judge, assignment, review, score, and conflict models

## Phase 8: administration

- [x] Admin overview
- [x] Challenge review
- [x] Audit events inspected
- [ ] Organization verification queue — missing workflow model
- [ ] Suspensions/reports — missing workflow model

## Phase 9: states/legal

- [x] Route loading states
- [x] Challenge and leaderboard errors
- [x] Global not found
- [x] Global error
- [x] Empty and unauthorized behavior
- [x] Legal copy restructured with review warnings

## Phase 10: verification

- [x] Lint
- [x] Type check
- [x] Production build
- [x] Migration status
- [x] Critical source-level authorization checks
- [x] Browser flow checks
- [x] Required responsive widths
- [x] Console and overflow checks
- [x] Automated security/workflow contract tests
- [ ] Full database-backed integration suite — no isolated test database harness exists
