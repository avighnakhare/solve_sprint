-- Migration: 20260727000000_production_remediation

-- 1. Create new tables first
CREATE TABLE IF NOT EXISTS "JudgeProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "bio" TEXT,
    "verificationStatus" TEXT NOT NULL DEFAULT 'UNVERIFIED',
    "verifiedAt" DATETIME,
    "deletedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "JudgeProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "JudgeProfile_userId_key" ON "JudgeProfile"("userId");

CREATE TABLE IF NOT EXISTS "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "sessionTokenHash" TEXT NOT NULL,
    "ipHash" TEXT,
    "userAgentTrunc" TEXT,
    "sessionVersion" INTEGER NOT NULL DEFAULT 1,
    "expiresAt" DATETIME NOT NULL,
    "lastUsedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revokedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "Session_sessionTokenHash_key" ON "Session"("sessionTokenHash");
CREATE INDEX IF NOT EXISTS "Session_userId_idx" ON "Session"("userId");

CREATE TABLE IF NOT EXISTS "PilotAccessGrant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "grantedBy" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX IF NOT EXISTS "PilotAccessGrant_email_key" ON "PilotAccessGrant"("email");

CREATE TABLE IF NOT EXISTS "GuardianRelationship" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentId" TEXT NOT NULL,
    "guardianEmail" TEXT NOT NULL,
    "guardianName" TEXT NOT NULL,
    "relationshipType" TEXT NOT NULL DEFAULT 'PARENT_LEGAL_GUARDIAN',
    "status" TEXT NOT NULL DEFAULT 'PENDING_GUARDIAN',
    "verifiedAt" DATETIME,
    "withdrawnAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "GuardianRelationship_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "StudentProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "ChallengeEnrollment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "challengeId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "teamId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "enrolledAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ChallengeEnrollment_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ChallengeEnrollment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "StudentProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ChallengeEnrollment_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "ChallengeEnrollment_challengeId_studentId_key" ON "ChallengeEnrollment"("challengeId", "studentId");

CREATE TABLE IF NOT EXISTS "ChallengeVersion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "challengeId" TEXT NOT NULL,
    "versionNumber" INTEGER NOT NULL DEFAULT 1,
    "contentHash" TEXT NOT NULL,
    "snapshotJson" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ChallengeVersion_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "ChallengeVersion_challengeId_versionNumber_key" ON "ChallengeVersion"("challengeId", "versionNumber");

CREATE TABLE IF NOT EXISTS "HostSafetyAttestation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "challengeId" TEXT NOT NULL,
    "versionNumber" INTEGER NOT NULL DEFAULT 1,
    "contentHash" TEXT NOT NULL,
    "attestationJson" TEXT NOT NULL,
    "attestedByUserId" TEXT NOT NULL,
    "attestedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "HostSafetyAttestation_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "HostSafetyAttestation_attestedByUserId_fkey" FOREIGN KEY ("attestedByUserId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "ChallengeReviewDecision" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "challengeId" TEXT NOT NULL,
    "challengeVersionId" TEXT NOT NULL,
    "decision" TEXT NOT NULL,
    "reviewerUserId" TEXT NOT NULL,
    "reviewNotes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ChallengeReviewDecision_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ChallengeReviewDecision_challengeVersionId_fkey" FOREIGN KEY ("challengeVersionId") REFERENCES "ChallengeVersion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ChallengeReviewDecision_reviewerUserId_fkey" FOREIGN KEY ("reviewerUserId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "ChallengeRuleVersion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "challengeId" TEXT NOT NULL,
    "versionNumber" INTEGER NOT NULL DEFAULT 1,
    "contentHash" TEXT NOT NULL,
    "rulesJson" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ChallengeRuleVersion_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "ChallengeRuleVersion_challengeId_versionNumber_key" ON "ChallengeRuleVersion"("challengeId", "versionNumber");

CREATE TABLE IF NOT EXISTS "ChallengeRuleAcceptance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "challengeId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "challengeRuleVersionId" TEXT NOT NULL,
    "acceptedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ChallengeRuleAcceptance_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ChallengeRuleAcceptance_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "StudentProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ChallengeRuleAcceptance_challengeRuleVersionId_fkey" FOREIGN KEY ("challengeRuleVersionId") REFERENCES "ChallengeRuleVersion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "ChallengeRuleAcceptance_challengeId_studentId_challengeRuleVersionId_key" ON "ChallengeRuleAcceptance"("challengeId", "studentId", "challengeRuleVersionId");

CREATE TABLE IF NOT EXISTS "PolicyDocument" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "contentHash" TEXT NOT NULL,
    "contentText" TEXT NOT NULL,
    "approvalStatus" TEXT NOT NULL DEFAULT 'DRAFT',
    "approvedBy" TEXT,
    "publishedAt" DATETIME,
    "effectiveAt" DATETIME,
    "retiredAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX IF NOT EXISTS "PolicyDocument_key_version_key" ON "PolicyDocument"("key", "version");

CREATE TABLE IF NOT EXISTS "SubmissionRevision" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "submissionId" TEXT NOT NULL,
    "receiptId" TEXT NOT NULL,
    "receiptHmac" TEXT NOT NULL,
    "revisionNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "submissionLink" TEXT NOT NULL,
    "fileUrl" TEXT,
    "notes" TEXT,
    "challengeRuleVersionId" TEXT NOT NULL,
    "originalityPolicyId" TEXT NOT NULL,
    "publicityPreference" TEXT NOT NULL DEFAULT 'PRIVATE',
    "submittedById" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SubmissionRevision_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SubmissionRevision_submittedById_fkey" FOREIGN KEY ("submittedById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SubmissionRevision_challengeRuleVersionId_fkey" FOREIGN KEY ("challengeRuleVersionId") REFERENCES "ChallengeRuleVersion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SubmissionRevision_originalityPolicyId_fkey" FOREIGN KEY ("originalityPolicyId") REFERENCES "PolicyDocument" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "SubmissionRevision_receiptId_key" ON "SubmissionRevision"("receiptId");
CREATE UNIQUE INDEX IF NOT EXISTS "SubmissionRevision_submissionId_revisionNumber_key" ON "SubmissionRevision"("submissionId", "revisionNumber");

CREATE TABLE IF NOT EXISTS "JudgeAssignment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "challengeId" TEXT NOT NULL,
    "judgeUserId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ASSIGNED',
    "agreementAcceptedAt" DATETIME,
    "recusalReason" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "JudgeAssignment_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "JudgeAssignment_judgeUserId_fkey" FOREIGN KEY ("judgeUserId") REFERENCES "JudgeProfile" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "JudgeAssignment_challengeId_judgeUserId_key" ON "JudgeAssignment"("challengeId", "judgeUserId");

CREATE TABLE IF NOT EXISTS "JudgeConflictDisclosure" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "judgeUserId" TEXT NOT NULL,
    "teamId" TEXT,
    "conflictDetails" TEXT NOT NULL,
    "disclosedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "JudgeConflictDisclosure_judgeUserId_fkey" FOREIGN KEY ("judgeUserId") REFERENCES "JudgeProfile" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "RubricScore" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "submissionId" TEXT NOT NULL,
    "judgeAssignmentId" TEXT NOT NULL,
    "criterionKey" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "feedback" TEXT,
    "isLocked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "RubricScore_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RubricScore_judgeAssignmentId_fkey" FOREIGN KEY ("judgeAssignmentId") REFERENCES "JudgeAssignment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "RubricScore_submissionId_judgeAssignmentId_criterionKey_key" ON "RubricScore"("submissionId", "judgeAssignmentId", "criterionKey");

CREATE TABLE IF NOT EXISTS "AwardResultSnapshot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "challengeId" TEXT NOT NULL,
    "snapshotHash" TEXT NOT NULL,
    "snapshotJson" TEXT NOT NULL,
    "publishedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publishedById" TEXT NOT NULL,
    CONSTRAINT "AwardResultSnapshot_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AwardResultSnapshot_publishedById_fkey" FOREIGN KEY ("publishedById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "ConsentRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "actorUserId" TEXT,
    "actorType" TEXT NOT NULL,
    "subjectStudentId" TEXT,
    "policyDocumentId" TEXT NOT NULL,
    "policyVersion" TEXT NOT NULL,
    "purpose" TEXT NOT NULL DEFAULT 'PARTICIPATION',
    "statementText" TEXT NOT NULL,
    "acceptedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "withdrawnAt" DATETIME,
    "ipHash" TEXT,
    "userAgentTrunc" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "guardianRelationId" TEXT,
    "submissionRevisionId" TEXT,
    CONSTRAINT "ConsentRecord_policyDocumentId_fkey" FOREIGN KEY ("policyDocumentId") REFERENCES "PolicyDocument" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ConsentRecord_actorUserId_fkey" FOREIGN KEY ("actorUserId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ConsentRecord_guardianRelationId_fkey" FOREIGN KEY ("guardianRelationId") REFERENCES "GuardianRelationship" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ConsentRecord_submissionRevisionId_fkey" FOREIGN KEY ("submissionRevisionId") REFERENCES "SubmissionRevision" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "VerificationToken" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tokenHash" TEXT NOT NULL,
    "tokenType" TEXT NOT NULL,
    "recipientEmail" TEXT NOT NULL,
    "targetId" TEXT,
    "createdById" TEXT,
    "expiresAt" DATETIME NOT NULL,
    "usedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "VerificationToken_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "VerificationToken_tokenHash_key" ON "VerificationToken"("tokenHash");

CREATE TABLE IF NOT EXISTS "WaitlistSignup" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "consentId" TEXT,
    "verifiedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX IF NOT EXISTS "WaitlistSignup_email_key" ON "WaitlistSignup"("email");

CREATE TABLE IF NOT EXISTS "OrganizationLead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "organizationName" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "challengeIdea" TEXT,
    "consentId" TEXT,
    "verifiedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX IF NOT EXISTS "OrganizationLead_email_key" ON "OrganizationLead"("email");

CREATE TABLE IF NOT EXISTS "AuditLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT,
    "metadataJson" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- 2. Alter existing tables after new tables are created
ALTER TABLE "User" ADD COLUMN "status" TEXT NOT NULL DEFAULT 'PENDING_EMAIL_VERIFICATION';
ALTER TABLE "User" ADD COLUMN "sessionVersion" INTEGER NOT NULL DEFAULT 1;
ALTER TABLE "User" ADD COLUMN "mfaSecretEncrypted" TEXT;
ALTER TABLE "User" ADD COLUMN "mfaVerifiedAt" DATETIME;
ALTER TABLE "User" ADD COLUMN "mfaRecoveryCodes" TEXT;
ALTER TABLE "User" ADD COLUMN "deletedAt" DATETIME;

ALTER TABLE "StudentProfile" ADD COLUMN "guardianApprovalStatus" TEXT NOT NULL DEFAULT 'NOT_REQUIRED';
ALTER TABLE "StudentProfile" ADD COLUMN "deletedAt" DATETIME;

ALTER TABLE "OrganizationProfile" ADD COLUMN "verificationStatus" TEXT NOT NULL DEFAULT 'UNVERIFIED';
ALTER TABLE "OrganizationProfile" ADD COLUMN "verifiedAt" DATETIME;
ALTER TABLE "OrganizationProfile" ADD COLUMN "deletedAt" DATETIME;

ALTER TABLE "Challenge" ADD COLUMN "timezone" TEXT NOT NULL DEFAULT 'America/New_York';
ALTER TABLE "Challenge" ADD COLUMN "prizeCashValueCents" INTEGER;
ALTER TABLE "Challenge" ADD COLUMN "prizeCurrency" TEXT NOT NULL DEFAULT 'USD';
ALTER TABLE "Challenge" ADD COLUMN "deletedAt" DATETIME;

ALTER TABLE "Team" ADD COLUMN "deletedAt" DATETIME;

ALTER TABLE "Award" ADD COLUMN "status" TEXT NOT NULL DEFAULT 'DRAFT';
ALTER TABLE "Award" ADD COLUMN "publishedAt" DATETIME;
ALTER TABLE "Award" ADD COLUMN "publishedBy" TEXT;
