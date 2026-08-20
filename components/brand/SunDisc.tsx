interface SunDiscProps {
  color?: "sun" | "tangerine" | "peach";
  size?: number | string;
  className?: string;
}

export function SunDisc({
  color = "sun",
  size = 180,
  className = "",
}: SunDiscProps) {
  const bgClasses = {
    sun: "bg-sun",
    tangerine: "bg-tangerine",
    peach: "bg-peach",
  }[color];

  const sizeStyle = typeof size === "number" ? { width: `${size}px`, height: `${size}px` } : {};

  return (
    <div
      className={`rounded-full pointer-events-none select-none ${bgClasses} ${className}`}
      style={sizeStyle}
      aria-hidden="true"
    />
  );
}
