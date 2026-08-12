import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://solvesprint.com";

  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        "/how-it-works",
        "/student",
        "/organization",
        "/volunteer",
        "/get-involved",
        "/about",
        "/legal",
        "/rules",
        "/privacy",
        "/terms",
        "/cookie-policy",
        "/code-of-conduct",
        "/accessibility",
        "/security-reporting",
      ],
      disallow: [
        "/login",
        "/logout",
        "/org/",
        "/admin/",
        "/student/signup",
        "/student/my-challenges",
        "/student/profile",
        "/student/dashboard",
        "/organization/signup",
        "/organization/dashboard",
        "/challenges/",
        "/leaderboard/",
        "/invite/",
        "/guardian/",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
