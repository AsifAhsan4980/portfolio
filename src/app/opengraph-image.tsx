import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Asif Ahsan | Senior Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    background: "#0a0f0e",
                    padding: "80px",
                    fontFamily: "monospace",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Grid background */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage:
                            "linear-gradient(rgba(70,157,137,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(70,157,137,0.06) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />

                {/* Glow */}
                <div
                    style={{
                        position: "absolute",
                        top: "-100px",
                        right: "-100px",
                        width: "500px",
                        height: "500px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(70,157,137,0.15) 0%, transparent 65%)",
                    }}
                />

                {/* HUD corners */}
                <div style={{ position: "absolute", top: 30, left: 30, width: 24, height: 24, borderTop: "2px solid rgba(70,157,137,0.5)", borderLeft: "2px solid rgba(70,157,137,0.5)" }} />
                <div style={{ position: "absolute", top: 30, right: 30, width: 24, height: 24, borderTop: "2px solid rgba(70,157,137,0.5)", borderRight: "2px solid rgba(70,157,137,0.5)" }} />
                <div style={{ position: "absolute", bottom: 30, left: 30, width: 24, height: 24, borderBottom: "2px solid rgba(70,157,137,0.5)", borderLeft: "2px solid rgba(70,157,137,0.5)" }} />
                <div style={{ position: "absolute", bottom: 30, right: 30, width: 24, height: 24, borderBottom: "2px solid rgba(70,157,137,0.5)", borderRight: "2px solid rgba(70,157,137,0.5)" }} />

                {/* Status bar */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32, position: "relative" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#469D89" }} />
                    <span style={{ color: "rgba(70,157,137,0.6)", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                        SYS://PORTFOLIO.EXE · ONLINE
                    </span>
                </div>

                {/* Name */}
                <div style={{ position: "relative", marginBottom: 12 }}>
                    <span style={{ fontSize: 72, fontWeight: 700, color: "#ffffff", letterSpacing: "-1px" }}>
                        Asif Ahsan
                    </span>
                    <span style={{ fontSize: 72, fontWeight: 700, color: "#469D89" }}>.</span>
                </div>

                {/* Role */}
                <div style={{ color: "#469D89", fontSize: 22, letterSpacing: "0.15em", marginBottom: 28, textTransform: "uppercase" }}>
                    Senior Software Engineer
                </div>

                {/* Divider */}
                <div style={{ width: 80, height: 2, background: "linear-gradient(90deg, #469D89, transparent)", marginBottom: 28, borderRadius: 2 }} />

                {/* Description */}
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 18, lineHeight: 1.6, maxWidth: 700 }}>
                    Full-stack · AWS Serverless · WebRTC · AI Integration · React / Next.js
                </div>

                {/* Stats */}
                <div style={{ display: "flex", gap: 48, marginTop: 48 }}>
                    {[["8+", "Years"], ["14+", "Projects"], ["5+", "Countries"]].map(([num, label]) => (
                        <div key={label} style={{ display: "flex", flexDirection: "column" }}>
                            <span style={{ color: "#469D89", fontSize: 30, fontWeight: 700 }}>{num}</span>
                            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, letterSpacing: "0.1em" }}>{label}</span>
                        </div>
                    ))}
                </div>

                {/* URL */}
                <div style={{ position: "absolute", bottom: 48, right: 80, color: "rgba(70,157,137,0.4)", fontSize: 14, letterSpacing: "0.1em" }}>
                    asifahsan.com
                </div>
            </div>
        ),
        { ...size }
    );
}
