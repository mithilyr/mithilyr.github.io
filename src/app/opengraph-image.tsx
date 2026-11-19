import { ImageResponse } from "next/og";
import { site } from "@/content/site";

// Link-preview card (LinkedIn, WhatsApp, Slack...). Rendered once at build time.
export const dynamic = "force-static";
export const alt = `${site.name} | Engineer. Builder. Designer.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0b0a",
          color: "#f1ecdc",
          padding: "64px 72px",
          border: "6px solid #34332c",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              background: "#ff7a1a",
              color: "#0b0b0a",
              fontSize: 40,
              fontWeight: 800,
              padding: "6px 16px",
            }}
          >
            MR
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#a29d8a" }}>Colombo, Sri Lanka</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 112, fontWeight: 800, lineHeight: 1, letterSpacing: -3 }}>
            MITHIL
          </div>
          <div style={{ display: "flex", fontSize: 112, fontWeight: 800, lineHeight: 1, letterSpacing: -3, color: "#ff7a1a" }}>
            RAJAPAKSE
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#a29d8a", marginTop: 28, maxWidth: 1056 }}>
            Electrical engineering student building AI and automation tools.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#a29d8a" }}>
          <div style={{ display: "flex" }}>Engineer. Builder. Designer.</div>
          <div style={{ display: "flex", color: "#ff7a1a" }}>mithilyr.github.io</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
