# SolveSprint Route & Entry Point Manifest

This document catalogs every page route, API route handler, server action, and scheduled job in the SolveSprint application.

---

## 1. Public & Marketing Pages (App Router)

| Route Path | File Location | Permitted in `MARKETING_ONLY` | Description |
| :--- | :--- | :---: | :--- |
| `/` | `app/page.tsx` | Yes | Landing homepage with SolveSprint editorial identity |
| `/about` | `app/about/page.tsx` | Yes | Mission, vision, structure, and league principles |
| `/challenges` | `app/challenges/page.tsx` | Yes (View) | Public catalog of active and upcoming challenges |
| `/challenges/[slug]` | `app/challenges/[slug]/page.tsx` | Yes (View) | Challenge detail, problem statement, rubric, and timeline |
| `/leaderboard` | `app/leaderboard/page.tsx` | Yes (View) | Showcase of past challenge winners and recognized teams |
| `/login` | `app/login/page.tsx` | Yes (View) | Unified authentication login page |
| `/student/signup` | `app/student/signup/page.tsx` | Yes (View) | Student registration form with age-13 floor & minor guardian consent tab |
| `/organization/signup` | `app/organization/signup/page.tsx` | Yes (View) | Host organization onboarding request form |

---

## 2. Dynamic & Authenticated User Pages

| Route Path | File Location | Required Role / Authority | Description |
| :--- | :--- | :--- | :--- |
| `/student/profile` | `app/student/profile/page.tsx` | `STUDENT` | Student account settings and privacy preferences |
| `/student/my-challenges` | `app/student/my-challenges/page.tsx` | `STUDENT` | Dashboard of student's enrolled challenges and teams |
| `/challenges/[slug]/register` | `app/challenges/[slug]/register/page.tsx` | `STUDENT` | Team registration form for a specific challenge |
| `/challenges/[slug]/submit` | `app/challenges/[slug]/submit/page.tsx` | `STUDENT` (Team Lead) | Immutable solution submission portal |
| `/invite/[token]` | `app/invite/[token]/page.tsx` | `STUDENT` | Team invitation acceptance / decline portal |
| `/guardian/approve/[token]` | `app/guardian/approve/[token]/page.tsx` | Public (Guardian Token) | Parent/guardian double opt-in approval page |
| `/guardian/approve/success` | `app/guardian/approve/success/page.tsx` | Public | Guardian approval confirmation view |
| `/org/dashboard` | `app/org/dashboard/page.tsx` | `ORGANIZATION` | Host organization dashboard |
| `/org/challenges/new` | `app/org/challenges/new/page.tsx` | `ORGANIZATION` (Verified) | Challenge creation & submission form |
| `/org/challenges/[id]` | `app/org/challenges/[id]/page.tsx` | `ORGANIZATION` | Host challenge overview and submission management |
| `/org/challenges/[id]/edit` | `app/org/challenges/[id]/edit/page.tsx` | `ORGANIZATION` | Edit challenge draft or request review resubmission |
| `/admin` | `app/admin/page.tsx` | `ADMIN` | Administrator governance dashboard |
| `/admin/challenges/[id]` | `app/admin/challenges/[id]/page.tsx` | `ADMIN` | Admin review, approval/rejection, and judging management |

---

## 3. Legal & Regulatory Documents

| Route Path | File Location | Authority / Version | Purpose |
| :--- | :--- | :--- | :--- |
| `/terms` | `app/(legal)/terms/page.tsx` | Draft v2026.1 | Terms of Use & League Rules |
| `/privacy` | `app/(legal)/privacy/page.tsx` | Draft v2026.1 | Privacy Policy & Minor Data Notice |
| `/rules` | `app/(legal)/rules/page.tsx` | Draft v2026.1 | League Official Rules |
| `/code-of-conduct` | `app/(legal)/code-of-conduct/page.tsx` | Draft v2026.1 | Participant Code of Conduct |
| `/dmca` | `app/(legal)/dmca/page.tsx` | Draft v2026.1 | DMCA Copyright Policy |
| `/cookie-policy` | `app/(legal)/cookie-policy/page.tsx` | Draft v2026.1 | Cookie & Local Storage Disclosure |
| `/accessibility` | `app/(legal)/accessibility/page.tsx` | Draft v2026.1 | Accessibility Commitment (WCAG 2.1 AA) |
| `/security-reporting` | `app/(legal)/security-reporting/page.tsx` | Draft v2026.1 | Vulnerability Disclosure Policy |

---

## 4. API Route Handlers

| Route Path | Method | File Location | Description |
| :--- | :---: | :--- | :--- |
| `/logout` | `POST` | `app/logout/route.ts` | Invalidates user session cookie and revokes database session |

---

## 5. Server Actions (`lib/actions.ts`)

| Action Function | Auth Requirement | `APP_MODE` Behavior | Purpose |
| :--- | :--- | :--- | :--- |
| `studentSignupAction` | None | Blocked in `MARKETING_ONLY` | Register student account & initiate guardian token if minor |
| `organizationSignupAction` | None | Blocked in `MARKETING_ONLY` | Register unverified host organization account |
| `loginAction` | None | Allowed | Authenticate email + password + TOTP MFA |
| `updateStudentProfileAction` | `STUDENT` | Blocked in `MARKETING_ONLY` | Update student profile fields |
| `createTeamAction` | `STUDENT` | Blocked in `MARKETING_ONLY` | Create team and atomically enroll student |
| `inviteTeamMemberAction` | `STUDENT` (Lead) | Blocked in `MARKETING_ONLY` | Dispatch email invitation token to team member |
| `acceptInviteAction` | `STUDENT` | Blocked in `MARKETING_ONLY` | Accept team invitation and enroll student |
| `submitSolutionAction` | `STUDENT` (Lead) | Blocked in `MARKETING_ONLY` | Submit immutable solution revision + receipt |
| `createChallengeAction` | `ORGANIZATION` | Blocked in `MARKETING_ONLY` | Create draft challenge |
| `updateChallengeAction` | `ORGANIZATION` | Blocked in `MARKETING_ONLY` | Update challenge draft or submit for admin review |
| `adminVerifyOrganizationAction` | `ADMIN` | Blocked in `MARKETING_ONLY` | Approve/verify or reject host organization profile |
| `adminReviewChallengeAction` | `ADMIN` | Blocked in `MARKETING_ONLY` | Approve or request edits on submitted challenge |
| `publishResultsAction` | `ADMIN` | Blocked in `MARKETING_ONLY` | Publish verified award result snapshot |

---

## 6. Scheduled Jobs & Background Tasks

| Job Identifier | Trigger / Schedule | Script File Location | Description |
| :--- | :--- | :--- | :--- |
| `scan-legal-placeholders` | Build / Pre-commit | `scripts/scan-legal-placeholders.mjs` | Fails build if required legal token placeholders are missing |
| `verify-d1-migration-integrity` | CI Pipeline | `scripts/verify-d1-migration-integrity.mjs` | Validates sequential SQL migration file integrity |
