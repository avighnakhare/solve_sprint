import crypto from "node:crypto";

export type RateLimitPreset = "auth" | "recovery" | "invite" | "submission" | "admin";

export type RateLimitConfig = {
  windowSeconds: number;
  maxRequests: number;
};

export const RATE_LIMIT_CONFIGS: Record<RateLimitPreset, RateLimitConfig> = {
  auth: { windowSeconds: 900, maxRequests: 5 },       // 5 attempts per 15 mins
  recovery: { windowSeconds: 3600, maxRequests: 3 },   // 3 attempts per 1 hour
  invite: { windowSeconds: 60, maxRequests: 10 },      // 10 invites per 1 min
  submission: { windowSeconds: 60, maxRequests: 5 },   // 5 submissions per 1 min
  admin: { windowSeconds: 60, maxRequests: 30 }        // 30 admin operations per 1 min
};

// In-memory sliding window bucket store for local dev and unit test execution
const localBuckets = new Map<string, number[]>();

function getCloudflareEnv(): Record<string, any> | null {
  try {
    const { getCloudflareContext } = require("@opennextjs/cloudflare");
    const ctx = getCloudflareContext();
    return ctx?.env || null;
  } catch {
    return null;
  }
}

export function buildCompositeKey(args: {
  action: RateLimitPreset | string;
  clientIp?: string | null;
  email?: string | null;
  userId?: string | null;
}): string {
  const ipPart = args.clientIp ? crypto.createHash("sha256").update(args.clientIp).digest("hex").substring(0, 16) : "no-ip";
  const emailPart = args.email ? crypto.createHash("sha256").update(args.email.trim().toLowerCase()).digest("hex").substring(0, 16) : "no-email";
  const userPart = args.userId || "no-user";
  return `rl:${args.action}:${ipPart}:${emailPart}:${userPart}`;
}

export async function checkRateLimit(args: {
  action: RateLimitPreset;
  clientIp?: string | null;
  email?: string | null;
  userId?: string | null;
}): Promise<{ allowed: boolean; remaining: number; retryAfterSeconds: number }> {
  const config = RATE_LIMIT_CONFIGS[args.action] || RATE_LIMIT_CONFIGS.auth;
  const compositeKey = buildCompositeKey(args);

  const env = getCloudflareEnv();
  const cfRateLimiter = env?.RATE_LIMITER;

  if (cfRateLimiter && typeof cfRateLimiter.limit === "function") {
    try {
      const res = await cfRateLimiter.limit({ key: compositeKey });
      if (!res.success) {
        return {
          allowed: false,
          remaining: 0,
          retryAfterSeconds: Math.ceil(res.period || config.windowSeconds)
        };
      }
      return {
        allowed: true,
        remaining: Math.max(0, config.maxRequests - (res.count || 1)),
        retryAfterSeconds: config.windowSeconds
      };
    } catch {
      // Fail safely if Cloudflare binding throws unexpected error
    }
  }

  // Local sliding window fallback implementation for local dev and isolated tests
  const now = Date.now();
  const windowMs = config.windowSeconds * 1000;
  const windowStart = now - windowMs;

  let timestamps = localBuckets.get(compositeKey) || [];
  timestamps = timestamps.filter((ts) => ts > windowStart);

  if (timestamps.length >= config.maxRequests) {
    const oldest = timestamps[0];
    const retryAfterMs = oldest ? Math.max(0, oldest + windowMs - now) : windowMs;
    localBuckets.set(compositeKey, timestamps);
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil(retryAfterMs / 1000)
    };
  }

  timestamps.push(now);
  localBuckets.set(compositeKey, timestamps);

  return {
    allowed: true,
    remaining: config.maxRequests - timestamps.length,
    retryAfterSeconds: config.windowSeconds
  };
}

export function clearLocalRateLimitBuckets(): void {
  localBuckets.clear();
}
