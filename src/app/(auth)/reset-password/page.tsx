import { AuthForm } from "@/components/auth-form";
import { Field, Input } from "@/components/ui";
import { updatePassword } from "@/lib/actions/auth";

export const metadata = { title: "Set new password" };

export default function ResetPasswordPage() {
  return (
    <>
      <h1 className="text-base font-semibold">Set a new password</h1>
      <p className="mb-5 mt-1 text-sm text-muted">Choose something at least 8 characters long.</p>
      <AuthForm action={updatePassword} submitLabel="Update password">
        <Field label="New password" htmlFor="password">
          <Input id="password" name="password" type="password" autoComplete="new-password" required minLength={8} />
        </Field>
        <Field label="Confirm password" htmlFor="confirm">
          <Input id="confirm" name="confirm" type="password" autoComplete="new-password" required minLength={8} />
        </Field>
      </AuthForm>
    </>
  );
}
