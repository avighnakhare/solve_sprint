import Link from "next/link";

interface ParticipationRowProps {
  role: string;
  description: string;
  href: string;
  linkLabel?: string;
}

export function ParticipationRow({
  role,
  description,
  href,
  linkLabel = "Learn more",
}: ParticipationRowProps) {
  return (
    <div className="group border-b border-line py-6 sm:py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:bg-paper-light/50 px-2 sm:px-4 rounded-lg">
      <div className="max-w-xl space-y-1">
        <h3 className="font-body font-bold text-xl text-ink">
          {role}
        </h3>
        <p className="body-standard text-ink-muted">
          {description}
        </p>
      </div>

      <div className="flex items-center shrink-0">
        <Link
          href={href}
          className="inline-flex items-center gap-2 font-body font-semibold text-tangerine group-hover:text-ink transition-colors"
        >
          <span>{linkLabel}</span>
          <span
            className="arrow-hover inline-block"
            aria-hidden="true"
          >
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
