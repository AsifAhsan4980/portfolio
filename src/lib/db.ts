import { createClient, type Client } from "@libsql/client";

let client: Client | null = null;
let initialized = false;

export function getDb(): Client {
  if (!client) {
    client = createClient({
      url: process.env.TURSO_DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
  }
  return client;
}

export async function ensureDb(): Promise<Client> {
  const db = getDb();
  if (!initialized) {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS predictions (
        id TEXT PRIMARY KEY,
        nickname TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        group_predictions TEXT NOT NULL,
        knockout_predictions TEXT NOT NULL,
        champion TEXT NOT NULL,
        ip_address TEXT,
        user_agent TEXT
      )
    `);
    await db.execute(
      "CREATE INDEX IF NOT EXISTS idx_predictions_created ON predictions(created_at)"
    );
    await db.execute(
      "CREATE INDEX IF NOT EXISTS idx_predictions_champion ON predictions(champion)"
    );
    // Migration: add advancing_thirds column
    try {
      await db.execute(
        "ALTER TABLE predictions ADD COLUMN advancing_thirds TEXT DEFAULT '[]'"
      );
    } catch {
      // Column already exists
    }
    initialized = true;
  }
  return db;
}
