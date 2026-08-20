interface TopoPatternProps {
  className?: string;
  opacity?: number;
}

export function TopoPattern({ className = "", opacity = 0.05 }: TopoPatternProps) {
  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="#233047" strokeWidth="1.5" fill="none" opacity={opacity}>
        <path d="M -50 100 C 150 50, 350 180, 550 100 C 750 20, 850 150, 950 100" />
        <path d="M -50 180 C 180 120, 320 240, 580 170 C 720 110, 820 220, 950 180" />
        <path d="M -50 260 C 120 200, 380 320, 600 240 C 780 180, 880 300, 950 250" />
        <path d="M -50 340 C 200 280, 300 400, 520 330 C 690 260, 800 380, 950 320" />
        <path d="M -50 420 C 160 360, 420 460, 640 400 C 760 340, 860 450, 950 400" />
        <path d="M -50 500 C 220 440, 360 540, 570 480 C 730 420, 830 520, 950 480" />
        <path d="M -50 580 C 140 520, 400 600, 610 550 C 790 490, 890 590, 950 550" />
      </g>
    </svg>
  );
}
