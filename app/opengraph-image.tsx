import { ImageResponse } from "next/og";
import { SITE } from "@/lib/constants";

export const runtime = "edge";
export const alt = SITE.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px",
          background: "linear-gradient(135deg, #041B40 0%, #082B63 60%, #0a3d7a 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              background: "#D8A43A",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: "bold",
              color: "#041B40",
            }}
          >
            S
          </div>
          <span style={{ fontSize: "28px", fontWeight: "bold", color: "#D8A43A" }}>
            {SITE.nameEn}
          </span>
        </div>
        <h1
          style={{
            fontSize: "52px",
            fontWeight: "bold",
            color: "white",
            lineHeight: 1.3,
            maxWidth: "900px",
          }}
        >
          {SITE.tagline}
        </h1>
        <p
          style={{
            fontSize: "24px",
            color: "rgba(255,255,255,0.7)",
            marginTop: "24px",
            maxWidth: "800px",
          }}
        >
          {SITE.description.slice(0, 100)}...
        </p>
      </div>
    ),
    { ...size }
  );
}
