import { create } from "zustand";

type Recommendation = {
  programName: string;
  university: string;
  reason: string;
};

export type RecommendationState = {
  recommendations: Recommendation[];
  setRecommendations: (state: RecommendationState) => void;
  clearRecommendations: () => void;
};

export const useRecommendationState = create<RecommendationState>((set) => ({
  recommendations: [],
  setRecommendations: (state: RecommendationState) =>
    set(() => ({
      recommendations: state.recommendations,
    })),
  clearRecommendations: () => set(() => ({ recommendations: [] })),
}));
