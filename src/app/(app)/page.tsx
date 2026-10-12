import Link from "next/link";
import { redirect } from "next/navigation";
import { buttonClass } from "@/components/ui";
import { getSession } from "@/lib/auth";

export default async function Landing() {
  const { user } = await getSession();
  if (user) redirect("/home");

  return (
    <div className="px-4 py-16 md:px-10 md:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">NOVYX</p>
      <h1 className="mt-4 max-w-lg text-3xl font-semibold leading-tight tracking-tight">
        A journal for everything you watch.
      </h1>
      <p className="mt-4 max-w-md text-sm leading-6 text-muted">
        Log movies, anime and TV. Rate and review them, build collections, and follow people whose taste you trust.
      </p>
      <div className="mt-8 flex gap-2">
        <Link href="/register" className={buttonClass("primary")}>
          Create an account
        </Link>
        <Link href="/explore" className={buttonClass("secondary")}>
          Explore
        </Link>
      </div>
      <dl className="mt-16 grid max-w-xl gap-px overflow-hidden rounded-lg border border-border bg-border text-sm sm:grid-cols-3">
        {[
          ["Track", "Watchlists, episode progress and a full history."],
          ["Review", "Rate 1 to 10 and write as much or as little as you like."],
          ["Share", "Profiles you can make your own, animated images included, free."],
        ].map(([t, d]) => (
          <div key={t} className="bg-bg p-4">
            <dt className="font-medium">{t}</dt>
            <dd className="mt-1 text-muted">{d}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
