import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/ui";

export const metadata = { title: "Settings" };

const sections = [
  { href: "/settings/profile", title: "Profile", body: "Display name, bio and status." },
  { href: "/settings/customize", title: "Customize", body: "Images, colors, layout and widgets." },
  { href: "/settings/privacy", title: "Privacy", body: "Who can see and message you." },
  { href: "/settings/security", title: "Security", body: "Password and account deletion." },
];

export default function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" />
      <ul>
        {sections.map((s) => (
          <li key={s.href}>
            <Link href={s.href} className="flex items-center justify-between border-b border-border px-4 py-3 hover:bg-hover md:px-6">
              <span>
                <span className="block text-sm font-medium">{s.title}</span>
                <span className="block text-sm text-muted">{s.body}</span>
              </span>
              <ChevronRight size={16} className="text-muted" />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
