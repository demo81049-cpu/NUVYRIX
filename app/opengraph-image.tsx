import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.fullName} — ${siteConfig.tagline}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          color: "#0f172a",
          background:
            "linear-gradient(135deg, #effaff 0%, #ffffff 48%, #f3edff 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            color: "#0369a1",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.18em",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#0284c7",
            }}
          />
          NUVYRIX TECHNOLOGIES
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 950,
              fontSize: 78,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.04em",
            }}
          >
            <span>Digital products,</span>
            <span>built to grow.</span>
          </div>
          <div
            style={{
              marginTop: 28,
              color: "#475569",
              fontSize: 29,
            }}
          >
            Web development · Mobile apps · Product design
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#64748b",
            fontSize: 20,
          }}
        >
          <span>{siteConfig.tagline}</span>
          <span>nuvyrix.online</span>
        </div>
      </div>
    ),
    size,
  );
}
