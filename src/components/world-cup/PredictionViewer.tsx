"use client";

import { useState } from "react";
import { groups, getTeamByCode, knockoutMatches } from "@/data/world-cup-2026";
import type { Prediction } from "@/types/world-cup";
import GroupCard from "./GroupCard";
import KnockoutStep from "./KnockoutStep";

interface Props {
  prediction: Prediction;
}

export default function PredictionViewer({ prediction }: Props) {
  const championTeam = getTeamByCode(prediction.champion);
  // Dummy setter for read-only knockout step
  const [_kp] = useState(prediction.knockoutPredictions);

  return (
    <div className="max-w-6xl mx-auto overflow-hidden">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-[9px] font-mono text-[#469D89] tracking-widest uppercase mb-1">
          Prediction by
        </p>
        <h2 className="text-2xl font-mono font-bold mb-4">
          {prediction.nickname}
        </h2>
        {championTeam && (
          <div className="inline-flex items-center gap-3 px-6 py-3 border border-[#469D89]/50 rounded-2xl bg-[#469D89]/10">
            <span className="text-3xl">{championTeam.flag}</span>
            <div>
              <p className="text-[9px] font-mono text-[#469D89] tracking-widest uppercase">
                Champion
              </p>
              <p className="font-mono font-bold text-[#469D89]">
                {championTeam.name}
              </p>
            </div>
          </div>
        )}
        <p className="text-[10px] font-mono text-muted-foreground mt-3">
          {new Date(prediction.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Groups */}
      <div className="mb-10">
        <h3 className="text-sm font-mono font-bold mb-4">
          Group Predictions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {groups.map((group) => (
            <GroupCard
              key={group.name}
              group={group}
              prediction={prediction.groupPredictions[group.name]}
              onChange={() => {}}
              readOnly
            />
          ))}
        </div>
      </div>

      {/* Bracket */}
      <div>
        <h3 className="text-sm font-mono font-bold mb-4">
          Elimination Rounds
        </h3>
        <KnockoutStep
          groupPredictions={prediction.groupPredictions}
          knockoutPredictions={prediction.knockoutPredictions}
          setKnockoutPredictions={() => {}}
          onNext={() => {}}
          onBack={() => {}}
          readOnly
        />
      </div>
    </div>
  );
}
