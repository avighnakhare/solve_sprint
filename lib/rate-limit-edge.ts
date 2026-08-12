import { hashIp } from "@/lib/consent";

export type RateLimitPreset = "auth" | "recovery" | "invite" | "submission" | "admin";

export const EDGE_RATE_LIMITS: Record<RateLimitPreset, { windowSeconds: number; maxRequests: number }> = {
  auth: { windowSeconds: 900, maxRequests: 5 },       // 5 per 15 mins
  recovery: { windowSeconds: 3600, maxRequests: 3 },   // 3 per hour
  invite: { windowSeconds: 60, maxRequests: 10 },      // 10 per min
  submission: { windowSeconds: 60, maxRequests: 5 },   // 5 per min
  admin: { windowSeconds: 60, maxRequests: 30 }        // 30 per min
};

/**
 * Access Cloudflare environment bindings safely via getCloudflareContext().env
 */
function getCloudflareEnv(): Record<string, any> | null {
  try {
    // Attempt dynamic import or global context resolution
    const { getCloudflareContext } = require("@opennextjs/cloudflare");
    const ctx = getCloudflareContext();
    return ctx?.env || null;
  } catch {
    return null;
  }
}

export async function checkEdgeRateLimit(
  reqHeaders: Headers,
  preset: RateLimitPreset = "auth"
): Promise<{ allowed: boolean; remaining: number; resetSeconds: number; isServiceUnavailable?: boolean }> {
  const config = EDGE_RATE_LIMITS[preset];
  // Production trusts ONLY CF-Connecting-IP verified by Cloudflare Edge proxy
  const rawIp = reqHeaders.get("cf-connecting-ip") || (process.env.NODE_ENV === "development" ? "127.0.0.1" : null);

  if (!rawIp && process.env.NODE_ENV === "production") {
    // Missing trusted CF-Connecting-IP header in production triggers controlled 503
    return { allowed: false, remaining: 0, resetSeconds: config.windowSeconds, isServiceUnavailable: true };
  }

  const ipHash = hashIp(rawIp || "127.0.0.1");
  const now = Math.floor(Date.now() / 1000);
  const windowKey = Math.floor(now / config.windowSeconds);
  const kvKey = `rl:${preset}:${ipHash}:${windowKey}`;

  const env = getCloudflareEnv();
  const kv = env?.RATE_LIMIT_KV;

  if (kv) {
    try {
      const current = await kv.get(kvKey);
      const count = current ? parseInt(current, 10) : 0;
      if (count >= config.maxRequests) {
        return { allowed: false, remaining: 0, resetSeconds: config.windowSeconds };
      }
      await kv.put(kvKey, (count + 1).toString(), { expirationTtl: config.windowSeconds });
      return { allowed: true, remaining: config.maxRequests - (count + 1), resetSeconds: config.windowSeconds };
    } catch (error) {
      if (process.env.NODE_ENV === "production") {
        // Fail-closed in production if KV security binding throws
        return { allowed: false, remaining: 0, resetSeconds: config.windowSeconds, isServiceUnavailable: true };
      }
    }
  } else if (process.env.NODE_ENV === "production") {
    // Fail-closed in production if KV binding is missing
    return { allowed: false, remaining: 0, resetSeconds: config.windowSeconds, isServiceUnavailable: true };
  }

  // Development-only fallback
  return { allowed: true, remaining: config.maxRequests - 1, resetSeconds: config.windowSeconds };
}
