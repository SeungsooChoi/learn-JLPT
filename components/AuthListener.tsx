"use client";

import { useAuthStore, User } from "@/lib/stores/authStore";
import { createClient } from "@/lib/supabase/client";
import { ReactNode, useEffect } from "react";

export default function AuthListener({ children }: { children: ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    const supabase = createClient();

    // 인증 상태 변화 감지 리스너
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user as User);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [setUser, setLoading]);

  return <>{children}</>;
}
