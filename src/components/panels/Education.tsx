import { education } from "@/data/experience";

export function Education() {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {education.map((entry) => (
        <li
          key={entry.id}
          className="grid gap-1 py-3 md:grid-cols-[10rem_1fr] md:gap-6"
        >
          <span className="label pt-1">{entry.period}</span>
          <span className="text-sm leading-relaxed text-muted">
            {entry.degree} — {entry.institution}
          </span>
        </li>
      ))}
    </ul>
  );
}
