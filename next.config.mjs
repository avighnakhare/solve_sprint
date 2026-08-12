import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

if (process.env.NODE_ENV === "development") {
  process.env.WRANGLER_WRITE_LOGS ??= "false";
  process.env.WRANGLER_LOG_PATH ??= ".wrangler/logs";
  process.env.MINIFLARE_REGISTRY_PATH ??= ".wrangler/registry";
  initOpenNextCloudflareForDev();
}

/**
 * Keep development and production artifacts separate so a production build
 * cannot replace files that an active development server is using.
 *
 * @param {string} phase
 * @returns {import('next').NextConfig}
 */
export default function getNextConfig(phase) {
  return {
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
    serverExternalPackages: ["@prisma/client", ".prisma/client"],
    outputFileTracingExcludes: {
      "*": ["node_modules/.prisma/client/query_engine-windows.dll.node"]
    },
    outputFileTracingIncludes: {
      "*": [
        "node_modules/@libsql/client/lib-esm/**/*",
        "node_modules/@libsql/isomorphic-ws/**/*"
      ]
    },
    async redirects() {
      return [
        { source: "/student/signup", destination: "/student", permanent: false },
        { source: "/student/my-challenges", destination: "/student", permanent: false },
        { source: "/student/profile", destination: "/student", permanent: false },
        { source: "/student/dashboard", destination: "/student", permanent: false },
        { source: "/student/teams", destination: "/student", permanent: false },
        { source: "/for-students", destination: "/student", permanent: false },

        { source: "/organization/signup", destination: "/organization", permanent: false },
        { source: "/organization/dashboard", destination: "/organization", permanent: false },
        { source: "/org", destination: "/organization", permanent: false },
        { source: "/org/:path*", destination: "/organization", permanent: false },
        { source: "/for-organizations", destination: "/organization", permanent: false },

        { source: "/login", destination: "/get-involved", permanent: false },
        { source: "/logout", destination: "/get-involved", permanent: false },
        { source: "/account/:path*", destination: "/get-involved", permanent: false },
        { source: "/settings/:path*", destination: "/get-involved", permanent: false },
        { source: "/profile/:path*", destination: "/get-involved", permanent: false },

        { source: "/challenges", destination: "/how-it-works", permanent: false },
        { source: "/challenges/:path*", destination: "/how-it-works", permanent: false },
        { source: "/leaderboard", destination: "/how-it-works", permanent: false },
        { source: "/leaderboard/:path*", destination: "/how-it-works", permanent: false },

        { source: "/admin", destination: "/get-involved", permanent: false },
        { source: "/admin/:path*", destination: "/get-involved", permanent: false },
        { source: "/invite", destination: "/get-involved", permanent: false },
        { source: "/invite/:path*", destination: "/get-involved", permanent: false },
        { source: "/guardian", destination: "/get-involved", permanent: false },
        { source: "/guardian/:path*", destination: "/get-involved", permanent: false }
      ];
    },
    async headers() {
      return [
        {
          source: "/(.*)",
          headers: [
            { key: "X-Content-Type-Options", value: "nosniff" },
            { key: "X-Frame-Options", value: "DENY" },
            { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
            { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
            {
              key: "Content-Security-Policy",
              value:
                `default-src 'self'; img-src 'self' data: blob:; font-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""}; connect-src 'self' https://api.resend.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'`
            },
            ...(process.env.NODE_ENV === "production"
              ? [{ key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" }]
              : [])
          ]
        }
      ];
    }
  };
}
