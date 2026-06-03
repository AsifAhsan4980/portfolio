"use client";

import { motion } from "framer-motion";
import { groups, getTeamByCode } from "@/data/world-cup-2026";
import type { GroupPredictions, AdvancingThirds } from "@/types/world-cup";

interface Props {
  groupPredictions: GroupPredictions;
  advancingThirds: AdvancingThirds;
  setAdvancingThirds: React.Dispatch<React.SetStateAction<AdvancingThirds>>;
  onNext: () => void;
  onBack: () => void;
}

export default function ThirdPlaceStep({
  groupPredictions,
  advancingThirds,
  setAdvancingThirds,
  onNext,
  onBack,
}: Props) {
  const thirdPlaceTeams = groups
    .map((g) => {
      const pred = groupPredictions[g.name];
      const team = pred?.third ? getTeamByCode(pred.third) : null;
      return { group: g.name, team, code: pred?.third || "" };
    })
    .filter((t) => t.team);

  const selectedCount = advancingThirds.length;
  const allSelected = selectedCount === 8;

  const toggleGroup = (groupLetter: string) => {
    setAdvancingThirds((prev) => {
      if (prev.includes(groupLetter)) {
        return prev.filter((g) => g !== groupLetter);
      }
      if (prev.length >= 8) return prev;
      return [...prev, groupLetter];
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-lg font-mono font-bold">Third-Place Teams</h2>
          <p className="text-xs text-muted-foreground font-mono mt-1">
            Select 8 teams to advance to the Round of 32
          </p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-mono font-bold text-[#469D89]">
            {selectedCount}
          </span>
          <span className="text-sm font-mono text-muted-foreground">/8</span>
          <p className="text-[9px] font-mono text-muted-foreground">
            SELECTED
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-[#469D89]/15 rounded-full overflow-hidden mb-6">
        <motion.div
          className="h-full bg-[#469D89] rounded-full"
          animate={{ width: `${(selectedCount / 8) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-8">
        {thirdPlaceTeams.map(({ group, team, code }) => {
          const isSelected = advancingThirds.includes(group);
          const isDisabled = !isSelected && selectedCount >= 8;

          return (
            <motion.button
              key={group}
              onClick={() => toggleGroup(group)}
              disabled={isDisabled}
              whileHover={!isDisabled ? { scale: 1.02 } : undefined}
              whileTap={!isDisabled ? { scale: 0.98 } : undefined}
              className={`
                relative flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left transition-all duration-200
                ${
                  isSelected
                    ? "border-[#469D89]/60 bg-[#469D89]/10"
                    : isDisabled
                      ? "border-muted-foreground/15 opacity-40 cursor-not-allowed"
                      : "border-muted-foreground/25 hover:border-[#469D89]/40 hover:bg-[#469D89]/5"
                }
              `}
            >
              <span className="text-2xl">{team!.flag}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-mono font-medium truncate">
                  {team!.name}
                </p>
                <p className="text-[10px] font-mono text-muted-foreground">
                  Group {group} · {code}
                </p>
              </div>
              <div
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all
                  ${
                    isSelected
                      ? "border-[#469D89] bg-[#469D89] text-white"
                      : "border-muted-foreground/30"
                  }
                `}
              >
                {isSelected && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {selectedCount >= 8 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-xs font-mono text-[#469D89] mb-4"
        >
          4 teams eliminated · 8 teams advancing to Round of 32
        </motion.p>
      )}

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-2.5 rounded-xl border border-[#469D89]/30 text-foreground font-mono text-sm hover:border-[#469D89]/60 transition-all"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!allSelected}
          className={`
            px-6 py-2.5 rounded-xl border font-mono text-sm font-bold transition-all duration-300
            ${
              allSelected
                ? "border-[#469D89]/30 bg-[#469D89]/10 text-[#469D89] hover:bg-[#469D89]/20 hover:border-[#469D89]/50"
                : "border-muted-foreground/30 text-muted-foreground/60 cursor-not-allowed"
            }
          `}
        >
          Fill Bracket →
        </button>
      </div>
    </div>
  );
}
