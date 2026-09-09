import { ImageResponse } from "next/og";

export const alt = "MCB Systems | Full-Stack Development & UI Architecture Studio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0D0D0D",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "monospace",
          border: "2px solid rgba(0, 255, 0, 0.4)",
          position: "relative",
        }}
      >
        {/* Top HUD */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
            paddingBottom: "24px",
          }}
        >
          <div style={{ color: "#00FF00", fontSize: 24, letterSpacing: "2px" }}>
            MCB_SYSTEMS // STUDIO_NODE
          </div>
          <div style={{ color: "#999999", fontSize: 18, letterSpacing: "1px" }}>
            STATUS: ONLINE
          </div>
        </div>

        {/* Main Brand Hero */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 900,
              color: "#FFFFFF",
              letterSpacing: "-2px",
            }}
          >
            MCB SYSTEMS LLC
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#00FF00",
              letterSpacing: "1px",
            }}
          >
            Full-Stack Web Development &amp; UI Architecture Studio
          </div>
          <div
            style={{
              fontSize: 20,
              color: "#999999",
              maxWidth: "800px",
              lineHeight: 1.5,
            }}
          >
            Bespoke digital experiences built with Next.js, React, TypeScript, and modern architecture.
          </div>
        </div>

        {/* Footer info */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            paddingTop: "24px",
            color: "#666666",
            fontSize: 18,
          }}
        >
          <div>macallanbutler.com</div>
          <div style={{ color: "#00FF00" }}>[ SYSTEM_READY ]</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
