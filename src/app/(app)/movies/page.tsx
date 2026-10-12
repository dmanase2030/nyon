import { Planned } from "@/components/planned";
export const metadata = { title: "Movies" };
export default function Page() {
  return <Planned title="Movies" phase={3} summary="Search and browse movies with TMDB metadata, then log, rate and review them." />;
}
