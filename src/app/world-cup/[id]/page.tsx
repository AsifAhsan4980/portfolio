import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PredictionViewer from "@/components/world-cup/PredictionViewer";
import type { Prediction } from "@/types/world-cup";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  let nickname = "Someone";
  let champion = "";
  try {
    const { ensureDb } = await import("@/lib/db");
    const db = await ensureDb();
    const result = await db.execute({
      sql: "SELECT nickname, champion FROM predictions WHERE id = ?",
      args: [id],
    });
    const row = result.rows[0];
    if (row) {
      nickname = row.nickname as string;
      champion = row.champion as string;
    }
  } catch {}

  const { getTeamByCode } = await import("@/data/world-cup-2026");
  const team = champion ? getTeamByCode(champion) : null;
  const champName = team?.name || "their champion";

  return {
    title: `${nickname}'s World Cup 2026 Prediction`,
    description: `${nickname} predicts ${champName} will win the FIFA World Cup 2026! See their full bracket prediction.`,
    alternates: {
      canonical: `https://www.asifahsan.com/world-cup/${id}`,
    },
    openGraph: {
      title: `${nickname}'s World Cup 2026 Prediction`,
      description: `${nickname} predicts ${champName} will win the FIFA World Cup 2026!`,
      url: `https://www.asifahsan.com/world-cup/${id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${nickname}'s World Cup 2026 Prediction`,
      description: `${nickname} predicts ${champName} will win the FIFA World Cup 2026!`,
    },
  };
}

export default async function PredictionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { ensureDb } = await import("@/lib/db");
  const db = await ensureDb();
  const result = await db.execute({
    sql: "SELECT * FROM predictions WHERE id = ?",
    args: [id],
  });
  const row = result.rows[0];

  if (!row) notFound();

  const prediction: Prediction = {
    id: row.id as string,
    nickname: row.nickname as string,
    createdAt: row.created_at as string,
    groupPredictions: JSON.parse(row.group_predictions as string),
    knockoutPredictions: JSON.parse(row.knockout_predictions as string),
    champion: row.champion as string,
  };

  return (
    <div className="relative container py-12 min-h-screen overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#469D89]/6 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-[#469D89]/30 pointer-events-none" />
      <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-[#469D89]/30 pointer-events-none" />

      <div className="text-center mb-12 relative z-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#469D89]/50" />
          <span className="text-[10px] font-mono text-[#469D89]/60 tracking-[0.3em] uppercase">
            Prediction
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#469D89]/50" />
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold neon-text-pulse">
          World Cup <span className="gradient-text">2026</span>
        </h1>
      </div>

      <div className="relative z-10">
        <PredictionViewer prediction={prediction} />
      </div>
    </div>
  );
}
