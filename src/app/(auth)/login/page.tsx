import Link from "next/link";
import { AuthForm } from "@/components/auth-form";
import { Alert, Field, Input } from "@/components/ui";
import { signIn } from "@/lib/actions/auth";

export const metadata = { title: "Log in" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string; error?: string }> }) {
  const { next, error } = await searchParams;
  return (
    <>
      <h1 className="text-base font-semibold">Log in</h1>
      <p className="mb-5 mt-1 text-sm text-muted">Welcome back.</p>
      {error === "link" ? (
        <div className="mb-4">
          <Alert>That link is invalid or has expired.</Alert>
        </div>
      ) : null}
      <AuthForm action={signIn} submitLabel="Log in">
        <input type="hidden" name="next" value={next ?? "/home"} />
        <Field label="Email" htmlFor="email">
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </Field>
        <Field label="Password" htmlFor="password">
          <Input id="password" name="password" type="password" autoComplete="current-password" required />
        </Field>
        <div className="text-right">
          <Link href="/forgot-password" className="text-xs text-muted hover:text-fg">
            Forgot password?
          </Link>
        </div>
      </AuthForm>
      <p className="mt-5 text-center text-sm text-muted">
        New here?{" "}
        <Link href="/register" className="text-fg hover:underline">
          Create an account
        </Link>
      </p>
    </>
  );
}
