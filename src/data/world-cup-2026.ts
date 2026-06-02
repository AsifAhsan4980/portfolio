export interface Team {
  code: string;
  name: string;
  flag: string;
  group: string;
}

export interface Group {
  name: string;
  teams: Team[];
}

export type KnockoutRound = "R32" | "R16" | "QF" | "SF" | "F";

export type KnockoutSource =
  | { type: "group"; group: string; position: 1 | 2 }
  | { type: "match"; matchId: string }
  | { type: "best_third"; pools: string[] };

export interface KnockoutMatch {
  id: string;
  round: KnockoutRound;
  matchNumber: number;
  sourceA: KnockoutSource;
  sourceB: KnockoutSource;
}

// All 48 confirmed teams — FIFA World Cup 2026
export const teams: Team[] = [
  // Group A
  { code: "MEX", name: "Mexico", flag: "🇲🇽", group: "A" },
  { code: "RSA", name: "South Africa", flag: "🇿🇦", group: "A" },
  { code: "KOR", name: "South Korea", flag: "🇰🇷", group: "A" },
  { code: "CZE", name: "Czechia", flag: "🇨🇿", group: "A" },

  // Group B
  { code: "CAN", name: "Canada", flag: "🇨🇦", group: "B" },
  { code: "BIH", name: "Bosnia & Herzegovina", flag: "🇧🇦", group: "B" },
  { code: "QAT", name: "Qatar", flag: "🇶🇦", group: "B" },
  { code: "SUI", name: "Switzerland", flag: "🇨🇭", group: "B" },

  // Group C
  { code: "BRA", name: "Brazil", flag: "🇧🇷", group: "C" },
  { code: "MAR", name: "Morocco", flag: "🇲🇦", group: "C" },
  { code: "HAI", name: "Haiti", flag: "🇭🇹", group: "C" },
  { code: "SCO", name: "Scotland", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", group: "C" },

  // Group D
  { code: "USA", name: "United States", flag: "🇺🇸", group: "D" },
  { code: "PAR", name: "Paraguay", flag: "🇵🇾", group: "D" },
  { code: "AUS", name: "Australia", flag: "🇦🇺", group: "D" },
  { code: "TUR", name: "Türkiye", flag: "🇹🇷", group: "D" },

  // Group E
  { code: "GER", name: "Germany", flag: "🇩🇪", group: "E" },
  { code: "CUW", name: "Curaçao", flag: "🇨🇼", group: "E" },
  { code: "CIV", name: "Ivory Coast", flag: "🇨🇮", group: "E" },
  { code: "ECU", name: "Ecuador", flag: "🇪🇨", group: "E" },

  // Group F
  { code: "NED", name: "Netherlands", flag: "🇳🇱", group: "F" },
  { code: "JPN", name: "Japan", flag: "🇯🇵", group: "F" },
  { code: "SWE", name: "Sweden", flag: "🇸🇪", group: "F" },
  { code: "TUN", name: "Tunisia", flag: "🇹🇳", group: "F" },

  // Group G
  { code: "BEL", name: "Belgium", flag: "🇧🇪", group: "G" },
  { code: "EGY", name: "Egypt", flag: "🇪🇬", group: "G" },
  { code: "IRN", name: "Iran", flag: "🇮🇷", group: "G" },
  { code: "NZL", name: "New Zealand", flag: "🇳🇿", group: "G" },

  // Group H
  { code: "ESP", name: "Spain", flag: "🇪🇸", group: "H" },
  { code: "CPV", name: "Cape Verde", flag: "🇨🇻", group: "H" },
  { code: "KSA", name: "Saudi Arabia", flag: "🇸🇦", group: "H" },
  { code: "URU", name: "Uruguay", flag: "🇺🇾", group: "H" },

  // Group I
  { code: "FRA", name: "France", flag: "🇫🇷", group: "I" },
  { code: "SEN", name: "Senegal", flag: "🇸🇳", group: "I" },
  { code: "IRQ", name: "Iraq", flag: "🇮🇶", group: "I" },
  { code: "NOR", name: "Norway", flag: "🇳🇴", group: "I" },

  // Group J
  { code: "ARG", name: "Argentina", flag: "🇦🇷", group: "J" },
  { code: "ALG", name: "Algeria", flag: "🇩🇿", group: "J" },
  { code: "AUT", name: "Austria", flag: "🇦🇹", group: "J" },
  { code: "JOR", name: "Jordan", flag: "🇯🇴", group: "J" },

  // Group K
  { code: "POR", name: "Portugal", flag: "🇵🇹", group: "K" },
  { code: "COD", name: "DR Congo", flag: "🇨🇩", group: "K" },
  { code: "UZB", name: "Uzbekistan", flag: "🇺🇿", group: "K" },
  { code: "COL", name: "Colombia", flag: "🇨🇴", group: "K" },

  // Group L
  { code: "ENG", name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", group: "L" },
  { code: "CRO", name: "Croatia", flag: "🇭🇷", group: "L" },
  { code: "GHA", name: "Ghana", flag: "🇬🇭", group: "L" },
  { code: "PAN", name: "Panama", flag: "🇵🇦", group: "L" },
];

// Build groups from teams
export const groups: Group[] = Array.from({ length: 12 }, (_, i) => {
  const letter = String.fromCharCode(65 + i);
  return {
    name: letter,
    teams: teams.filter((t) => t.group === letter),
  };
});

// Knockout bracket topology
// Based on confirmed FIFA 2026 bracket structure:
// - Group winners face 3rd-place qualifiers (variable pool)
// - Group runners-up face other runners-up
// - Two separate bracket paths that merge at the Final
export const knockoutMatches: KnockoutMatch[] = [
  // ── Round of 32 (16 matches) ──
  // Left bracket path
  { id: "R32-1", round: "R32", matchNumber: 1, sourceA: { type: "group", group: "A", position: 2 }, sourceB: { type: "group", group: "B", position: 2 } },
  { id: "R32-2", round: "R32", matchNumber: 2, sourceA: { type: "group", group: "C", position: 1 }, sourceB: { type: "group", group: "F", position: 2 } },
  { id: "R32-3", round: "R32", matchNumber: 3, sourceA: { type: "group", group: "E", position: 1 }, sourceB: { type: "best_third", pools: ["A", "B", "C", "D", "F"] } },
  { id: "R32-4", round: "R32", matchNumber: 4, sourceA: { type: "group", group: "F", position: 1 }, sourceB: { type: "group", group: "C", position: 2 } },
  { id: "R32-5", round: "R32", matchNumber: 5, sourceA: { type: "group", group: "E", position: 2 }, sourceB: { type: "group", group: "I", position: 2 } },
  { id: "R32-6", round: "R32", matchNumber: 6, sourceA: { type: "group", group: "I", position: 1 }, sourceB: { type: "best_third", pools: ["C", "D", "F", "G", "H"] } },
  { id: "R32-7", round: "R32", matchNumber: 7, sourceA: { type: "group", group: "A", position: 1 }, sourceB: { type: "best_third", pools: ["C", "E", "F", "H", "I"] } },
  { id: "R32-8", round: "R32", matchNumber: 8, sourceA: { type: "group", group: "L", position: 1 }, sourceB: { type: "best_third", pools: ["E", "H", "I", "J", "K"] } },

  // Right bracket path
  { id: "R32-9", round: "R32", matchNumber: 9, sourceA: { type: "group", group: "G", position: 1 }, sourceB: { type: "best_third", pools: ["A", "E", "H", "I", "J"] } },
  { id: "R32-10", round: "R32", matchNumber: 10, sourceA: { type: "group", group: "D", position: 1 }, sourceB: { type: "best_third", pools: ["B", "E", "F", "I", "J"] } },
  { id: "R32-11", round: "R32", matchNumber: 11, sourceA: { type: "group", group: "H", position: 1 }, sourceB: { type: "group", group: "J", position: 2 } },
  { id: "R32-12", round: "R32", matchNumber: 12, sourceA: { type: "group", group: "K", position: 2 }, sourceB: { type: "group", group: "L", position: 2 } },
  { id: "R32-13", round: "R32", matchNumber: 13, sourceA: { type: "group", group: "B", position: 1 }, sourceB: { type: "best_third", pools: ["E", "F", "G", "I", "J"] } },
  { id: "R32-14", round: "R32", matchNumber: 14, sourceA: { type: "group", group: "D", position: 2 }, sourceB: { type: "group", group: "G", position: 2 } },
  { id: "R32-15", round: "R32", matchNumber: 15, sourceA: { type: "group", group: "J", position: 1 }, sourceB: { type: "group", group: "H", position: 2 } },
  { id: "R32-16", round: "R32", matchNumber: 16, sourceA: { type: "group", group: "K", position: 1 }, sourceB: { type: "best_third", pools: ["D", "E", "I", "J", "L"] } },

  // ── Round of 16 (8 matches) ──
  { id: "R16-1", round: "R16", matchNumber: 1, sourceA: { type: "match", matchId: "R32-1" }, sourceB: { type: "match", matchId: "R32-2" } },
  { id: "R16-2", round: "R16", matchNumber: 2, sourceA: { type: "match", matchId: "R32-3" }, sourceB: { type: "match", matchId: "R32-4" } },
  { id: "R16-3", round: "R16", matchNumber: 3, sourceA: { type: "match", matchId: "R32-5" }, sourceB: { type: "match", matchId: "R32-6" } },
  { id: "R16-4", round: "R16", matchNumber: 4, sourceA: { type: "match", matchId: "R32-7" }, sourceB: { type: "match", matchId: "R32-8" } },
  { id: "R16-5", round: "R16", matchNumber: 5, sourceA: { type: "match", matchId: "R32-9" }, sourceB: { type: "match", matchId: "R32-10" } },
  { id: "R16-6", round: "R16", matchNumber: 6, sourceA: { type: "match", matchId: "R32-11" }, sourceB: { type: "match", matchId: "R32-12" } },
  { id: "R16-7", round: "R16", matchNumber: 7, sourceA: { type: "match", matchId: "R32-13" }, sourceB: { type: "match", matchId: "R32-14" } },
  { id: "R16-8", round: "R16", matchNumber: 8, sourceA: { type: "match", matchId: "R32-15" }, sourceB: { type: "match", matchId: "R32-16" } },

  // ── Quarter-Finals (4 matches) ──
  { id: "QF-1", round: "QF", matchNumber: 1, sourceA: { type: "match", matchId: "R16-1" }, sourceB: { type: "match", matchId: "R16-2" } },
  { id: "QF-2", round: "QF", matchNumber: 2, sourceA: { type: "match", matchId: "R16-3" }, sourceB: { type: "match", matchId: "R16-4" } },
  { id: "QF-3", round: "QF", matchNumber: 3, sourceA: { type: "match", matchId: "R16-5" }, sourceB: { type: "match", matchId: "R16-6" } },
  { id: "QF-4", round: "QF", matchNumber: 4, sourceA: { type: "match", matchId: "R16-7" }, sourceB: { type: "match", matchId: "R16-8" } },

  // ── Semi-Finals (2 matches) ──
  { id: "SF-1", round: "SF", matchNumber: 1, sourceA: { type: "match", matchId: "QF-1" }, sourceB: { type: "match", matchId: "QF-2" } },
  { id: "SF-2", round: "SF", matchNumber: 2, sourceA: { type: "match", matchId: "QF-3" }, sourceB: { type: "match", matchId: "QF-4" } },

  // ── Final ──
  { id: "F", round: "F", matchNumber: 1, sourceA: { type: "match", matchId: "SF-1" }, sourceB: { type: "match", matchId: "SF-2" } },
];

export const roundNames: Record<KnockoutRound, string> = {
  R32: "Round of 32",
  R16: "Round of 16",
  QF: "Quarter-Finals",
  SF: "Semi-Finals",
  F: "Final",
};

export function getTeamByCode(code: string): Team | undefined {
  return teams.find((t) => t.code === code);
}
