import { NextResponse } from "next/server";
import { ensureDb } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const db = await ensureDb();
  const result = await db.execute({
    sql: "SELECT * FROM predictions WHERE id = ?",
    args: [id],
  });
  const row = result.rows[0];

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
    groupPredictions: JSON.parse(row.group_predictions as string),
    knockoutPredictions: JSON.parse(row.knockout_predictions as string),
    champion: row.champion,
  });
}
