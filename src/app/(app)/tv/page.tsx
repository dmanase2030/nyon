import { Planned } from "@/components/planned";
export const metadata = { title: "TV Shows" };
export default function Page() {
  return <Planned title="TV Shows" phase={3} summary="Season and episode tracking for TV shows." />;
}
