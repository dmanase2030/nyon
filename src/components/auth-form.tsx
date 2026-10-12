"use client";

import { useActionState } from "react";
import type { FormState } from "@/lib/actions/auth";
import { Alert, Button } from "@/components/ui";

export function AuthForm({
  action,
  submitLabel,
  children,
}: {
  action: (state: FormState, form: FormData) => Promise<FormState>;
  submitLabel: string;
  children: React.ReactNode;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  return (
    <form action={formAction} className="space-y-4" noValidate>
      {state?.error ? <Alert>{state.error}</Alert> : null}
      {state?.message ? <Alert kind="info">{state.message}</Alert> : null}
      {children}
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Working…" : submitLabel}
      </Button>
    </form>
  );
}
