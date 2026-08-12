# Consent, Age Policy, Teams, and Submission Link Security

## 1. Under-13 COPPA vs. Under-18 Guardian Policy Analysis

### A. Under-13 Age Floor & COPPA Compliance
- **Age-13 Floor Enforcement**: `StudentSignupForm` includes a mandatory checkbox: `"I confirm that I am at least 13 years old. (Users must be 13+ to join SolveSprint)."`
- **Client & Server Validation**: `validate(3)` requires `data.get("is13Plus")` to be checked. Server-side `studentSchema` refines `is13Plus: requiredCheck`.
- **Actual Knowledge Handling**: If a user indicates they are under 13, form submission is blocked. The application does not knowingly collect personal information from children under 13 without blocking registration.

### B. Under-18 Guardian Policy (Ages 13–17)
- **Form Controls**: When `isUnder18 === "true"`, the registration form renders fields for Parent/Guardian Full Name, Parent/Guardian Email, and Parent/Guardian Electronic Signature.
- **Client & Server Validation**: `studentSchema` uses `.superRefine()` to enforce non-empty parent name, valid parent email, and non-empty parent signature when `isUnder18 === "true"`.
- **Verification Gap**: Upon submitting valid text strings, the user account is **immediately created and logged in**. No out-of-band email verification link is dispatched to the parent email address before account activation.

---

## 2. Registration & Consent Truth Table

| Case | `is13Plus` | `isUnder18` | Parent Name / Email | Server Action Result | Account Created? | Logged In? | Consent Record Stored |
| :--- | :---: | :---: | :--- | :--- | :---: | :---: | :--- |
| **1. Under 13 (Unchecked)** | `false` | Any | Any | Client & Server Validation Error | No | No | None |
| **2. Age 13-17 (Missing Parent Info)**| `true` | `"true"` | Omitted / Empty | Server SuperRefine Error | No | No | None |
| **3. Age 13-17 (With Parent Info)** | `true` | `"true"` | Valid strings | Account Created | **Yes** | **Yes** | `parentConsent: true` |
| **4. Age 18+** | `true` | `"false"`| N/A | Account Created | **Yes** | **Yes** | `parentConsent: false` |
| **5. Manipulated Request (Missing `agree`)**| `true` | `"false"`| N/A | Server Schema Error | No | No | None |

---

## 3. Team Member Invitation Security

- **Token Generation**: 32-byte cryptographic random bytes converted to hex string (`createInviteToken()`).
- **Token Storage**: SHA-256 hash of the token (`hashInviteToken()`) is stored in `TeamMember.inviteTokenHash`. Raw token is never stored in DB.
- **Expiration**: Expires in 7 days (`inviteExpiry()`).
- **Email Binding**: `acceptInviteAction` verifies that the logged-in student's email matches `TeamMember.invitedEmail`. Another user cannot claim an invitation link sent to a different email address.

---

## 4. Submission & External Link Security

- **Submission Links**: Solution submissions accept external URLs (`submissionLink`, optional `fileUrl`).
- **Protocol Validation**: Server validation uses Zod `z.string().url()` which accepts `http://` and `https://` protocols.
- **Link Rendering**: Rendered in UI with `target="_blank"` and `rel="noreferrer noopener"`.
- **Server Fetching / Scanning**: The application server **does not fetch or download** external submission URLs. External links are presented for host and admin review without automated malware inspection.
