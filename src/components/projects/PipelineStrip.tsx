import type { ProjectCategory } from "@/data/projects";
import { pipelines } from "@/data/projects";

/** The architecture of a system, in one line, in the page's shared notation. */
export function PipelineStrip({ category }: { category: ProjectCategory }) {
  const stages = pipelines[category];

  return (
    <div className="overflow-x-auto">
      <ol className="flex min-w-max items-center gap-2">
        {stages.map((stage, i) => (
          <li key={stage} className="flex items-center gap-2">
            <span className="border border-line px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-muted">
              {stage}
            </span>
            {i < stages.length - 1 ? (
              <span aria-hidden className="text-signal/60">
                →
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
