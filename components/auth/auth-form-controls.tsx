"use client";

import {
  type ChangeEventHandler,
  type FocusEventHandler,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes
} from "react";
import { useFormStatus } from "react-dom";

export function AuthField({
  label,
  name,
  error,
  hint,
  type = "text",
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  error?: string;
  hint?: string;
}) {
  const hintId = hint ? `${name}-hint` : undefined;
  const errorId = error ? `${name}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <label className="student-auth-field">
      <span>{label}</span>
      <input
        {...props}
        type={type}
        name={name}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
      />
      {hint ? <small id={hintId}>{hint}</small> : null}
      {error ? <em id={errorId}>{error}</em> : null}
    </label>
  );
}

export function PasswordField({
  label,
  name,
  visible,
  onToggle,
  error,
  hint,
  autoComplete = "current-password",
  minLength,
  labelAside,
  onChange,
  onBlur
}: {
  label: string;
  name: string;
  visible: boolean;
  onToggle: () => void;
  error?: string;
  hint?: string;
  autoComplete?: string;
  minLength?: number;
  labelAside?: ReactNode;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}) {
  const hintId = hint ? `${name}-hint` : undefined;
  const errorId = error ? `${name}-error` : undefined;
  const inputId = `${name}-input`;

  return (
    <div className="student-auth-field">
      <span className="student-auth-field__label">
        <label htmlFor={inputId}>{label}</label>
        {labelAside}
      </span>
      <span className="student-auth-password">
        <input
          id={inputId}
          type={visible ? "text" : "password"}
          name={name}
          autoComplete={autoComplete}
          minLength={minLength}
          onChange={onChange}
          onBlur={onBlur}
          required
          aria-invalid={Boolean(error)}
          aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}
        />
        <button type="button" onClick={onToggle} aria-label={`${visible ? "Hide" : "Show"} ${label.toLowerCase()}`}>
          {visible ? "Hide" : "Show"}
        </button>
      </span>
      {hint ? <small id={hintId}>{hint}</small> : null}
      {error ? <em id={errorId}>{error}</em> : null}
    </div>
  );
}

export function AuthTextArea({
  label,
  name,
  error,
  hint,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  name: string;
  error?: string;
  hint?: string;
}) {
  const hintId = hint ? `${name}-hint` : undefined;
  const errorId = error ? `${name}-error` : undefined;
  return (
    <label className="student-auth-field">
      <span>{label}</span>
      <textarea
        {...props}
        name={name}
        aria-invalid={Boolean(error)}
        aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}
      />
      {hint ? <small id={hintId}>{hint}</small> : null}
      {error ? <em id={errorId}>{error}</em> : null}
    </label>
  );
}

export function AuthSelect({
  label,
  name,
  error,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  name: string;
  error?: string;
  children: ReactNode;
}) {
  const errorId = error ? `${name}-error` : undefined;
  return (
    <label className="student-auth-field">
      <span>{label}</span>
      <select
        {...props}
        name={name}
        required
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
      >
        {children}
      </select>
      {error ? <em id={errorId}>{error}</em> : null}
    </label>
  );
}

export function AuthSubmitButton({
  children,
  pendingText,
  className
}: {
  children: ReactNode;
  pendingText: string;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={className} disabled={pending} aria-disabled={pending}>
      {pending ? pendingText : children}
    </button>
  );
}
