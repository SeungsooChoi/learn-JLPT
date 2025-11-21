'use server';

import { createClient } from '@/lib/supabase/server';
import { StudySession } from '@/lib/stores/useStatsStore'; // 필요 시 경로 조정

/**
 * 서버에 학습 세션 저장
 */
export async function saveSession(session: StudySession) {
  const supabase = await createClient();

  // 유저 인증 확인
  const { data: auth, error: authErr } = await supabase.auth.getUser();
  if (authErr || !auth.user) return { ok: false, error: 'Unauthorized' };

  const userId = auth.user.id;

  // 동일한 session.id 이면 업데이트
  const { error } = await supabase.from('study_sessions').upsert({
    user_id: userId,
    id: session.id,
    level: session.level,
    learned: session.learned, // 누적
    total: session.total,
    date: session.date,
  });

  if (error) {
    console.error('Save session error:', error);
    return { ok: false, error: error.message };
  }

  return { ok: true };
}
