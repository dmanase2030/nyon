import Link from "next/link";
import { AuthForm } from "@/components/auth-form";
import { resendVerification } from "@/lib/actions/auth";

export const metadata = { title: "Verify your email" };

export default async function VerifyEmailPage({ searchParams }: { searchParams: Promise<{ email?: string }> }) {
  const { email } = await searchParams;
  return (
    <>
      <h1 className="text-base font-semibold">Check your inbox</h1>
      <p className="mb-5 mt-1 text-sm text-muted">
        We sent a verification link{email ? <> to <span className="text-fg">{email}</span></> : null}. Open it to finish
        creating your account.
      </p>
      {email ? (
        <AuthForm action={resendVerification} submitLabel="Resend email">
          <input type="hidden" name="email" value={email} />
        </AuthForm>
      ) : null}
      <p className="mt-5 text-center text-sm text-muted">
        <Link href="/login" className="hover:text-fg">
          Back to log in
        </Link>
      </p>
    </>
  );
}
