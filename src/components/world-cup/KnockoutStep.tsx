"use client";

import { useMemo, useState, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  knockoutMatches,
  roundNames,
  getTeamByCode,
  type KnockoutRound,
} from "@/data/world-cup-2026";
import type { GroupPredictions, KnockoutPredictions, AdvancingThirds } from "@/types/world-cup";
import {
  resolveKnockoutTeams,
  clearDownstreamPicks,
} from "@/lib/bracket-resolver";
import BracketMatch from "./BracketMatch";

interface Props {
  groupPredictions: GroupPredictions;
  advancingThirds?: AdvancingThirds;
  knockoutPredictions: KnockoutPredictions;
  setKnockoutPredictions: React.Dispatch<
    React.SetStateAction<KnockoutPredictions>
  >;
  onNext: () => void;
  onBack: () => void;
  readOnly?: boolean;
}

const ROUNDS: KnockoutRound[] = ["R32", "R16", "QF", "SF", "F"];

// Desktop bracket sizing
const SLOT_HEIGHT = 84;
const R32_COUNT = 16;
const BRACKET_HEIGHT = R32_COUNT * SLOT_HEIGHT;

export default function KnockoutStep({
  groupPredictions,
  advancingThirds,
  knockoutPredictions,
  setKnockoutPredictions,
  onNext,
  onBack,
  readOnly,
}: Props) {
  const [mobileRound, setMobileRound] = useState<KnockoutRound>("R32");
  const mobileRef = useRef<HTMLDivElement>(null);

  const goToRound = useCallback((round: KnockoutRound) => {
    setMobileRound(round);
    setTimeout(() => {
      mobileRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }, []);

  const resolvedTeams = useMemo(
    () => resolveKnockoutTeams(groupPredictions, knockoutPredictions, advancingThirds),
    [groupPredictions, knockoutPredictions, advancingThirds]
  );

  const handlePickWinner = (matchId: string, teamCode: string) => {
    setKnockoutPredictions((prev) => {
      const next = { ...prev };
      if (teamCode === "") {
        // Deselect: remove pick and clear downstream
        delete next[matchId];
      } else {
        next[matchId] = teamCode;
      }
      clearDownstreamPicks(matchId, next);
      return next;
    });
  };

  const totalMatches = knockoutMatches.length;
  const filledMatches = knockoutMatches.filter(
    (m) => !!knockoutPredictions[m.id]
  ).length;
  const bracketComplete = filledMatches === totalMatches;

  // Per-round fill counts
  const roundCounts = (round: KnockoutRound) => {
    const matches = knockoutMatches.filter((m) => m.round === round);
    const filled = matches.filter((m) => !!knockoutPredictions[m.id]).length;
    return { filled, total: matches.length };
  };

  const mobileRoundIdx = ROUNDS.indexOf(mobileRound);
  const mobileMatches = knockoutMatches.filter(
    (m) => m.round === mobileRound
  );
  const mobileRoundCounts = roundCounts(mobileRound);
  const mobileRoundComplete =
    mobileRoundCounts.filled === mobileRoundCounts.total;

  return (
    <div>
      {!readOnly && (
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-mono font-bold">Elimination Rounds</h2>
            <p className="text-xs text-muted-foreground font-mono mt-1">
              <span className="hidden md:inline">
                Click a team to advance them to the next round
              </span>
              <span className="md:hidden">
                Tap a team to advance them
              </span>
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-mono font-bold text-[#469D89]">
              {filledMatches}
            </span>
            <span className="text-sm font-mono text-muted-foreground">
              /{totalMatches}
            </span>
            <p className="text-[9px] font-mono text-muted-foreground">
              MATCHES
            </p>
          </div>
        </div>
      )}

      {/* ========== MOBILE: Round-by-round tab view ========== */}
      <div ref={mobileRef} className="md:hidden">
        {/* Round tabs */}
        <div className="flex gap-1 mb-4 overflow-x-auto">
          {ROUNDS.map((round) => {
            const counts = roundCounts(round);
            const isActive = mobileRound === round;
            const isDone = counts.filled === counts.total;
            return (
              <button
                key={round}
                onClick={() => goToRound(round)}
                className={`
                  flex flex-col items-center px-3 py-2 rounded-xl border font-mono text-xs shrink-0 transition-all
                  ${
                    isActive
                      ? "border-[#469D89]/60 bg-[#469D89]/15 text-[#469D89]"
                      : isDone
                        ? "border-[#469D89]/30 bg-[#469D89]/5 text-[#469D89]/70"
                        : "border-muted-foreground/20 text-muted-foreground"
                  }
                `}
              >
                <span className="font-bold text-[10px] tracking-wider">
                  {roundNames[round]}
                </span>
                <span className="text-[9px] mt-0.5">
                  {counts.filled}/{counts.total}
                </span>
              </button>
            );
          })}
        </div>

        {/* Round progress bar */}
        <div className="mb-4">
          <div className="h-1 bg-[#469D89]/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#469D89] rounded-full transition-all duration-300"
              style={{
                width: `${
                  mobileRoundCounts.total > 0
                    ? (mobileRoundCounts.filled / mobileRoundCounts.total) * 100
                    : 0
                }%`,
              }}
            />
          </div>
        </div>

        {/* Current round matches */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mobileRound}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {mobileMatches.map((match) => {
              const resolved = resolvedTeams[match.id];
              return (
                <BracketMatch
                  key={match.id}
                  match={match}
                  teamA={resolved?.teamA || null}
                  teamB={resolved?.teamB || null}
                  winner={knockoutPredictions[match.id] || null}
                  onPickWinner={handlePickWinner}
                  readOnly={readOnly}
                />
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Mobile round navigation */}
        {!readOnly && (
          <div className="flex justify-between mt-4">
            <button
              onClick={() => {
                if (mobileRoundIdx > 0) {
                  goToRound(ROUNDS[mobileRoundIdx - 1]);
                }
              }}
              disabled={mobileRoundIdx === 0}
              className="px-4 py-2 rounded-xl border border-[#469D89]/25 text-xs font-mono text-muted-foreground hover:text-foreground transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ← {mobileRoundIdx > 0 ? roundNames[ROUNDS[mobileRoundIdx - 1]] : ""}
            </button>
            <button
              onClick={() => {
                if (mobileRoundIdx < ROUNDS.length - 1) {
                  goToRound(ROUNDS[mobileRoundIdx + 1]);
                }
              }}
              disabled={mobileRoundIdx === ROUNDS.length - 1}
              className="px-4 py-2 rounded-xl border border-[#469D89]/25 text-xs font-mono text-muted-foreground hover:text-foreground transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {mobileRoundIdx < ROUNDS.length - 1
                ? roundNames[ROUNDS[mobileRoundIdx + 1]]
                : ""}{" "}
              →
            </button>
          </div>
        )}
      </div>

      {/* ========== DESKTOP: Horizontal aligned bracket ========== */}
      <div className="hidden md:block">
        <ScrollArea className="w-full">
          <div className="flex items-start gap-2 min-w-[1000px] px-4 py-4">
            {ROUNDS.map((round, roundIdx) => {
              const matches = knockoutMatches.filter(
                (m) => m.round === round
              );
              return (
                <div
                  key={round}
                  className="flex flex-col items-center shrink-0"
                >
                  <div className="mb-3 px-3 py-1 rounded-full border border-[#469D89]/40 bg-[#469D89]/10 shrink-0">
                    <span className="text-[9px] font-mono text-[#469D89] tracking-widest uppercase">
                      {roundNames[round]}
                    </span>
                  </div>

                  <div
                    className="flex flex-col"
                    style={{ height: BRACKET_HEIGHT }}
                  >
                    {matches.map((match, matchIdx) => {
                      const resolved = resolvedTeams[match.id];
                      return (
                        <div
                          key={match.id}
                          className="flex-1 flex items-center justify-center relative"
                        >
                          {roundIdx > 0 && (
                            <div
                              className="absolute left-0 top-1/2 -translate-y-px bg-[#469D89]/25"
                              style={{ width: 8, height: 1 }}
                            />
                          )}
                          {roundIdx < ROUNDS.length - 1 && (
                            <>
                              <div
                                className="absolute right-0 top-1/2 -translate-y-px bg-[#469D89]/25"
                                style={{ width: 8, height: 1 }}
                              />
                              {matchIdx % 2 === 0 ? (
                                <div
                                  className="absolute right-0 bg-[#469D89]/25"
                                  style={{
                                    width: 1,
                                    top: "50%",
                                    bottom: 0,
                                  }}
                                />
                              ) : (
                                <div
                                  className="absolute right-0 bg-[#469D89]/25"
                                  style={{
                                    width: 1,
                                    top: 0,
                                    bottom: "50%",
                                  }}
                                />
                              )}
                            </>
                          )}
                          <BracketMatch
                            match={match}
                            teamA={resolved?.teamA || null}
                            teamB={resolved?.teamB || null}
                            winner={knockoutPredictions[match.id] || null}
                            onPickWinner={handlePickWinner}
                            readOnly={readOnly}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Champion display */}
      {knockoutPredictions["F"] && (
        <div className="text-center mt-6 p-4 border border-[#469D89]/50 rounded-2xl bg-[#469D89]/10">
          <p className="text-[9px] font-mono text-[#469D89] tracking-widest uppercase mb-1">
            Your Champion
          </p>
          <p className="text-2xl">
            {(() => {
              const team = getTeamByCode(knockoutPredictions["F"]);
              return team
                ? `${team.flag} ${team.name}`
                : knockoutPredictions["F"];
            })()}
          </p>
          {!readOnly && bracketComplete && (
            <button
              onClick={onNext}
              className="mt-4 px-8 py-2.5 rounded-xl border border-[#469D89]/30 bg-[#469D89]/10 text-[#469D89] font-mono text-sm font-bold hover:bg-[#469D89]/20 hover:border-[#469D89]/50 transition-all duration-300"
            >
              Review & Submit →
            </button>
          )}
        </div>
      )}

      {!readOnly && (
        <div className="flex justify-between mt-8">
          <button
            onClick={onBack}
            className="px-6 py-2.5 rounded-xl border border-[#469D89]/30 text-foreground font-mono text-sm hover:border-[#469D89]/60 transition-all"
          >
            ← 3rd Place
          </button>
          <button
            onClick={onNext}
            disabled={!bracketComplete}
            className={`
              px-6 py-2.5 rounded-xl border font-mono text-sm font-bold transition-all duration-300
              ${
                bracketComplete
                  ? "border-[#469D89]/30 bg-[#469D89]/10 text-[#469D89] hover:bg-[#469D89]/20 hover:border-[#469D89]/50"
                  : "border-muted-foreground/30 text-muted-foreground/60 cursor-not-allowed"
              }
            `}
          >
            Review →
          </button>
        </div>
      )}
    </div>
  );
}
