import { redirect } from "next/navigation";
import { PageHeader } from "@/components/ui";
import { getSession } from "@/lib/auth";
import { ProfileForm } from "./form";

export const metadata = { title: "Profile settings" };

export default async function ProfileSettingsPage() {
  const { profile } = await getSession();
  if (!profile) redirect("/login?next=/settings/profile");
  return (
    <>
      <PageHeader title="Profile" description={`Shown on novyx/@${profile.username}`} />
      <ProfileForm
        initial={{ display_name: profile.display_name ?? "", bio: profile.bio ?? "", status: profile.status ?? "" }}
      />
    </>
  );
}
