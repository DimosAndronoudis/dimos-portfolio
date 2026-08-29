import { profile } from "@/data/profile";
import { liveProjects } from "@/data/projects";

/* Display form: no scheme, no www, no tracking query, no trailing slash. */
const strip = (url: string) =>
  url
    .replace(/^https?:\/\/(www\.)?/, "")
    .replace(/\?.*$/, "")
    .replace(/\/$/, "");

const profiles = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "Music", href: profile.spotify },
];

function LinkRow({ label, href }: { label: string; href: string }) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="group flex items-baseline gap-3 py-1.5"
      >
        <span className="w-20 shrink-0 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted transition-colors group-hover:text-signal">
          {label}
        </span>
        <span className="truncate font-mono text-[0.6875rem] text-dim">
          {strip(href)}
        </span>
      </a>
    </li>
  );
}

export function LinkIndex() {
  return (
    <div className="space-y-8">
      <section>
        <p className="label mb-2">Links</p>
        <ul>
          {profiles.map((item) => (
            <LinkRow key={item.href} {...item} />
          ))}
        </ul>
      </section>

      {liveProjects.length > 0 ? (
        <section>
          <p className="label mb-2">Live app</p>
          <ul>
            {liveProjects.map((project) => (
              <LinkRow
                key={project.id}
                label={project.title}
                href={project.demoUrl!}
              />
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
