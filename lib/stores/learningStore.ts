import { recordReview } from '@/app/(protected)/learn/actions';
import { JLPTWord, ReviewQuality } from '@/types/word';
import { create } from 'zustand';

type LearningState = {
  words: JLPTWord[];
  currentIndex: number;
  isFinished: boolean;
  isLoading: boolean;
  error: string | null;
};

type LearningActions = {
  setWords: (words: JLPTWord[]) => void;
  reset: () => void;
  recordAndNext: (wordId: string, quality: ReviewQuality) => Promise<void>;
};

export const useLearningStore = create<LearningState & LearningActions>((set, get) => {
  const _next = () => {
    const { currentIndex, words } = get();
    if (currentIndex + 1 >= words.length) {
      set({ isFinished: true, error: null });
    } else {
      set({ currentIndex: currentIndex + 1, error: null });
    }
  };
  return {
    words: [],
    currentIndex: 0,
    isFinished: false,
    isLoading: false,
    error: null,

    setWords: (words) => set({ words, currentIndex: 0, isFinished: false }),

    reset: () => set({ currentIndex: 0, isFinished: false }),

    recordAndNext: async (wordId, quality) => {
      set({ isLoading: true, error: null }); // 로딩 시작 시 기존 에러 초기화
      try {
        await recordReview(wordId, quality);
        _next();
      } catch (error) {
        console.error('복습 기록 실패:', error);

        set({ error: '단어 평가 기록 중 오류가 발생했습니다. 다시 시도해 주세요.' });
      } finally {
        set({ isLoading: false });
      }
    },
  };
});
