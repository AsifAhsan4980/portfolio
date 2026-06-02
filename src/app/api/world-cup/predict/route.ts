import { NextResponse } from "next/server";
import { z } from "zod";
import { ensureDb } from "@/lib/db";
import { teams, groups } from "@/data/world-cup-2026";

function generateId(length = 10): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(bytes, (b) => chars[b % chars.length]).join("");
}

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }
  if (record.count >= RATE_LIMIT) return true;
  record.count++;
  return false;
}

const teamCodes = teams.map((t) => t.code);
const groupLetters = groups.map((g) => g.name);

const groupPredictionSchema = z.object({
  first: z.string().refine((c) => teamCodes.includes(c)),
  second: z.string().refine((c) => teamCodes.includes(c)),
  third: z.string().refine((c) => teamCodes.includes(c)),
});

const predictionSchema = z.object({
  nickname: z.string().min(1).max(30).trim(),
  groupPredictions: z.record(
    z.string().refine((k) => groupLetters.includes(k)),
    groupPredictionSchema
  ),
  knockoutPredictions: z.record(z.string(), z.string()),
  champion: z.string().refine((c) => teamCodes.includes(c)),
});

export async function POST(request: Request) {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0] || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many predictions. Try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = predictionSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid prediction data", details: result.error.issues },
        { status: 400 }
      );
    }

    const { nickname, groupPredictions, knockoutPredictions, champion } =
      result.data;
    const id = generateId();

    const db = await ensureDb();
    await db.execute({
      sql: `INSERT INTO predictions (id, nickname, group_predictions, knockout_predictions, champion, ip_address, user_agent)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
      args: [
        id,
        nickname,
        JSON.stringify(groupPredictions),
        JSON.stringify(knockoutPredictions),
        champion,
        ip,
        request.headers.get("user-agent") || "",
      ],
    });

    return NextResponse.json({ id, shareUrl: `/world-cup/${id}` });
  } catch (error) {
    console.error("Error saving prediction:", error);
    return NextResponse.json(
      { error: "Failed to save prediction." },
      { status: 500 }
    );
  }
}
