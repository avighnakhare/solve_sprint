import Link from "next/link";

export const metadata = {
  title: "Approval Confirmed | SolveSprint",
  description: "Parent and guardian approval successfully verified."
};

export default function GuardianApprovalSuccessPage() {
  return (
    <div className="min-h-screen bg-[#fffcf7] text-[#111827] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-amber-200 shadow-md text-center">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
          ✓
        </div>
        <h1 className="text-2xl font-serif font-bold text-gray-900 mb-2">Approval Confirmed</h1>
        <p className="text-gray-600 mb-6">
          Thank you for verifying guardian consent. Your student&apos;s SolveSprint account is now fully active, allowing them to join teams and participate in challenges.
        </p>
        <Link
          href="/"
          className="inline-block py-2.5 px-5 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg shadow text-sm"
        >
          Return to SolveSprint Homepage
        </Link>
      </div>
    </div>
  );
}
