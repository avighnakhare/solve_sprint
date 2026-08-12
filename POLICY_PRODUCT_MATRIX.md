# Policy & Product Reality Matrix

Factual comparison of public legal policy statements against technical product enforcement.

---

## Policy Enforcement Evidence

| Document | Section | Policy Statement | Product Enforcement Mechanism | Technical Verification |
| :--- | :--- | :--- | :--- | :--- |
| **Privacy Policy** | Minor Consent | "Users under 18 require verified parent/guardian consent." | Neutral age screening; under-18 sets status `PENDING_GUARDIAN_APPROVAL` and dispatches double-opt-in email link. | `lib/actions.ts:studentSignupAction`, `app/guardian/approve/[token]/page.tsx` |
| **Privacy Policy** | Under-13 Access | "Users must be at least 13 years old." | Registration form blocks submission if `is13Plus` is unchecked or age < 13. | `components/forms/student-signup-form.tsx`, `lib/actions.ts:studentSchema` |
| **Terms of Use** | IP Rights | "Students retain ownership of original submissions." | Submissions store URL references; no copyright assignment occurs in database. | `prisma/schema.prisma:Submission` |
| **Cookie Policy** | Cookies | "SolveSprint uses strictly necessary session cookies." | Single HTTP cookie `solvesprint_session` (HttpOnly, SameSite=Lax, Secure). 0 tracking cookies. | `lib/auth.ts:createSession` |
| **League Rules** | Team Size | "Teams must comply with challenge size limits." | Submission handler verifies `team.members.length >= challenge.minTeamSize` based on accepted members. | `lib/actions.ts:submitSolutionAction` |
| **League Rules** | Submissions | "Submissions must be made prior to deadline." | `submitSolutionAction` checks `new Date() <= challenge.submissionDeadline`. | `lib/actions.ts:submitSolutionAction` |
