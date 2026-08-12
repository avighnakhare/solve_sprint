# Architecture Decision Record (ADR): Cloudflare & Next.js Deployment

**ADR Title**: Next.js Patch Strategy & OpenNext Cloudflare Adapter Binding  
**Date**: July 27, 2026  
**Status**: APPROVED

---

## Context
The application utilizes Next.js 14 App Router and `@opennextjs/cloudflare` for deployment to Cloudflare Pages/Workers. Upgrading dependencies requires ensuring compatibility between the Next.js runtime, Prisma ORM, and Cloudflare Workers WASM query engine constraints.

## Decision
1. **Next.js Version**: Pin Next.js 14 to `14.2.25` (patched against Server Action DoS and image optimization vulnerabilities while retaining `@opennextjs/cloudflare` 1.15.1 compatibility).
2. **Launch Mode Gate**: Default `APP_MODE` to `MARKETING_ONLY` in production environments. Gated mutation endpoints prevent unauthorized state changes until legal and organizational sign-off is completed.
3. **Database Driver**: Use LibSQL / D1 edge database driver configuration for Cloudflare Workers runtime compatibility.

## Consequences
- Clean execution of `npm ci`, `npx tsc --noEmit`, `npx next lint`, and `npm test`.
- Zero runtime crashes when deploying to Cloudflare Pages edge environment.
