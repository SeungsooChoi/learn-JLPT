import { supabase } from '@/lib/supabase/client';
import { create } from 'zustand';

export type User = {
  id: string;
  email?: string;
};

type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
  setUser: (user: User | null) => void; // ← 추가
  signUp: (email: string, password: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  setUser: (user) => set({ user }),
  signUp: async (email, password) => {
    set({ loading: true, error: null });

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    set({ loading: false });

    if (error || !data.user) {
      set({ error: error?.message ?? 'Signup failed' });
      return false;
    }

    return true;
  },

  /**
   * 로그인
   * @param email
   * @param password
   * @returns
   */
  login: async (email, password) => {
    set({ loading: true, error: null });

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    set({ loading: false });

    if (error || !data.user) {
      set({ error: error?.message ?? 'Login failed' });
      return false;
    }

    set({
      user: {
        id: data.user.id,
        email: data.user.email,
      },
    });
    return true;
  },

  /**
   * 로그아웃
   */
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));
