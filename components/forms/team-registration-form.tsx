"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { createTeamAction } from "@/lib/actions";
import { emptyState, firstError } from "@/lib/forms";
import { Button, CheckboxField, FormField, Notice } from "@/components/ui";
import { SubmitButton } from "@/components/submit-button";

export function TeamRegistrationForm({
  slug,
  minTeamSize,
  maxTeamSize,
  leadName,
  leadEmail
}: {
  slug: string;
  minTeamSize: number;
  maxTeamSize: number;
  leadName: string;
  leadEmail: string;
}) {
  const [state, formAction] = useFormState(createTeamAction, emptyState);
  const values = state.values || {};
  const teammateNames = (values.teammateName as string[] | undefined) || [];
  const teammateEmails = (values.teammateEmail as string[] | undefined) || [];
  const [inviteRows, setInviteRows] = useState(Math.max(0, minTeamSize - 1, teammateNames.length, teammateEmails.length));
  const maxInviteRows = Math.max(0, maxTeamSize - 1);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="slug" value={slug} />
      {state.message ? <Notice tone="error">{state.message}</Notice> : null}
      <FormField label="Team name" name="teamName" defaultValue={(values.teamName as string) || ""} error={firstError(state.errors, "teamName")} />
      <div className="rounded-2xl border border-green/50 bg-mint/60 p-4">
        <p className="text-sm font-semibold text-ink">Team lead</p>
        <p className="mt-1 text-sm text-slate-700">
          {leadName} - {leadEmail}
        </p>
        <p className="mt-2 text-xs text-emerald-900">Team leads are automatically accepted participants.</p>
      </div>
      <div>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-800">Invite teammates</p>
            <p className="mt-1 text-xs text-slate-500">Pending teammates do not count as participants until they accept.</p>
          </div>
          {inviteRows < maxInviteRows ? (
            <Button type="button" variant="secondary" className="px-3 py-2" onClick={() => setInviteRows((count) => count + 1)}>
              Add teammate
            </Button>
          ) : null}
        </div>
        <div className="mt-4 space-y-3">
          {Array.from({ length: inviteRows }).map((_, index) => (
            <div key={index} className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_auto]">
              <FormField label="Name" name="teammateName" defaultValue={teammateNames[index] || ""} />
              <FormField label="Email" name="teammateEmail" type="email" defaultValue={teammateEmails[index] || ""} error={index === 0 ? firstError(state.errors, "teammateEmail") : undefined} />
              <Button type="button" variant="ghost" className="self-end px-3 py-3" onClick={() => setInviteRows((count) => Math.max(0, count - 1))}>
                Remove
              </Button>
            </div>
          ))}
          {inviteRows === 0 ? <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-600">No teammates added yet.</p> : null}
        </div>
      </div>
      <CheckboxField name="invitePermission" label="I have permission to invite these teammates." defaultChecked={Boolean(values.invitePermission)} error={firstError(state.errors, "invitePermission")} />
      <CheckboxField name="acceptInviteRule" label="I understand invited teammates must accept before they officially join." defaultChecked={Boolean(values.acceptInviteRule)} error={firstError(state.errors, "acceptInviteRule")} />
      <CheckboxField name="acceptedCountsRule" label="I understand only accepted teammates count as participants." defaultChecked={Boolean(values.acceptedCountsRule)} error={firstError(state.errors, "acceptedCountsRule")} />
      <CheckboxField name="agreeRules" label="I agree to the challenge rules." defaultChecked={Boolean(values.agreeRules)} error={firstError(state.errors, "agreeRules")} />
      <SubmitButton pendingText="Registering team...">Register team</SubmitButton>
    </form>
  );
}
