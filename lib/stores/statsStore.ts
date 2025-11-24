import { create } from 'zustand';

// DB에서 가져올 수 있는 통계 요약 타입
export type GlobalStats = {
  totalLearnedWords: number;
  dailyStreak: number;
  monthlyReviewCounts: { month: string; count: number }[]; // 간단한 월별 그래프 데이터
};

export type StatsState = {
  globalStats: GlobalStats | null;
  sessionLearnedCount: number; // 현재 세션에서 학습 완료한 단어 수

  // Actions
  hydrateGlobalStats: (stats: GlobalStats) => void;
  incrementSessionCount: () => void;
  resetSessionCount: () => void;
};

export const useStatsStore = create<StatsState>((set) => ({
  globalStats: null,
  sessionLearnedCount: 0,

  hydrateGlobalStats: (stats) => set({ globalStats: stats }),

  incrementSessionCount: () =>
    set((state) => ({
      sessionLearnedCount: state.sessionLearnedCount + 1,
    })),

  resetSessionCount: () => set({ sessionLearnedCount: 0 }),
}));
