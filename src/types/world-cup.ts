import type { KnockoutRound } from "@/data/world-cup-2026";

export interface GroupPrediction {
  first: string;
  second: string;
  third: string;
}

export type GroupPredictions = Record<string, GroupPrediction>;

// matchId -> winning team code
export type KnockoutPredictions = Record<string, string>;

export interface Prediction {
  id: string;
  nickname: string;
  createdAt: string;
  groupPredictions: GroupPredictions;
  knockoutPredictions: KnockoutPredictions;
  champion: string;
}

export type WizardStep = "nickname" | "groups" | "knockout" | "review" | "saved";
