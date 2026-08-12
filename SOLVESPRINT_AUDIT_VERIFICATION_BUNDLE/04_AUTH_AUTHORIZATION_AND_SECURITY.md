# Authentication Verification and Authorization Test Matrix

## 1. Authentication Configuration Audit

- **Session Token Mechanism**: JSON Web Token (JWT) signed with algorithm `HS256`.
- **Session Expiration**: 14 days (`.setExpirationTime("14d")`).
- **Cookie Attributes**:
  - `Name`: `solvesprint_session`
  - `HttpOnly`: `true`
  - `SameSite`: `"lax"`
  - `Secure`: `process.env.NODE_ENV === "production"`
  - `Path`: `"/"`
  - `MaxAge`: `1209600` seconds (14 days)
- **Password Hashing**: `bcryptjs` algorithm with work factor `12` (`bcrypt.hash(password, 12)`).
- **JWT Secret Fallback**: Fallback string `"dev-only-change-this-solvesprint-secret"` is hardcoded in `secretKey()` when `process.env.AUTH_SECRET` is unset.
  - *Production Protection*: Code throws an error if `!secret && process.env.NODE_ENV === "production"`. However, if `NODE_ENV` is not set explicitly to `"production"`, the application defaults to using the hardcoded fallback secret.

---

## 2. Authorization Ownership & Access Control Matrix

| Role / Context | Organization Challenges | Other Org Challenges | Team Submissions | Admin Dashboard | Award Assignment | Evidence |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Unauthenticated Visitor** | Read Only (Active) | Read Only (Active) | Hidden | Redirect to `/login` | Denied | [lib/auth.ts:L81](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/lib/auth.ts#L81) |
| **Student (Non-Member)** | Read Only | Read Only | Hidden | Redirect to `/login` | Denied | [lib/auth.ts:L87](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/lib/auth.ts#L87) |
| **Student (Team Member)** | Read Only | Read Only | View Submitted Link | Redirect to `/login` | Denied | [app/challenges/[slug]/submit/page.tsx:L25](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/app/challenges/[slug]/submit/page.tsx#L25) |
| **Student (Team Lead)** | Read Only | Read Only | View & Edit Link | Redirect to `/login` | Denied | [lib/actions.ts:L924](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/lib/actions.ts#L924) |
| **Organization (Host Org)** | Manage Own (`orgId`) | Denied (Scoped Query) | View Submissions for Own Challenge | Redirect to `/login` | Denied | [app/org/challenges/[id]/page.tsx:L20](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/app/org/challenges/[id]/page.tsx#L20) |
| **Organization (Unrelated Org)** | Denied | Manage Own | Denied | Redirect to `/login` | Denied | [lib/actions.ts:L561](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/lib/actions.ts#L561) |
| **System Administrator** | Full Access | Full Access | Full Access | Full Access | Full Access | [lib/actions.ts:L988](file:///c:/Users/khare/Downloads/Solve-Sprint-main/Solve-Sprint-main/lib/actions.ts#L988) |

---

## 3. Specific Security Verification Items

1. **Organization Isolation**: VERIFIED ACTIVE. `app/org/challenges/[id]/page.tsx` checks `challenge.organizationId === organization.id`. Unrelated organizations receive a 404 / redirect.
2. **Team Submission Lead Requirement**: VERIFIED ACTIVE. `submitSolutionAction` verifies `member.role === TeamRole.LEAD`. Non-lead team members cannot submit solutions.
3. **Admin Authorization**: VERIFIED ACTIVE. Administrative actions (`adminChallengeAction`, `addAwardAction`) invoke `requireAdmin()`, which checks `user.role === "ADMIN"` on the server.
4. **GET Logout Endpoint**: VERIFIED ACTIVE. `app/logout/route.ts` handles `GET` requests to destroy session. While this triggers session logout upon GET navigation, it does not allow account takeover or data leakage.
