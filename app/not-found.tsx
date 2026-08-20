import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-[#FFF9F0] min-h-[70vh] flex items-center justify-center py-20 px-6">
      <div className="max-w-2xl text-center">
        <span className="label-mono text-[#F36A21]">
          ERROR 404
        </span>
        <h1 className="heading-hero mt-3 text-[#172033]">
          This page isn’t part of SolveSprint.
        </h1>
        <p className="mt-6 text-lg text-[#4A5568] leading-relaxed">
          The link you followed may be outdated, moved, or no longer available.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex min-h-[48px] items-center justify-center rounded-[10px] bg-[#F36A21] px-6 py-3 text-[15px] font-semibold text-white transition-all hover:bg-[#D9530D] shadow-sm"
          >
            Return to Home
          </Link>
          <Link
            href="/how-it-works"
            className="inline-flex min-h-[48px] items-center justify-center rounded-[10px] border border-[#DED8CD] bg-white px-6 py-3 text-[15px] font-semibold text-[#172033] transition-all hover:bg-[#FFF9F0] shadow-sm"
          >
            How It Works
          </Link>
        </div>
      </div>
    </div>
  );
}
