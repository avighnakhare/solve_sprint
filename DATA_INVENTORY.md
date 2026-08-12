# Data Inventory & Categorization Map

Complete catalog of all personal data, system identifiers, credentials, and legal consents collected by SolveSprint.

---

## Data Categories & Storage Table

| Data Element | Category | Data Subject | Storage Location | Retention Period | Encryption / Protection | Third-Party Disclosure |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Email Address** | PII / Credentials | Student / Org / Parent | `User.email`, `TeamMember.invitedEmail` | Account Lifetime | DB Index / HTTPS | Resend (Email Delivery) |
| **Password Hash** | Security Credential | Student / Org | `User.passwordHash` | Account Lifetime | bcrypt (Cost 12) | None (Never Exposed) |
| **Student Name** | PII | Student | `StudentProfile.firstName`, `lastName` | Account Lifetime | DB Encryption at Rest | Public Leaderboard (if opted in) |
| **Grade / School** | PII / Education | Student | `StudentProfile.grade`, `schoolName` | Account Lifetime | DB Encryption at Rest | Challenge Organizers |
| **City / State / Country**| PII | Student / Org | `StudentProfile`, `OrganizationProfile` | Account Lifetime | DB Encryption at Rest | Public Challenge Briefs |
| **Parent Name & Email** | PII / Guardian | Parent/Guardian | `ConsentRecord.statementText`, `VerificationToken` | Account Lifetime | DB Encryption at Rest | Resend (Double-Opt-In Link) |
| **Parent Digital Signature**| Legal Consent | Parent/Guardian | `ConsentRecord.statementText` | Permanent Legal Record | DB Encryption at Rest | None |
| **JWT Session Token** | Auth Token | Authenticated User | Cookie (`solvesprint_session`) | 14 Days | HS256 JWT Signed | None |
| **Verification Token Hash**| Auth Token | Invites / Approvals | `VerificationToken.tokenHash`, `TeamMember.inviteTokenHash` | Single-use (Max 72h) | SHA-256 Hashed | None |
| **Submission URLs** | User Content / IP | Student Team | `Submission.submissionLink`, `SubmissionRevision` | Challenge Lifetime | HTTPS Only | Challenge Host & Judges |
