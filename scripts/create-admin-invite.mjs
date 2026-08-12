import { db } from "../lib/prisma.js";
import { createVerificationToken } from "../lib/tokens.js";

async function main() {
  const email = process.argv[2];
  if (!email || !email.includes("@")) {
    console.error("Usage: node scripts/create-admin-invite.mjs <admin-email>");
    process.exit(1);
  }

  const { rawToken } = await createVerificationToken({
    tokenType: "ADMIN_INVITE",
    recipientEmail: email,
    expiresInHours: 72
  });

  const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3002"}/admin/onboard/${rawToken}`;
  console.log("\n==================================================================");
  console.log("ONE-TIME ADMIN INVITATION CREATED");
  console.log("==================================================================");
  console.log(`Recipient: ${email}`);
  console.log(`Expires: 72 Hours`);
  console.log(`Invitation Link:\n${inviteUrl}`);
  console.log("==================================================================\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
