import { profile } from "@/data/profile";

export function Masthead() {
  return (
    <header className="text-center">
      <h1 className="font-display text-[clamp(2rem,5.5vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
        {profile.name}
      </h1>

      <p className="label mt-5">
        Personal site — my skills, my knowledge, and the things I have built
      </p>

      <p className="mx-auto mt-8 max-w-2xl leading-relaxed text-muted">
        {profile.summary}
      </p>
    </header>
  );
}
