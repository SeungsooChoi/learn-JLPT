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
  addSession: (session: Omit<StudySession, 'id' | 'date'>) => Promise<void>;
  setStats: (s: Stats | null) => void;
};

export const useStatsStore = create<StatsState>((set, get) => ({
  stats: null,
  loading: false,

  fetchStats: async () => {
    set({ loading: true });
    try {
      const res = await fetch('/api/stats/fetch', { method: 'GET' });
      const json = await res.json();
      if (json.ok) set({ stats: json.stats });
      else {
        console.error('fetchStats failed', json);
        set({ stats: null });
      }
    } catch (e) {
      console.error('fetchStats exception', e);
      set({ stats: null });
    } finally {
      set({ loading: false });
    }
  },

  addSession: async (session) => {
    try {
      // POST the session to server; server checks auth via cookies
      const res = await fetch('/api/stats/save', {
        method: 'POST',
        body: JSON.stringify({ session }),
        headers: { 'Content-Type': 'application/json' },
      });
      const json = await res.json();
      if (!json.ok) {
        console.error('addSession failed', json);
        return;
      }
      // 성공 시 최신화: 선택사항(다시 fetch 전체 or append)
      await get().fetchStats();
    } catch (e) {
      console.error('addSession exception', e);
    }
  },

  setStats: (s) => set({ stats: s }),
}));
