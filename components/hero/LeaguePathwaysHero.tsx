import Link from "next/link";
import { EVENT_CONFIG } from "@/lib/site-config";

export function LeaguePathwaysHero() {
  return (
    <section className="league-hero relative overflow-hidden bg-[#FFF9F0] py-16 sm:py-24 border-b border-slate-900/10" aria-labelledby="league-hero-title">
      <div className="league-sunrise pointer-events-none absolute inset-0 opacity-80" aria-hidden="true" />

      <div className="league-hero__shell relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Status Pill */}
        <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-orange-500/30 bg-white/90 px-4 py-2 text-xs lg:text-sm font-semibold text-slate-900 shadow-sm backdrop-blur">
          <span className="h-2.5 w-2.5 rounded-full bg-orange-600 animate-pulse" />
          <span>{EVENT_CONFIG.badgeText}</span>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-7">
            <h1 id="league-hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              <span className="block">{EVENT_CONFIG.headline}</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-700 leading-relaxed max-w-2xl font-medium drop-shadow-sm">
              {EVENT_CONFIG.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/get-involved"
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-orange-600 px-6 py-3 text-[15px] font-semibold text-white transition-all hover:bg-orange-700 shadow-sm"
              >
                Register your interest
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-slate-900/15 bg-white px-6 py-3 text-[15px] font-semibold text-slate-900 transition-all hover:bg-slate-50 shadow-sm"
              >
                See how it works
              </Link>
            </div>
          </div>

          {/* Quick Overview Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-900/10 bg-white/95 p-8 shadow-sm backdrop-blur">
              <span className="text-xs lg:text-sm font-semibold uppercase tracking-wider text-orange-600">Event Format</span>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">In-Person Student Innovation Sprint</h2>
              <ul className="mt-6 space-y-4 text-base text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-700">1</span>
                  <span>Local businesses and community organizations provide real operational challenges.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-700">2</span>
                  <span>High school student teams collaborate to develop practical solutions and pitch materials.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-700">3</span>
                  <span>Teams present live at an in-person event and receive feedback from industry professionals.</span>
                </li>
              </ul>
              <div className="mt-6 border-t border-slate-900/10 pt-4 text-sm text-slate-600">
                Status: <span className="font-semibold text-slate-900">{EVENT_CONFIG.dateAndVenueStatus}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
