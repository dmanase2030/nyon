"use client";

import { useActionState } from "react";
import { Alert, Button, Field, Input } from "@/components/ui";
import { deleteAccount } from "@/lib/actions/profile";

export function DeleteAccount({ username }: { username: string }) {
  const [state, action, pending] = useActionState(deleteAccount, undefined);
  return (
    <form action={action} className="space-y-3">
      {state?.error ? <Alert>{state.error}</Alert> : null}
      <Field label={`Type ${username} to confirm`} htmlFor="confirm">
        <Input id="confirm" name="confirm" autoComplete="off" />
      </Field>
      <Button type="submit" variant="danger" disabled={pending}>
        {pending ? "Deleting…" : "Delete account permanently"}
      </Button>
    </form>
  );
}
