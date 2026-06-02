"use client";

import { groups } from "@/data/world-cup-2026";
import type { GroupPredictions, GroupPrediction } from "@/types/world-cup";
import GroupCard from "./GroupCard";

interface Props {
  groupPredictions: GroupPredictions;
  setGroupPredictions: React.Dispatch<React.SetStateAction<GroupPredictions>>;
  onNext: () => void;
  onBack: () => void;
}

export default function GroupStageStep({
  groupPredictions,
  setGroupPredictions,
  onNext,
  onBack,
}: Props) {
  const completedCount = groups.filter((g) => {
    const pred = groupPredictions[g.name];
    return pred?.first && pred?.second && pred?.third;
  }).length;

  const allComplete = completedCount === 12;

  const handleGroupChange = (groupName: string, pred: GroupPrediction) => {
    setGroupPredictions((prev) => ({ ...prev, [groupName]: pred }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-mono font-bold">Group Stage</h2>
          <p className="text-xs text-muted-foreground font-mono mt-1">
            Pick 1st, 2nd, and 3rd place for each group
          </p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-mono font-bold text-[#469D89]">
            {completedCount}
          </span>
          <span className="text-sm font-mono text-muted-foreground">/12</span>
          <p className="text-[9px] font-mono text-muted-foreground">
            GROUPS
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {groups.map((group) => (
          <GroupCard
            key={group.name}
            group={group}
            prediction={groupPredictions[group.name]}
            onChange={(pred) => handleGroupChange(group.name, pred)}
          />
        ))}
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-2.5 rounded-xl border border-[#469D89]/30 text-foreground font-mono text-sm hover:border-[#469D89]/60 transition-all"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!allComplete}
          className={`
            px-6 py-2.5 rounded-xl border font-mono text-sm font-bold transition-all duration-300
            ${
              allComplete
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
