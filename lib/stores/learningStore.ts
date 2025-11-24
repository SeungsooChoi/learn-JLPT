import { Word } from '@/types/word';
import { create } from 'zustand';

type LearningState = {
  words: Word[];
  currentIndex: number;
  isFinished: boolean;

  setWords: (words: Word[]) => void;
  next: () => void;
  reset: () => void;
};

export const useLearningStore = create<LearningState>((set, get) => ({
  words: [],
  currentIndex: 0,
  isFinished: false,

  setWords: (words) => set({ words, currentIndex: 0, isFinished: false }),

  next: () => {
    const { currentIndex, words } = get();
    if (currentIndex + 1 >= words.length) {
      set({ isFinished: true });
    } else {
      set({ currentIndex: currentIndex + 1 });
    }
  },

  reset: () => set({ currentIndex: 0, isFinished: false }),
}));
