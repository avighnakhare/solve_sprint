interface TrailMarkerProps {
  number: number | string;
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function TrailMarker({
  number,
  label,
  className = "",
  size = "md",
}: TrailMarkerProps) {
  const sizeClasses = {
    sm: "w-7 h-7 text-xs",
    md: "w-9 h-9 text-sm",
    lg: "w-12 h-12 text-base",
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        className={`inline-flex items-center justify-center rounded-full bg-tangerine text-ink font-mono font-bold border-2 border-paper shadow-sm ${sizeClasses}`}
        aria-hidden={!label}
      >
        {number}
      </span>
      {label && (
        <span className="trail-label text-ink font-semibold">
          {label}
        </span>
      )}
    </div>
  );
}
