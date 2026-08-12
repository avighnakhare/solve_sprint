"use client";

import { useFormState } from "react-dom";
import type { Challenge } from "@prisma/client";
import { categoryOptions, deliverables, rubricDefaults } from "@/lib/constants";
import { createChallengeAction, updateChallengeAction } from "@/lib/actions";
import { emptyState, firstError } from "@/lib/forms";
import { parseJsonArray, slugify, toDateTimeLocal } from "@/lib/utils";
import { Card, CheckboxField, FormField, Notice, SelectField, TextAreaField } from "@/components/ui";
import { SubmitButton } from "@/components/submit-button";

type ChallengeValues = Record<string, unknown>;

function valueFor(values: ChallengeValues, challenge: Challenge | undefined, name: keyof Challenge, fallback = "") {
  const stateValue = values[name as string];
  if (stateValue !== undefined) return String(stateValue);
  const challengeValue = challenge?.[name];
  if (challengeValue === null || challengeValue === undefined) return fallback;
  if (challengeValue instanceof Date) return toDateTimeLocal(challengeValue);
  return String(challengeValue);
}

export function ChallengeForm({ challenge }: { challenge?: Challenge }) {
  const action = challenge ? updateChallengeAction : createChallengeAction;
  const [state, formAction] = useFormState(action, emptyState);
  const values = (state.values || {}) as ChallengeValues;
  const selectedDeliverables =
    (values.deliverables as string[] | undefined) || parseJsonArray(challenge?.deliverables);
  const rubric: { label: string; points: number }[] =
    (values.rubric as { label: string; points: number }[] | undefined) ||
    (() => {
      try {
        const parsed = challenge?.rubricJson ? JSON.parse(challenge.rubricJson) : rubricDefaults;
        return Array.isArray(parsed) ? (parsed as { label: string; points: number }[]) : rubricDefaults;
      } catch {
        return rubricDefaults;
      }
    })();

  return (
    <form action={formAction} className="space-y-6">
      {challenge ? <input type="hidden" name="challengeId" value={challenge.id} /> : null}
      {state.message ? <Notice tone="error">{state.message}</Notice> : null}
      <Card>
        <h2 className="text-xl font-semibold tracking-tight text-ink">Basic Information</h2>
        <div className="mt-5 space-y-4">
          <FormField label="Title" name="title" defaultValue={valueFor(values, challenge, "title")} error={firstError(state.errors, "title")} />
          <SelectField label="Category" name="category" defaultValue={valueFor(values, challenge, "category", "BUSINESS")} error={firstError(state.errors, "category")}>
            {categoryOptions.map((category) => (
              <option key={category.value} value={category.value}>{category.label}</option>
            ))}
          </SelectField>
          <TextAreaField label="Short summary" name="shortSummary" defaultValue={valueFor(values, challenge, "shortSummary")} error={firstError(state.errors, "shortSummary")} />
          <TextAreaField label="Problem statement" name="problemStatement" defaultValue={valueFor(values, challenge, "problemStatement")} error={firstError(state.errors, "problemStatement")} />
          <TextAreaField label="Background/context" name="background" defaultValue={valueFor(values, challenge, "background")} error={firstError(state.errors, "background")} />
          <TextAreaField label="Organization goal" name="goal" defaultValue={valueFor(values, challenge, "goal")} error={firstError(state.errors, "goal")} />
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold tracking-tight text-ink">Deliverables</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {deliverables.map((item) => (
            <CheckboxField key={item} name="deliverables" value={item} label={item} defaultChecked={selectedDeliverables.includes(item)} />
          ))}
        </div>
        {firstError(state.errors, "deliverables") ? <p className="mt-3 text-sm text-rose-600">{firstError(state.errors, "deliverables")}</p> : null}
      </Card>

      <Card>
        <h2 className="text-xl font-semibold tracking-tight text-ink">Team Rules</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <FormField label="Minimum team size" name="minTeamSize" type="number" min={1} defaultValue={(values.minTeamSize as string) || challenge?.minTeamSize || 1} error={firstError(state.errors, "minTeamSize")} />
          <FormField label="Maximum team size" name="maxTeamSize" type="number" min={1} defaultValue={(values.maxTeamSize as string) || challenge?.maxTeamSize || 4} error={firstError(state.errors, "maxTeamSize")} />
        </div>
        <TextAreaField className="mt-4" label="Eligibility notes optional" name="eligibilityNotes" defaultValue={valueFor(values, challenge, "eligibilityNotes")} error={firstError(state.errors, "eligibilityNotes")} />
      </Card>

      <Card>
        <h2 className="text-xl font-semibold tracking-tight text-ink">Timeline</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <FormField label="Registration opens" name="registrationOpenAt" type="datetime-local" defaultValue={valueFor(values, challenge, "registrationOpenAt")} error={firstError(state.errors, "registrationOpenAt")} />
          <FormField label="Registration closes" name="registrationCloseAt" type="datetime-local" defaultValue={valueFor(values, challenge, "registrationCloseAt")} error={firstError(state.errors, "registrationCloseAt")} />
          <FormField label="Submission deadline" name="submissionDeadline" type="datetime-local" defaultValue={valueFor(values, challenge, "submissionDeadline")} error={firstError(state.errors, "submissionDeadline")} />
          <FormField label="Judging starts" name="judgingStartsAt" type="datetime-local" defaultValue={valueFor(values, challenge, "judgingStartsAt")} error={firstError(state.errors, "judgingStartsAt")} />
          <FormField label="Winner announcement date" name="winnerAnnouncementAt" type="datetime-local" defaultValue={valueFor(values, challenge, "winnerAnnouncementAt")} error={firstError(state.errors, "winnerAnnouncementAt")} />
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold tracking-tight text-ink">Prize / Recognition</h2>
        <div className="mt-5 space-y-4">
          <TextAreaField label="Prize description optional" name="prizeDescription" defaultValue={valueFor(values, challenge, "prizeDescription")} error={firstError(state.errors, "prizeDescription")} />
          <FormField label="Cash value optional USD" name="prizeCashValue" type="number" min={0} defaultValue={(values.prizeCashValue as string) || (challenge?.prizeCashValueCents ? (challenge.prizeCashValueCents / 100).toString() : "")} error={firstError(state.errors, "prizeCashValue")} />
          <TextAreaField label="Recognition description optional" name="recognitionDescription" defaultValue={valueFor(values, challenge, "recognitionDescription")} error={firstError(state.errors, "recognitionDescription")} />
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold tracking-tight text-ink">Rubric</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {rubricDefaults.map((item) => {
            const existing = rubric.find((entry) => entry.label === item.label);
            return (
              <FormField
                key={item.label}
                label={item.label}
                name={`rubric-${slugify(item.label)}`}
                type="number"
                min={0}
                max={100}
                defaultValue={String(existing?.points ?? item.points)}
              />
            );
          })}
        </div>
        {firstError(state.errors, "rubric") ? <p className="mt-3 text-sm text-rose-600">{firstError(state.errors, "rubric")}</p> : null}
      </Card>

      <Card>
        <h2 className="text-xl font-semibold tracking-tight text-ink">Safety Checkboxes</h2>
        <div className="mt-5 space-y-3">
          <CheckboxField name="privateDataSafe" label="This challenge does not ask students to share private personal data." defaultChecked={Boolean(values.privateDataSafe)} error={firstError(state.errors, "privateDataSafe")} />
          <CheckboxField name="dangerousSafe" label="This challenge does not require dangerous, illegal, medical, financial, or adult content." defaultChecked={Boolean(values.dangerousSafe)} error={firstError(state.errors, "dangerousSafe")} />
          <CheckboxField name="laborSafe" label="This challenge does not require unpaid production labor from minors." defaultChecked={Boolean(values.laborSafe)} error={firstError(state.errors, "laborSafe")} />
          <CheckboxField name="doableSafe" label="This challenge can reasonably be completed as a student competition." defaultChecked={Boolean(values.doableSafe)} error={firstError(state.errors, "doableSafe")} />
          <CheckboxField name="reviewSafe" label="I understand SolveSprint may reject or request edits to this challenge." defaultChecked={Boolean(values.reviewSafe)} error={firstError(state.errors, "reviewSafe")} />
        </div>
      </Card>
      <SubmitButton pendingText="Submitting for review...">
        {challenge ? "Submit edits for review" : "Submit challenge for review"}
      </SubmitButton>
    </form>
  );
}
