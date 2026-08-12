"use client";

import { useFormState } from "react-dom";
import { interests } from "@/lib/constants";
import { updateStudentProfileAction } from "@/lib/actions";
import { emptyState, firstError } from "@/lib/forms";
import { parseJsonArray } from "@/lib/utils";
import { CheckboxField, FormField, Notice } from "@/components/ui";
import { SubmitButton } from "@/components/submit-button";
import type { StudentProfile } from "@prisma/client";

export function ProfileForm({ profile }: { profile: StudentProfile }) {
  const [state, formAction] = useFormState(updateStudentProfileAction, emptyState);
  const values = state.values || {};
  const selectedInterests = (values.interests as string[]) || parseJsonArray(profile.interests);

  return (
    <form action={formAction} className="space-y-6">
      {state.success ? <Notice>{state.success}</Notice> : null}
      {state.message ? <Notice tone="error">{state.message}</Notice> : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="First name" name="firstName" defaultValue={(values.firstName as string) || profile.firstName} error={firstError(state.errors, "firstName")} />
        <FormField label="Last name" name="lastName" defaultValue={(values.lastName as string) || profile.lastName} error={firstError(state.errors, "lastName")} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Grade" name="grade" defaultValue={(values.grade as string) || profile.grade} error={firstError(state.errors, "grade")} />
        <FormField label="School name" name="schoolName" defaultValue={(values.schoolName as string) || profile.schoolName} error={firstError(state.errors, "schoolName")} />
        <FormField label="City" name="city" defaultValue={(values.city as string) || profile.city} error={firstError(state.errors, "city")} />
        <FormField label="State" name="state" defaultValue={(values.state as string) || profile.state} error={firstError(state.errors, "state")} />
        <FormField label="Country" name="country" defaultValue={(values.country as string) || profile.country} error={firstError(state.errors, "country")} />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-800">Interests</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {interests.map((interest) => (
            <CheckboxField key={interest} name="interests" value={interest} label={interest} defaultChecked={selectedInterests.includes(interest)} />
          ))}
        </div>
      </div>
      <SubmitButton pendingText="Saving...">Save profile</SubmitButton>
    </form>
  );
}
