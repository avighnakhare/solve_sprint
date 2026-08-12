"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import {
  AuthField,
  AuthSubmitButton,
  PasswordField
} from "@/components/auth/auth-form-controls";
import { loginAction } from "@/lib/actions";
import { emptyState, firstError } from "@/lib/forms";

// TODO(auth): Add the recovery route here when password-reset delivery is implemented.
const forgotPasswordHref: string | undefined = undefined;

export function LoginForm({ next }: { next?: string }) {
  const [state, formAction] = useFormState(loginAction, emptyState);
  const [showPassword, setShowPassword] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!state.message) return;
    requestAnimationFrame(() => {
      formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
    });
  }, [state.message]);

  return (
    <form ref={formRef} action={formAction} className="auth-login-form" noValidate>
      <input type="hidden" name="next" value={next || ""} />

      <div className="student-signup-status auth-login-status" aria-live="assertive">
        {state.message ? <p>{state.message}</p> : null}
      </div>

      <AuthField
        label="Email"
        name="email"
        type="email"
        inputMode="email"
        autoComplete="email"
        autoCapitalize="none"
        spellCheck={false}
        defaultValue={(state.values?.email as string) || ""}
        error={firstError(state.errors, "email")}
        required
      />

      <PasswordField
        label="Password"
        name="password"
        visible={showPassword}
        onToggle={() => setShowPassword((visible) => !visible)}
        autoComplete="current-password"
        error={firstError(state.errors, "password")}
        labelAside={
          forgotPasswordHref ? <Link href={forgotPasswordHref}>Forgot password?</Link> : undefined
        }
      />

      <AuthSubmitButton className="auth-login-submit" pendingText="Logging in…">
        Log in
      </AuthSubmitButton>

      {/* External authentication providers remain unrendered until a real provider is configured. */}
    </form>
  );
}
