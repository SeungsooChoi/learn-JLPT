'use server';

import { createClient } from '@/lib/supabase/server';
import { Stats, StudySession } from '@/lib/stores/useStatsStore';

export async function fetchStats(): Promise<Stats | null> {
  const supabase = await createClient();

  const { data: auth } = await supabase.auth.getUser();
  if (!auth?.user) return null;

  const userId = auth.user.id;

  const { data: rows, error } = await supabase
    .from('study_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: true });

  if (error || !rows) return null;

  // 레벨별 가장 최근 세션만
  const latestByLevel = new Map<string, StudySession>();

  for (const r of rows) {
    const prev = latestByLevel.get(r.level);

    // 이전 값이 없으면 넣기
    if (!prev) {
      latestByLevel.set(r.level, r);
      continue;
    }

    // 🔥 date 기준으로 최신 비교
    const prevTime = new Date(prev.date).getTime();
    const curTime = new Date(r.date).getTime();

    if (curTime > prevTime) {
      latestByLevel.set(r.level, r);
    }
  }

  const sessions = [...latestByLevel.values()];
  let totalLearned = 0;
  const levelStats: Record<string, number> = {
    N1: 0,
    N2: 0,
    N3: 0,
    N4: 0,
    N5: 0,
  };

  // 같은 session.id 가 있으면 이전 learned 참고
  const prevLearnedMap = new Map<string, number>();

  for (const s of sessions) {
    const prev = prevLearnedMap.get(s.id) ?? 0;
    const delta = Math.max(0, s.learned - prev);

    totalLearned += delta;
    levelStats[s.level] = (levelStats[s.level] || 0) + delta;

    prevLearnedMap.set(s.id, s.learned);
  }

  return {
    totalLearned,
    levelStats,
    sessions, // 그래프에서 delta 계산 시 필요
  };
}
