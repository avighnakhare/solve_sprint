import { createHash, randomBytes } from "crypto";

export function createInviteToken() {
  const token = randomBytes(32).toString("base64url");
  return {
    token,
    tokenHash: hashInviteToken(token)
  };
}

export function hashInviteToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function inviteExpiry(registrationCloseAt: Date) {
  const fourteenDays = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
  return registrationCloseAt < fourteenDays ? registrationCloseAt : fourteenDays;
}
