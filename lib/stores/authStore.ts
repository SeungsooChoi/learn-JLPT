import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface User {
  id: string
  email?: string
}

interface AuthStore {
  user: User | null
  isLoading: boolean
  
  setUser: (user: User | null) => void
  logout: () => void
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,

      setUser: (user) => set({ user, isLoading: false}),
      setLoading: (loading) => set({ isLoading: loading }),
      logout: () => set({ user: null, isLoading: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      
      partialize: (state) => ({
        user: state.user,
      }),

      onRehydrateStorage: () => (state) => {
        state?.setLoading(false)
      },
    }
  )
)