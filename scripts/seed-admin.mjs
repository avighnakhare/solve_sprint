import bcrypt from "bcryptjs";
import { execSync } from "node:child_process";
import path from "node:path";
import fs from "node:fs";

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL || "admin@solvesprint.com";
  const password = process.env.SEED_ADMIN_PASSWORD;
  if (!password) {
    throw new Error("SEED_ADMIN_PASSWORD environment variable is required to run seed-admin script.");
  }
  const role = "ADMIN";
  const hash = await bcrypt.hash(password, 12);
  const userId = "admin_user_seed_01";
  const now = new Date().toISOString();

  console.log("Setting admin credentials:");
  console.log("Email:", email);
  console.log("Role:", role);

  const dbPaths = [
    path.join(process.cwd(), "prisma", "dev.db")
  ];

  const wranglerDir = path.join(process.cwd(), ".wrangler", "state", "v3", "d1", "miniflare-D1DatabaseObject");
  if (fs.existsSync(wranglerDir)) {
    const files = fs.readdirSync(wranglerDir);
    for (const f of files) {
      if (f.endsWith(".sqlite")) {
        dbPaths.push(path.join(wranglerDir, f));
      }
    }
  }

  // Create temporary python script to do parameter-bound sqlite updates
  const tempPy = path.join(process.cwd(), "scripts", "_temp_seed.py");
  const pyCode = `
import sqlite3
import sys

email = sys.argv[1]
password_hash = sys.argv[2]
role = sys.argv[3]
user_id = sys.argv[4]
now = sys.argv[5]
db_paths = sys.argv[6:]

for path in db_paths:
    print(f"Updating {path}...")
    conn = sqlite3.connect(path)
    cur = conn.cursor()
    cur.execute("SELECT id FROM User WHERE email = ?", (email,))
    row = cur.fetchone()
    if row:
        cur.execute("UPDATE User SET passwordHash = ?, role = ? WHERE email = ?", (password_hash, role, email))
    else:
        cur.execute("INSERT INTO User (id, email, passwordHash, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)",
                    (user_id, email, password_hash, role, now, now))
    conn.commit()
    conn.close()
    print(f"Successfully updated {email} in {path}")
`;

  fs.writeFileSync(tempPy, pyCode);

  try {
    execSync(`python "${tempPy}" "${email}" "${hash}" "${role}" "${userId}" "${now}" ${dbPaths.map(p => `"${p}"`).join(" ")}`, {
      stdio: "inherit"
    });
  } finally {
    if (fs.existsSync(tempPy)) {
      fs.unlinkSync(tempPy);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
