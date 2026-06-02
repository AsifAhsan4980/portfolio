"use client";

import { motion } from "framer-motion";
import { getTeamByCode, type KnockoutMatch } from "@/data/world-cup-2026";

interface Props {
  match: KnockoutMatch;
  teamA: string | null;
  teamB: string | null;
  winner: string | null;
  onPickWinner: (matchId: string, teamCode: string) => void;
  readOnly?: boolean;
}

export default function BracketMatch({
  match,
  teamA,
  teamB,
  winner,
  onPickWinner,
  readOnly,
}: Props) {
  const tA = teamA ? getTeamByCode(teamA) : null;
  const tB = teamB ? getTeamByCode(teamB) : null;
  const canPick = !!teamA && !!teamB && !readOnly;
  const isFinal = match.round === "F";

  return (
    <div
      className={`
      w-full md:w-44 border rounded-xl overflow-hidden bg-background/80 backdrop-blur-sm shrink-0 transition-all duration-300
      ${
        isFinal
          ? "border-[#469D89]/60 shadow-[0_0_25px_rgba(70,157,137,0.25)]"
          : "border-[#469D89]/30"
      }
      ${winner ? "border-[#469D89]/50" : ""}
    `}
    >
      {/* Match header */}
      <div className="px-3 md:px-3 py-1.5 md:py-1 border-b border-[#469D89]/25 bg-[#469D89]/10">
        <span className="text-[10px] md:text-[8px] font-mono text-[#469D89] tracking-widest uppercase">
          {match.id}
        </span>
      </div>

      {/* Team A */}
      <button
        onClick={() =>
          canPick &&
          teamA &&
          onPickWinner(match.id, winner === teamA ? "" : teamA)
        }
        disabled={!canPick}
        className={`
          w-full flex items-center gap-2.5 md:gap-2 px-4 md:px-3 py-3 md:py-2 text-sm md:text-xs font-mono transition-all
          ${
            winner === teamA
              ? "bg-[#469D89]/20 text-[#469D89] font-bold"
              : "hover:bg-[#469D89]/10"
          }
          ${!canPick ? "opacity-60 cursor-default" : "cursor-pointer"}
        `}
      >
        <span className="text-lg md:text-base">{tA?.flag || "🏳️"}</span>
        <span className="md:hidden">{tA?.name || "TBD"}</span>
        <span className="hidden md:inline">{tA?.code || "TBD"}</span>
        {winner === teamA && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="ml-auto text-[#469D89]"
          >
            ✓
          </motion.span>
        )}
      </button>

      <div className="h-px bg-[#469D89]/25" />

      {/* Team B */}
      <button
        onClick={() =>
          canPick &&
          teamB &&
          onPickWinner(match.id, winner === teamB ? "" : teamB)
        }
        disabled={!canPick}
        className={`
          w-full flex items-center gap-2.5 md:gap-2 px-4 md:px-3 py-3 md:py-2 text-sm md:text-xs font-mono transition-all
          ${
            winner === teamB
              ? "bg-[#469D89]/20 text-[#469D89] font-bold"
              : "hover:bg-[#469D89]/10"
          }
          ${!canPick ? "opacity-60 cursor-default" : "cursor-pointer"}
        `}
      >
        <span className="text-lg md:text-base">{tB?.flag || "🏳️"}</span>
        <span className="md:hidden">{tB?.name || "TBD"}</span>
        <span className="hidden md:inline">{tB?.code || "TBD"}</span>
        {winner === teamB && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="ml-auto text-[#469D89]"
          >
            ✓
          </motion.span>
        )}
      </button>
    </div>
  );
}
