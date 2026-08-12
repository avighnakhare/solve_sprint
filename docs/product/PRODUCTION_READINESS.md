# SolveSprint production readiness

This is a readiness audit, not a production-ready certification.

## Blockers

- Production dependency audit reports high-severity advisories affecting the installed Next.js 14 line; npm proposes only a breaking Next.js 16 upgrade. Plan and verify that framework migration before launch.
- No email verification or password recovery.
- No brute-force protection or durable distributed rate limiting.
- No separate organization-verification workflow despite youth-facing access.
- No judge assignment/review model.
- No independent results-ready/results-published lifecycle.
- Legal text is not counsel-reviewed for minors, consent, IP, retention, or jurisdiction.
- No documented backup/restore process for hosted D1.
- No full database-backed authorization/integration test suite.

## High

- Team-lead submission ownership is enforced, but immutable final snapshots are absent.
- Logout uses a GET route rather than a confirmed POST action.
- No CSRF-specific strategy is documented for server actions and logout.
- No account suspension/organization suspension enforcement.

## Medium

- Session JWTs last 14 days and are not rotated/revoked server-side.
- No request correlation, structured redacted logging, error monitoring, or health endpoint.
- Local email fallback logs invitation URLs; acceptable only in development.
- No email delivery retry/failure queue.
- Challenge and admin lists are unpaginated.
- No CSP reporting endpoint or malware-scanning integration because uploads are not implemented.
- Organization `status` exists but is not a verified-state workflow.
- Public leaderboard publication is derived from awards without a publication flag.
- Development fixtures include duplicate/test-looking public content.

## Controls present

- Passwords use bcrypt cost 12.
- Session cookie is HttpOnly, SameSite=Lax, Secure in production.
- Production requires `AUTH_SECRET`.
- URL and input schemas use Zod.
- Challenge dates and rubric total are validated server-side.
- Organization ownership is checked server-side.
- Admin authorization is checked server-side.
- Invite tokens have 256-bit entropy, are SHA-256 hashed at rest, and expire.
- Prisma relations use foreign keys and cascading behavior.
- Audit logs cover challenge decisions and award creation.
- React output escaping is used; no unsafe HTML rendering was found.
- Team submissions are restricted to the registered lead.
- Admin challenge changes follow an explicit server-side transition matrix.
- Awards have a database uniqueness constraint and duplicate handling.
- Public registration cannot grant an admin role through an email allowlist.
- Duplicate-account errors use generic public copy.

## Implemented in this overhaul

- Security response headers.
- Safe internal redirect validation retained.
- Central capability documentation and explicit unsupported-role handling.
- Branded global not-found and global error recovery.
- Consistent focus, error, loading, empty, mobile, and reduced-motion patterns.
- Migration ledger and launch-blocker classification.
- Zero-dependency workflow contract tests for admin provisioning, team-lead submission authority, transition rules, award uniqueness, and public lifecycle language.
- Sites/D1 deployment migrations mirror the two incremental Prisma changes without replaying the existing base schema.
- The Windows-only Prisma query engine is excluded from the Cloudflare deployment trace; hosted requests use the D1 adapter.
- The Sites build stages Wrangler's final Node-compatible Worker bundle rather than the OpenNext pre-bundle.

## Launch checklist

Before real student use:

1. Obtain qualified legal/privacy review.
2. Implement email verification and recovery.
3. Implement durable rate limiting and alerting.
4. Implement organization verification.
5. Add automated authorization/integration tests.
6. Define backup, restore, retention, deletion, and incident processes.
7. Resolve public test data.
8. Add results publication controls and request-level award idempotency.
9. Complete accessibility testing with assistive technology.
10. Run dependency and infrastructure security review.
