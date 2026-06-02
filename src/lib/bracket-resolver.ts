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
  knockoutPreds: KnockoutPredictions
): ResolvedTeams {
  const resolved: ResolvedTeams = {};

  // Collect all third-place teams that the user picked
  const allThirds = new Map<string, string>(); // group -> teamCode
  for (const [group, pred] of Object.entries(groupPreds)) {
    if (pred?.third) allThirds.set(group, pred.third);
  }

  // Track which thirds have been assigned to bracket slots
  const assignedThirds = new Set<string>();

  const orderedRounds = ["R32", "R16", "QF", "SF", "F"] as const;

  for (const round of orderedRounds) {
    const roundMatches = knockoutMatches.filter((m) => m.round === round);
    for (const match of roundMatches) {
      resolved[match.id] = {
        teamA: resolveSource(
          match.sourceA,
          groupPreds,
          knockoutPreds,
          allThirds,
          assignedThirds
        ),
        teamB: resolveSource(
          match.sourceB,
          groupPreds,
          knockoutPreds,
          allThirds,
          assignedThirds
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
  allThirds: Map<string, string>,
  assignedThirds: Set<string>
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
      // Find first available third-place team from the pool
      for (const group of source.pools) {
        const team = allThirds.get(group);
        if (team && !assignedThirds.has(team)) {
          assignedThirds.add(team);
          return team;
        }
      }
      return null;
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
