# Routes, Server Actions, and Form Field Dictionary

## 1. Complete Route Manifest

| ID | Route / Action | Method | Public/Protected | Role Scope | Ownership Check | Input Payload | Data Read | Data Written | Side Effects | Evidence |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- | :--- | :--- | :--- | :--- |
| **R01** | `/` | GET | Public | All | None | None | Featured challenges | None | None | [app/page.tsx](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/app/page.tsx#L1-L20) |
| **R02** | `/about` | GET | Public | All | None | None | Static content | None | None | [app/about/page.tsx](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/app/about/page.tsx#L1-L20) |
| **R03** | `/admin` | GET | Protected | ADMIN | System Admin | None | All submitted challenges | None | None | [app/admin/page.tsx](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/app/admin/page.tsx#L1-L30) |
| **R04** | `/admin/challenges/[id]` | GET | Protected | ADMIN | System Admin | `params.id` | Challenge brief, teams, awards | None | None | [app/admin/challenges/[id]/page.tsx](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/app/admin/challenges/[id]/page.tsx#L1-L40) |
| **R05** | `/challenges` | GET | Public | All | None | `searchParams` | Active challenges list | None | None | [app/challenges/page.tsx](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/app/challenges/page.tsx#L1-L30) |
| **R06** | `/challenges/[slug]` | GET | Public | All | None | `params.slug` | Challenge brief details | None | None | [app/challenges/[slug]/page.tsx](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/app/challenges/[slug]/page.tsx#L1-L40) |
| **R07** | `/challenges/[slug]/register` | GET | Protected | STUDENT | Student User | `params.slug` | Challenge brief, student teams | None | None | [app/challenges/[slug]/register/page.tsx](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/app/challenges/[slug]/register/page.tsx#L1-L30) |
| **R08** | `/challenges/[slug]/submit` | GET | Protected | STUDENT | Team Lead | `params.slug` | Team record, submission status | None | Redirects if not lead | [app/challenges/[slug]/submit/page.tsx](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/app/challenges/[slug]/submit/page.tsx#L1-L35) |
| **R09** | `/invite/[token]` | GET | Public | All | None | `params.token` | Team & member invite info | None | None | [app/invite/[token]/page.tsx](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/app/invite/[token]/page.tsx#L1-L30) |
| **R10** | `/leaderboard` | GET | Public | All | None | None | Completed awards & team scores | None | None | [app/leaderboard/page.tsx](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/app/leaderboard/page.tsx#L1-L25) |
| **R11** | `/login` | GET | Public | All | None | `searchParams.next` | None | None | None | [app/login/page.tsx](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/app/login/page.tsx#L1-L25) |
| **R12** | `/logout` | GET | Public | All | None | None | Cookie token | Destroys session cookie | Redirects to `/` | [app/logout/route.ts](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/app/logout/route.ts#L1-L8) |
| **R13** | `/org/challenges/new` | GET | Protected | ORGANIZATION | Org Host | None | Org Profile | None | None | [app/org/challenges/new/page.tsx](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/app/org/challenges/new/page.tsx#L1-L25) |
| **R14** | `/org/challenges/[id]` | GET | Protected | ORGANIZATION | Org Host | `params.id` | Challenge & submissions for org | None | Verifies org ownership | [app/org/challenges/[id]/page.tsx](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/app/org/challenges/[id]/page.tsx#L1-L35) |
| **R15** | `/org/challenges/[id]/edit` | GET | Protected | ORGANIZATION | Org Host | `params.id` | Challenge details | None | Verifies org ownership | [app/org/challenges/[id]/edit/page.tsx](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/app/org/challenges/[id]/edit/page.tsx#L1-L30) |
| **R16** | `/org/dashboard` | GET | Protected | ORGANIZATION | Org Host | None | Org hosted challenges list | None | None | [app/org/dashboard/page.tsx](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/app/org/dashboard/page.tsx#L1-L25) |
| **R17** | `/organization/signup` | GET | Public | All | None | None | None | None | None | [app/organization/signup/page.tsx](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/app/organization/signup/page.tsx#L1-L20) |
| **R18** | `/privacy` | GET | Public | All | None | None | Static policy text | None | None | [app/privacy/page.tsx](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/app/privacy/page.tsx#L1-L15) |
| **R19** | `/rules` | GET | Public | All | None | None | Static rules text | None | None | [app/rules/page.tsx](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/app/rules/page.tsx#L1-L15) |
| **R20** | `/student/my-challenges` | GET | Protected | STUDENT | Student User | None | Student joined teams | None | None | [app/student/my-challenges/page.tsx](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/app/student/my-challenges/page.tsx#L1-L30) |
| **R21** | `/student/profile` | GET | Protected | STUDENT | Student User | None | StudentProfile record | None | None | [app/student/profile/page.tsx](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/app/student/profile/page.tsx#L1-L25) |
| **R22** | `/student/signup` | GET | Public | All | None | `lockedEmail`, `token` | None | None | None | [app/student/signup/page.tsx](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/app/student/signup/page.tsx#L1-L17) |
| **R23** | `/terms` | GET | Public | All | None | None | Static terms text | None | None | [app/terms/page.tsx](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/app/terms/page.tsx#L1-L15) |

---

## 2. Server Action Inventory

| Action Function | Auth Requirement | Validation Schema | Primary Database Write | Side Effects | Evidence |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `studentSignupAction` | Public | `studentSchema` | Creates `User` & `StudentProfile` | Sets session cookie | [lib/actions.ts:L290](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/lib/actions.ts#L290) |
| `organizationSignupAction` | Public | `organizationSchema` | Creates `User` & `OrganizationProfile` | Sets session cookie | [lib/actions.ts:L331](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/lib/actions.ts#L331) |
| `loginAction` | Public | `loginSchema` | Reads `User` record | Sets session cookie | [lib/actions.ts:L406](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/lib/actions.ts#L406) |
| `updateStudentProfileAction` | STUDENT | `studentProfileSchema` | Updates `StudentProfile` | Revalidates `/student/profile` | [lib/actions.ts:L443](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/lib/actions.ts#L443) |
| `createChallengeAction` | ORGANIZATION | `challengeSchema` | Creates `Challenge` (`DRAFT`) | Revalidates dashboard | [lib/actions.ts:L541](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/lib/actions.ts#L541) |
| `updateChallengeAction` | ORGANIZATION | `challengeSchema` | Updates `Challenge` | Verifies org ownership | [lib/actions.ts:L561](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/lib/actions.ts#L561) |
| `createTeamAction` | STUDENT | `teamSchema` | Creates `Team` & `TeamMember` | Sends invite emails (Resend) | [lib/actions.ts:L623](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/lib/actions.ts#L623) |
| `acceptInviteAction` | Member Session | Token match | Updates `TeamMember` (`ACCEPTED`) | Binds student to team | [lib/actions.ts:L799](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/lib/actions.ts#L799) |
| `declineInviteAction` | Member Session | Token match | Updates `TeamMember` (`DECLINED`) | Removes pending invite | [lib/actions.ts:L839](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/lib/actions.ts#L839) |
| `inviteStudentSignupAction` | Public Token | `studentSchema` | Creates `User`, `Profile`, accepts invite | Sets session cookie | [lib/actions.ts:L857](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/lib/actions.ts#L857) |
| `submitSolutionAction` | STUDENT (Lead) | `submissionSchema` | Creates/updates `Submission` | Verifies team leadership | [lib/actions.ts:L924](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/lib/actions.ts#L924) |
| `adminChallengeAction` | ADMIN | Transition Matrix | Updates `Challenge.status` | Admin review notes | [lib/actions.ts:L988](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/lib/actions.ts#L988) |
| `addAwardAction` | ADMIN | Award Schema | Creates `Award` | Unique constraint check | [lib/actions.ts:L1051](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/lib/actions.ts#L1051) |
