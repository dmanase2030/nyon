"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import type { FormState } from "@/lib/actions/auth";

const profileSchema = z.object({
  display_name: z.string().trim().max(40, "Display name is limited to 40 characters."),
  bio: z.string().trim().max(300, "Bio is limited to 300 characters."),
  status: z.string().trim().max(80, "Status is limited to 80 characters."),
});

export async function updateProfile(_: FormState, form: FormData): Promise<FormState> {
  const parsed = profileSchema.safeParse({
    display_name: form.get("display_name") ?? "",
    bio: form.get("bio") ?? "",
    status: form.get("status") ?? "",
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Your session ended. Sign in again." };

  const { data, error } = await supabase
    .from("profiles")
    .update({
      display_name: parsed.data.display_name || null,
      bio: parsed.data.bio || null,
      status: parsed.data.status || null,
    })
    .eq("id", user.id)
    .select("username")
    .single();
  if (error) return { error: "Couldn't save your profile." };

  revalidatePath(`/u/${data.username}`);
  revalidatePath("/settings/profile");
  return { message: "Saved." };
}

export async function deleteAccount(_: FormState, form: FormData): Promise<FormState> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Your session ended. Sign in again." };

  const { data: profile } = await supabase.from("profiles").select("username").eq("id", user.id).single();
  if (!profile || form.get("confirm") !== profile.username) {
    return { error: "Type your username exactly to confirm." };
  }
  const { error } = await supabase.rpc("delete_my_account");
  if (error) return { error: "Couldn't delete your account." };
  await supabase.auth.signOut();
  redirect("/");
}
