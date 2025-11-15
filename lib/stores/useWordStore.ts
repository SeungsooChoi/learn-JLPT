import { StudyRecord, Word } from '@/types/word';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

        const record = history[level];

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
          const { words, history, currentIndex, currentLevel } = get();
          const currentWord = words[currentIndex];
          if (!currentWord) return state;

          const record = history[currentLevel];
          if (!record) return state;

          const newIndex = currentIndex + 1;

          return {
            currentIndex: newIndex,
            history: {
              ...history,
              [currentLevel]: {
                ...record,
                learned: Array.from(new Set([...record.learned, currentWord.id])),
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
          const { words, history, currentIndex, currentLevel } = get();
          const currentWord = words[currentIndex];
          if (!currentWord) return state;

          const record = history[currentLevel];
          if (!record) return state;

          const newIndex = currentIndex + 1;

          return {
            currentIndex: newIndex,
            history: {
              ...history,
              [currentLevel]: {
                ...record,
                unknown: Array.from(new Set([...record.unknown, currentWord.id])),
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
          const { words, history, currentLevel } = get();
          const unknownWords = words.filter((w) => history[currentLevel]?.unknown.includes(w.id));

          if (unknownWords.length === 0) return state;

          return {
            words: unknownWords,
            currentIndex: 0,
            isReviewMode: true,
          };
        });
      },

      // 현재 레벨 리셋
      resetStudy: () => {
        set((state) => {
          const { history, currentLevel } = get();
          const record = history[currentLevel];
          if (!record) return state;

          return {
            currentIndex: 0,
            isReviewMode: false,
            history: {
              ...history,
              [currentLevel]: {
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
    }),
    {
      name: 'jlpt-study-store',
      partialize: (state) => ({
        history: state.history,
      }),
    }
  )
);
