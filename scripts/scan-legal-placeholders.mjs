import fs from "node:fs";
import path from "node:path";

const requiredTokens = [
  "{{LEGAL_ENTITY_NAME}}",
  "{{LEGAL_ENTITY_ADDRESS}}",
  "{{LEGAL_CONTACT_EMAIL}}",
  "{{GOVERNING_JURISDICTION}}",
  "{{DMCA_AGENT_ADDRESS}}"
];

function scanDirectory(dir, issues = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanDirectory(fullPath, issues);
    } else if (stat.isFile() && (item.endsWith(".tsx") || item.endsWith(".ts") || item.endsWith(".md"))) {
      const content = fs.readFileSync(fullPath, "utf8");
      for (const token of requiredTokens) {
        if (content.includes(token)) {
          issues.push({ file: path.relative(process.cwd(), fullPath), token });
        }
      }
    }
  }
  return issues;
}

function main() {
  console.log("Scanning source files for unreplaced legal token placeholders...");
  const issues = scanDirectory(path.join(process.cwd(), "app"));

  if (issues.length > 0) {
    console.error("\n❌ FORBIDDEN LEGAL TOKEN PLACEHOLDERS DETECTED:");
    for (const issue of issues) {
      console.error(`- ${issue.file}: Found unreplaced "${issue.token}"`);
    }
    process.exit(1);
  } else {
    console.log("✔ Zero unreplaced legal token placeholders detected. Ready for production.");
  }
}

main();
