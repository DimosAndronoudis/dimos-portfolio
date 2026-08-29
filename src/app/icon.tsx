import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

const archivo = await readFile(join(process.cwd(), "assets/Archivo-ExtraBold.ttf"));

export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0e14",
          color: "#ffb454",
          fontFamily: "Archivo",
          fontSize: 24,
          letterSpacing: "-0.04em",
        }}
      >
        D
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Archivo", data: archivo, style: "normal", weight: 800 }],
    },
  );
}
