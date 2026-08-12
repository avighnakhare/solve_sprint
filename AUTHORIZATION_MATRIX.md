# Authorization Ownership & Capability Matrix

Comprehensive role-based access control (RBAC) matrix for SolveSprint endpoints and server actions.

---

## Access Control Matrix

| Endpoint / Capability | Unauthenticated | Student (Pending Guardian) | Student (Active) | Org (Pending Verification) | Org (Active) | Judge | Admin |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Browse Landing Page & Rules** | Allowed | Allowed | Allowed | Allowed | Allowed | Allowed | Allowed |
| **View Challenge Directory** | Allowed | Allowed | Allowed | Allowed | Allowed | Allowed | Allowed |
| **Create Student Account** | Allowed | Allowed | Allowed | Denied | Denied | Denied | Denied |
| **Create Org Account** | Allowed | Denied | Denied | Allowed | Allowed | Denied | Denied |
| **Login** | Allowed | Allowed | Allowed | Allowed | Allowed | Allowed | Allowed |
| **Logout (POST)** | Allowed | Allowed | Allowed | Allowed | Allowed | Allowed | Allowed |
| **Create Team** | Denied | **Blocked** (Pending Guardian) | **Allowed** | Denied | Denied | Denied | Denied |
| **Accept Invitation** | Denied | **Blocked** (Pending Guardian) | **Allowed** | Denied | Denied | Denied | Denied |
| **Submit Solution** | Denied | **Blocked** (Pending Guardian) | **Allowed** (Lead Only) | Denied | Denied | Denied | Denied |
| **Create / Edit Challenge** | Denied | Denied | Denied | **Blocked** (Pending Org) | **Allowed** (Own Only) | Denied | Allowed |
| **Evaluate Submissions** | Denied | Denied | Denied | Denied | Denied | **Allowed** (Assigned Only) | Allowed |
| **Approve / Verify Org** | Denied | Denied | Denied | Denied | Denied | Denied | **Allowed** |
| **Publish Challenge Awards** | Denied | Denied | Denied | Denied | Denied | Denied | **Allowed** (Post Announcement) |
