import { Planned } from "@/components/planned";
export const metadata = { title: "Admin" };
export default function Page() {
  return <Planned title="Admin" phase={9} summary="Users, moderation, badges, events, premium, analytics and audit logs." />;
}
