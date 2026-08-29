import Link from "next/link";
import type { Metadata } from "next";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `404 — ${profile.name}`,
  /* A missing page is not something to surface in search results. */
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center px-5 py-24 sm:px-8">
      <p className="label text-signal">Error 404</p>

      <h1 className="mt-5 font-display text-[clamp(1.75rem,4.5vw,2.75rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
        No such page
      </h1>

      <p className="mt-5 max-w-xl leading-relaxed text-muted">
        That address does not resolve to anything here. The site is a single
        page — every section opens from the console on the home page.
      </p>

      <div className="mt-10 flex flex-wrap gap-6 border-t border-line pt-6">
        <Link
          href="/"
          className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-text underline decoration-line underline-offset-4 transition-colors hover:text-signal hover:decoration-signal"
        >
          ← Home
        </Link>
        <Link
          href="/#projects"
          className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-dim underline decoration-line underline-offset-4 transition-colors hover:text-signal hover:decoration-signal"
        >
          Projects
        </Link>
        <Link
          href="/#cv"
          className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-dim underline decoration-line underline-offset-4 transition-colors hover:text-signal hover:decoration-signal"
        >
          CV
        </Link>
      </div>
    </main>
  );
}
