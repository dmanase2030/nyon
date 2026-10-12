export const dynamic = "force-dynamic";

import { MobileHeader, MobileNav, Sidebar } from "@/components/nav";
import { getSession } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/env";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, profile } = await getSession();
  const signedIn = Boolean(user);

  return (
    <div className="flex min-h-dvh">
      <Sidebar signedIn={signedIn} username={profile?.username} />
      <div className="flex min-w-0 flex-1 flex-col">
        <MobileHeader />
        {!isSupabaseConfigured ? (
          <div role="status" className="border-b border-border px-4 py-2 text-xs text-muted md:px-6">
            Supabase is not connected. Copy <code className="font-mono">.env.example</code> to{" "}
            <code className="font-mono">.env.local</code> and add your project keys to enable accounts.
          </div>
        ) : null}
        <MobileNav signedIn={signedIn} username={profile?.username} />
        <main className="mx-auto w-full max-w-3xl flex-1 pb-16 md:border-x md:border-border md:pb-0">{children}</main>
      </div>
    </div>
  );
}
