# SolveSprint Post-Remediation Change Manifest

This manifest documents all source files created or modified during the production remediation pass.

| File Path | Change Type | Purpose & Technical Justification |
| :--- | :---: | :--- |
| [package.json](file:///package.json) | `MODIFIED` | Pin exact release-critical dependencies (`next`: `15.5.22`, `react`: `18.3.1`, `@opennextjs/cloudflare`: `1.15.1`, `wrangler`: `4.59.2`, `prisma`: `6.19.3`). |
| [prisma/schema.prisma](file:///prisma/schema.prisma) | `MODIFIED` | Purify status enums, add soft deletion (`deletedAt`), non-destructive `RESTRICT` rules, `Session` versioning, `GuardianRelationship`, `ChallengeEnrollment` unique constraints, `SubmissionRevision` receipt fields, `PolicyDocument`, and `ConsentRecord`. |
| [prisma/migrations/20260727000000_production_remediation/migration.sql](file:///prisma/migrations/20260727000000_production_remediation/migration.sql) | `NEW` | Sequential D1 migration SQL script creating missing tables, indices, and column additions for Cloudflare D1 deployment. |
| [lib/db-types.ts](file:///lib/db-types.ts) | `MODIFIED` | Define isolated enums for `AccountStatus`, `GuardianApprovalStatus`, `OrganizationVerificationStatus`, and `JudgeVerificationStatus`. |
| [lib/auth.ts](file:///lib/auth.ts) | `MODIFIED` | Require `AUTH_SECRET` unconditionally without default fallbacks; validate session token hash, revocation timestamp, and session version against `User.sessionVersion`. |
| [lib/mfa.ts](file:///lib/mfa.ts) | `NEW` | Web Crypto AES-256-GCM TOTP secret encryption using `MFA_ENCRYPTION_KEY` and 8 single-use hashed recovery code generation. |
| [lib/rate-limit-edge.ts](file:///lib/rate-limit-edge.ts) | `NEW` | Cloudflare Rate Limiting edge protection using `getCloudflareContext().env`, trusted `CF-Connecting-IP`, and fail-closed 503 behavior in production. |
| [lib/capability-matrix.ts](file:///lib/capability-matrix.ts) | `NEW` | Server-enforced capability matrix gating server actions based on `APP_MODE` (`MARKETING_ONLY`, `PRIVATE_PILOT`, `LIVE`). |
| [lib/consent.ts](file:///lib/consent.ts) | `MODIFIED` | Salted SHA-256 IP hashing (`hashIp`), truncated user-agent recording (`userAgentTrunc`), versioned `PolicyDocument` mapping. |
| [lib/actions.ts](file:///lib/actions.ts) | `MODIFIED` | Update server actions to handle purified status enums, minor currency conversion (`prizeCashValueCents`), guardian approval workflows, organization verification queues, atomic challenge enrollments, submission revisions, and capability matrix checks. |
| [app/student/profile/page.tsx](file:///app/student/profile/page.tsx) | `MODIFIED` | Remove obsolete `isPublic` profile display field to separate participation consent from publicity display consent. |
| [components/forms/profile-form.tsx](file:///components/forms/profile-form.tsx) | `MODIFIED` | Remove `isPublic` checkbox from student profile form. |
| [components/forms/challenge-form.tsx](file:///components/forms/challenge-form.tsx) | `MODIFIED` | Convert user-entered prize cash values to minor currency units in cents (`prizeCashValueCents`). |
| [app/admin/challenges/[id]/page.tsx](file:///app/admin/challenges/[id]/page.tsx) | `MODIFIED` | Update organization record view to display `organization.verificationStatus`. |
| [app/org/dashboard/page.tsx](file:///app/org/dashboard/page.tsx) | `MODIFIED` | Update host dashboard header to display `organization.verificationStatus`. |
| [app/guardian/approve/[token]/page.tsx](file:///app/guardian/approve/[token]/page.tsx) | `MODIFIED` | Update guardian approval flow to set `studentProfile.guardianApprovalStatus = GuardianApprovalStatus.APPROVED`. |
| [scripts/scan-legal-placeholders.mjs](file:///scripts/scan-legal-placeholders.mjs) | `NEW` | Token scanner inspecting Markdown files for explicit unreplaced required legal placeholders (`{{LEGAL_ENTITY_NAME}}`, etc.). |
| [scripts/verify-d1-migration-integrity.mjs](file:///scripts/verify-d1-migration-integrity.mjs) | `NEW` | Verification script ensuring Wrangler D1 migration SQL files parse and sequence correctly. |
| [.github/workflows/ci.yml](file:///.github/workflows/ci.yml) | `NEW` | CI quality gate running lint, typecheck, tests, placeholder scanner, and OpenNext Cloudflare production build. |
| [tests/security-workflow-contracts.test.mjs](file:///tests/security-workflow-contracts.test.mjs) | `MODIFIED` | Update security contract test assertions for purified enums and status contracts. |
