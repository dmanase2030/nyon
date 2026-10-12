import { cache } from "react";
import { isSupabaseConfigured } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";

export type Profile = {
  id: string;
  username: string;
  display_name: string | null;
  bio: string | null;
  status: string | null;
  avatar_url: string | null;
  banner_url: string | null;
  role: "owner" | "admin" | "moderator" | "support" | "user";
  is_verified: boolean;
  created_at: string;
};

/** The signed-in user's auth record and profile row. Cached per request. */
export const getSession = cache(async () => {
  if (!isSupabaseConfigured) return { user: null, profile: null as Profile | null };
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { user: null, profile: null as Profile | null };
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, username, display_name, bio, status, avatar_url, banner_url, role, is_verified, created_at")
    .eq("id", user.id)
    .maybeSingle<Profile>();
  return { user, profile };
});
