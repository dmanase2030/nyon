# NOVYX

A social journal for movies, anime and TV. Next.js, TypeScript, Tailwind and Supabase.

The full product spec is in [NOVYX_PROMPT.md](NOVYX_PROMPT.md).

## Status

| Phase | Scope | State |
|---|---|---|
| 1 | Auth, database, design system | **Done** |
| 2 | Profiles, customization, animated uploads | Next |
| 3 | Movies, anime, TV, reviews, tracking | Planned |
| 4 | Feed, friends, messaging, communities | Planned |
| 5 | Design Studio and themes | Planned |
| 6 | Badges, achievements, events | Planned |
| 7 | Admin badge designer and automation | Planned |
| 8 | Premium and Stripe | Planned |
| 9 | Admin and moderation | Planned |
| 10 | Testing, optimization, deployment | Planned |

Routes for later phases exist and say plainly that they aren't built yet, so navigation never dead-ends.

### What works in phase 1

- Sign up with a unique username, log in, log out, email verification, password reset, account deletion
- Sessions refreshed in middleware; signed-out users are sent to `/login` from private pages
- Public profiles at `/@username` with display name, bio, status and posts
- Profile editing at `/settings/profile`
- A working text feed at `/home`: post, list, delete (author or moderators)
- Dark (default) and light themes, desktop sidebar, mobile bottom nav, reduced-motion support
- Database: profiles, settings, posts, audit log, site settings, feature flags, all with row-level security
- Server-side guards: users can't change their own role or verification; only the owner can grant or revoke owner; role changes are audit-logged; posting is rate limited

## Setup

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor, run `supabase/migrations/0001_phase1_core.sql`.
3. Under Authentication → URL Configuration, set the Site URL to your app URL and add `http://localhost:3000/**` to redirect URLs.
4. Copy the env file and fill in the project URL and anon key:

   ```bash
   cp .env.example .env.local
   ```

5. Run it:

   ```bash
   npm install
   npm run dev
   ```

6. Sign up, then make yourself the owner in the SQL editor:

   ```sql
   update public.profiles set role = 'owner' where username = 'your_username';
   ```

## Layout

```
src/app/(auth)        login, register, password reset, email verification
src/app/(app)         everything with the sidebar
src/app/auth          OAuth/email callback, confirm, sign out route handlers
src/components        UI primitives, nav, theme toggle
src/lib               Supabase clients, session helper, validation, server actions
src/middleware.ts     session refresh, route protection, /@username rewrite
supabase/migrations   SQL schema
```
