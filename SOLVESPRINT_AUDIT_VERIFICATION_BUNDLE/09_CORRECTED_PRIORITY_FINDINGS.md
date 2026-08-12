# Corrected Priority Findings Ledger

Prioritized list of technical, privacy, governance, and security findings evaluated by actual realistic threat impact.

---

## Priority 0 (P0): Critical Vulnerabilities & Immediate Safety Risks

### P0-1: Default Static JWT Secret Fallback in Non-Production Environment Defaults
- **Finding ID**: `FINDING-P0-01`
- **Affected Code**: `lib/auth.ts:L11-L17` (`secretKey()`)
- **Threat Model**: If `process.env.AUTH_SECRET` is unset and `NODE_ENV` is not explicitly set to `"production"` (e.g., staging, preview, or local deployments), `secretKey()` falls back to a hardcoded string `"dev-only-change-this-solvesprint-secret"`. An attacker aware of this fallback can mint valid JWT session tokens with arbitrary subject IDs (`sub: "<admin-id>"`) and forge `solvesprint_session` cookies to achieve full administrative account takeover.
- **Evidence**:
  ```ts
  function secretKey() {
    const secret = process.env.AUTH_SECRET;
    if (!secret && process.env.NODE_ENV === "production") {
      throw new Error("AUTH_SECRET is required in production.");
    }
    return new TextEncoder().encode(secret || "dev-only-change-this-solvesprint-secret");
  }
  ```
- **Confidence**: High (Verified by static trace in `lib/auth.ts`).
- **Recommended Correction**: Throw an error if `process.env.AUTH_SECRET` is missing in ALL runtime environments, or generate a random ephemeral secret per server process start in non-production.
- **Verification Test**: Unset `AUTH_SECRET` in `.env` and verify application refuses to start or sign JWTs with static fallback strings.

---

### P0-2: Unverified Guardian Email & Immediate Minor Account Activation
- **Finding ID**: `FINDING-P0-02`
- **Affected Code**: `lib/actions.ts:L281-L300` (`studentSignupAction`), `components/forms/student-signup-form.tsx:L118-L128`
- **Threat Model**: When a student indicates they are under 18 years old, Step 3 collects parent name, email, and typed electronic signature. However, the server action creates the user record and logs them in immediately without dispatching a verification link to the parent email address. A minor can type a fake parent name and their own secondary email address to activate an account without actual guardian awareness.
- **Evidence**: [lib/actions.ts:L296](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/lib/actions.ts#L296) sets `parentConsent: true` immediately upon form submit.
- **Confidence**: High (Verified by static trace in `lib/actions.ts`).
- **Recommended Correction**: Implement an automated double-opt-in parental verification email containing an out-of-band confirmation token link before changing account status to fully active.
- **Verification Test**: Submit student registration with under-18 status and verify account remains in pending consent state until parent verification link is clicked.

---

## Priority 1 (P1): Pre-Public Launch Requirements

### P1-1: GET-Method Session Logout Endpoint Susceptible to CSRF
- **Finding ID**: `FINDING-P1-01`
- **Affected Code**: `app/logout/route.ts:L4-L7`
- **Threat Model**: The `/logout` route accepts HTTP `GET` requests to invoke `destroySession()`. Any third-party site embedding `<img src="https://solvesprint.com/logout">` will force authenticated users visiting that site to log out of SolveSprint.
- **Evidence**: `export async function GET() { await destroySession(); ... }` in `app/logout/route.ts`.
- **Confidence**: High (Verified by static trace).
- **Recommended Correction**: Change `/logout` to accept HTTP `POST` requests with CSRF form/header protection.

---

### P1-2: Absence of Authentication Throttling & Bot Rate Limiting
- **Finding ID**: `FINDING-P1-02`
- **Affected Code**: `lib/actions.ts:L265` (`studentSignupAction`), `lib/actions.ts:L406` (`loginAction`)
- **Threat Model**: Registration and login server actions lack rate limiting or IP throttling, allowing credential-stuffing attacks or automated bot registrations.
- **Evidence**: No rate limiter (e.g. Upstash, Redis token bucket, or memory store) is present in `lib/actions.ts`.
- **Confidence**: High (Verified by code inspection).
- **Recommended Correction**: Implement sliding-window rate limiting on login and registration endpoints.

---

### P1-3: Unverified Organization Account Status Defaulting to ACTIVE
- **Finding ID**: `FINDING-P1-03`
- **Affected Code**: `lib/actions.ts:L360-L380`, `prisma/schema.prisma:L56`
- **Threat Model**: New host organization accounts receive `status: "ACTIVE"` immediately upon signup, allowing unverified entities to draft and submit challenge briefs.
- **Evidence**: `status: "ACTIVE"` default in Prisma schema for `OrganizationProfile`.
- **Confidence**: High (Verified by schema & action trace).
- **Recommended Correction**: Set default organization status to `"PENDING_VERIFICATION"` and require administrative approval before host dashboard access is granted.

---

## Priority 2 (P2): Pre-Submission & Governance Requirements

### P2-1: Unchecked External Submission URLs
- **Finding ID**: `FINDING-P2-01`
- **Affected Code**: `lib/actions.ts:L924` (`submitSolutionAction`)
- **Threat Model**: Solution submissions accept arbitrary external URLs (`submissionLink`, `fileUrl`) without protocol allowlisting or external link warning interstitials.
- **Recommended Correction**: Validate URL scheme (`https://` only), render links with external redirect warnings, and sanitize outputs.

---

### P2-2: Missing Content Security Policy (CSP) & HTTP Security Headers
- **Finding ID**: `FINDING-P2-02`
- **Affected Code**: `next.config.mjs`
- **Threat Model**: Absence of `Content-Security-Policy`, `X-Frame-Options: DENY`, and `X-Content-Type-Options: nosniff` leaves application vulnerable to clickjacking and MIME-sniffing exploits.
- **Recommended Correction**: Configure security headers in `next.config.mjs`.

---

### P2-3: Absence of Dedicated JUDGE Role & Permission Isolation
- **Finding ID**: `FINDING-P2-03`
- **Affected Code**: `lib/db-types.ts`, `lib/auth.ts`, `lib/actions.ts:L1051`
- **Threat Model**: Award assignment relies exclusively on `ADMIN` role. Host organization representatives cannot be assigned granular judging roles restricted to their own challenge briefs.
- **Recommended Correction**: Introduce a `JUDGE` role with scoped permissions restricted to specific challenge evaluation rubrics.

---

## Priority 3 (P3): Operational Hardening & Privacy Enhancements

### P3-1: Lack of Self-Service Account Deletion & Data Export
- **Finding ID**: `FINDING-P3-01`
- **Affected Code**: `app/student/profile/page.tsx`
- **Recommended Correction**: Add self-service account deletion and data export requests in student settings.

---

### P3-2: Hard Cascade Database Deletions
- **Finding ID**: `FINDING-P3-02`
- **Affected Code**: `prisma/schema.prisma` (`onDelete: Cascade`)
- **Recommended Correction**: Transition key entities (Users, Submissions, Challenges) to soft deletion (`deletedAt` timestamps).

---

### P3-3: Lack of Automated Data Retention Purge TTL
- **Finding ID**: `FINDING-P3-03`
- **Affected Code**: Database retention policy
- **Recommended Correction**: Define explicit data retention schedules and automated cleanup cron scripts.
