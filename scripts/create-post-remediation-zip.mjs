import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const rootDir = process.cwd();
const targetDirName = "SolveSprint-PostRemediation-Review";
const targetDir = path.join(rootDir, targetDirName);

console.log("Preparing sanitized bundle directory:", targetDirName);

if (fs.existsSync(targetDir)) {
  fs.rmSync(targetDir, { recursive: true, force: true });
}
fs.mkdirSync(targetDir, { recursive: true });

const itemsToCopy = [
  "app",
  "components",
  "lib",
  "prisma/schema.prisma",
  "prisma/migrations",
  "scripts",
  "tests",
  "verification-logs",
  "public",
  "package.json",
  "package-lock.json",
  "tsconfig.json",
  "next.config.mjs",
  "open-next.config.ts",
  "wrangler.jsonc",
  "eslint.config.mjs",
  "middleware.ts",
  ".github",
  ".env.example",
  "CHANGE_MANIFEST.md",
  "ROUTE_MANIFEST.md",
  "VERIFICATION_EVIDENCE.md",
  "README.md"
];

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const child of fs.readdirSync(src)) {
      if (child === "node_modules" || child === ".next" || child === ".next-dev" || child === ".open-next" || child === ".git") {
        continue;
      }
      if (child.endsWith(".db") || child.endsWith(".sqlite") || child.endsWith(".sqlite3")) {
        continue;
      }
      if (child.endsWith(".mp4") || child.endsWith(".mov")) {
        continue;
      }
      copyRecursive(path.join(src, child), path.join(dest, child));
    }
  } else {
    // Exclude secrets, seed-admin, or env files
    const basename = path.basename(src);
    if (basename.startsWith(".env") && basename !== ".env.example") return;
    if (basename.endsWith(".db") || basename.endsWith(".sqlite")) return;
    if (basename.endsWith(".mp4") || basename.endsWith(".mov")) return;
    if (basename === "seed-admin.mjs") return;
    
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

for (const item of itemsToCopy) {
  const srcPath = path.join(rootDir, item);
  const destPath = path.join(targetDir, item);
  copyRecursive(srcPath, destPath);
}

console.log("Files copied. Performing sanitization scan...");

const secretPatterns = [
  /AIzaSy[A-Za-z0-9_-]{35}/, // Google API Key
  /sk-[A-Za-z0-9]{32,}/, // OpenAI/Stripe Key
  /\bre_[0-9a-zA-Z]{32}\b/, // Resend API Key
  /eyJ[A-Za-z0-9_-]{20,}\.eyJ[A-Za-z0-9_-]{20,}/ // Hardcoded JWT token
];

let violations = [];

function scanDir(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else {
      if (entry.name.endsWith(".db") || entry.name.endsWith(".sqlite")) {
        violations.push(`Forbidden database file found: ${fullPath}`);
      }
      if (entry.name.startsWith(".env") && entry.name !== ".env.example") {
        violations.push(`Forbidden env file found: ${fullPath}`);
      }
      // Scan text content for secrets
      if (/\.(ts|tsx|js|jsx|mjs|json|jsonc|md|sql|yml|yaml|txt)$/i.test(entry.name)) {
        const content = fs.readFileSync(fullPath, "utf-8");
        for (const pattern of secretPatterns) {
          if (pattern.test(content)) {
            violations.push(`Secret pattern match in ${fullPath}: ${pattern}`);
          }
        }
      }
    }
  }
}

scanDir(targetDir);

if (violations.length > 0) {
  console.error("SANITISATION FAILURES DETECTED:");
  for (const v of violations) console.error(" -", v);
  process.exit(1);
} else {
  console.log("SANITISATION PASSED: 0 secrets, 0 database files, 0 real env files found in bundle.");
}

console.log("Creating ZIP archive: SolveSprint-PostRemediation-Review.zip...");
const zipPath = path.join(rootDir, "SolveSprint-PostRemediation-Review.zip");
if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
}

try {
  execSync(`powershell -Command "Compress-Archive -Path '${targetDir}\\*' -DestinationPath '${zipPath}' -Force"`, {
    stdio: "inherit"
  });
  console.log("ZIP created successfully at:", zipPath);
} catch (err) {
  console.error("Error creating ZIP archive:", err);
  process.exit(1);
}
