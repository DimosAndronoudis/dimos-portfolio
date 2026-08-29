import { profile } from "@/data/profile";

export function Cv() {
  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-5">
        <a
          href={profile.cvPath}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-text underline decoration-line underline-offset-4 transition-colors hover:text-signal hover:decoration-signal"
        >
          Open in a new tab ↗
        </a>
        <a
          href={profile.cvPath}
          download
          className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-dim underline decoration-line underline-offset-4 transition-colors hover:text-signal hover:decoration-signal"
        >
          Download PDF
        </a>
      </div>

      {/* Inline on desktop; phones that can't render PDFs still have the links. */}
      <iframe
        src={`${profile.cvPath}#view=FitH`}
        title={`${profile.name} — CV`}
        className="h-[75vh] w-full border border-line bg-panel"
      />
    </div>
  );
}
