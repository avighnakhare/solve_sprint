import Link from "next/link";
import type { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "warm" | "danger";
type Tone = "slate" | "teal" | "amber" | "rose" | "blue" | "green" | "orange" | "lavender" | "pink" | "navy";

export function buttonClasses(variant: Variant = "primary", className?: string) {
  return cn(
    "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl px-6 py-3 text-[15px] lg:text-base font-semibold transition-all duration-200 focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60",
    variant === "primary" &&
      "border-0 bg-orange-600 text-white hover:bg-orange-700 focus:ring-orange-500/25 shadow-sm",
    variant === "secondary" &&
      "border border-slate-900/15 bg-white text-slate-900 hover:border-slate-900/40 hover:bg-slate-50 focus:ring-slate-900/15 shadow-sm",
    variant === "ghost" && "text-slate-700 hover:bg-slate-200/50 hover:text-slate-950 focus:ring-slate-400/20",
    variant === "warm" &&
      "border border-amber-300 bg-amber-400 text-slate-950 hover:bg-amber-500 focus:ring-amber-400/25 shadow-sm",
    variant === "danger" &&
      "border border-rose-700 bg-rose-700 text-white hover:bg-rose-800 focus:ring-rose-500/25",
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
    <div className={cn("ui-card rounded-lg border border-slate-300 bg-white p-6", className)} {...props}>
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
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded border px-2.5 py-1 text-xs font-semibold",
        tone === "slate" && "border-slate-200 bg-slate-50 text-slate-700",
        tone === "teal" && "border-teal/20 bg-teal/10 text-teal",
        tone === "amber" && "border-amber-200 bg-amber-50 text-amber-800",
        tone === "rose" && "border-rose-200 bg-rose-50 text-rose-700",
        tone === "blue" && "border-sky-200 bg-sky-50 text-sky-800",
        tone === "green" && "border-green/50 bg-mint/60 text-emerald-900",
        tone === "orange" && "border-orange/40 bg-peach/60 text-orange-900",
        tone === "lavender" && "border-violet-200 bg-lavender/70 text-violet-900",
        tone === "pink" && "border-pink/70 bg-pink/60 text-pink-900",
        tone === "navy" && "border-midnight bg-midnight text-white",
        className
      )}
    >
      {children}
    </span>
  );
}

export function EmptyState({
  title,
  body,
  actions,
  icon
}: {
  title: string;
  body: string;
  actions?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="border-y border-slate-300 bg-transparent py-10 text-left">
      {icon ? <div className="sr-only">{icon}</div> : null}
      <h2 className="text-2xl font-semibold tracking-tight text-ink">{title}</h2>
      <p className="mt-3 max-w-xl text-sm leading-6 text-muted">{body}</p>
      {actions ? <div className="mt-6 flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  body,
  actions,
  align = "left"
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  actions?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between", align === "center" && "items-center text-center sm:flex-col")}>
      <div>
        {eyebrow ? <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal">{eyebrow}</p> : null}
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h2>
        {body ? <p className="mt-3 max-w-2xl text-base leading-7 text-muted">{body}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  body,
  actions
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal">{eyebrow}</p> : null}
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">{title}</h1>
        {body ? <p className="mt-3 max-w-2xl text-base leading-7 text-muted">{body}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  );
}

export function StatCard({ label, value, tone = "blue" }: { label: string; value: string | number; tone?: Tone }) {
  return (
    <Card className="workspace-stat border-x-0 border-b-0 border-t-slate-400 p-4" data-tone={tone}>
      <span className="workspace-stat__signal" aria-hidden="true" />
      <p className="text-xs font-bold uppercase tracking-[0.08em] text-muted">{label}</p>
      <p className="mt-2 text-3xl font-semibold tabular-nums tracking-tight text-ink">{value}</p>
    </Card>
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
    <label className={cn("block", className)}>
      <span className="text-sm font-semibold text-slate-800">{label}</span>
      <input
        name={name}
        className={cn(
          "field-focus mt-2 min-h-12 w-full rounded-md border bg-white px-4 py-3 text-sm text-ink placeholder:text-slate-400",
          error ? "border-rose-300" : "border-slate-200"
        )}
        {...props}
      />
      {hint ? <span className="mt-1 block text-xs text-slate-500">{hint}</span> : null}
      {error ? <span className="mt-1 block text-sm text-rose-600">{error}</span> : null}
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
    <label className={cn("block", className)}>
      <span className="text-sm font-semibold text-slate-800">{label}</span>
      <textarea
        name={name}
        className={cn(
          "field-focus mt-2 min-h-32 w-full rounded-md border bg-white px-4 py-3 text-sm leading-6 text-ink placeholder:text-slate-400",
          error ? "border-rose-300" : "border-slate-200"
        )}
        {...props}
      />
      {hint ? <span className="mt-1 block text-xs text-slate-500">{hint}</span> : null}
      {error ? <span className="mt-1 block text-sm text-rose-600">{error}</span> : null}
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
    <label className={cn("block", className)}>
      <span className="text-sm font-semibold text-slate-800">{label}</span>
      <select
        name={name}
        className={cn(
          "field-focus mt-2 min-h-12 w-full rounded-md border bg-white px-4 py-3 text-sm text-ink",
          error ? "border-rose-300" : "border-slate-200"
        )}
        {...props}
      >
        {children}
      </select>
      {error ? <span className="mt-1 block text-sm text-rose-600">{error}</span> : null}
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
    <label className="flex min-h-11 gap-3 border-b border-slate-300 bg-transparent py-3 text-sm leading-6 text-slate-700 transition hover:border-orange-700">
      <input
        type="checkbox"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        className="mt-1 h-5 w-5 rounded border-slate-400 text-midnight focus:ring-blue"
      />
      <span>
        {label}
        {error ? <span className="mt-1 block text-rose-600">{error}</span> : null}
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
        "rounded-md border-l-4 px-4 py-3 text-sm",
        tone === "success" && "border-green/50 bg-mint/60 text-emerald-900",
        tone === "error" && "border-rose-200 bg-rose-50 text-rose-700",
        tone === "info" && "border-sky-200 bg-sky-50 text-sky-800"
      )}
    >
      {children}
    </div>
  );
}
