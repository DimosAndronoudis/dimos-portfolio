import { research } from "@/data/experience";

export function Research() {
  return (
    <div className="space-y-10">
      <p className="max-w-2xl text-sm leading-relaxed text-dim">
        Academic work, kept separate from the production projects — this is
        research output, not a shipped system.
      </p>

      <article>
        <p className="label">
          {research.programme} <span className="text-line">/</span>{" "}
          {research.period}
        </p>

        <h2 className="mt-4 max-w-2xl font-display text-xl font-bold tracking-tight">
          {research.title}
        </h2>

        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          {research.summary}
        </p>

        <div className="mt-8 border-t border-line pt-6">
          <p className="label mb-4">Method</p>
          <ol className="flex flex-wrap items-center gap-2">
            {research.method.map((step, i) => (
              <li key={step} className="flex items-center gap-2">
                <span className="border border-line px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-muted">
                  {step}
                </span>
                {i < research.method.length - 1 ? (
                  <span aria-hidden className="text-signal/60">
                    →
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </article>

    </div>
  );
}
