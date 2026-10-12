"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import type { FormState } from "@/lib/actions/auth";

const body = z.string().trim().min(1, "Write something first.").max(1000, "Posts are limited to 1000 characters.");

export async function createPost(_: FormState, form: FormData): Promise<FormState> {
  const parsed = body.safeParse(form.get("body"));
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Sign in to post." };

  const { error } = await supabase.from("posts").insert({ author_id: user.id, body: parsed.data });
  if (error) return { error: error.message.includes("rate") ? "You're posting too fast. Wait a moment." : "Couldn't publish that post." };
  revalidatePath("/home");
  return { message: "posted" };
}

export async function deletePost(form: FormData) {
  const id = z.string().uuid().safeParse(form.get("id"));
  if (!id.success) return;
  const supabase = await createClient();
  // RLS only lets the author (or staff) delete.
  await supabase.from("posts").delete().eq("id", id.data);
  revalidatePath("/home");
}
