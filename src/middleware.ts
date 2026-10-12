import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// Pages that need a signed-in user.
const PROTECTED = ["/home", "/messages", "/notifications", "/friends", "/watchlist", "/settings", "/studio", "/admin"];
// Pages a signed-in user should not see.
const GUEST_ONLY = ["/login", "/register", "/forgot-password"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public profile URLs: /@username and /@username/badges -> /u/username(/badges)
  let response: NextResponse;
  const profile = pathname.match(/^\/@([A-Za-z0-9_]{3,20})(\/.*)?$/);
  if (profile) {
    const url = request.nextUrl.clone();
    url.pathname = `/u/${profile[1].toLowerCase()}${profile[2] ?? ""}`;
    response = NextResponse.rewrite(url);
  } else {
    response = NextResponse.next({ request });
  }

  const { user } = await updateSession(request, response);

  if (!user && PROTECTED.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }
  if (user && GUEST_ONLY.includes(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/home";
    url.search = "";
    return NextResponse.redirect(url);
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};
