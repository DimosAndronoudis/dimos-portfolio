"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { ReactNode } from "react";

export interface ConsolePanel {
  id: string;
  label: string;
  panel: ReactNode;
}

function subscribeToHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

const readHash = () => window.location.hash.slice(1);
const serverHash = () => "";

/**
 * Three buttons, nothing open until one is pressed. Open state lives in the
 * URL hash, so /#projects is a deep link and Back closes the panel.
 */
export function Console({ panels }: { panels: ConsolePanel[] }) {
  const hash = useSyncExternalStore(subscribeToHash, readHash, serverHash);
  const openIndex = panels.findIndex((item) => item.id === hash);
  const open = openIndex >= 0 ? panels[openIndex] : null;

  const toggle = useCallback(
    (id: string) => {
      const next = id === hash ? null : id;
      window.history.replaceState(
        null,
        "",
        next ? `#${next}` : window.location.pathname,
      );
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    },
    [hash],
  );

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-3">
        {panels.map((item) => {
          const isOpen = item.id === hash;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`panel-${item.id}`}
              className={`border px-6 py-3.5 font-mono text-[0.6875rem] uppercase tracking-[0.16em] transition-colors ${
                isOpen
                  ? "border-signal bg-signal text-ink"
                  : "border-line text-text hover:border-signal hover:text-signal"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {open ? (
        <section
          key={open.id}
          id={`panel-${open.id}`}
          className="panel-enter mt-12 border-t border-line pt-10"
        >
          {open.panel}
        </section>
      ) : null}
    </div>
  );
}
