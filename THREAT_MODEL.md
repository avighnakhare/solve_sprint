# SolveSprint Threat Model & Security Controls

Threat modeling analysis following STRIDE principles for SolveSprint.

---

## STRIDE Threat Analysis & Mitigations

| Threat Category | Specific Attack Vector | Potential Impact | Security Control Implemented |
| :--- | :--- | :--- | :--- |
| **Spoofing** | JWT token forgery using default dev secret | Account Takeover / Admin Access | Unconditional `AUTH_SECRET` requirement in `lib/auth.ts`. Hardcoded fallback strings removed. |
| **Tampering** | Malicious URL scheme injection (`javascript:`, `data:`, `file:`) in submissions | XSS / Client Compromise | Strict `httpsUrl` validator enforcing HTTPS protocol, no embedded credentials, and character escaping. |
| **Repudiation** | Guardian claiming lack of consent for minor participation | Legal Liability / Fine | Versioned `ConsentRecord` storing IP, timestamp, statement text, and guardian signature. |
| **Information Disclosure**| Token leakage in stdout server logs | Session / Link Interception | Log sanitization in `lib/email.ts` replacing tokens with `[REDACTED_TOKEN]`. |
| **Denial of Service** | Credential stuffing / Bot account registration | Service Degradation | Sliding-window rate limiter in `lib/rate-limit.ts` capping auth and submission attempts. |
| **Elevation of Privilege**| Unverified organization publishing fake challenge briefs | Fraud / Minor Exploitation | Default `PENDING_ORG_VERIFICATION` status requiring administrative approval before challenge publication. |
