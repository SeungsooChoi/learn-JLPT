'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

/**
 * Supabase에서 사용자 세션을 로그아웃 처리하고 로그인 페이지로 리디렉션합니다.
 */
export async function signOutAction() {
  const supabase = await createClient();

  // 1. 로그아웃 처리
  await supabase.auth.signOut();

  // 2. 캐시 무효화 및 리디렉션
  // 로그아웃 후 모든 인증된 페이지의 캐시를 무효화해야 합니다.
  revalidatePath('/', 'layout');
}
