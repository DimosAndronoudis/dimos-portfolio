"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

/** Desktop only, and never against a reduced-motion preference. */
const QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;
const getServerSnapshot = () => false;

const Lattice = dynamic(
  () => import("./Lattice").then((mod) => mod.Lattice),
  { ssr: false },
);

export function SceneBackdrop() {
  const enabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 opacity-70 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_45%,#000_25%,transparent_85%)]"
    >
      <Lattice />
    </div>
  );
}
