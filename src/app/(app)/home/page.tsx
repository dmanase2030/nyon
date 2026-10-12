import Link from "next/link";
import { Avatar } from "@/components/avatar";
import { EmptyState, PageHeader } from "@/components/ui";
import { deletePost } from "@/lib/actions/posts";
import { getSession } from "@/lib/auth";
import { timeAgo } from "@/lib/format";
import { createClient } from "@/lib/supabase/server";
import { Composer } from "./composer";

export const metadata = { title: "Home" };

type FeedPost = {
  id: string;
  body: string;
  created_at: string;
  author_id: string;
  author: { username: string; display_name: string | null; avatar_url: string | null; is_verified: boolean } | null;
};

export default async function HomePage() {
  const { user, profile } = await getSession();
  const supabase = await createClient();
  const { data: posts, error } = await supabase
    .from("posts")
    .select("id, body, created_at, author_id, author:profiles!posts_author_id_fkey(username, display_name, avatar_url, is_verified)")
    .order("created_at", { ascending: false })
    .limit(50)
    .returns<FeedPost[]>();

  const canModerate = profile && ["owner", "admin", "moderator"].includes(profile.role);

  return (
    <>
      <PageHeader title="Home" />
      <Composer />
      {error ? (
        <EmptyState title="Couldn't load the feed" body="The database didn't answer. Check that the schema in supabase/migrations has been applied." />
      ) : !posts?.length ? (
        <EmptyState title="Nothing here yet" body="Write the first post, or find people to follow on Explore." />
      ) : (
        <ul>
          {posts.map((p) => {
            const name = p.author?.display_name || p.author?.username || "unknown";
            return (
              <li key={p.id} className="flex gap-3 border-b border-border px-4 py-3 md:px-6">
                <Avatar src={p.author?.avatar_url} name={name} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-1.5 text-sm">
                    <Link href={`/@${p.author?.username}`} className="truncate font-medium hover:underline">
                      {name}
                    </Link>
                    <span className="truncate text-muted">@{p.author?.username}</span>
                    <span className="text-muted">·</span>
                    <time dateTime={p.created_at} className="shrink-0 text-muted">
                      {timeAgo(p.created_at)}
                    </time>
                    {(p.author_id === user?.id || canModerate) && (
                      <form action={deletePost} className="ml-auto">
                        <input type="hidden" name="id" value={p.id} />
                        <button className="text-xs text-muted hover:text-danger" aria-label="Delete post">
                          Delete
                        </button>
                      </form>
                    )}
                  </div>
                  <p className="mt-0.5 whitespace-pre-wrap break-words text-sm leading-6">{p.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
