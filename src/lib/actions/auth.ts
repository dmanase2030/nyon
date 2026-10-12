"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isSupabaseConfigured, SITE_URL } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";
import { emailSchema, passwordSchema, RESERVED_USERNAMES, usernameSchema } from "@/lib/validation";

export type FormState = { error?: string; message?: string } | undefined;

const NOT_CONFIGURED = "Accounts are unavailable until Supabase is connected.";

async function origin() {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  return host ? `${proto}://${host}` : SITE_URL;
}

function safeNext(next: FormDataEntryValue | null) {
  const n = typeof next === "string" ? next : "";
  return n.startsWith("/") && !n.startsWith("//") ? n : "/home";
}

export async function signIn(_: FormState, form: FormData): Promise<FormState> {
  if (!isSupabaseConfigured) return { error: NOT_CONFIGURED };
  const email = emailSchema.safeParse(form.get("email"));
  const password = String(form.get("password") ?? "");
  if (!email.success || !password) return { error: "Enter your email and password." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email: email.data, password });
  if (error) {
    if (error.code === "email_not_confirmed") return { error: "Verify your email before signing in. Check your inbox." };
    return { error: "Email or password is incorrect." };
  }
  redirect(safeNext(form.get("next")));
}

export async function signUp(_: FormState, form: FormData): Promise<FormState> {
  if (!isSupabaseConfigured) return { error: NOT_CONFIGURED };

  const username = usernameSchema.safeParse(form.get("username"));
  if (!username.success) return { error: username.error.issues[0].message };
  if (RESERVED_USERNAMES.has(username.data)) return { error: "That username is reserved." };
  const email = emailSchema.safeParse(form.get("email"));
  if (!email.success) return { error: email.error.issues[0].message };
  const password = passwordSchema.safeParse(form.get("password"));
  if (!password.success) return { error: password.error.issues[0].message };

  const supabase = await createClient();
  const { data: available, error: rpcError } = await supabase.rpc("username_available", { name: username.data });
  if (rpcError) return { error: "Couldn't check that username. Has the database schema been applied?" };
  if (!available) return { error: "That username is taken." };

  const { data, error } = await supabase.auth.signUp({
    email: email.data,
    password: password.data,
    options: {
      data: { username: username.data, display_name: String(form.get("display_name") ?? "").trim() || username.data },
      emailRedirectTo: `${await origin()}/auth/callback?next=/home`,
    },
  });
  if (error) return { error: error.message };

  // With email confirmation off, Supabase returns a session right away.
  if (data.session) redirect("/home");
  redirect(`/verify-email?email=${encodeURIComponent(email.data)}`);
}

export async function requestPasswordReset(_: FormState, form: FormData): Promise<FormState> {
  if (!isSupabaseConfigured) return { error: NOT_CONFIGURED };
  const email = emailSchema.safeParse(form.get("email"));
  if (!email.success) return { error: email.error.issues[0].message };

  const supabase = await createClient();
  await supabase.auth.resetPasswordForEmail(email.data, {
    redirectTo: `${await origin()}/auth/callback?next=/reset-password`,
  });
  // Same answer whether or not the account exists, so emails can't be probed.
  return { message: "If an account uses that email, a reset link is on its way." };
}

export async function updatePassword(_: FormState, form: FormData): Promise<FormState> {
  if (!isSupabaseConfigured) return { error: NOT_CONFIGURED };
  const password = passwordSchema.safeParse(form.get("password"));
  if (!password.success) return { error: password.error.issues[0].message };
  if (form.get("password") !== form.get("confirm")) return { error: "Passwords don't match." };

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Your reset link has expired. Request a new one." };
  const { error } = await supabase.auth.updateUser({ password: password.data });
  if (error) return { error: error.message };
  redirect("/home");
}

export async function resendVerification(_: FormState, form: FormData): Promise<FormState> {
  if (!isSupabaseConfigured) return { error: NOT_CONFIGURED };
  const email = emailSchema.safeParse(form.get("email"));
  if (!email.success) return { error: email.error.issues[0].message };
  const supabase = await createClient();
  const { error } = await supabase.auth.resend({
    type: "signup",
    email: email.data,
    options: { emailRedirectTo: `${await origin()}/auth/callback?next=/home` },
  });
  if (error) return { error: error.message };
  return { message: "Sent. Check your inbox." };
}
