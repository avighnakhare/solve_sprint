import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { User } from "@prisma/client";
import { Role, type RoleValue } from "@/lib/db-types";
import { db } from "@/lib/prisma";

export const SESSION_COOKIE = "solvesprint_session";
const SESSION_DURATION_MS = 14 * 24 * 60 * 60 * 1000; // 14 days

if (process.env.NODE_ENV === "production" && !process.env.AUTH_SECRET) {
  throw new Error("AUTH_SECRET environment variable is missing");
}

export function effectiveRoleFor(user: Pick<User, "email" | "role">): RoleValue {
  return user.role as RoleValue;
}

export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function validatePassword(password: string): { valid: boolean; error?: string } {
  if (!password || typeof password !== "string") {
    return { valid: false, error: "Password is required." };
  }
  if (password.length < 8) {
    return { valid: false, error: "Password must be at least 8 characters long." };
  }
  // Bcrypt truncates inputs longer than 72 bytes
  if (Buffer.byteLength(password, "utf8") > 72) {
    return { valid: false, error: "Password cannot exceed 72 bytes." };
  }
  return { valid: true };
}

export async function hashPassword(password: string) {
  const check = validatePassword(password);
  if (!check.valid) {
    throw new Error(check.error);
  }
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}

export function sanitizeRedirectUrl(url: string | undefined | null, fallback = "/"): string {
  if (!url || typeof url !== "string") return fallback;
  const trimmed = url.trim();
  // Must start with a single slash, not // or /\ or protocol
  if (!trimmed.startsWith("/") || trimmed.startsWith("//") || trimmed.startsWith("/\\")) {
    return fallback;
  }
  try {
    const parsed = new URL(trimmed, "http://localhost");
    if (parsed.origin !== "http://localhost") return fallback;
    return parsed.pathname + parsed.search + parsed.hash;
  } catch {
    return fallback;
  }
}

export async function createSession(user: Pick<User, "id" | "email" | "role" | "sessionVersion">, reqIp?: string, userAgent?: string) {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const sessionTokenHash = hashToken(rawToken);
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  const ipHash = reqIp ? crypto.createHash("sha256").update(reqIp).digest("hex") : null;
  const userAgentTrunc = userAgent ? userAgent.substring(0, 128) : null;

  await db.session.create({
    data: {
      userId: user.id,
      sessionTokenHash,
      sessionVersion: user.sessionVersion ?? 1,
      expiresAt,
      ipHash,
      userAgentTrunc
    }
  });

  (await cookies()).set(SESSION_COOKIE, rawToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14
  });

  return rawToken;
}

export async function destroySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) {
    const tokenHash = hashToken(token);
    try {
      await db.session.update({
        where: { sessionTokenHash: tokenHash },
        data: { revokedAt: new Date() }
      });
    } catch {
      // Ignore if session not found
    }
  }
  cookieStore.delete(SESSION_COOKIE);
}

export async function revokeAllUserSessions(userId: string) {
  await db.$transaction([
    db.session.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() }
    }),
    db.user.update({
      where: { id: userId },
      data: { sessionVersion: { increment: 1 } }
    })
  ]);
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const sessionTokenHash = hashToken(token);

  const session = await db.session.findUnique({
    where: { sessionTokenHash },
    include: {
      user: {
        include: {
          studentProfile: true,
          organizationProfile: true,
          judgeProfile: true
        }
      }
    }
  });

  if (!session) return null;

  // Check revocation and expiration
  if (session.revokedAt !== null) return null;
  if (session.expiresAt < new Date()) return null;

  const user = session.user;

  // Check user status, deletion, and session version match
  if (!user || user.deletedAt !== null) return null;
  if (user.sessionVersion !== session.sessionVersion) return null;

  // Touch lastUsedAt timestamp asynchronously (debounced if within 5 mins)
  if (Date.now() - session.lastUsedAt.getTime() > 5 * 60 * 1000) {
    db.session.update({
      where: { id: session.id },
      data: { lastUsedAt: new Date() }
    }).catch(() => {});
  }

  return {
    ...user,
    effectiveRole: effectiveRoleFor(user),
    sessionId: session.id
  };
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

export async function requireStudent() {
  const user = await requireUser();
  if (!user.studentProfile && user.effectiveRole !== Role.ADMIN) redirect("/login");
  if (!user.studentProfile) redirect("/student/signup");
  return { user, student: user.studentProfile };
}

export async function requireOrganization() {
  const user = await requireUser();
  if (!user.organizationProfile) redirect("/login");
  return { user, organization: user.organizationProfile };
}

export async function requireAdmin() {
  const user = await requireUser();
  if (user.effectiveRole !== Role.ADMIN) redirect("/");
  return user;
}
