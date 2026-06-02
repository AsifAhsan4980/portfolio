"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getTeamByCode } from "@/data/world-cup-2026";

interface Stats {
  totalPredictions: number;
  topChampions: { champion: string; count: number }[];
  recentPredictions: {
    id: string;
    nickname: string;
    champion: string;
    created_at: string;
  }[];
  groupFavorites: Record<string, { team: string; count: number }>;
}

export default function PredictionStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/world-cup/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block w-5 h-5 border-2 border-[#469D89]/40 border-t-[#469D89] rounded-full animate-spin" />
      </div>
    );
  }

  if (!stats || stats.totalPredictions === 0) return null;

  const maxChampCount = stats.topChampions[0]?.count || 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border border-[#469D89]/30 rounded-2xl p-6 bg-background/80 backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#469D89]/40" />
        <h3 className="text-sm font-mono font-bold tracking-widest uppercase text-[#469D89]">
          Community Predictions
        </h3>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#469D89]/40" />
      </div>

      {/* Total count */}
      <div className="text-center mb-8">
        <p className="text-4xl font-mono font-bold text-[#469D89]">
          {stats.totalPredictions}
        </p>
        <p className="text-xs font-mono text-muted-foreground mt-1">
          Total Predictions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top predicted champions */}
        <div>
          <h4 className="text-xs font-mono font-bold mb-4 text-muted-foreground tracking-widest uppercase">
            Most Predicted Champions
          </h4>
          <div className="space-y-2.5">
            {stats.topChampions.map((entry, i) => {
              const team = getTeamByCode(entry.champion);
              const pct = (entry.count / maxChampCount) * 100;
              return (
                <div key={entry.champion} className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-muted-foreground w-4 text-right">
                    {i + 1}
                  </span>
                  <span className="text-lg">{team?.flag || "🏳️"}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono font-medium truncate">
                        {team?.name || entry.champion}
                      </span>
                      <span className="text-[10px] font-mono text-[#469D89] font-bold ml-2 shrink-0">
                        {entry.count}
                      </span>
                    </div>
                    <div className="h-1.5 bg-[#469D89]/15 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                        className="h-full bg-[#469D89] rounded-full"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent predictions */}
        <div>
          <h4 className="text-xs font-mono font-bold mb-4 text-muted-foreground tracking-widest uppercase">
            Recent Predictions
          </h4>
          <div className="space-y-2">
            {stats.recentPredictions.map((pred) => {
              const team = getTeamByCode(pred.champion);
              return (
                <a
                  key={pred.id}
                  href={`/world-cup/${pred.id}`}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg border border-[#469D89]/20 hover:border-[#469D89]/50 hover:bg-[#469D89]/5 transition-all group"
                >
                  <span className="text-base">{team?.flag || "🏳️"}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-mono font-medium truncate group-hover:text-[#469D89] transition-colors">
                      {pred.nickname}
                    </p>
                    <p className="text-[10px] font-mono text-muted-foreground">
                      picked {team?.name || pred.champion}
                    </p>
                  </div>
                  <span className="text-[9px] font-mono text-muted-foreground shrink-0">
                    {formatTimeAgo(pred.created_at)}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Group favorites */}
      {Object.keys(stats.groupFavorites).length > 0 && (
        <div className="mt-8 pt-6 border-t border-[#469D89]/20">
          <h4 className="text-xs font-mono font-bold mb-4 text-muted-foreground tracking-widest uppercase">
            Most Predicted Group Winners
          </h4>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
            {Object.entries(stats.groupFavorites).map(
              ([groupName, { team: teamCode, count }]) => {
                const team = getTeamByCode(teamCode);
                return (
                  <div
                    key={groupName}
                    className="flex flex-col items-center gap-1 px-2 py-2.5 rounded-xl border border-[#469D89]/20 bg-[#469D89]/5"
                  >
                    <span className="text-[9px] font-mono text-[#469D89] tracking-widest">
                      GROUP {groupName}
                    </span>
                    <span className="text-lg">{team?.flag || "🏳️"}</span>
                    <span className="text-[10px] font-mono font-medium">
                      {team?.code || teamCode}
                    </span>
                    <span className="text-[9px] font-mono text-muted-foreground">
                      {count} pick{count !== 1 ? "s" : ""}
                    </span>
                  </div>
                );
              }
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}

function formatTimeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr + "Z");
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDays = Math.floor(diffHr / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}
