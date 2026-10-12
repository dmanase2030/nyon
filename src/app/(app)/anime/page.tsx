import { Planned } from "@/components/planned";
export const metadata = { title: "Anime" };
export default function Page() {
  return <Planned title="Anime" phase={3} summary="Anime tracking with episode progress and statuses like Watching and Completed." />;
}
