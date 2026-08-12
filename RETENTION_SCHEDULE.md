# Data Retention Schedule & Disposal Policy

Schedule specifying retention durations and purge mechanisms for SolveSprint data entities.

---

## Retention Schedule

| Entity / Data Type | Active Retention Period | Post-Account Deactivation Retention | Permanent Archive Rule | Disposal / Purge Mechanism |
| :--- | :--- | :--- | :--- | :--- |
| **Student Profiles** | Account Active | 30 Days (Grace Period) | Soft-deletable upon deletion request | Purge script erases PII from database |
| **Parent Consent Records** | Account Active | Permanent Legal Record | Archived in `ConsentRecord` table | Retained for COPPA/legal defense |
| **Verification Tokens** | Single-use / Max 72 Hours | 7 Days Post-Expiry | Deleted automatically | Cleanup job deletes expired tokens |
| **Submissions & Revisions**| Challenge Active + 3 Years | 3 Years Post-Challenge | Immutable `SubmissionRevision` history | Hard purge after 3-year statutory limit |
| **Session Cookies** | 14 Days | Expire automatically | N/A | Browser handles cookie expiration |
