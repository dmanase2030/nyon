import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/env";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-12">
      <Link href="/" className="mb-8 text-sm font-semibold tracking-[0.2em]">
        NOVYX
      </Link>
      <div className="w-full max-w-sm rounded-lg border border-border bg-surface p-6">
        {!isSupabaseConfigured ? (
          <p role="status" className="mb-4 rounded-md border border-border px-3 py-2 text-xs text-muted">
            Supabase is not connected yet, so these forms can&apos;t create or sign in to accounts.
          </p>
        ) : null}
        {children}
      </div>
    </div>
  );
}
