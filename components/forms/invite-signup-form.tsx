"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { interests } from "@/lib/constants";
import { inviteStudentSignupAction } from "@/lib/actions";
import { emptyState, firstError } from "@/lib/forms";
import { CheckboxField, FormField, Notice } from "@/components/ui";
import { SubmitButton } from "@/components/submit-button";

export function InviteSignupForm({ email, token }: { email: string; token: string }) {
  const [state, formAction] = useFormState(inviteStudentSignupAction, emptyState);
  const values = state.values || {};
  const selectedInterests = (values.interests as string[]) || [];

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="token" value={token} />
      <input type="hidden" name="email" value={email} />
      {state.message ? <Notice tone="error">{state.message}</Notice> : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="First name" name="firstName" defaultValue={(values.firstName as string) || ""} error={firstError(state.errors, "firstName")} />
        <FormField label="Last name" name="lastName" defaultValue={(values.lastName as string) || ""} error={firstError(state.errors, "lastName")} />
      </div>
      <FormField label="Email" name="emailDisplay" type="email" value={email} readOnly />
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Password" name="password" type="password" autoComplete="new-password" error={firstError(state.errors, "password")} />
        <FormField label="Confirm password" name="confirmPassword" type="password" autoComplete="new-password" error={firstError(state.errors, "confirmPassword")} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Grade" name="grade" defaultValue={(values.grade as string) || ""} error={firstError(state.errors, "grade")} />
        <FormField label="School name" name="schoolName" defaultValue={(values.schoolName as string) || ""} error={firstError(state.errors, "schoolName")} />
        <FormField label="City" name="city" defaultValue={(values.city as string) || ""} error={firstError(state.errors, "city")} />
        <FormField label="State" name="state" defaultValue={(values.state as string) || ""} error={firstError(state.errors, "state")} />
        <FormField label="Country" name="country" defaultValue={(values.country as string) || "United States"} error={firstError(state.errors, "country")} />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-800">Interests</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {interests.map((interest) => (
            <CheckboxField key={interest} name="interests" value={interest} label={interest} defaultChecked={selectedInterests.includes(interest)} />
          ))}
        </div>
      </div>
      <CheckboxField
        name="parentConsent"
        label="I confirm I have parent/guardian permission to participate if required."
        defaultChecked={Boolean(values.parentConsent)}
        error={firstError(state.errors, "parentConsent")}
      />
      <CheckboxField
        name="agree"
        label={
          <>
            I agree to the <Link href="/rules" className="font-semibold text-teal">rules</Link>,{" "}
            <Link href="/terms" className="font-semibold text-teal">terms</Link>, and{" "}
            <Link href="/privacy" className="font-semibold text-teal">privacy policy</Link>.
          </>
        }
        defaultChecked={Boolean(values.agree)}
        error={firstError(state.errors, "agree")}
      />
      <SubmitButton pendingText="Joining team...">Create account and accept invite</SubmitButton>
    </form>
  );
}
