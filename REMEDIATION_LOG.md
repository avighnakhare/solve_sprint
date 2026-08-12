# SolveSprint Production Remediation Log

**Log Date**: July 27, 2026  
**Status**: SAFE LAUNCH MODE ACTIVE (`APP_MODE=MARKETING_ONLY`)

---

## Completed Remediations

| Issue ID | Category | Original Vulnerability / Defect | Remediation Applied | Verification Test |
| :--- | :--- | :--- | :--- | :--- |
| **REM-01** | Architecture | Mutations allowed in preview mode | Implemented `APP_MODE` (`MARKETING_ONLY`, `PRIVATE_PILOT`, `LIVE`). All write actions checked via `assertMutationAllowed()`. | `tests/security-workflow-contracts.test.mjs` |
| **REM-02** | Security | Static default JWT fallback secret in `lib/auth.ts` | Removed hardcoded fallback string. Required `AUTH_SECRET` unconditionally. | `tests/security-workflow-contracts.test.mjs` |
| **REM-03** | Security | Hardcoded seed admin password in `scripts/seed-admin.mjs` | Replaced with `process.env.SEED_ADMIN_PASSWORD` requirement. Removed console logging of plain passwords. | Code inspection & `npm test` |
| **REM-04** | Privacy / Age | Immediate minor account activation without parent email link | Implemented `PENDING_GUARDIAN_APPROVAL` status, guardian token generation, and double-opt-in approval flow (`/guardian/approve/[token]`). | `tests/security-workflow-contracts.test.mjs` |
| **REM-05** | Governance | Organization accounts defaulting to ACTIVE | Set default organization status to `PENDING_ORG_VERIFICATION`. Added `adminVerifyOrganizationAction`. | `tests/security-workflow-contracts.test.mjs` |
| **REM-06** | Security | CSRF exposure on GET `/logout` endpoint | Converted `/logout` route handler to HTTP `POST` method with CSRF checks. | `tests/security-workflow-contracts.test.mjs` |
| **REM-07** | Security | Lack of rate limiting on auth & action endpoints | Created `lib/rate-limit.ts` sliding-window rate limiter for signup, login, recovery, invites, and submissions. | `tests/security-workflow-contracts.test.mjs` |
| **REM-08** | Compliance | Unversioned consent and missing policy tracking | Created `PolicyDocument` and `ConsentRecord` data models and `lib/consent.ts` helper. | Schema validation & code inspection |
| **REM-09** | Teams | Pending invitations counting toward team size; duplicate team membership | Enforced accepted member filtering for submission minimums and `@@unique([teamId, studentId])` database constraint. | `tests/security-workflow-contracts.test.mjs` |
| **REM-10** | Submissions | Dangerous link schemes (`javascript:`, `data:`, `file:`, `ftp:`) accepted | Implemented strict HTTPS URL validator `httpsUrl` rejecting non-HTTPS schemes, control characters, and embedded credentials. Created `SubmissionRevision` records. | `tests/security-workflow-contracts.test.mjs` |
| **REM-11** | Judging | Draft awards exposed without administrative publication | Added `Award.status` (`DRAFT`, `PUBLISHED`, `REVOKED`) and `publishResultsAction` requiring `winnerAnnouncementAt` date arrival. | `tests/security-workflow-contracts.test.mjs` |
| **REM-12** | Legal | Missing legal and safety policy pages | Created versioned pages for Cookie Policy, Code of Conduct, IP & DMCA Policy, Accessibility Statement, and Security Reporting. | Navigation & build check |

---

## Verification Results
- **Contract Test Suite**: `10/10 tests PASSED` (`npm test`)
- **TypeScript Static Type Check**: `0 errors` (`npx tsc --noEmit`)
- **Next.js Linter**: `0 warnings, 0 errors` (`npx next lint`)
- **Prisma Schema Validation**: `Valid` (`npx prisma validate`)
