# Database Dictionary and Consent Evidence Locations

## 1. Complete Database Model Dictionary

| Model | Field | Type | Required | Sensitive | Readers | Writers | Deletion Behavior | Evidence |
| :--- | :--- | :---: | :---: | :---: | :--- | :--- | :--- | :--- |
| `User` | `id` | CUID String | Yes | No | Internal | System / Signup | Cascade deletes profiles | [schema.prisma:L11](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/prisma/schema.prisma#L11) |
| `User` | `email` | String (Unique) | Yes | Yes (PII) | User, Admin | `studentSignupAction`, `orgSignupAction` | Deleted with User | [schema.prisma:L13](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/prisma/schema.prisma#L13) |
| `User` | `passwordHash` | String | Yes | High (Hash) | `loginAction` | `hashPassword()` | Deleted with User | [schema.prisma:L14](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/prisma/schema.prisma#L14) |
| `User` | `role` | String | Yes | High (Role) | `requireRole()` | System / Signup | Deleted with User | [schema.prisma:L15](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/prisma/schema.prisma#L15) |
| `StudentProfile` | `firstName`, `lastName` | String | Yes | Yes (PII) | User, Team | Signup / Profile Form | Cascade on User deletion | [schema.prisma:L26](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/prisma/schema.prisma#L26) |
| `StudentProfile` | `schoolName` | String | Yes | Low | Public Leaderboard | Signup / Profile Form | Cascade on User deletion | [schema.prisma:L29](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/prisma/schema.prisma#L29) |
| `StudentProfile` | `parentConsent` | Boolean | Yes | Legal Consent | System | `studentSignupAction` | Cascade on User deletion | [schema.prisma:L35](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/prisma/schema.prisma#L35) |
| `OrganizationProfile` | `organizationName` | String | Yes | Public Org | Public Challenge | Org Signup | Cascade on User deletion | [schema.prisma:L46](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/prisma/schema.prisma#L46) |
| `Challenge` | `status` | String | Yes | Governance | Public / Org / Admin | `createChallenge`, `adminAction` | Cascade on Org deletion | [schema.prisma:L86](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/prisma/schema.prisma#L86) |
| `Team` | `leadStudentId` | Foreign Key | Yes | Ownership | Team members, Org | `createTeamAction` | Cascade on Challenge | [schema.prisma:L105](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/prisma/schema.prisma#L105) |
| `TeamMember` | `inviteTokenHash` | String (Unique) | Optional | Secret Token | `acceptInviteAction` | `createTeamAction` | Set Null / Cascade | [schema.prisma:L128](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/prisma/schema.prisma#L128) |
| `Submission` | `submissionLink` | String | Yes | Intellectual Property | Host Org, Admin | `submitSolutionAction` | Cascade on Team | [schema.prisma:L148](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/prisma/schema.prisma#L148) |
| `Award` | `points`, `awardType` | String / Int | Yes | Public Score | Leaderboard, Org | `addAwardAction` | Cascade on Challenge | [schema.prisma:L160](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/prisma/schema.prisma#L160) |
| `AuditLog` | `action`, `metadataJson` | String | Yes | Audit History | Admin | `db.auditLog.create()` | Nullified on User delete | [schema.prisma:L196](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/prisma/schema.prisma#L196) |

---

## 2. Evidence Storage Location Map

| Legal & Identity Item | Stored Location | Persistence Status | Evidence |
| :--- | :--- | :--- | :--- |
| **Student Signature** | Form State (`FormData`) | Discarded post-validation (Not in Schema) | [components/forms/student-signup-form.tsx:L128](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/components/forms/student-signup-form.tsx#L128) |
| **Guardian Signature** | Form State (`FormData`) | Discarded post-validation (Not in Schema) | [components/forms/student-signup-form.tsx:L124](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/components/forms/student-signup-form.tsx#L124) |
| **Guardian Name** | Form State (`FormData`) | Discarded post-validation (Not in Schema) | [components/forms/student-signup-form.tsx:L118](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/components/forms/student-signup-form.tsx#L118) |
| **Guardian Email** | Form State (`FormData`) | Discarded post-validation (Not in Schema) | [components/forms/student-signup-form.tsx:L120](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/components/forms/student-signup-form.tsx#L120) |
| **Age Confirmation (13+)** | Form Checkbox | Converted to `parentConsent` Boolean | [lib/actions.ts:L284](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/lib/actions.ts#L284) |
| **Parent Consent Flag** | `StudentProfile.parentConsent` | Persisted in SQLite / D1 Database | [prisma/schema.prisma:L35](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/prisma/schema.prisma#L35) |
| **Terms / Policy Version** | Unversioned Checkbox (`agree`) | Discarded post-validation | [lib/actions.ts:L285](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/lib/actions.ts#L285) |
| **Consent Acceptance IP / UA** | Unrecorded | Not tracked in database | [lib/actions.ts:L290](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/lib/actions.ts#L290) |
