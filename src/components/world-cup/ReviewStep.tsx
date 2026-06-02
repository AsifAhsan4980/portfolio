"use client";

import { groups, getTeamByCode, knockoutMatches } from "@/data/world-cup-2026";
import type { GroupPredictions, KnockoutPredictions } from "@/types/world-cup";

interface Props {
  nickname: string;
  groupPredictions: GroupPredictions;
  knockoutPredictions: KnockoutPredictions;
  champion: string;
  onSave: () => void;
  saving: boolean;
  onBack: () => void;
}

export default function ReviewStep({
  nickname,
  groupPredictions,
  knockoutPredictions,
  champion,
  onSave,
  saving,
  onBack,
}: Props) {
  const championTeam = getTeamByCode(champion);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-lg font-mono font-bold mb-1">Review Your Prediction</h2>
      <p className="text-xs text-muted-foreground font-mono mb-6">
        Predicting as <span className="text-[#469D89] font-bold">{nickname}</span>
      </p>

      {/* Champion highlight */}
      {championTeam && (
        <div className="text-center p-6 mb-8 border border-[#469D89]/50 rounded-2xl bg-[#469D89]/10 shadow-[0_0_30px_rgba(70,157,137,0.15)]">
          <p className="text-[9px] font-mono text-[#469D89] tracking-widest uppercase mb-2">
            Your Predicted Champion
          </p>
          <p className="text-4xl mb-1">{championTeam.flag}</p>
          <p className="text-xl font-mono font-bold text-[#469D89]">
            {championTeam.name}
          </p>
        </div>
      )}

      {/* Groups summary */}
      <div className="mb-8">
        <h3 className="text-sm font-mono font-bold mb-3">
          Group Predictions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {groups.map((g) => {
            const pred = groupPredictions[g.name];
            if (!pred) return null;
            const t1 = getTeamByCode(pred.first);
            const t2 = getTeamByCode(pred.second);
            const t3 = getTeamByCode(pred.third);
            return (
              <div
                key={g.name}
                className="border border-[#469D89]/30 rounded-xl p-3 bg-background/80"
              >
                <span className="text-[9px] font-mono text-[#469D89] tracking-widest">
                  GROUP {g.name}
                </span>
                <div className="mt-1.5 space-y-0.5 text-xs font-mono">
                  <div>
                    1. {t1?.flag} {t1?.code}
                  </div>
                  <div>
                    2. {t2?.flag} {t2?.code}
                  </div>
                  <div className="text-muted-foreground">
                    3. {t3?.flag} {t3?.code}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Knockout path summary */}
      <div className="mb-8">
        <h3 className="text-sm font-mono font-bold mb-3">
          Elimination Path
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {(["SF", "QF", "R16"] as const).map((round) => {
            const matches = knockoutMatches.filter((m) => m.round === round);
            return matches.map((match) => {
              const winner = knockoutPredictions[match.id];
              const team = winner ? getTeamByCode(winner) : null;
              return (
                <div
                  key={match.id}
                  className="flex items-center gap-2 px-3 py-2 border border-[#469D89]/25 rounded-lg text-xs font-mono"
                >
                  <span className="text-[#469D89]">{match.id}</span>
                  <span>
                    {team?.flag} {team?.code || "—"}
                  </span>
                </div>
              );
            });
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-2.5 rounded-xl border border-[#469D89]/30 text-foreground font-mono text-sm hover:border-[#469D89]/60 transition-all"
        >
          ← Back
        </button>
        <button
          onClick={onSave}
          disabled={saving}
          className="px-8 py-2.5 rounded-xl border border-[#469D89]/50 bg-[#469D89]/15 text-[#469D89] font-mono text-sm font-bold hover:bg-[#469D89]/25 hover:border-[#469D89] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "Saving..." : "Save Prediction →"}
        </button>
      </div>
    </div>
  );
}
