import { Word } from '@/types/word';
import { create } from 'zustand';

type WordState = {
  words: Word[];
  setWords: (words: Word[]) => void;
  updateStatus: (id: number, status: Word['status']) => void;
};

export const useWordStore = create<WordState>((set) => ({
  words: [],
  setWords: (words) => set({ words }),
  updateStatus: (id, status) =>
    set((state) => ({
      words: state.words.map((word) => (word.id === id ? { ...word, status } : word)),
    })),
}));
