import { JLPTLevel, StudyRecord, Word } from '@/types/word';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useStatsStore } from './useStatsStore';

type WordState = {
  // 실시간 학습 상태
  words: Word[];
  currentIndex: number;
  isReviewMode: boolean;
  currentLevel: string;

  // === 영구 학습 기록 ===
  history: Record<string, StudyRecord>;

  // === 메서드 ===
  setLevel: (level: string, words: Word[]) => void;
  setKnown: () => void;
  setUnknown: () => void;
  startReview: () => void;
  resetStudy: () => void;
  resetLevel: (level: string) => void;
  getUnknownWords: () => Word[];
  finishStudyAndRecord: () => void;
};

export const useWordStore = create<WordState>()(
  persist(
    (set, get) => ({
      // 초기 상태
      words: [],
      currentIndex: 0,
      isReviewMode: false,
      currentLevel: '',
      history: {},

      // 레벨 설정/전환
      setLevel: (level, words) => {
        const { history } = get();

        // 히스토리에 없으면 생성
        if (!history[level]) {
          set({
            history: {
              ...history,
              [level]: {
                level,
                learned: [],
                unknown: [],
                lastIndex: 0,
                cycle: 1,
              },
            },
          });
        }

        const updatedHistory = get().history;
        const record = updatedHistory[level];

        // 실시간 상태 설정
        set({
          currentLevel: level,
          words,
          currentIndex: record.lastIndex,
          isReviewMode: false,
        });
      },

      // "이해함"
      setKnown: () => {
        set((state) => {
          const currentWord = state.words[state.currentIndex];
          if (!currentWord) return state;

          const record = state.history[state.currentLevel];
          if (!record) return state;

          const newIndex = state.currentIndex + 1;

          return {
            ...state,
            currentIndex: newIndex,
            history: {
              ...state.history,
              [state.currentLevel]: {
                ...record,
                learned: [...record.learned, currentWord.id],
                unknown: record.unknown.filter((id) => id !== currentWord.id),
                lastIndex: newIndex,
              },
            },
          };
        });
      },
      // "이해못함"
      setUnknown: () => {
        set((state) => {
          const currentWord = state.words[state.currentIndex];
          if (!currentWord) return state;

          const record = state.history[state.currentLevel];
          if (!record) return state;

          const newIndex = state.currentIndex + 1;

          return {
            ...state,
            currentIndex: newIndex,
            history: {
              ...state.history,
              [state.currentLevel]: {
                ...record,
                unknown: [...record.unknown, currentWord.id],
                learned: record.learned.filter((id) => id !== currentWord.id),
                lastIndex: newIndex,
              },
            },
          };
        });
      },

      // 복습 모드 시작
      startReview: () => {
        set((state) => {
          const unknownIds = state.history[state.currentLevel]?.unknown || [];
          const unknownWords = state.words.filter((w) => unknownIds.includes(w.id));

          if (unknownWords.length === 0) return state;

          return {
            ...state,
            words: unknownWords,
            currentIndex: 0,
            isReviewMode: true,
          };
        });
      },

      // 현재 레벨 리셋
      resetStudy: () => {
        set((state) => {
          const record = state.history[state.currentLevel];
          if (!record) return state;

          return {
            ...state,
            currentIndex: 0,
            isReviewMode: false,
            history: {
              ...state.history,
              [state.currentLevel]: {
                ...record,
                learned: [],
                unknown: [],
                lastIndex: 0,
                cycle: record.cycle + 1,
              },
            },
          };
        });
      },

      // 특정 레벨 리셋
      resetLevel: (level) => {
        const { history, currentLevel } = get();
        const record = history[level];

        set({
          history: {
            ...history,
            [level]: {
              level,
              learned: [],
              unknown: [],
              lastIndex: 0,
              cycle: (record?.cycle ?? 0) + 1,
            },
          },
        });

        // 현재 레벨이면 인덱스도 리셋
        if (currentLevel === level) {
          set({ currentIndex: 0, isReviewMode: false });
        }
      },

      // 모르는 단어 목록 가져오기
      getUnknownWords: () => {
        const { words, history, currentLevel } = get();
        const unknownIds = history[currentLevel]?.unknown || [];
        return words.filter((w) => unknownIds.includes(w.id));
      },

      /**
       * 학습 종료 및 세션 기록
       * @returns
       */
      finishStudyAndRecord: () => {
        const state = get();
        const { currentLevel, currentIndex, words, history, isReviewMode } = state;
        const record = history[currentLevel];

        if (!record) return;

        // 복습 모드이거나 모든 단어를 학습 완료시 기록한다.
        const isFinished = !isReviewMode && currentIndex >= words.length;

        if (!isReviewMode && !isFinished) return;

        // 학습 완료 후 세션 데이터 생성
        const session = {
          id: crypto.randomUUID(),
          level: currentLevel as JLPTLevel,
          date: new Date().toISOString(),
          learned: record.learned.length,
          total: words.length,
          known: record.learned,
          unknown: record.unknown,
        };

        useStatsStore.getState().addSession(session);
      },
    }),
    {
      name: 'jlpt-study-store',
      partialize: (state) => ({
        history: state.history,
      }),
    }
  )
);
