import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck } from "lucide-react";
import { Avatar } from "@/components/avatar";
import { buttonClass, EmptyState } from "@/components/ui";
import { getSession, type Profile } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/env";
import { timeAgo } from "@/lib/format";
import { createClient } from "@/lib/supabase/server";

type Params = { params: Promise<{ username: string }> };

export async function generateMetadata({ params }: Params) {
  const { username } = await params;
  return { title: `@${username}` };
}

export default async function ProfilePage({ params }: Params) {
  const { username } = await params;
  if (!isSupabaseConfigured) notFound();

  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, username, display_name, bio, status, avatar_url, banner_url, role, is_verified, created_at")
    .eq("username", username.toLowerCase())
    .maybeSingle<Profile>();
  if (!profile) notFound();

  const { user } = await getSession();
  const isMe = user?.id === profile.id;
  const name = profile.display_name || profile.username;

  const [{ count: postCount }, { data: posts }] = await Promise.all([
    supabase.from("posts").select("id", { count: "exact", head: true }).eq("author_id", profile.id),
    supabase.from("posts").select("id, body, created_at").eq("author_id", profile.id).order("created_at", { ascending: false }).limit(20),
  ]);

  return (
    <>
      <div className="h-32 border-b border-border bg-hover md:h-44">
        {profile.banner_url ? (
          // eslint-disable-next-line @next/next/no-img-element -- banners may be animated
          <img src={profile.banner_url} alt="" className="h-full w-full object-cover" />
        ) : null}
      </div>
      <div className="border-b border-border px-4 pb-4 md:px-6">
        <div className="-mt-10 flex items-end justify-between">
          <Avatar src={profile.avatar_url} name={name} size={80} className="border-4 border-bg" />
          {isMe ? (
            <Link href="/settings/profile" className={buttonClass("secondary", "sm")}>
              Edit profile
            </Link>
          ) : null}
        </div>
        <h1 className="mt-3 flex items-center gap-1.5 text-lg font-semibold">
          {name}
          {profile.is_verified ? <BadgeCheck size={16} aria-label="Verified" /> : null}
        </h1>
        <p className="text-sm text-muted">@{profile.username}</p>
        {profile.status ? <p className="mt-2 text-sm text-muted">{profile.status}</p> : null}
        {profile.bio ? <p className="mt-3 whitespace-pre-wrap text-sm leading-6">{profile.bio}</p> : null}
        <p className="mt-3 text-xs text-muted">
          <span className="text-fg">{postCount ?? 0}</span> posts · Joined{" "}
          {new Date(profile.created_at).toLocaleDateString(undefined, { month: "long", year: "numeric" })}
        </p>
      </div>
      <nav aria-label="Profile sections" className="flex border-b border-border px-4 text-sm md:px-6">
        <span className="border-b-2 border-fg py-2.5 font-medium">Activity</span>
        <Link href={`/@${profile.username}/badges`} className="ml-5 py-2.5 text-muted hover:text-fg">
          Badges
        </Link>
      </nav>
      {!posts?.length ? (
        <EmptyState title="No activity yet" />
      ) : (
        <ul>
          {posts.map((p) => (
            <li key={p.id} className="border-b border-border px-4 py-3 md:px-6">
              <time dateTime={p.created_at} className="text-xs text-muted">
                {timeAgo(p.created_at)}
              </time>
              <p className="mt-0.5 whitespace-pre-wrap break-words text-sm leading-6">{p.body}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
