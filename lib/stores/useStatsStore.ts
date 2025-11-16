import { JLPTLevel } from '@/types/word';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type StudySession = {
  id: string; // uuid
  level: JLPTLevel; // N1~N5
  date: string; // ISO string
  learned: number; // 이번 회독에서 '이해함' 처리한 단어 수
  total: number; // 전체 단어 수 (회독 대상)
  known: string[]; // knownWords의 id 목록
  unknown: string[]; // unknownWords의 id 목록
};

export type Stats = {
  totalLearned: number;
  levelStats: Record<JLPTLevel, number>;
  sessions: StudySession[]; // 날짜, 레벨별 기록
};

type StatsState = {
  env: 'local' | 'server';

  localStats: Stats;
  serverStats: Stats | null;

  addSession: (session: StudySession) => void; // 학습 종료시 기록
  setServerStats: (stats: Stats) => void;

  switchToServer: () => void; // 로그인
  switchToLocal: () => void; // 로그아웃 상태
};

export const useStatsStore = create<StatsState>()(
  persist(
    (set) => ({
      env: 'local',
      localStats: { totalLearned: 0, levelStats: { N1: 0, N2: 0, N3: 0, N4: 0, N5: 0 }, sessions: [] },
      serverStats: null,

      addSession: (session) => {
        set((state) => {
          const target = state.env === 'local' ? 'localStats' : 'serverStats';
          const current = state[target];

          if (!current) return state;

          const newTotalLearned = current.totalLearned + session.learned;
          const newLevelStats = {
            ...current.levelStats,
            [session.level]: (current.levelStats[session.level] || 0) + session.learned,
          };

          const newSessions = [...current.sessions, session];

          // 업데이트된 통계 객체
          const updated = {
            ...current,
            totalLearned: newTotalLearned,
            levelStats: newLevelStats,
            sessions: newSessions,
          };

          return {
            ...state,
            [target]: updated,
          };
        });
      },
      setServerStats: (stats) => {
        set((state) => ({
          ...state,
          serverStats: stats,
        }));
      },
      switchToServer: () => {
        set((state) => ({
          ...state,
          env: 'server',
        }));
      },
      switchToLocal: () => {
        set((state) => ({
          ...state,
          env: 'local',
        }));
      },
    }),
    {
      name: 'jlpt-stats',
    }
  )
);
