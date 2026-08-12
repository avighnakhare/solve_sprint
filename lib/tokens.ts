import { createHash, randomBytes } from "crypto";
import { db } from "@/lib/prisma";

export type TokenType = "EMAIL_VERIFICATION" | "GUARDIAN_APPROVAL" | "PASSWORD_RESET";

export function generateToken() {
  const rawToken = randomBytes(32).toString("hex");
  const tokenHash = createHash("sha256").update(rawToken).digest("hex");
  return { rawToken, tokenHash };
}

export async function createVerificationToken(args: {
  tokenType: TokenType;
  recipientEmail: string;
  targetId?: string;
  expiresInHours?: number;
}) {
  const { rawToken, tokenHash } = generateToken();
  const hours = args.expiresInHours || (args.tokenType === "GUARDIAN_APPROVAL" ? 72 : 24);
  const expiresAt = new Date(Date.now() + hours * 60 * 60 * 1000);

  const tokenRecord = await db.verificationToken.create({
    data: {
      tokenHash,
      tokenType: args.tokenType,
      recipientEmail: args.recipientEmail,
      targetId: args.targetId || null,
      expiresAt
    }
  });

  return { rawToken, tokenRecord };
}

export async function verifyToken(rawToken: string, tokenType: TokenType) {
  const tokenHash = createHash("sha256").update(rawToken).digest("hex");
  const record = await db.verificationToken.findUnique({
    where: { tokenHash }
  });

  if (!record || record.tokenType !== tokenType) {
    return { valid: false, reason: "Invalid or expired token." };
  }

  if (record.usedAt) {
    return { valid: false, reason: "Token has already been used." };
  }

  if (new Date() > record.expiresAt) {
    return { valid: false, reason: "Token has expired." };
  }

  return { valid: true, record };
}

export async function consumeToken(tokenId: string) {
  return db.verificationToken.update({
    where: { id: tokenId },
    data: { usedAt: new Date() }
  });
}
