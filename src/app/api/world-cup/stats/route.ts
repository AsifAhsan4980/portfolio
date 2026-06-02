import { NextResponse } from "next/server";
import { ensureDb } from "@/lib/db";
import { groups } from "@/data/world-cup-2026";
import type { GroupPredictions } from "@/types/world-cup";

export async function GET() {
  const db = await ensureDb();

  const totalResult = await db.execute(
    "SELECT COUNT(*) as count FROM predictions"
  );
  const totalPredictions = Number(totalResult.rows[0]?.count ?? 0);

  const championsResult = await db.execute(
    `SELECT champion, COUNT(*) as count
     FROM predictions
     GROUP BY champion
     ORDER BY count DESC
     LIMIT 10`
  );
  const topChampions = championsResult.rows.map((r) => ({
    champion: r.champion as string,
    count: Number(r.count),
  }));

  // Recent predictions (last 10)
  const recentResult = await db.execute(
    `SELECT id, nickname, champion, created_at
     FROM predictions
     ORDER BY created_at DESC
     LIMIT 10`
  );
  const recentPredictions = recentResult.rows.map((r) => ({
    id: r.id as string,
    nickname: r.nickname as string,
    champion: r.champion as string,
    created_at: r.created_at as string,
  }));

  // Most predicted 1st place per group
  const allResult = await db.execute(
    "SELECT group_predictions FROM predictions"
  );

  const groupFavorites: Record<string, { team: string; count: number }> = {};

  if (allResult.rows.length > 0) {
    const groupCounts: Record<string, Record<string, number>> = {};
    for (const g of groups) {
      groupCounts[g.name] = {};
    }

    for (const row of allResult.rows) {
      try {
        const gp = JSON.parse(
          row.group_predictions as string
        ) as GroupPredictions;
        for (const [groupName, pred] of Object.entries(gp)) {
          if (pred?.first && groupCounts[groupName]) {
            groupCounts[groupName][pred.first] =
              (groupCounts[groupName][pred.first] || 0) + 1;
          }
        }
      } catch {
        // skip malformed rows
      }
    }

    for (const [groupName, counts] of Object.entries(groupCounts)) {
      const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
      if (sorted.length > 0) {
        groupFavorites[groupName] = {
          team: sorted[0][0],
          count: sorted[0][1],
        };
      }
    }
  }

  return NextResponse.json(
    {
      totalPredictions,
      topChampions,
      recentPredictions,
      groupFavorites,
    },
    {
      headers: { "Cache-Control": "public, max-age=60, s-maxage=60" },
    }
  );
}
