import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("public registration cannot grant administrator access through an email allowlist", async () => {
  const [auth, actions] = await Promise.all([
    read("lib/auth.ts"),
    read("lib/actions.ts")
  ]);

  assert.doesNotMatch(auth, /ADMIN_EMAILS|adminEmailSet/);
  assert.doesNotMatch(actions, /roleForNewUser/);
  assert.match(actions, /role:\s*Role\.STUDENT/);
  assert.match(actions, /role:\s*Role\.ORGANIZATION/);
});

test("team submission writes require the registered lead", async () => {
  const [actions, page] = await Promise.all([
    read("lib/actions.ts"),
    read("app/challenges/[slug]/submit/page.tsx")
  ]);

  assert.match(actions, /submitSolutionAction/);
  assert.match(page, /role:\s*TeamRole\.LEAD/);
});

test("AUTH_SECRET is required unconditionally without default fallback strings", async () => {
  const auth = await read("lib/auth.ts");
  assert.doesNotMatch(auth, /dev-only-change-this-solvesprint-secret/);
  assert.match(auth, /AUTH_SECRET environment variable is missing/);
});

test("POST-based session logout is enforced", async () => {
  const logoutRoute = await read("app/logout/route.ts");
  assert.match(logoutRoute, /export async function POST\(\)/);
  assert.match(logoutRoute, /Method not allowed/);
});

test("HTTPS-only submission URLs reject dangerous schemes and control characters", async () => {
  const actions = await read("lib/actions.ts");
  assert.match(actions, /httpsUrl/);
  assert.match(actions, /parsed\.protocol !== "https:"/);
  assert.match(actions, /javascript:, data:, file:, ftp:/);
});

test("Safe Launch Mode (APP_MODE) gates mutations when in MARKETING_ONLY mode", async () => {
  const [appConfig, actions] = await Promise.all([
    read("lib/app-config.ts"),
    read("lib/actions.ts")
  ]);

  assert.match(appConfig, /MARKETING_ONLY/);
  assert.match(appConfig, /assertMutationAllowed/);
  assert.match(actions, /assertMutationAllowed\(\)/);
});

test("Under-18 student registration sets status to PENDING_GUARDIAN_APPROVAL and dispatches double-opt-in token", async () => {
  const [actions, tokens] = await Promise.all([
    read("lib/actions.ts"),
    read("lib/tokens.ts")
  ]);

  assert.match(actions, /GuardianApprovalStatus\.PENDING_GUARDIAN/);
  assert.match(actions, /GUARDIAN_APPROVAL/);
  assert.match(tokens, /verifyToken/);
});

test("Organization signup defaults to UNVERIFIED status requiring admin verification", async () => {
  const [actions, schema] = await Promise.all([
    read("lib/actions.ts"),
    read("prisma/schema.prisma")
  ]);

  assert.match(actions, /OrganizationVerificationStatus\.UNVERIFIED/);
  assert.match(schema, /UNVERIFIED/);
  assert.match(actions, /adminVerifyOrganizationAction/);
});

test("ChallengeEnrollment schema enforces unique constraint per student per challenge", async () => {
  const schema = await read("prisma/schema.prisma");
  assert.match(schema, /@@unique\(\[challengeId, studentId\]\)/);
});

test("Award results require explicit administrator publication on or after announcement date", async () => {
  const actions = await read("lib/actions.ts");
  assert.match(actions, /publishResultsAction/);
  assert.match(actions, /AwardStatus\.PUBLISHED/);
  assert.match(actions, /winnerAnnouncementAt/);
});
