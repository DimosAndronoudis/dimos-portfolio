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
 * A row of buttons, nothing open until one is pressed. Open state lives in the
 * URL hash, so /#projects is a deep link and Back closes the panel.
 *
 * `aside` is the same mechanism with a quieter presentation: it opens into the
 * same region, but reads as a link under the row rather than a sixth button.
 * It stays a <button> element so aria-expanded and keyboard behaviour survive
 * the change in appearance.
 */
export function Console({
  panels,
  aside,
}: {
  panels: ConsolePanel[];
  aside?: ConsolePanel;
}) {
  const hash = useSyncExternalStore(subscribeToHash, readHash, serverHash);
  const all = aside ? [...panels, aside] : panels;
  const openIndex = all.findIndex((item) => item.id === hash);
  const open = openIndex >= 0 ? all[openIndex] : null;

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

      {aside ? (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => toggle(aside.id)}
            aria-expanded={aside.id === hash}
            aria-controls={`panel-${aside.id}`}
            className={`font-mono text-[0.6875rem] uppercase tracking-[0.16em] underline underline-offset-[6px] transition-colors ${
              aside.id === hash
                ? "text-signal decoration-signal"
                : "text-dim decoration-line hover:text-signal hover:decoration-signal"
            }`}
          >
            {aside.label}
          </button>
        </div>
      ) : null}

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
