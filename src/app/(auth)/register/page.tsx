import Link from "next/link";
import { AuthForm } from "@/components/auth-form";
import { Field, Input } from "@/components/ui";
import { signUp } from "@/lib/actions/auth";

export const metadata = { title: "Create account" };

export default function RegisterPage() {
  return (
    <>
      <h1 className="text-base font-semibold">Create your account</h1>
      <p className="mb-5 mt-1 text-sm text-muted">Your profile will live at novyx/@username.</p>
      <AuthForm action={signUp} submitLabel="Create account">
        <Field label="Username" htmlFor="username">
          <Input id="username" name="username" autoComplete="username" required minLength={3} maxLength={20} pattern="[a-z0-9_]{3,20}" placeholder="lowercase, numbers, _" />
        </Field>
        <Field label="Display name" htmlFor="display_name">
          <Input id="display_name" name="display_name" maxLength={40} autoComplete="nickname" />
        </Field>
        <Field label="Email" htmlFor="email">
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </Field>
        <Field label="Password" htmlFor="password">
          <Input id="password" name="password" type="password" autoComplete="new-password" required minLength={8} />
        </Field>
      </AuthForm>
      <p className="mt-5 text-center text-sm text-muted">
        Have an account?{" "}
        <Link href="/login" className="text-fg hover:underline">
          Log in
        </Link>
      </p>
    </>
  );
}
