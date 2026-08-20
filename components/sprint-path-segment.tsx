"use client";

import { useEffect, useRef, useState } from "react";

export type SprintPathVariant = "hero" | "chapters" | "cta" | "footer";

export function SprintPathSegment({
  variant,
  className = "",
}: {
  variant: SprintPathVariant;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);

    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener("change", listener);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      motionQuery.removeEventListener("change", listener);
    };
  }, []);

  const shouldAnimate = inView && !reducedMotion;

  if (variant === "hero") {
    return (
      <div
        ref={containerRef}
        className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1200 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full opacity-70"
          preserveAspectRatio="none"
        >
          {/* Gold offset curve */}
          <path
            d="M -50 320 C 300 380, 600 120, 950 220 C 1050 250, 1150 180, 1250 120"
            stroke="#F2B84B"
            strokeWidth="5"
            strokeLinecap="round"
            style={{
              strokeDasharray: 1400,
              strokeDashoffset: shouldAnimate ? 0 : 1400,
              transition: "stroke-dashoffset 800ms ease-out 100ms",
            }}
          />
          {/* Orange main curve */}
          <path
            d="M -50 300 C 300 360, 600 100, 950 200 C 1050 230, 1150 160, 1250 100"
            stroke="#F36A21"
            strokeWidth="8"
            strokeLinecap="round"
            style={{
              strokeDasharray: 1400,
              strokeDashoffset: shouldAnimate ? 0 : 1400,
              transition: "stroke-dashoffset 800ms ease-out",
            }}
          />
        </svg>
      </div>
    );
  }

  if (variant === "chapters") {
    return (
      <div
        ref={containerRef}
        className={`pointer-events-none absolute inset-y-0 left-4 md:left-1/2 -translate-x-1/2 w-24 overflow-hidden ${className}`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 100 1200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full opacity-60"
          preserveAspectRatio="none"
        >
          <path
            d="M 55 0 Q 85 300, 25 600 T 55 1200"
            stroke="#F2B84B"
            strokeWidth="5"
            strokeLinecap="round"
            style={{
              strokeDasharray: 1400,
              strokeDashoffset: shouldAnimate ? 0 : 1400,
              transition: "stroke-dashoffset 900ms ease-out 150ms",
            }}
          />
          <path
            d="M 45 0 Q 75 300, 15 600 T 45 1200"
            stroke="#F36A21"
            strokeWidth="7"
            strokeLinecap="round"
            style={{
              strokeDasharray: 1400,
              strokeDashoffset: shouldAnimate ? 0 : 1400,
              transition: "stroke-dashoffset 900ms ease-out",
            }}
          />
        </svg>
      </div>
    );
  }

  if (variant === "cta") {
    return (
      <div
        ref={containerRef}
        className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1000 250"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full opacity-40"
          preserveAspectRatio="none"
        >
          <path
            d="M -20 180 C 250 80, 650 220, 1020 60"
            stroke="#F2B84B"
            strokeWidth="4"
            strokeLinecap="round"
            style={{
              strokeDasharray: 1100,
              strokeDashoffset: shouldAnimate ? 0 : 1100,
              transition: "stroke-dashoffset 700ms ease-out 100ms",
            }}
          />
          <path
            d="M -20 160 C 250 60, 650 200, 1020 40"
            stroke="#F36A21"
            strokeWidth="7"
            strokeLinecap="round"
            style={{
              strokeDasharray: 1100,
              strokeDashoffset: shouldAnimate ? 0 : 1100,
              transition: "stroke-dashoffset 700ms ease-out",
            }}
          />
        </svg>
      </div>
    );
  }

  // Footer variant
  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-x-0 bottom-0 h-16 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full opacity-30"
        preserveAspectRatio="none"
      >
        <path
          d="M 0 40 Q 600 10, 1200 40"
          stroke="#F36A21"
          strokeWidth="5"
          strokeLinecap="round"
          style={{
            strokeDasharray: 1250,
            strokeDashoffset: shouldAnimate ? 0 : 1250,
            transition: "stroke-dashoffset 600ms ease-out",
          }}
        />
      </svg>
    </div>
  );
}
