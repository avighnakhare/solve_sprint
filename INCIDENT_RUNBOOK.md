# Incident Response Runbook

Step-by-step operational runbook for security incidents, credential compromise, and minor safety escalations.

---

## 1. Credential Compromise & Session Revocation
1. **Rotate AUTH_SECRET**: Immediately update `AUTH_SECRET` in host environment variables and redeploy to invalidate all active JWT session cookies (`solvesprint_session`).
2. **Revoke User Account**: Execute SQL: `UPDATE User SET status = 'SUSPENDED' WHERE id = '<compromised-user-id>';`
3. **Notify Affected User**: Send out-of-band email notification to registered address.

---

## 2. Minor Safety Escalation Procedure
1. **Immediate Quarantine**: Change user status to `SUSPENDED` and hide student submissions.
2. **Safety Lead Review**: Notify `safety@solvesprint.com` within 2 hours.
3. **Parent / Guardian Notification**: Contact registered parent/guardian email with formal event summary.

---

## 3. DMCA & IP Infringement Takedown
1. **Log Complaint**: Store written notice in security audit system.
2. **Disable Submission Link**: Update submission status to `DISQUALIFIED` / `REMOVED`.
3. **Notify Submitting Team**: Provide team lead 14 days to submit counter-notice under DMCA guidelines.
