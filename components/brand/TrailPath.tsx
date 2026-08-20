interface TrailPathProps {
  variant?: "horizontal" | "vertical" | "hero" | "loop";
  className?: string;
  strokeWidth?: number;
}

export function TrailPath({
  variant = "horizontal",
  className = "",
  strokeWidth = 6,
}: TrailPathProps) {
  if (variant === "hero") {
    return (
      <svg
        viewBox="0 0 600 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full max-w-full overflow-visible ${className}`}
        aria-hidden="true"
        focusable="false"
      >
        {/* Secondary Sun trail stroke offset */}
        <path
          d="M 10 70 C 120 15, 240 105, 380 40 C 460 5, 540 85, 590 50"
          stroke="#F6C74A"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.6}
        />
        {/* Primary Tangerine trail stroke */}
        <path
          d="M 10 60 C 120 5, 240 95, 380 30 C 460 -5, 540 75, 590 40"
          stroke="#F47731"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Subtle trail markers along hero path */}
        <circle cx="10" cy="60" r="6" fill="#233047" stroke="#FFF8EC" strokeWidth="2" />
        <circle cx="380" cy="30" r="6" fill="#F47731" stroke="#FFF8EC" strokeWidth="2" />
        <circle cx="590" cy="40" r="7" fill="#F6C74A" stroke="#233047" strokeWidth="2" />
      </svg>
    );
  }

  if (variant === "vertical") {
    return (
      <svg
        viewBox="0 0 120 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`h-full w-auto overflow-visible ${className}`}
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M 60 10 C 110 120, 10 240, 70 360 C 100 420, 40 470, 60 490"
          stroke="#F6C74A"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          opacity={0.5}
        />
        <path
          d="M 50 10 C 100 120, 0 240, 60 360 C 90 420, 30 470, 50 490"
          stroke="#F47731"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (variant === "loop") {
    return (
      <svg
        viewBox="0 0 400 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full overflow-visible ${className}`}
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M 10 40 C 90 80, 170 5, 250 55 C 320 95, 360 20, 390 40"
          stroke="#F47731"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray="8 8"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 800 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full overflow-visible ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M 10 35 C 180 5, 340 55, 500 20 C 620 -5, 720 50, 790 30"
        stroke="#F6C74A"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        opacity={0.5}
      />
      <path
        d="M 10 30 C 180 0, 340 50, 500 15 C 620 -10, 720 45, 790 25"
        stroke="#F47731"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
