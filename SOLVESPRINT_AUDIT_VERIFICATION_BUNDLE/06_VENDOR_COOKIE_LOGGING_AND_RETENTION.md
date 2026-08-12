# Vendor Disclosure, Cookie Proof, Console Logging, and Data Retention

## 1. Vendor & Third-Party Integration Inventory

| Vendor / Service | Function | Exact Data Sent | Trigger | Data Storage Region | Contract / DPA Status | Evidence |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Resend** | Transactional Email | Recipient email, invitation link | Team Member Invite | U.S. (Default) | Standard Terms | [lib/email.ts:L36](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/lib/email.ts#L36) |
| **Cloudflare D1** | Edge Database | User credentials, profiles, submissions | Application Queries | Global Edge | Cloudflare DPA | [prisma.ts:L12](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/prisma.ts#L12) |
| **OpenNext / Wrangler** | Edge Runtime | HTTP Headers, IP, Request Data | Page Requests | Global Edge | Cloudflare Terms | [package.json:L38](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/package.json#L38) |

---

## 2. Browser Storage and Cookie Audit

| Name / Key | Type | Provider | Purpose | Essential? | Max-Age / Duration | SameSite | Secure | HttpOnly | Consent Required? |
| :--- | :---: | :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| `solvesprint_session` | Cookie | SolveSprint | JWT Authentication Session | Yes | 14 Days (1,209,600s) | `Lax` | `true` (Prod) | `true` | No (Strictly Necessary) |

*Note*: Inspection of client scripts and bundle manifests confirmed **0 instances** of `localStorage`, `sessionStorage`, `IndexedDB`, Google Analytics, Facebook Pixel, or tracking cookies.

---

## 3. Server Console Logging Audit

- **Local Email Fallback**: When `RESEND_API_KEY` is not set, `lib/email.ts` prints recipient email and invitation links to stdout via `console.log`.
- **Database Query Logs**: In development mode (`NODE_ENV === "development"`), Prisma logs warnings and errors to stdout.
- **Credential Protection**: Passwords, bcrypt hashes, and JWT secrets are not logged during authentication.

---

## 4. Data Retention & Deletion Schedule

- **Automated Purge / TTL Rules**: NO IMPLEMENTED AUTOMATED TTL PURGE RULE.
- **Account Deletion Path**: No self-service account deletion UI exists. Deletion is executed manually via database admin intervention.
- **Cascade Deletion Rules**:
  - Deleting a `User` cascades to delete `StudentProfile` or `OrganizationProfile`.
  - Deleting a `Challenge` cascades to delete associated `Team`, `Submission`, and `Award` records.
  - Deleting a `User` sets `userId` to `NULL` in `AuditLog` records, preserving audit trail history.
