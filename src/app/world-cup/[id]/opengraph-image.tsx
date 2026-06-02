import { ImageResponse } from "next/og";
import { teams } from "@/data/world-cup-2026";

export const alt = "FIFA World Cup 2026 Prediction";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function getTeam(code: string) {
  return teams.find((t) => t.code === code);
}

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let nickname = "Anonymous";
  let champion = "";
  let semifinalists: string[] = [];

  try {
    const { ensureDb } = await import("@/lib/db");
    const db = await ensureDb();
    const result = await db.execute({
      sql: "SELECT nickname, champion, knockout_predictions FROM predictions WHERE id = ?",
      args: [id],
    });
    const row = result.rows[0];
    if (row) {
      nickname = row.nickname as string;
      champion = row.champion as string;
      const knockoutPicks = JSON.parse(row.knockout_predictions as string) as Record<string, string>;
      // Get SF winners (the two finalists besides champion)
      const sfCodes = ["SF1", "SF2"].map((k) => knockoutPicks[k]).filter(Boolean);
      // Get QF winners
      const qfCodes = ["QF1", "QF2", "QF3", "QF4"].map((k) => knockoutPicks[k]).filter(Boolean);
      // Show top picks: champion + finalists + semi-finalists
      const allTop = [champion, ...sfCodes, ...qfCodes];
      const unique = [...new Set(allTop)].filter(Boolean).slice(0, 4);
      semifinalists = unique.slice(1); // exclude champion
    }
  } catch {
    // fallback to defaults
  }

  const championTeam = getTeam(champion);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0a0f0e",
          padding: "60px 80px",
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
            display: "flex",
            backgroundImage:
              "linear-gradient(rgba(70,157,137,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(70,157,137,0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "-50px",
            right: "-50px",
            width: "400px",
            height: "400px",
            display: "flex",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(70,157,137,0.2) 0%, transparent 65%)",
          }}
        />

        {/* HUD corners */}
        <div style={{ position: "absolute", top: 24, left: 24, width: 20, height: 20, display: "flex", borderTop: "2px solid rgba(70,157,137,0.5)", borderLeft: "2px solid rgba(70,157,137,0.5)" }} />
        <div style={{ position: "absolute", top: 24, right: 24, width: 20, height: 20, display: "flex", borderTop: "2px solid rgba(70,157,137,0.5)", borderRight: "2px solid rgba(70,157,137,0.5)" }} />
        <div style={{ position: "absolute", bottom: 24, left: 24, width: 20, height: 20, display: "flex", borderBottom: "2px solid rgba(70,157,137,0.5)", borderLeft: "2px solid rgba(70,157,137,0.5)" }} />
        <div style={{ position: "absolute", bottom: 24, right: 24, width: 20, height: 20, display: "flex", borderBottom: "2px solid rgba(70,157,137,0.5)", borderRight: "2px solid rgba(70,157,137,0.5)" }} />

        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#469D89", display: "flex" }} />
            <span style={{ color: "rgba(70,157,137,0.6)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase" }}>
              FIFA WORLD CUP 2026
            </span>
          </div>
          <span style={{ color: "rgba(70,157,137,0.4)", fontSize: 12, letterSpacing: "0.15em" }}>
            asifahsan.com/world-cup
          </span>
        </div>

        {/* Divider */}
        <div style={{ width: "100%", height: 1, background: "linear-gradient(90deg, #469D89, transparent)", marginBottom: 36, display: "flex" }} />

        {/* User name */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 16, textTransform: "uppercase", letterSpacing: "0.15em" }}>
            Prediction by
          </span>
        </div>
        <div style={{ display: "flex", marginBottom: 40 }}>
          <span style={{ fontSize: 48, fontWeight: 700, color: "#ffffff" }}>
            {nickname}
          </span>
        </div>

        {/* Champion section */}
        <div style={{ display: "flex", alignItems: "center", gap: 40, marginBottom: 40 }}>
          {/* Champion */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "24px 40px", border: "2px solid rgba(70,157,137,0.5)", borderRadius: 20, background: "rgba(70,157,137,0.08)" }}>
            <span style={{ color: "#469D89", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 8 }}>
              CHAMPION
            </span>
            <span style={{ fontSize: 56, marginBottom: 4 }}>
              {championTeam?.flag || "🏆"}
            </span>
            <span style={{ fontSize: 22, fontWeight: 700, color: "#469D89" }}>
              {championTeam?.name || "—"}
            </span>
          </div>

          {/* Top picks */}
          {semifinalists.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                TOP PICKS
              </span>
              <div style={{ display: "flex", gap: 16 }}>
                {semifinalists.map((code) => {
                  const team = getTeam(code);
                  return (
                    <div key={code} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "12px 20px", border: "1px solid rgba(70,157,137,0.25)", borderRadius: 12, background: "rgba(70,157,137,0.05)" }}>
                      <span style={{ fontSize: 32, marginBottom: 4 }}>
                        {team?.flag || "🏳️"}
                      </span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>
                        {team?.name || code}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", marginTop: "auto" }}>
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 16 }}>
            Make your own prediction at asifahsan.com/world-cup
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
