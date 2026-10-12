import Link from "next/link";
import { buttonClass, EmptyState } from "@/components/ui";

export default function NotFound() {
  return <EmptyState title="Page not found" body="That page or profile doesn't exist." action={<Link href="/" className={buttonClass("secondary", "sm")}>Go home</Link>} />;
}
