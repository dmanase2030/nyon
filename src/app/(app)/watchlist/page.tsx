import { Planned } from "@/components/planned";
export const metadata = { title: "Watchlist" };
export default function Page() {
  return <Planned title="Watchlist" phase={3} summary="Everything you plan to watch, in one place." />;
}
