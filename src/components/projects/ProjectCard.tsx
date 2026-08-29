import type { Project } from "@/data/projects";
import { categoryLabels } from "@/data/projects";
import { PipelineStrip } from "./PipelineStrip";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col border border-line bg-panel/40 p-6 transition-colors hover:border-dim sm:p-8">
      <div className="flex flex-wrap items-center gap-3">
        <span className="label text-signal">{categoryLabels[project.category]}</span>
        {project.status === "in-progress" ? (
          <span className="label text-probe">In progress</span>
        ) : null}
      </div>

      <h3 className="mt-4 font-display text-2xl font-bold tracking-tight">
        {project.title}
      </h3>

      <p className="mt-3 text-muted">{project.shortDescription}</p>

      <div className="mt-6">
        <p className="label mb-3">Pipeline</p>
        <PipelineStrip category={project.category} />
      </div>

      {project.highlights.length > 0 ? (
        <ul className="mt-6 space-y-2">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3 text-sm text-muted">
              <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-signal" />
              {highlight}
            </li>
          ))}
        </ul>
      ) : null}

      <ul className="mt-6 flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <li
            key={tech}
            className="border border-line px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-dim"
          >
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap gap-4 pt-2">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-text underline decoration-line underline-offset-4 transition-colors hover:text-signal hover:decoration-signal"
        >
          View source
        </a>
        {project.demoUrl ? (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-text underline decoration-line underline-offset-4 transition-colors hover:text-probe hover:decoration-probe"
          >
            Live demo
          </a>
        ) : null}
      </div>
    </article>
  );
}
