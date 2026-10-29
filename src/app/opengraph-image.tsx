import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = "Anthony McGarry — React, TypeScript and React Native developer";
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
          background: "linear-gradient(135deg, #0b1222, #19263b)",
          color: "#ffffff",
          padding: "80px",
          borderBottom: "12px solid #60a5fa",
        }}
      >
        <div style={{ display: "flex", color: "#93c5fd", fontSize: 24, marginBottom: 30 }}>
          amcgarry.com
        </div>
        <div style={{ display: "flex", fontSize: 72, fontWeight: 700, marginBottom: 24 }}>
          {site.name}
        </div>
        <div style={{ display: "flex", fontSize: 34, marginBottom: 36 }}>
          {site.jobTitle}
        </div>
        <div style={{ display: "flex", color: "#bfdbfe", fontSize: 28 }}>
          React · TypeScript · Next.js · React Native
        </div>
        <div style={{ display: "flex", color: "#cbd5e1", fontSize: 24, marginTop: 24 }}>
          Merseyside, UK
        </div>
      </div>
    ),
    size,
  );
}
