"use client";

import { useFormState } from "react-dom";
import { submitSolutionAction } from "@/lib/actions";
import { emptyState, firstError } from "@/lib/forms";
import { CheckboxField, FormField, Notice, TextAreaField } from "@/components/ui";
import { SubmitButton } from "@/components/submit-button";
import type { Submission } from "@prisma/client";

export function SubmissionForm({ slug, submission }: { slug: string; submission?: Submission | null }) {
  const [state, formAction] = useFormState(submitSolutionAction, emptyState);
  const values = state.values || {};

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="slug" value={slug} />
      {state.message ? <Notice tone="error">{state.message}</Notice> : null}
      <FormField label="Submission title" name="title" defaultValue={(values.title as string) || submission?.title || ""} error={firstError(state.errors, "title")} />
      <TextAreaField label="Short summary" name="summary" defaultValue={(values.summary as string) || submission?.summary || ""} error={firstError(state.errors, "summary")} />
      <FormField label="Main submission link" name="submissionLink" type="url" placeholder="https://..." defaultValue={(values.submissionLink as string) || submission?.submissionLink || ""} error={firstError(state.errors, "submissionLink")} />
      <FormField label="Optional file URL" name="fileUrl" type="url" placeholder="https://..." defaultValue={(values.fileUrl as string) || submission?.fileUrl || ""} error={firstError(state.errors, "fileUrl")} />
      <TextAreaField label="Notes optional" name="notes" defaultValue={(values.notes as string) || submission?.notes || ""} error={firstError(state.errors, "notes")} />
      <CheckboxField name="originalWork" label="This is our team's original work." defaultChecked={Boolean(values.originalWork)} error={firstError(state.errors, "originalWork")} />
      <CheckboxField name="shareCredit" label="We understand winning submissions may be shared publicly with credit." defaultChecked={Boolean(values.shareCredit)} error={firstError(state.errors, "shareCredit")} />
      <SubmitButton pendingText="Saving submission...">{submission ? "Update submission" : "Submit solution"}</SubmitButton>
    </form>
  );
}
