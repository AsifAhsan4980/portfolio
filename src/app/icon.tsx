import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: 32,
                    height: 32,
                    background: "#0a0f0e",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 6,
                    fontFamily: "monospace",
                    position: "relative",
                }}
            >
                {/* Corner accent */}
                <div style={{
                    position: "absolute",
                    top: 2,
                    left: 2,
                    width: 4,
                    height: 4,
                    borderTop: "1px solid rgba(70,157,137,0.6)",
                    borderLeft: "1px solid rgba(70,157,137,0.6)",
                }} />
                <div style={{
                    position: "absolute",
                    bottom: 2,
                    right: 2,
                    width: 4,
                    height: 4,
                    borderBottom: "1px solid rgba(70,157,137,0.6)",
                    borderRight: "1px solid rgba(70,157,137,0.6)",
                }} />
                {/* A. logo */}
                <div style={{ display: "flex", alignItems: "baseline", gap: 0 }}>
                    <span style={{
                        color: "#ffffff",
                        fontSize: 18,
                        fontWeight: 800,
                        lineHeight: 1,
                        letterSpacing: "-1px",
                    }}>
                        A
                    </span>
                    <span style={{
                        color: "#469D89",
                        fontSize: 20,
                        fontWeight: 800,
                        lineHeight: 1,
                    }}>
                        .
                    </span>
                </div>
            </div>
        ),
        { ...size }
    );
}
