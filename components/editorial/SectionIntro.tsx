interface SectionIntroProps {
  label?: string;
  heading: string;
  supporting?: string;
  align?: "left" | "center";
  className?: string;
  headingAs?: "h1" | "h2" | "h3";
}

export function SectionIntro({
  label,
  heading,
  supporting,
  align = "left",
  className = "",
  headingAs: HeadingTag = "h2",
}: SectionIntroProps) {
  const alignClasses = align === "center" ? "text-center mx-auto max-w-2xl" : "text-left max-w-2xl";

  return (
    <header className={`space-y-4 ${alignClasses} ${className}`}>
      {label && (
        <p className="trail-label text-tangerine font-semibold">
          {label}
        </p>
      )}
      <HeadingTag className="display-section text-ink">
        {heading}
      </HeadingTag>
      {supporting && (
        <p className="body-large text-ink-muted leading-relaxed">
          {supporting}
        </p>
      )}
    </header>
  );
}
