-- NOVYX phase 1: profiles, roles, posts, settings, audit log.
-- Run in the Supabase SQL editor, or with `supabase db push`.

create extension if not exists citext;

-- ---------------------------------------------------------------
-- Roles
-- ---------------------------------------------------------------
do $$ begin
  create type public.app_role as enum ('owner', 'admin', 'moderator', 'support', 'user');
exception when duplicate_object then null; end $$;

-- ---------------------------------------------------------------
-- Profiles (one per auth user)
-- ---------------------------------------------------------------
create table if not exists public.profiles (
  id            uuid primary key references auth.users (id) on delete cascade,
  username      citext not null unique check (username ~ '^[a-z0-9_]{3,20}$'),
  display_name  text check (char_length(display_name) <= 40),
  bio           text check (char_length(bio) <= 300),
  status        text check (char_length(status) <= 80),
  avatar_url    text,
  banner_url    text,
  background_url text,
  role          public.app_role not null default 'user',
  is_verified   boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create table if not exists public.user_settings (
  user_id       uuid primary key references public.profiles (id) on delete cascade,
  theme         text not null default 'dark' check (theme in ('dark', 'light', 'system')),
  reduce_motion boolean not null default false,
  profile_public boolean not null default true,
  allow_messages text not null default 'everyone' check (allow_messages in ('everyone', 'friends', 'nobody')),
  updated_at    timestamptz not null default now()
);

-- ---------------------------------------------------------------
-- Posts
-- ---------------------------------------------------------------
create table if not exists public.posts (
  id         uuid primary key default gen_random_uuid(),
  author_id  uuid not null,
  body       text not null check (char_length(btrim(body)) between 1 and 1000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint posts_author_id_fkey foreign key (author_id) references public.profiles (id) on delete cascade
);
create index if not exists posts_created_at_idx on public.posts (created_at desc);
create index if not exists posts_author_created_idx on public.posts (author_id, created_at desc);

-- ---------------------------------------------------------------
-- Admin tables
-- ---------------------------------------------------------------
create table if not exists public.admin_audit_logs (
  id         bigint generated always as identity primary key,
  actor_id   uuid references public.profiles (id) on delete set null,
  action     text not null,
  target     text,
  details    jsonb not null default '{}',
  created_at timestamptz not null default now()
);
create index if not exists admin_audit_logs_created_idx on public.admin_audit_logs (created_at desc);

create table if not exists public.site_settings (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz not null default now()
);
insert into public.site_settings (key, value) values
  ('site_name', '"NOVYX"'),
  ('registration_open', 'true'),
  ('maintenance_mode', 'false')
on conflict (key) do nothing;

create table if not exists public.feature_flags (
  key        text primary key,
  enabled    boolean not null default false,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------
create or replace function public.current_role() returns public.app_role
language sql stable security definer set search_path = public as $$
  select coalesce((select role from public.profiles where id = auth.uid()), 'user'::public.app_role)
$$;

create or replace function public.is_staff(min_role public.app_role default 'moderator') returns boolean
language sql stable security definer set search_path = public as $$
  -- enum order: owner < admin < moderator < support < user, so "at least moderator" means <= 'moderator'
  select auth.uid() is not null and public.current_role() <= min_role
$$;

create or replace function public.touch_updated_at() returns trigger
language plpgsql as $$ begin new.updated_at = now(); return new; end $$;

drop trigger if exists profiles_touch on public.profiles;
create trigger profiles_touch before update on public.profiles for each row execute function public.touch_updated_at();
drop trigger if exists posts_touch on public.posts;
create trigger posts_touch before update on public.posts for each row execute function public.touch_updated_at();

-- Username check used by the sign-up form (callable before login).
create or replace function public.username_available(name text) returns boolean
language sql stable security definer set search_path = public as $$
  select name ~ '^[a-z0-9_]{3,20}$'
     and not exists (select 1 from public.profiles where username = name::citext)
$$;
grant execute on function public.username_available(text) to anon, authenticated;

-- Create the profile row when a user signs up.
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
declare
  uname text := lower(coalesce(new.raw_user_meta_data ->> 'username', ''));
begin
  if uname !~ '^[a-z0-9_]{3,20}$' or exists (select 1 from public.profiles where username = uname::citext) then
    -- OAuth sign-ups or a race on the same name: fall back to a unique generated handle.
    uname := 'user_' || substr(replace(new.id::text, '-', ''), 1, 10);
  end if;
  insert into public.profiles (id, username, display_name)
  values (new.id, uname, nullif(left(new.raw_user_meta_data ->> 'display_name', 40), ''));
  insert into public.user_settings (user_id) values (new.id);
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- Users may not change their own role or verification. Only staff can, and only the owner
-- can grant or revoke owner.
create or replace function public.guard_profile_privileges() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then return new; end if; -- service role / SQL editor
  if new.role is distinct from old.role then
    if not public.is_staff('admin') then raise exception 'not allowed to change roles'; end if;
    if (new.role = 'owner' or old.role = 'owner') and public.current_role() <> 'owner' then
      raise exception 'only the owner can change owner privileges';
    end if;
    insert into public.admin_audit_logs (actor_id, action, target, details)
    values (auth.uid(), 'role.change', new.id::text, jsonb_build_object('from', old.role, 'to', new.role));
  end if;
  if new.is_verified is distinct from old.is_verified then
    if not public.is_staff('admin') then raise exception 'not allowed to change verification'; end if;
    insert into public.admin_audit_logs (actor_id, action, target, details)
    values (auth.uid(), 'verification.change', new.id::text, jsonb_build_object('to', new.is_verified));
  end if;
  if new.username is distinct from old.username and new.username !~ '^[a-z0-9_]{3,20}$' then
    raise exception 'invalid username';
  end if;
  return new;
end $$;

drop trigger if exists profiles_guard on public.profiles;
create trigger profiles_guard before update on public.profiles
  for each row execute function public.guard_profile_privileges();

-- Basic post rate limit: 10 posts per minute per user.
create or replace function public.rate_limit_posts() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if (select count(*) from public.posts
      where author_id = new.author_id and created_at > now() - interval '1 minute') >= 10 then
    raise exception 'rate limit: too many posts';
  end if;
  return new;
end $$;

drop trigger if exists posts_rate_limit on public.posts;
create trigger posts_rate_limit before insert on public.posts
  for each row execute function public.rate_limit_posts();

-- Self-service account deletion. Cascades to profile, settings and posts.
create or replace function public.delete_my_account() returns void
language plpgsql security definer set search_path = public, auth as $$
begin
  if auth.uid() is null then raise exception 'not signed in'; end if;
  if public.current_role() = 'owner' then raise exception 'transfer ownership before deleting the owner account'; end if;
  delete from auth.users where id = auth.uid();
end $$;
revoke all on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated;

-- ---------------------------------------------------------------
-- Row-level security
-- ---------------------------------------------------------------
alter table public.profiles         enable row level security;
alter table public.user_settings    enable row level security;
alter table public.posts            enable row level security;
alter table public.admin_audit_logs enable row level security;
alter table public.site_settings    enable row level security;
alter table public.feature_flags    enable row level security;

drop policy if exists "profiles are public" on public.profiles;
create policy "profiles are public" on public.profiles for select using (true);
drop policy if exists "users update own profile" on public.profiles;
create policy "users update own profile" on public.profiles for update
  using (id = auth.uid() or public.is_staff('admin')) with check (id = auth.uid() or public.is_staff('admin'));

drop policy if exists "own settings" on public.user_settings;
create policy "own settings" on public.user_settings for all
  using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists "posts are public" on public.posts;
create policy "posts are public" on public.posts for select using (true);
drop policy if exists "users create own posts" on public.posts;
create policy "users create own posts" on public.posts for insert to authenticated with check (author_id = auth.uid());
drop policy if exists "users edit own posts" on public.posts;
create policy "users edit own posts" on public.posts for update using (author_id = auth.uid()) with check (author_id = auth.uid());
drop policy if exists "author or staff delete posts" on public.posts;
create policy "author or staff delete posts" on public.posts for delete using (author_id = auth.uid() or public.is_staff('moderator'));

drop policy if exists "staff read audit logs" on public.admin_audit_logs;
create policy "staff read audit logs" on public.admin_audit_logs for select using (public.is_staff('admin'));

drop policy if exists "settings readable" on public.site_settings;
create policy "settings readable" on public.site_settings for select using (true);
drop policy if exists "owner edits settings" on public.site_settings;
create policy "owner edits settings" on public.site_settings for all
  using (public.current_role() = 'owner') with check (public.current_role() = 'owner');

drop policy if exists "flags readable" on public.feature_flags;
create policy "flags readable" on public.feature_flags for select using (true);
drop policy if exists "admins edit flags" on public.feature_flags;
create policy "admins edit flags" on public.feature_flags for all
  using (public.is_staff('admin')) with check (public.is_staff('admin'));

-- To make yourself the owner after signing up, run once in the SQL editor:
--   update public.profiles set role = 'owner' where username = 'your_username';
