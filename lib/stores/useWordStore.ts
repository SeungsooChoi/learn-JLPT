import { StudyRecord, Word } from '@/types/word';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useStatsStore } from './useStatsStore';

const UNIT_SIZE = 50;

type WordState = {
  // 실시간 학습 상태
  allWords: Word[]; // 서버에서 가져온 전체 단어 목록
  words: Word[]; // 현재 선택된 세션 단어 목록
  currentIndex: number; // 현재 세션 내의 인덱스
  isReviewMode: boolean;
  currentLevel: string;
  selectedSessionSize: number; // 선택된 누적 단어 수

  // === 영구 학습 기록 ===
  history: Record<string, StudyRecord>;

  // === 메서드 ===
  initializeStudy: (level: string, words: Word[]) => void; // setLevel 대체 예정
  setSelectedSessionSize: (size: number) => void;
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
      allWords: [],
      words: [],
      currentIndex: 0,
      isReviewMode: false,
      currentLevel: '',
      selectedSessionSize: 0,
      history: {},

      initializeStudy(level, initialWords) {
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
        const initialSessionSize = Math.min(UNIT_SIZE, initialWords.length);

        // 현재 학습 세션의 시작 인덱스를 history의 lastIndex 기준으로 설정
        // lastIndex는 allwords 기준임.
        const sessionWords = initialWords.slice(0, initialSessionSize);

        set({
          currentLevel: level,
          allWords: initialWords, // 전체 단어 저장
          selectedSessionSize: initialSessionSize,
          words: sessionWords, // 슬라이싱된 단어 목록

          // lastIndex를 sessionWords 내에서의 인덱스로 변환하여 시작
          currentIndex: Math.min(record.lastIndex, sessionWords.length),
          isReviewMode: false,
        });
      },
      setSelectedSessionSize(size) {
        const { allWords } = get();

        const newSize = Math.min(size, allWords.length);
        const sessionWords = allWords.slice(0, newSize);

        set({
          selectedSessionSize: newSize,
          words: sessionWords,
          currentIndex: 0,
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

          // allWords 내에서 현재 학습한 단어의 다음 인덱스를 lastIndex로 저장
          const allWordIndex = state.allWords.findIndex((w) => w.id === currentWord.id);
          const newLastIndex = allWordIndex + 1;

          return {
            ...state,
            currentIndex: newIndex,
            history: {
              ...state.history,
              [state.currentLevel]: {
                ...record,
                learned: [...record.learned, currentWord.id],
                unknown: record.unknown.filter((id) => id !== currentWord.id),
                lastIndex: newLastIndex,
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

          // allWords 내에서 현재 학습한 단어의 다음 인덱스를 lastIndex로 저장
          const allWordIndex = state.allWords.findIndex((w) => w.id === currentWord.id);
          const newLastIndex = allWordIndex + 1;

          return {
            ...state,
            currentIndex: newIndex,
            history: {
              ...state.history,
              [state.currentLevel]: {
                ...record,
                unknown: [...record.unknown, currentWord.id],
                learned: record.learned.filter((id) => id !== currentWord.id),
                lastIndex: newLastIndex,
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
          const initialSessionSize = Math.min(UNIT_SIZE, state.allWords.length);

          const sessionWords = state.allWords.slice(0, initialSessionSize);

          return {
            ...state,
            currentIndex: 0,
            isReviewMode: false,
            words: sessionWords,
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
      finishStudyAndRecord: async () => {
        const state = get();
        const { currentLevel, currentIndex, words, history, isReviewMode } = state;
        const record = history[currentLevel];
        console.log('record : ', record);
        if (!record) return;

        // 복습 모드이거나 모든 단어를 학습 완료시 기록한다.
        const isFinished = !isReviewMode && currentIndex >= words.length;
        console.log('!isReviewMode && !isFinished : ', !isReviewMode && !isFinished);

        if (!isReviewMode && !isFinished) return;

        const session = {
          // id/date는 서버에서 부여/사용해도 되지만 여기서 생성해도 무방
          id: crypto.randomUUID(),
          level: currentLevel,
          date: new Date().toISOString(),
          learned: record.learned.length,
          total: words.length,
          known: record.learned,
          unknown: record.unknown,
        };

        await useStatsStore.getState().addSession(session);
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
