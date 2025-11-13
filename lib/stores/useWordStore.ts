import { Word } from '@/types/word';
import { create } from 'zustand';

type WordState = {
  allWords: Word[];
  words: Word[];
  currentIndex: number;
  unknownWords: Word[];
  isReviewMode: boolean;
  setWords: (words: Word[]) => void;
  setKnown: () => void;
  setUnknown: () => void;
  startReview: () => void;
  resetStudy: () => void;
};

export const useWordStore = create<WordState>((set) => ({
  allWords: [],
  words: [],
  currentIndex: 0,
  unknownWords: [],
  isReviewMode: false,

  // 초기 단어 설정
  setWords: (words) =>
    set({
      allWords: words,
      words,
      currentIndex: 0,
      unknownWords: [],
      isReviewMode: false,
    }),

  // "이해함" - 다음 단어로 이동
  setKnown: () =>
    set((state) => ({
      ...state,
      currentIndex: state.currentIndex + 1,
    })),

  // "이해못함" - 모르는 단어 목록에 추가하고 다음으로
  setUnknown: () =>
    set((state) => {
      const currentWord = state.words[state.currentIndex];
      if (!currentWord) return state;

      const alreadyExists = state.unknownWords.some((w) => w.id === currentWord.id);

      const updatedUnknowns = alreadyExists ? state.unknownWords : [...state.unknownWords, currentWord];

      return {
        ...state,
        unknownWords: updatedUnknowns,
        currentIndex: state.currentIndex + 1,
      };
    }),

  // 복습 모드 시작
  startReview: () =>
    set((state) => {
      if (state.unknownWords.length === 0) return state;

      return {
        ...state,
        words: state.unknownWords,
        currentIndex: 0,
        unknownWords: [],
        isReviewMode: true,
      };
    }),

  // 최초 단어 목록으로 완전 리셋
  resetStudy: () =>
    set((state) => ({
      ...state,
      words: state.allWords,
      currentIndex: 0,
      unknownWords: [],
      isReviewMode: false,
    })),
}));
