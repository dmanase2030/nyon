import Link from "next/link";
import { AuthForm } from "@/components/auth-form";
import { Field, Input } from "@/components/ui";
import { requestPasswordReset } from "@/lib/actions/auth";

export const metadata = { title: "Reset password" };

export default function ForgotPasswordPage() {
  return (
    <>
      <h1 className="text-base font-semibold">Reset your password</h1>
      <p className="mb-5 mt-1 text-sm text-muted">We&apos;ll email you a link to set a new one.</p>
      <AuthForm action={requestPasswordReset} submitLabel="Send reset link">
        <Field label="Email" htmlFor="email">
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </Field>
      </AuthForm>
      <p className="mt-5 text-center text-sm text-muted">
        <Link href="/login" className="hover:text-fg">
          Back to log in
        </Link>
      </p>
    </>
  );
}
