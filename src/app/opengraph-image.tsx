import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { profile, deliveryLoop } from "@/data/profile";

export const alt = `${profile.name} — ${profile.roles}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Same faces as the page. Read from disk so the build never depends on a CDN. */
const archivo = await readFile(join(process.cwd(), "assets/Archivo-ExtraBold.ttf"));
const plexMono = await readFile(join(process.cwd(), "assets/IBMPlexMono-Medium.ttf"));

const INK = "#0b0e14";
const LINE = "#1f2836";
const TEXT = "#e8ebf2";
const DIM = "#5a6478";
const SIGNAL = "#ffb454";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          padding: "72px 80px",
          fontFamily: "Plex",
          /* The bench grid, same 96px ruling as the site. */
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "96px 96px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 20,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: SIGNAL,
            }}
          >
            {profile.discipline}
          </div>

          <div
            style={{
              fontFamily: "Archivo",
              fontSize: 104,
              letterSpacing: "-0.03em",
              color: TEXT,
              marginTop: 28,
              lineHeight: 1.05,
            }}
          >
            {profile.name}
          </div>

          <div style={{ fontSize: 30, color: DIM, marginTop: 22 }}>
            {profile.roles}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "Archivo",
              fontSize: 38,
              color: TEXT,
              letterSpacing: "-0.02em",
            }}
          >
            {profile.headline}
          </div>

          {/* The pipeline strip — the page's structural motif. */}
          <div style={{ display: "flex", alignItems: "center", marginTop: 40 }}>
            {deliveryLoop.map((stage, i) => (
              <div key={stage.step} style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    display: "flex",
                    border: `1px solid ${LINE}`,
                    padding: "10px 18px",
                    fontSize: 18,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: i === 0 ? SIGNAL : DIM,
                  }}
                >
                  {stage.step}
                </div>
                {i < deliveryLoop.length - 1 ? (
                  <div style={{ width: 26, height: 1, background: LINE }} />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: archivo, style: "normal", weight: 800 },
        { name: "Plex", data: plexMono, style: "normal", weight: 500 },
      ],
    },
  );
}
