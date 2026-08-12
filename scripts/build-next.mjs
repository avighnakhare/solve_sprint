import { spawnSync } from "node:child_process";
import { closeSync, openSync } from "node:fs";
import { resolve } from "node:path";

const usesBuildDatabase = !process.env.DATABASE_URL;
const buildDatabasePath = resolve(process.cwd(), "prisma/build.db");
const env = {
  ...process.env,
  DATABASE_URL: process.env.DATABASE_URL || `file:${buildDatabasePath}`
};

if (usesBuildDatabase) {
  closeSync(openSync(buildDatabasePath, "a"));
}

function run(modulePath, args) {
  const result = spawnSync(process.execPath, [resolve(process.cwd(), modulePath), ...args], {
    cwd: process.cwd(),
    env,
    stdio: "inherit"
  });

  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status || 1);
}

run("node_modules/prisma/build/index.js", ["generate"]);
run("node_modules/prisma/build/index.js", ["migrate", "deploy"]);
run("node_modules/next/dist/bin/next", ["build"]);
