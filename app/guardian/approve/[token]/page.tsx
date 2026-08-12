import { notFound, redirect } from "next/navigation";
import { verifyToken, consumeToken } from "@/lib/tokens";
import { db } from "@/lib/prisma";
import { UserStatus, GuardianApprovalStatus } from "@/lib/db-types";
import { recordConsent } from "@/lib/consent";

export const metadata = {
  title: "Parent & Guardian Approval | SolveSprint",
  description: "Verify minor participation, review terms and privacy notices, and approve account registration."
};

async function handleGuardianApproval(formData: FormData) {
  "use server";

  const rawToken = formData.get("token") as string;
  const guardianName = formData.get("guardianName") as string;
  const guardianSignature = formData.get("guardianSignature") as string;
  const agree = formData.get("agree") === "on";

  if (!agree || !guardianSignature || !rawToken) {
    throw new Error("You must review and agree to the participation terms.");
  }

  const { valid, record } = await verifyToken(rawToken, "GUARDIAN_APPROVAL");
  if (!valid || !record || !record.targetId) {
    throw new Error("Verification token is invalid or has expired.");
  }

  const user = await db.user.findUnique({
    where: { id: record.targetId },
    include: { studentProfile: true }
  });

  if (!user) throw new Error("Student account not found.");

  // Activate student account and set parentConsent: true
  await db.$transaction([
    db.user.update({
      where: { id: user.id },
      data: { status: UserStatus.ACTIVE }
    }),
    db.studentProfile.update({
      where: { userId: user.id },
      data: { guardianApprovalStatus: GuardianApprovalStatus.APPROVED }
    })
  ]);

  // Record versioned guardian consent
  await recordConsent({
    actorUserId: null,
    actorType: "GUARDIAN",
    subjectStudentId: user.studentProfile?.id,
    policyKey: "ParentGuardianConsent",
    policyVersion: "2026.1",
    statementText: `Parent/Guardian ${guardianName} approved participation for student ${user.studentProfile?.firstName} ${user.studentProfile?.lastName} under SolveSprint Terms & Privacy Policy with digital signature: ${guardianSignature}.`
  });

  await consumeToken(record.id);
  redirect("/guardian/approve/success");
}

export default async function GuardianApprovalPage(props: {
  params: Promise<{ token: string }>;
}) {
  const params = await props.params;
  const { valid, record } = await verifyToken(params.token, "GUARDIAN_APPROVAL");
  if (!valid || !record || !record.targetId) {
    return (
      <div className="min-h-screen bg-[#fffcf7] text-[#111827] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white p-8 rounded-xl border border-amber-200 shadow-sm text-center">
          <h1 className="text-2xl font-serif font-bold text-red-600 mb-4">Invalid or Expired Link</h1>
          <p className="text-gray-600 mb-6">
            This parent/guardian approval link is invalid or has expired. Please ask your child to re-send the approval request from their profile settings.
          </p>
        </div>
      </div>
    );
  }

  const user = await db.user.findUnique({
    where: { id: record.targetId },
    include: { studentProfile: true }
  });

  if (!user || !user.studentProfile) return notFound();

  return (
    <div className="min-h-screen bg-[#fffcf7] text-[#111827] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl border border-amber-200 shadow-md">
        <div className="border-b border-amber-100 pb-6 mb-6">
          <span className="text-xs font-bold tracking-widest text-amber-700 uppercase">SolveSprint Safety Portal</span>
          <h1 className="text-3xl font-serif font-bold text-[#141b2d] mt-1">Parent & Guardian Approval</h1>
          <p className="text-gray-600 mt-2">
            Please review and confirm participation details for <strong>{user.studentProfile.firstName} {user.studentProfile.lastName}</strong>.
          </p>
        </div>

        <form action={handleGuardianApproval} className="space-y-6">
          <input type="hidden" name="token" value={params.token} />

          <div className="bg-amber-50/50 p-4 rounded-lg border border-amber-100 space-y-2 text-sm text-gray-700">
            <h3 className="font-semibold text-gray-900">Student Details</h3>
            <p><strong>Name:</strong> {user.studentProfile.firstName} {user.studentProfile.lastName}</p>
            <p><strong>School:</strong> {user.studentProfile.schoolName} (Grade {user.studentProfile.grade})</p>
            <p><strong>Location:</strong> {user.studentProfile.city}, {user.studentProfile.state}, {user.studentProfile.country}</p>
          </div>

          <div className="space-y-3 text-sm text-gray-600">
            <h3 className="font-semibold text-gray-900">Participation Notice</h3>
            <p>
              SolveSprint is an educational innovation league where high-school students form teams to solve real-world industry challenges.
              Student profiles are kept private by default. Minor participation requires explicit parent or guardian consent.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Parent / Guardian Full Name</label>
              <input
                type="text"
                name="guardianName"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-2 border"
                placeholder="e.g. Eleanor Vance"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Parent / Guardian Electronic Signature</label>
              <input
                type="text"
                name="guardianSignature"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-2 border font-mono"
                placeholder="Type full legal name to sign"
              />
            </div>

            <div className="flex items-start space-x-3 pt-2">
              <input
                type="checkbox"
                name="agree"
                id="agree"
                required
                className="mt-1 h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
              />
              <label htmlFor="agree" className="text-sm text-gray-600">
                I am the parent or legal guardian of {user.studentProfile.firstName} {user.studentProfile.lastName}. I have reviewed and agree to the SolveSprint Terms of Use, Privacy Policy, and minor participation guidelines.
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg shadow transition-colors"
          >
            Confirm & Approve Student Account
          </button>
        </form>
      </div>
    </div>
  );
}
