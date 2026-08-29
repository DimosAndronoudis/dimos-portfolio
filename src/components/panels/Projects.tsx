import { projects } from "@/data/projects";
import { PipelineStrip } from "@/components/projects/PipelineStrip";

export function Projects() {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {projects.map((project) => (
        <li key={project.id} className="py-7">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <h2 className="font-display text-xl font-bold tracking-tight">
              {project.title}
            </h2>
            {project.status === "in-progress" ? (
              <span className="label text-probe">In progress</span>
            ) : null}

            <span className="ml-auto flex flex-wrap gap-4">
              {project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-probe transition-colors hover:text-signal"
                >
                  Live ↗
                </a>
              ) : null}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-dim transition-colors hover:text-signal"
              >
                Source ↗
              </a>
            </span>
          </div>

          {/* Projects still awaiting your own copy show the pipeline only. */}
          {project.needsReview ? null : (
            <p className="mt-3 max-w-2xl text-muted">{project.shortDescription}</p>
          )}

          <div className="mt-5">
            <PipelineStrip category={project.category} />
          </div>
        </li>
      ))}
    </ul>
  );
}
