import { profile } from "@/data/profile";

export function ContactAside() {
  return (
    <aside>
      <p className="label mb-2">Contact</p>

      <a
        href={`mailto:${profile.email}`}
        className="block break-words py-1.5 font-mono text-[0.6875rem] text-muted transition-colors hover:text-signal"
      >
        {profile.email}
      </a>

      <p className="py-1.5 font-mono text-[0.6875rem] text-dim">
        {profile.location}
      </p>
      <p className="py-1.5 font-mono text-[0.6875rem] text-dim">
        {profile.languages}
      </p>
    </aside>
  );
}
