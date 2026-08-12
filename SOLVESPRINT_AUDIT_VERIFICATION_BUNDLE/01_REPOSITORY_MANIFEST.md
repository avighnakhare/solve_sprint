# Repository Manifest & Reproducibility Record

**Inspection Date**: July 26, 2026  
**Environment**: Development / Local Source Tree  
**Git Commit Hash**: N/A (Folder is uninitialized git workspace)

---

## 1. Environment & Cryptographic Hashes

- **Node.js Version**: `v25.1.0`
- **Package Manager**: npm `11.6.2`
- **Lockfile Name**: `package-lock.json`
- **File Cryptographic Hashes (SHA-256)**:
  - `package.json`: `9726DD33261DC5D474419675D9033D6739EEA4EE43194156ED98015D0120E53E`
  - `package-lock.json`: `F310B8F52BD55D3D867859034D0BED3EB61A4720CFC478E237815EFC9FFF3E39`
  - `prisma/schema.prisma`: `018F1969D67C43FC84C987100516FED056B0AD3F754EFB8C7469354DF9505B5A`

---

## 2. Mechanical Directory File Listing

### Route Pages & Layouts (`app/`)
- `app/layout.tsx`: Root HTML layout with Navbar and Footer (`VERIFIED ACTIVE`)
- `app/page.tsx`: Home landing page (`VERIFIED ACTIVE`)
- `app/about/page.tsx`: About / Mission page (`VERIFIED ACTIVE`)
- `app/admin/page.tsx`: Administrative challenge list dashboard (`VERIFIED ACTIVE`)
- `app/admin/challenges/[id]/page.tsx`: Administrative challenge review & award assignment page (`VERIFIED ACTIVE`)
- `app/challenges/page.tsx`: Challenge directory list & search page (`VERIFIED ACTIVE`)
- `app/challenges/[slug]/page.tsx`: Detailed challenge brief page (`VERIFIED ACTIVE`)
- `app/challenges/[slug]/register/page.tsx`: Student team registration page (`VERIFIED ACTIVE`)
- `app/challenges/[slug]/submit/page.tsx`: Student solution submission page (`VERIFIED ACTIVE`)
- `app/invite/[token]/page.tsx`: Team member invitation acceptance/decline page (`VERIFIED ACTIVE`)
- `app/leaderboard/page.tsx`: Sitewide leaderboard scoreboard page (`VERIFIED ACTIVE`)
- `app/login/page.tsx`: User authentication login page (`VERIFIED ACTIVE`)
- `app/logout/route.ts`: Session destruction API GET handler (`VERIFIED ACTIVE`)
- `app/org/challenges/new/page.tsx`: Host challenge creation page (`VERIFIED ACTIVE`)
- `app/org/challenges/[id]/page.tsx`: Host challenge management & submission review page (`VERIFIED ACTIVE`)
- `app/org/challenges/[id]/edit/page.tsx`: Host challenge brief editing page (`VERIFIED ACTIVE`)
- `app/org/dashboard/page.tsx`: Host organization dashboard (`VERIFIED ACTIVE`)
- `app/organization/signup/page.tsx`: Host organization registration page (`VERIFIED ACTIVE`)
- `app/privacy/page.tsx`: Privacy policy document page (`VERIFIED ACTIVE`)
- `app/rules/page.tsx`: Official league rules document page (`VERIFIED ACTIVE`)
- `app/student/my-challenges/page.tsx`: Student participant dashboard (`VERIFIED ACTIVE`)
- `app/student/profile/page.tsx`: Student profile management page (`VERIFIED ACTIVE`)
- `app/student/signup/page.tsx`: 4-step student registration page (`VERIFIED ACTIVE`)
- `app/terms/page.tsx`: Terms of use document page (`VERIFIED ACTIVE`)

### Core Components (`components/`)
- `components/navbar.tsx`: Sitewide top navigation bar (`VERIFIED ACTIVE`)
- `components/footer.tsx`: Sitewide footer (`VERIFIED ACTIVE`)
- `components/auth/auth-shell.tsx`: Split visual layout wrapper for auth forms (`VERIFIED ACTIVE`)
- `components/auth/auth-form-controls.tsx`: Reusable text, password, select, submit controls (`VERIFIED ACTIVE`)
- `components/forms/student-signup-form.tsx`: 4-step student registration form (`VERIFIED ACTIVE`)
- `components/forms/organization-signup-form.tsx`: Organization registration form (`VERIFIED ACTIVE`)
- `components/forms/login-form.tsx`: User login form (`VERIFIED ACTIVE`)
- `components/forms/invite-signup-form.tsx`: Invited member signup form (`VERIFIED ACTIVE`)
- `components/forms/profile-form.tsx`: Student profile edit form (`VERIFIED ACTIVE`)
- `components/forms/challenge-form.tsx`: Challenge brief creation/edit form (`VERIFIED ACTIVE`)
- `components/forms/team-registration-form.tsx`: Team creation & member invite form (`VERIFIED ACTIVE`)
- `components/forms/submission-form.tsx`: Solution link submission form (`VERIFIED ACTIVE`)

### Backend Modules & Libraries (`lib/`)
- `lib/actions.ts`: Exported server action implementations (`VERIFIED ACTIVE`)
- `lib/auth.ts`: Authentication session, JWT signing, password hashing, role helpers (`VERIFIED ACTIVE`)
- `lib/challenges.ts`: Challenge status filters, lifecycle checks, date helpers (`VERIFIED ACTIVE`)
- `lib/db-types.ts`: Enum constants for Role, ChallengeCategory, ChallengeStatus, TeamStatus (`VERIFIED ACTIVE`)
- `lib/email.ts`: Resend API integration with console fallback (`VERIFIED ACTIVE`)
- `lib/forms.ts`: Form state helpers, validation error extraction (`VERIFIED ACTIVE`)
- `lib/invites.ts`: Token generation, SHA-256 hashing, expiry calculations (`VERIFIED ACTIVE`)
- `lib/prisma.ts`: Prisma client initialization (`VERIFIED ACTIVE`)
- `lib/utils.ts`: String normalization, slugification, app URL resolution (`VERIFIED ACTIVE`)

### Database & Scripts (`prisma/`, `scripts/`, `tests/`)
- `prisma/schema.prisma`: Prisma ORM data models (`VERIFIED ACTIVE`)
- `prisma/migrations/20260702000000_init/migration.sql`: Database schema initialization (`VERIFIED ACTIVE`)
- `prisma/migrations/20260720000000_add_organization_contact_role/migration.sql`: Contact role addition (`VERIFIED ACTIVE`)
- `prisma/migrations/20260720010000_prevent_duplicate_awards/migration.sql`: Unique award index (`VERIFIED ACTIVE`)
- `scripts/build-next.mjs`: Production build script (`VERIFIED ACTIVE`)
- `scripts/prepare-sites-build.mjs`: Cloudflare bundle script (`VERIFIED ACTIVE`)
- `scripts/seed-admin.mjs`: Admin user database seed script (`VERIFIED ACTIVE`)
- `tests/security-workflow-contracts.test.mjs`: Contract unit test suite (`VERIFIED ACTIVE`)
