import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const db = getDb();
  const row = db
    .prepare("SELECT * FROM predictions WHERE id = ?")
    .get(id) as Record<string, string> | undefined;

  if (!row) {
    return NextResponse.json(
      { error: "Prediction not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    id: row.id,
    nickname: row.nickname,
    createdAt: row.created_at,
    groupPredictions: JSON.parse(row.group_predictions),
    knockoutPredictions: JSON.parse(row.knockout_predictions),
    champion: row.champion,
  });
}
