import Image from "next/image";

const LOGO_SRC = "/brand/solvesprint-mark.png";

export function SiteMark({
  className,
  priority = false
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={LOGO_SRC}
      alt=""
      width={64}
      height={64}
      priority={priority}
      className={["site-brand__mark", className].filter(Boolean).join(" ")}
    />
  );
}

export function SiteBrand({
  className,
  copyClassName,
  descriptor,
  priority = false
}: {
  className?: string;
  copyClassName?: string;
  descriptor?: string;
  priority?: boolean;
}) {
  return (
    <span className={["site-brand", className].filter(Boolean).join(" ")}>
      <SiteMark priority={priority} />
      <span className={["site-brand__copy", copyClassName].filter(Boolean).join(" ")}>
        <strong>SolveSprint™</strong>
        {descriptor ? <small>{descriptor}</small> : null}
      </span>
    </span>
  );
}
