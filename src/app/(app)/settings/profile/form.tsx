"use client";

import { useActionState } from "react";
import { Alert, Button, Field, Input, Textarea } from "@/components/ui";
import { updateProfile } from "@/lib/actions/profile";

export function ProfileForm({ initial }: { initial: { display_name: string; bio: string; status: string } }) {
  const [state, action, pending] = useActionState(updateProfile, undefined);
  return (
    <form action={action} className="space-y-4 px-4 py-5 md:px-6">
      {state?.error ? <Alert>{state.error}</Alert> : null}
      {state?.message ? <Alert kind="info">{state.message}</Alert> : null}
      <Field label="Display name" htmlFor="display_name">
        <Input id="display_name" name="display_name" defaultValue={initial.display_name} maxLength={40} />
      </Field>
      <Field label="Status" htmlFor="status">
        <Input id="status" name="status" defaultValue={initial.status} maxLength={80} placeholder="Currently watching…" />
      </Field>
      <Field label="Bio" htmlFor="bio">
        <Textarea id="bio" name="bio" rows={4} defaultValue={initial.bio} maxLength={300} />
      </Field>
      <Button type="submit" disabled={pending}>
        {pending ? "Saving…" : "Save"}
      </Button>
    </form>
  );
}
