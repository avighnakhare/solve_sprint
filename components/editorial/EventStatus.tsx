import Link from "next/link";
import { buttonClasses } from "@/components/ui";

interface EventStatusProps {
  heading?: string;
  copy?: string;
  ctaText?: string;
  ctaHref?: string;
  className?: string;
}

export function EventStatus({
  heading = "The first event is being built now.",
  copy = "We are gathering student interest, speaking with local organizations, and working through venue and event details. Confirmed information will be posted here as it is finalized.",
  ctaText = "Get event updates",
  ctaHref = "/get-involved",
  className = "",
}: EventStatusProps) {
  return (
    <div
      className={`rounded-[24px] border-2 border-ink bg-white p-8 sm:p-12 relative overflow-hidden shadow-[6px_6px_0px_0px_#F47731] ${className}`}
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="w-3.5 h-3.5 rounded-full bg-tangerine inline-block border border-ink shadow-[1px_1px_0px_0px_#233047]" />
        <span className="trail-label text-ink font-bold">
          STATUS REPORT • PLANNING IN PROGRESS
        </span>
      </div>

      <div className="max-w-2xl space-y-4">
        <h2 className="display-section text-ink">
          {heading}
        </h2>
        <p className="body-large text-ink-muted">
          {copy}
        </p>

        <div className="pt-4">
          <Link
            href={ctaHref}
            className={buttonClasses("primary", "w-full sm:w-auto")}
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </div>
  );
}
