import { fetchStats } from '@/app/actions/stats/fetchStats';
import { saveSession } from '@/app/actions/stats/saveSession';
import { create } from 'zustand';

export type StudySession = {
  id: string;
  level: string;
  date: string;
  learned: number;
  total: number;
  known: string[];
  unknown: string[];
};

export type Stats = {
  totalLearned: number;
  levelStats: Record<string, number>;
  sessions: StudySession[];
};

type StatsState = {
  stats: Stats | null;
  loading: boolean;

  // actions
  fetchStats: () => Promise<void>;
  addSession: (session: StudySession) => Promise<void>;
  setStats: (s: Stats | null) => void;
};

export const useStatsStore = create<StatsState>((set, get) => ({
  stats: null,
  loading: false,

  fetchStats: async () => {
    set({ loading: true });
    try {
      const newStats = await fetchStats();
      set({ stats: newStats });
    } catch (e) {
      console.error('fetchStats exception', e);
      set({ stats: null });
    } finally {
      set({ loading: false });
    }
  },

  addSession: async (session) => {
    const result = await saveSession(session);

    if (!result.ok) {
      console.error('addSession failed', result);
      return;
    }

    // 서버에서 최신 stats 다시 가져오기
    const stats = await fetchStats();
    set({ stats });
  },

  setStats: (s) => set({ stats: s }),
}));
