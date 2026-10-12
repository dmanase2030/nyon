import { cn } from "@/components/ui";

export function Avatar({ src, name, size = 36, className }: { src?: string | null; name: string; size?: number; className?: string }) {
  const initial = name.trim().charAt(0).toUpperCase() || "?";
  return src ? (
    // eslint-disable-next-line @next/next/no-img-element -- user uploads may be animated GIF/WEBP; next/image would freeze them
    <img src={src} alt="" width={size} height={size} className={cn("shrink-0 rounded-full border border-border object-cover", className)} style={{ width: size, height: size }} />
  ) : (
    <span
      aria-hidden
      className={cn("flex shrink-0 items-center justify-center rounded-full border border-border bg-hover text-xs font-medium text-muted", className)}
      style={{ width: size, height: size }}
    >
      {initial}
    </span>
  );
}
