import { PageHeader } from "@/components/ui";

/** Honest placeholder for routes whose feature lands in a later build phase. */
export function Planned({ title, phase, summary }: { title: string; phase: number; summary: string }) {
  return (
    <>
      <PageHeader title={title} />
      <div className="px-4 py-16 text-center md:px-6">
        <p className="text-sm font-medium">Not built yet</p>
        <p className="mx-auto mt-1 max-w-sm text-sm text-muted">{summary}</p>
        <p className="mt-3 font-mono text-xs text-muted">Planned for phase {phase}</p>
      </div>
    </>
  );
}
