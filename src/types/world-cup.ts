import type { KnockoutRound } from "@/data/world-cup-2026";

export interface GroupPrediction {
  first: string;
  second: string;
  third: string;
}

export type GroupPredictions = Record<string, GroupPrediction>;

// matchId -> winning team code
export type KnockoutPredictions = Record<string, string>;

// Group letters whose third-place teams advance (exactly 8 of 12)
export type AdvancingThirds = string[];

export interface Prediction {
  id: string;
  nickname: string;
  createdAt: string;
  groupPredictions: GroupPredictions;
  advancingThirds: AdvancingThirds;
  knockoutPredictions: KnockoutPredictions;
  champion: string;
}

export type WizardStep = "nickname" | "groups" | "thirds" | "knockout" | "review" | "saved";
