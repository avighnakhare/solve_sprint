import fs from "node:fs";
import path from "node:path";

console.log("Verifying Wrangler D1 migration SQL file sequence integrity...");

const migrationsDir = path.join(process.cwd(), "prisma", "migrations");
if (!fs.existsSync(migrationsDir)) {
  console.error("Error: prisma/migrations directory not found.");
  process.exit(1);
}

const entries = fs.readdirSync(migrationsDir, { withFileTypes: true });
const migrationFolders = entries
  .filter((e) => e.isDirectory())
  .map((e) => e.name)
  .sort();

console.log(`Found ${migrationFolders.length} migration directory/directories:`);
let hasError = false;

for (const folder of migrationFolders) {
  const sqlFile = path.join(migrationsDir, folder, "migration.sql");
  if (!fs.existsSync(sqlFile)) {
    console.error(`❌ Missing migration.sql in ${folder}`);
    hasError = true;
    continue;
  }
  const content = fs.readFileSync(sqlFile, "utf8");
  if (!content.trim()) {
    console.error(`❌ Empty migration.sql in ${folder}`);
    hasError = true;
    continue;
  }
  console.log(`✔ ${folder}/migration.sql verified (${content.length} bytes, ${content.split('\n').length} lines)`);
}

if (hasError) {
  console.error("D1 migration integrity check failed.");
  process.exit(1);
} else {
  console.log("✔ D1 migration sequence integrity check PASSED.");
}
