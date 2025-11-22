'use client';

import { useAuthStore } from '@/lib/stores/authStore';
import { createClient } from '@/lib/supabase/client';
import { useEffect } from 'react';

export default function AuthListener() {
  const setUser = useAuthStore((state) => state.setUser);
  const setAuthLoading = useAuthStore((state) => state.setAuthLoading);

  useEffect(() => {
    const supabase = createClient();

    // 1. 초기 세션 확인 후 로딩 상태 해제
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    // 2. 인증 상태 변화 감지 리스너 등록
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      // 이벤트가 발생할 때마다 Zustand 상태 업데이트
      setUser(session?.user ?? null);

      // 필요하다면 여기서 userProfile fetching 로직을 트리거할 수도 있습니다.
    });

    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      subscription?.unsubscribe();
    };
  }, [setUser, setAuthLoading]);

  // 이 컴포넌트는 UI를 렌더링하지 않습니다.
  return null;
}
