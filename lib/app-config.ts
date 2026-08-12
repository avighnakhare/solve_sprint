export type AppMode = "MARKETING_ONLY" | "PRIVATE_PILOT" | "LIVE";

export function getAppMode(): AppMode {
  const mode = process.env.APP_MODE?.toUpperCase();
  if (mode === "LIVE") return "LIVE";
  if (mode === "PRIVATE_PILOT") return "PRIVATE_PILOT";
  return "MARKETING_ONLY"; // Safe production default
}

export function isMarketingOnly(): boolean {
  return getAppMode() === "MARKETING_ONLY";
}

export function isPrivatePilot(): boolean {
  return getAppMode() === "PRIVATE_PILOT";
}

export function isLive(): boolean {
  return getAppMode() === "LIVE";
}

export function assertMutationAllowed(): { allowed: boolean; message?: string } {
  if (isMarketingOnly()) {
    return {
      allowed: false,
      message: "SolveSprint is currently in Preview / Marketing Mode. Registration, challenge publication, and submissions are disabled."
    };
  }
  return { allowed: true };
}
