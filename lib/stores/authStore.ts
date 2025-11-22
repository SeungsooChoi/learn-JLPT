import { create } from 'zustand';
import type { User } from '@supabase/supabase-js';

// DB UserProfile 스키마 타입
export type UserProfile = {
  id: string;
  username: string | null;
  current_jlpt_level: string | null;
};

export type AuthState = {
  user: User | null;
  userProfile: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setAuthLoading: (loading: boolean) => void;
  setUser: (user: User | null) => void;
  setUserProfile: (profile: UserProfile | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  userProfile: null,
  isAuthenticated: false,
  isLoading: true, // 초기 로딩 상태는 true로 설정 (Supabase 세션 확인 대기)

  setAuthLoading: (loading) => set({ isLoading: loading }),

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      // 사용자가 로그아웃하면 프로필 정보도 제거
      userProfile: user ? useAuthStore.getState().userProfile : null,
    }),

  setUserProfile: (profile) => set({ userProfile: profile }),
}));
