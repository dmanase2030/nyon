import Link from "next/link";
import { redirect } from "next/navigation";
import { buttonClass, PageHeader } from "@/components/ui";
import { getSession } from "@/lib/auth";
import { DeleteAccount } from "./delete";

export const metadata = { title: "Security" };

export default async function SecurityPage() {
  const { user, profile } = await getSession();
  if (!user || !profile) redirect("/login?next=/settings/security");
  return (
    <>
      <PageHeader title="Security" />
      <section className="border-b border-border px-4 py-5 md:px-6">
        <h2 className="text-sm font-medium">Email</h2>
        <p className="mt-1 text-sm text-muted">{user.email}</p>
      </section>
      <section className="border-b border-border px-4 py-5 md:px-6">
        <h2 className="text-sm font-medium">Password</h2>
        <p className="mb-3 mt-1 text-sm text-muted">Change your password.</p>
        <Link href="/reset-password" className={buttonClass("secondary", "sm")}>
          Change password
        </Link>
      </section>
      <section className="px-4 py-5 md:px-6">
        <h2 className="text-sm font-medium text-danger">Delete account</h2>
        <p className="mb-3 mt-1 text-sm text-muted">Removes your profile, posts and all other data. This can&apos;t be undone.</p>
        <DeleteAccount username={profile.username} />
      </section>
    </>
  );
}
