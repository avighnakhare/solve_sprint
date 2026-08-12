import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-[#FFF9F0] min-h-[70vh] flex items-center justify-center py-20 px-6">
      <div className="max-w-2xl text-center">
        <span className="text-sm font-mono font-bold tracking-widest uppercase text-orange-600">
          ERROR 404
        </span>
        <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          This page isn’t part of SolveSprint.
        </h1>
        <p className="mt-6 text-lg text-slate-600 leading-relaxed">
          The link you followed may be outdated, moved, or no longer available.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-orange-600 px-6 py-3 text-[15px] font-semibold text-white transition-all hover:bg-orange-700 shadow-sm"
          >
            Return to Home
          </Link>
          <Link
            href="/how-it-works"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-slate-900/15 bg-white px-6 py-3 text-[15px] font-semibold text-slate-900 transition-all hover:bg-slate-50 shadow-sm"
          >
            How It Works
          </Link>
        </div>
      </div>
    </div>
  );
}
