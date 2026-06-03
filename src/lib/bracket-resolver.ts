import { knockoutMatches, type KnockoutSource } from "@/data/world-cup-2026";
import type { GroupPredictions, KnockoutPredictions } from "@/types/world-cup";

export type ResolvedTeams = Record<
  string,
  { teamA: string | null; teamB: string | null }
>;

/**
 * Given the user's group picks and knockout picks, resolve which teams
 * appear in each knockout match slot.
 *
 * For "best_third" sources, we pick the first available third-place team
 * from the allowed pool that hasn't already been assigned to another
 * third-place slot (greedy assignment in bracket order).
 */
export function resolveKnockoutTeams(
  groupPreds: GroupPredictions,
  knockoutPreds: KnockoutPredictions,
  advancingThirds?: string[]
): ResolvedTeams {
  const resolved: ResolvedTeams = {};

  // Collect third-place teams (only from advancing groups if specified)
  const allThirds = new Map<string, string>(); // group -> teamCode
  for (const [group, pred] of Object.entries(groupPreds)) {
    if (pred?.third) {
      if (!advancingThirds || advancingThirds.includes(group)) {
        allThirds.set(group, pred.third);
      }
    }
  }

  // Pre-compute optimal third-place assignment using backtracking
  // so all 8 best_third slots are filled if a valid assignment exists
  const thirdSlots: { matchId: string; side: "A" | "B"; pools: string[] }[] = [];
  const r32Matches = knockoutMatches.filter((m) => m.round === "R32");
  for (const match of r32Matches) {
    if (match.sourceA.type === "best_third") {
      thirdSlots.push({ matchId: match.id, side: "A", pools: match.sourceA.pools });
    }
    if (match.sourceB.type === "best_third") {
      thirdSlots.push({ matchId: match.id, side: "B", pools: match.sourceB.pools });
    }
  }

  const thirdAssignment = new Map<string, string>(); // "matchId:side" -> group
  const availableGroups = new Set(allThirds.keys());

  function backtrack(idx: number): boolean {
    if (idx === thirdSlots.length) return true;
    const slot = thirdSlots[idx];
    for (const group of slot.pools) {
      if (availableGroups.has(group)) {
        availableGroups.delete(group);
        thirdAssignment.set(`${slot.matchId}:${slot.side}`, group);
        if (backtrack(idx + 1)) return true;
        availableGroups.add(group);
        thirdAssignment.delete(`${slot.matchId}:${slot.side}`);
      }
    }
    return false;
  }
  backtrack(0);

  // Build a lookup: "matchId:side" -> teamCode
  const thirdLookup = new Map<string, string>();
  for (const [key, group] of thirdAssignment) {
    const team = allThirds.get(group);
    if (team) thirdLookup.set(key, team);
  }

  const orderedRounds = ["R32", "R16", "QF", "SF", "F"] as const;

  for (const round of orderedRounds) {
    const roundMatches = knockoutMatches.filter((m) => m.round === round);
    for (const match of roundMatches) {
      resolved[match.id] = {
        teamA: resolveSource(
          match.sourceA,
          groupPreds,
          knockoutPreds,
          thirdLookup,
          `${match.id}:A`
        ),
        teamB: resolveSource(
          match.sourceB,
          groupPreds,
          knockoutPreds,
          thirdLookup,
          `${match.id}:B`
        ),
      };
    }
  }

  return resolved;
}

function resolveSource(
  source: KnockoutSource,
  groupPreds: GroupPredictions,
  knockoutPreds: KnockoutPredictions,
  thirdLookup: Map<string, string>,
  slotKey: string
): string | null {
  switch (source.type) {
    case "group": {
      const gp = groupPreds[source.group];
      if (!gp) return null;
      return source.position === 1
        ? gp.first || null
        : gp.second || null;
    }
    case "match": {
      return knockoutPreds[source.matchId] || null;
    }
    case "best_third": {
      return thirdLookup.get(slotKey) || null;
    }
  }
}

/**
 * When a user changes a pick in an earlier round, clear all downstream
 * dependent picks recursively.
 */
export function clearDownstreamPicks(
  changedMatchId: string,
  predictions: KnockoutPredictions
): void {
  const dependents = knockoutMatches.filter(
    (m) =>
      (m.sourceA.type === "match" && m.sourceA.matchId === changedMatchId) ||
      (m.sourceB.type === "match" && m.sourceB.matchId === changedMatchId)
  );

  for (const dep of dependents) {
    if (predictions[dep.id]) {
      delete predictions[dep.id];
      clearDownstreamPicks(dep.id, predictions);
    }
  }
}
