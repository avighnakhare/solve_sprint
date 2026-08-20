export function TrophySketch({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center p-2 sm:p-4 ${className}`}>
      {/* Colorful Sketched Trophy SVG - Floating direct on background without a white box */}
      <svg
        viewBox="0 0 320 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[480px] sm:max-w-[540px] lg:max-w-[580px] h-auto drop-shadow-[6px_6px_0px_rgba(35,48,71,0.2)]"
        role="img"
        aria-label="SolveSprint Sketched Trophy"
      >
        {/* Background Sparkles & Accents */}
        <g className="animate-pulse duration-1000">
          <path
            d="M 35 50 L 39 35 L 54 39 L 39 43 L 35 58 L 31 43 L 16 39 L 31 35 Z"
            fill="#F6C74A"
            stroke="#233047"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d="M 285 45 L 288 32 L 301 35 L 288 38 L 285 51 L 282 38 L 269 35 L 282 32 Z"
            fill="#F47731"
            stroke="#233047"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <circle cx="28" cy="190" r="7" fill="#78A86B" stroke="#233047" strokeWidth="2.5" />
          <circle cx="292" cy="185" r="8" fill="#BFE3EC" stroke="#233047" strokeWidth="2.5" />
          <path
            d="M 265 240 L 267 230 L 277 232 L 267 234 L 265 244 L 263 234 L 253 232 L 263 230 Z"
            fill="#78A86B"
            stroke="#233047"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </g>

        {/* Left Trophy Handle */}
        <path
          d="M 95 80 C 45 80, 45 145, 95 155"
          fill="#F4C4A7"
          stroke="#233047"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Right Trophy Handle */}
        <path
          d="M 225 80 C 275 80, 275 145, 225 155"
          fill="#F4C4A7"
          stroke="#233047"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Main Trophy Cup Body */}
        <path
          d="M 85 55 L 235 55 L 218 165 C 218 195, 185 212, 160 212 C 135 212, 102 195, 102 165 Z"
          fill="#F6C74A"
          stroke="#233047"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Cup Top Rim */}
        <ellipse
          cx="160"
          cy="55"
          rx="75"
          ry="14"
          fill="#F47731"
          stroke="#233047"
          strokeWidth="4"
        />

        {/* Inner Cup Shading Accent */}
        <path
          d="M 104 70 C 104 135, 125 185, 160 200 C 138 180, 124 140, 124 70 Z"
          fill="#F47731"
          opacity="0.3"
        />

        {/* Trophy Stem */}
        <path
          d="M 142 212 L 178 212 L 184 242 L 136 242 Z"
          fill="#F47731"
          stroke="#233047"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Base Stand Outer */}
        <rect
          x="115"
          y="242"
          width="90"
          height="36"
          rx="7"
          fill="#233047"
          stroke="#233047"
          strokeWidth="4"
        />
        {/* Base Stand Inner Plate */}
        <rect
          x="121"
          y="246"
          width="78"
          height="28"
          rx="5"
          fill="#FFFDF8"
          stroke="#233047"
          strokeWidth="2.5"
        />

        {/* Base Plate Text */}
        <text
          x="160"
          y="264"
          textAnchor="middle"
          fill="#233047"
          fontSize="11"
          fontWeight="bold"
          fontFamily="monospace"
          letterSpacing="1.5"
        >
          EST. 2026
        </text>

        {/* Front Banner Ribbon across Cup */}
        <g>
          {/* Banner Back Ribbon Fold Shadows */}
          <path
            d="M 58 126 L 85 108 L 85 144 Z M 262 126 L 235 108 L 235 144 Z"
            fill="#233047"
          />

          {/* Main Ribbon Body */}
          <rect
            x="62"
            y="108"
            width="196"
            height="38"
            rx="8"
            fill="#F47731"
            stroke="#233047"
            strokeWidth="4"
          />

          {/* Inner Ribbon White Fill */}
          <rect
            x="68"
            y="112"
            width="184"
            height="30"
            rx="5"
            fill="#FFFDF8"
            stroke="#233047"
            strokeWidth="2.5"
          />

          {/* Banner Text: SOLVESPRINT */}
          <text
            x="160"
            y="133"
            textAnchor="middle"
            fill="#233047"
            fontSize="18"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="2.5"
          >
            SOLVESPRINT
          </text>
        </g>
      </svg>
    </div>
  );
}
