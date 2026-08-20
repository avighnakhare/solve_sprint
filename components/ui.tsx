import Link from "next/link";
import type { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "warm" | "danger";

export function buttonClasses(variant: Variant = "primary", className?: string) {
  return cn(
    "inline-flex min-h-[60px] sm:min-h-[62px] min-w-[160px] items-center justify-center gap-2 rounded-[16px] px-8 py-3.5 font-body font-extrabold text-[18px] leading-[1.1] transition-all focus:outline-none focus-visible:ring-3 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper active:translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-60",
    variant === "primary" &&
      "border-2 border-ink bg-tangerine text-ink shadow-[4px_4px_0px_0px_#233047] hover:-translate-y-1 hover:bg-sun hover:shadow-[6px_6px_0px_0px_#233047] active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#233047]",
    variant === "secondary" &&
      "border-2 border-ink bg-paper-light text-ink shadow-[4px_4px_0px_0px_#F47731] hover:-translate-y-1 hover:bg-paper hover:shadow-[6px_6px_0px_0px_#F47731] active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#F47731]",
    variant === "ghost" && "border-0 bg-transparent text-ink hover:text-tangerine hover:bg-paper-light/80 min-w-0 px-4 font-bold text-[16px]",
    variant === "warm" &&
      "border-2 border-ink bg-sun text-ink shadow-[4px_4px_0px_0px_#233047] hover:-translate-y-1 hover:bg-tangerine hover:shadow-[6px_6px_0px_0px_#233047] active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#233047]",
    variant === "danger" &&
      "border-2 border-ink bg-rose-600 text-white shadow-[4px_4px_0px_0px_#233047] hover:-translate-y-1 hover:bg-rose-700 hover:shadow-[6px_6px_0px_0px_#233047]",
    className
  );
}

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={buttonClasses(variant, className)} {...props} />;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  onClick
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link href={href} className={buttonClasses(variant, className)} onClick={onClick}>
      {children}
    </Link>
  );
}

export function Card({ children, className, ...props }: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div className={cn("rounded-[20px] border-2 border-ink bg-white p-6 sm:p-8 shadow-[4px_4px_0px_0px_#233047]", className)} {...props}>
      {children}
    </div>
  );
}

export function Badge({
  children,
  tone = "slate",
  className
}: {
  children: ReactNode;
  tone?: "slate" | "teal" | "amber" | "rose" | "blue" | "green" | "orange" | "navy" | "lavender";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[8px] border-2 px-3 py-1 text-xs font-bold font-mono tracking-wider uppercase shadow-[2px_2px_0px_0px_#233047]",
        tone === "orange" && "border-ink bg-tangerine text-ink",
        tone === "navy" && "border-ink bg-ink text-paper",
        tone === "slate" && "border-ink bg-paper-light text-ink",
        className
      )}
    >
      {children}
    </span>
  );
}

export function FormField({
  label,
  name,
  error,
  hint,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  error?: string;
  hint?: string;
}) {
  return (
    <label className={cn("block space-y-2.5", className)}>
      <span className="block text-base font-bold text-ink">{label}</span>
      <input
        name={name}
        className={cn(
          "min-h-[54px] w-full rounded-[14px] border-2 border-ink bg-white px-4 py-3.5 text-base font-medium text-ink placeholder:text-ink-muted/50 shadow-[2px_2px_0px_0px_rgba(35,48,71,0.12)] focus:border-ink focus:outline-none focus:ring-4 focus:ring-tangerine/40 focus:shadow-[3px_3px_0px_0px_#233047] transition-all",
          error ? "border-rose-600 ring-2 ring-rose-200" : "border-ink"
        )}
        {...props}
      />
      {hint ? <span className="block text-sm text-ink-muted mt-1">{hint}</span> : null}
      {error ? <span className="block text-sm font-semibold text-rose-700 mt-1">{error}</span> : null}
    </label>
  );
}

export function TextAreaField({
  label,
  name,
  error,
  hint,
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  name: string;
  error?: string;
  hint?: string;
}) {
  return (
    <label className={cn("block space-y-2.5", className)}>
      <span className="block text-base font-bold text-ink">{label}</span>
      <textarea
        name={name}
        className={cn(
          "min-h-[130px] w-full rounded-[14px] border-2 border-ink bg-white px-4 py-3.5 text-base font-medium text-ink placeholder:text-ink-muted/50 shadow-[2px_2px_0px_0px_rgba(35,48,71,0.12)] focus:border-ink focus:outline-none focus:ring-4 focus:ring-tangerine/40 focus:shadow-[3px_3px_0px_0px_#233047] transition-all",
          error ? "border-rose-600 ring-2 ring-rose-200" : "border-ink"
        )}
        {...props}
      />
      {hint ? <span className="block text-sm text-ink-muted mt-1">{hint}</span> : null}
      {error ? <span className="block text-sm font-semibold text-rose-700 mt-1">{error}</span> : null}
    </label>
  );
}

export function SelectField({
  label,
  name,
  error,
  children,
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  name: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className={cn("block space-y-2.5", className)}>
      <span className="block text-base font-bold text-ink">{label}</span>
      <select
        name={name}
        className={cn(
          "min-h-[54px] w-full rounded-[14px] border-2 border-ink bg-white px-4 py-3.5 text-base font-medium text-ink shadow-[2px_2px_0px_0px_rgba(35,48,71,0.12)] focus:border-ink focus:outline-none focus:ring-4 focus:ring-tangerine/40 focus:shadow-[3px_3px_0px_0px_#233047] transition-all",
          error ? "border-rose-600 ring-2 ring-rose-200" : "border-ink"
        )}
        {...props}
      >
        {children}
      </select>
      {error ? <span className="block text-sm font-semibold text-rose-700 mt-1">{error}</span> : null}
    </label>
  );
}

export function CheckboxField({
  label,
  name,
  error,
  defaultChecked,
  value
}: {
  label: ReactNode;
  name: string;
  error?: string;
  defaultChecked?: boolean;
  value?: string;
}) {
  return (
    <label className="flex items-start gap-3 border-b border-line bg-transparent py-3.5 text-base text-ink cursor-pointer">
      <input
        type="checkbox"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        className="mt-1 h-5 w-5 rounded border-line text-ink focus:ring-tangerine"
      />
      <span>
        {label}
        {error ? <span className="block text-sm font-semibold text-rose-700 mt-1">{error}</span> : null}
      </span>
    </label>
  );
}

export function Notice({
  children,
  tone = "success"
}: {
  children: ReactNode;
  tone?: "success" | "error" | "info";
}) {
  return (
    <div
      className={cn(
        "rounded-[12px] border-l-4 p-4 text-base font-medium",
        tone === "success" && "border-leaf bg-leaf/10 text-ink",
        tone === "error" && "border-rose-700 bg-rose-50 text-rose-900",
        tone === "info" && "border-lake bg-lake/30 text-ink"
      )}
    >
      {children}
    </div>
  );
}
