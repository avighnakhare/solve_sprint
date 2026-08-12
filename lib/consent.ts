import crypto from "node:crypto";
import { db } from "@/lib/prisma";

export function hashIp(ip: string | null | undefined): string | null {
  if (!ip) return null;
  const salt = process.env.IP_HASH_KEY;
  if (!salt) {
    throw new Error("IP_HASH_KEY environment variable is missing. Fatal configuration error.");
  }
  return crypto.createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export async function recordConsent(args: {
  actorUserId?: string | null;
  actorType: "STUDENT" | "GUARDIAN" | "ORGANIZATION" | "JUDGE";
  subjectStudentId?: string | null;
  policyKey: string;
  policyVersion: string;
  statementText: string;
  purpose?: "PARTICIPATION" | "PUBLICITY_PORTFOLIO" | "PUBLIC_SHOWCASE";
  guardianRelationId?: string | null;
  submissionRevisionId?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
}) {
  const policy = await db.policyDocument.findUnique({
    where: {
      key_version: {
        key: args.policyKey,
        version: args.policyVersion
      }
    }
  });

  if (!policy || policy.approvalStatus !== "APPROVED") {
    throw new Error(`Consent error: No explicitly approved PolicyDocument found for key='${args.policyKey}', version='${args.policyVersion}'. Automatic policy creation is prohibited.`);
  }

  return db.consentRecord.create({
    data: {
      actorUserId: args.actorUserId || null,
      actorType: args.actorType,
      subjectStudentId: args.subjectStudentId || null,
      policyDocumentId: policy.id,
      policyVersion: args.policyVersion,
      purpose: args.purpose || "PARTICIPATION",
      statementText: args.statementText,
      guardianRelationId: args.guardianRelationId || null,
      submissionRevisionId: args.submissionRevisionId || null,
      ipHash: hashIp(args.ipAddress),
      userAgentTrunc: args.userAgent ? args.userAgent.substring(0, 128) : null,
      status: "ACTIVE"
    }
  });
}

export async function withdrawConsent(consentRecordId: string, actorUserId?: string) {
  return db.consentRecord.update({
    where: { id: consentRecordId },
    data: {
      status: "WITHDRAWN",
      withdrawnAt: new Date()
    }
  });
}
