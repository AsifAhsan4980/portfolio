import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { groups } from "@/data/world-cup-2026";
import type { GroupPredictions } from "@/types/world-cup";

export async function GET() {
  const db = getDb();

  const totalRow = db
    .prepare("SELECT COUNT(*) as count FROM predictions")
    .get() as { count: number };

  const championsRows = db
    .prepare(
      `SELECT champion, COUNT(*) as count
       FROM predictions
       GROUP BY champion
       ORDER BY count DESC
       LIMIT 10`
    )
    .all() as { champion: string; count: number }[];

  // Recent predictions (last 10)
  const recentRows = db
    .prepare(
      `SELECT id, nickname, champion, created_at
       FROM predictions
       ORDER BY created_at DESC
       LIMIT 10`
    )
    .all() as {
    id: string;
    nickname: string;
    champion: string;
    created_at: string;
  }[];

  // Most predicted 1st place per group
  const allPredictions = db
    .prepare("SELECT group_predictions FROM predictions")
    .all() as { group_predictions: string }[];

  const groupFavorites: Record<string, { team: string; count: number }> = {};

  if (allPredictions.length > 0) {
    const groupCounts: Record<string, Record<string, number>> = {};
    for (const g of groups) {
      groupCounts[g.name] = {};
    }

    for (const row of allPredictions) {
      try {
        const gp = JSON.parse(row.group_predictions) as GroupPredictions;
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
      totalPredictions: totalRow.count,
      topChampions: championsRows,
      recentPredictions: recentRows,
      groupFavorites,
    },
    {
      headers: { "Cache-Control": "public, max-age=60, s-maxage=60" },
    }
  );
}
