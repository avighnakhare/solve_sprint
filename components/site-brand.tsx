import Image from "next/image";
import Link from "next/link";

const LOGO_SRC = "/brand/solvesprint-mark.png";

export function SiteMark({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src={LOGO_SRC}
      alt="SolveSprint Logo Mark"
      width={36}
      height={36}
      priority={priority}
      className={`w-full h-full object-contain ${className}`}
    />
  );
}

export function SiteBrand({
  className = "",
  descriptor,
  copyClassName,
}: {
  className?: string;
  descriptor?: string;
  copyClassName?: string;
}) {
  return (
    <Link href="/" className={`inline-flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-tangerine rounded-md p-1 ${className}`}>
      <div className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0">
        <SiteMark priority />
      </div>
      <span className={`font-display font-bold text-xl sm:text-22px tracking-tight text-ink group-hover:text-tangerine transition-colors ${copyClassName || ""}`}>
        SolveSprint™
        {descriptor && <span className="block text-xs font-mono text-ink-muted">{descriptor}</span>}
      </span>
    </Link>
  );
}
