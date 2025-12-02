import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AnnouncementStore = {
  lastClosedId: string | null; // 사용자가 마지막으로 닫은 공지 ID
  isLoading: boolean;
  setLastClosedId: (id: string) => void;
  setLoading: (value: boolean) => void;
};

export const useAnnouncementStore = create<AnnouncementStore>()(
  persist(
    (set) => ({
      lastClosedId: null,
      isLoading: true, // 처음엔 로딩 중
      setLastClosedId: (id) => set({ lastClosedId: id }),
      setLoading: (value) => set({ isLoading: value }),
    }),
    {
      name: 'announcement',
      onRehydrateStorage: () => (state) => {
        state?.setLoading(false);
      },
    }
  )
);
