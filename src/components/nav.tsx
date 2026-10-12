"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Clapperboard,
  Compass,
  Home,
  Library,
  MessageSquare,
  Settings,
  Sparkles,
  Tv,
  User,
  Users,
} from "lucide-react";
import { cn } from "@/components/ui";
import { ThemeToggle } from "@/components/theme-toggle";

type Item = { href: string; label: string; icon: typeof Home; auth?: boolean };

export function navItems(username?: string | null): Item[] {
  return [
    { href: "/home", label: "Home", icon: Home, auth: true },
    { href: "/explore", label: "Explore", icon: Compass },
    { href: "/movies", label: "Movies", icon: Clapperboard },
    { href: "/anime", label: "Anime", icon: Sparkles },
    { href: "/tv", label: "TV Shows", icon: Tv },
    { href: "/collections", label: "Collections", icon: Library },
    { href: "/communities", label: "Communities", icon: Users },
    { href: "/messages", label: "Messages", icon: MessageSquare, auth: true },
    { href: "/notifications", label: "Notifications", icon: Bell, auth: true },
    { href: username ? `/@${username}` : "/login", label: "Profile", icon: User, auth: true },
    { href: "/settings", label: "Settings", icon: Settings, auth: true },
  ];
}

function isActive(pathname: string, href: string) {
  if (href.startsWith("/@")) return pathname.startsWith("/u/") || pathname.startsWith("/@");
  return pathname === href || pathname.startsWith(href + "/");
}

export function Sidebar({ username, signedIn }: { username?: string | null; signedIn: boolean }) {
  const pathname = usePathname();
  const items = navItems(username).filter((i) => signedIn || !i.auth);

  return (
    <aside className="sticky top-0 hidden h-dvh w-56 shrink-0 flex-col border-r border-border bg-sidebar md:flex">
      <div className="flex h-14 items-center justify-between px-4">
        <Link href={signedIn ? "/home" : "/"} className="text-sm font-semibold tracking-[0.2em]">
          NOVYX
        </Link>
        <ThemeToggle />
      </div>
      <nav aria-label="Main" className="flex-1 space-y-0.5 overflow-y-auto px-2 py-2">
        {items.map(({ href, label, icon: Icon }) => {
          const active = isActive(pathname, href);
          return (
            <Link
              key={label}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex h-8 items-center gap-3 rounded-md px-2.5 text-sm transition-colors",
                active ? "bg-hover font-medium text-fg" : "text-muted hover:bg-hover hover:text-fg",
              )}
            >
              <Icon size={16} strokeWidth={1.75} />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-border p-3">
        {signedIn ? (
          <form action="/auth/signout" method="post">
            <button className="h-8 w-full rounded-md px-2.5 text-left text-sm text-muted hover:bg-hover hover:text-fg">
              Sign out
            </button>
          </form>
        ) : (
          <div className="flex gap-2">
            <Link href="/login" className="flex h-8 flex-1 items-center justify-center rounded-md border border-border text-xs hover:bg-hover">
              Log in
            </Link>
            <Link href="/register" className="flex h-8 flex-1 items-center justify-center rounded-md bg-accent text-xs font-medium text-accent-fg hover:opacity-90">
              Sign up
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}

export function MobileNav({ username, signedIn }: { username?: string | null; signedIn: boolean }) {
  const pathname = usePathname();
  const all = navItems(username);
  const pick = signedIn
    ? ["Home", "Explore", "Messages", "Notifications", "Profile"]
    : ["Explore", "Movies", "Anime", "TV Shows", "Profile"];
  const items = pick.map((l) => all.find((i) => i.label === l)!).filter(Boolean);

  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-40 flex h-14 border-t border-border bg-sidebar pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      {items.map(({ href, label, icon: Icon }) => {
        const active = isActive(pathname, href);
        return (
          <Link
            key={label}
            href={href}
            aria-label={label}
            aria-current={active ? "page" : undefined}
            className={cn("flex flex-1 items-center justify-center", active ? "text-fg" : "text-muted")}
          >
            <Icon size={20} strokeWidth={1.75} />
          </Link>
        );
      })}
    </nav>
  );
}

export function MobileHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-12 items-center justify-between border-b border-border bg-bg px-4 md:hidden">
      <Link href="/" className="text-sm font-semibold tracking-[0.2em]">
        NOVYX
      </Link>
      <ThemeToggle />
    </header>
  );
}
