import { experience } from "@/data/experience";
import { skillGroups } from "@/data/skills";

function Row({ left, right }: { left: string; right: string }) {
  return (
    <li className="grid gap-1 py-3 md:grid-cols-[10rem_1fr] md:gap-6">
      <span className="label pt-1">{left}</span>
      <span className="text-sm leading-relaxed text-muted">{right}</span>
    </li>
  );
}

export function Experience() {
  const current = experience.find((entry) => !entry.earlier)!;
  const earlier = experience.filter((entry) => entry.earlier);

  return (
    <div className="space-y-12">
      <article>
        <div className="flex flex-wrap items-baseline gap-x-4">
          <h2 className="font-display text-xl font-bold tracking-tight">
            {current.role}
          </h2>
          <span className="text-signal">{current.organization}</span>
          <span className="label ml-auto">{current.period}</span>
        </div>

        <ul className="mt-5 space-y-3 border-t border-line pt-5">
          {current.achievements.map((achievement) => (
            <li key={achievement} className="flex gap-3">
              <span aria-hidden className="mt-3 h-px w-3 shrink-0 bg-signal" />
              <span className="max-w-3xl leading-relaxed text-muted">
                {achievement}
              </span>
            </li>
          ))}
        </ul>

        <p className="label mt-5 text-dim">
          Previously{" "}
          {earlier.map((entry, i) => (
            <span key={entry.id}>
              {i > 0 ? <span className="text-line"> · </span> : null}
              {entry.role}, {entry.period}
            </span>
          ))}
        </p>
      </article>

      <section>
        <p className="label mb-2">Stack</p>
        <ul className="divide-y divide-line border-y border-line">
          {skillGroups.map((group) => (
            <Row key={group.id} left={group.title} right={group.items.join(" · ")} />
          ))}
        </ul>
      </section>


    </div>
  );
}
