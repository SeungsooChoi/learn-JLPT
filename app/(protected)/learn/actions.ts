'use server';

import { calculateSM2 } from '@/lib/sm2';
import { createClient } from '@/lib/supabase/server';
import { JLPTWord, ReviewQuality } from '@/types/word';

const DAILY_GOAL = 30;

export type FetchWordsResult = {
  words: JLPTWord[];
  todayCount: number;
  dailyGoal: number;
  isGoalReached: boolean;
};

export async function fetchWords(level: string, userId: string): Promise<FetchWordsResult> {
  const supabase = await createClient();

  const todayStr = new Date().toISOString().split('T')[0];

  // 1. "해당 레벨"에서 오늘 학습한 단어 수 조회 (Inner Join 사용)
  // jlpt_words 테이블과 조인하여 level이 일치하는 기록만 카운트
  const { count: todayCount, error: countError } = await supabase
    .from('learning_records')
    .select('*, jlpt_words!inner(level)', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('jlpt_words.level', level) // 특정 레벨의 기록만 필터링
    .gte('last_reviewed_at', todayStr);

  if (countError) {
    console.error('Error fetching stats:', countError);
    return { words: [], todayCount: 0, dailyGoal: DAILY_GOAL, isGoalReached: false };
  }

  const currentCount = todayCount || 0;
  const remainingLimit = DAILY_GOAL - currentCount;

  // 2. 해당 레벨의 목표를 달성했는지 확인
  if (remainingLimit <= 0) {
    return {
      words: [],
      todayCount: currentCount,
      dailyGoal: DAILY_GOAL,
      isGoalReached: true,
    };
  }

  // 3. 남은 할당량만큼 단어 가져오기 (RPC는 이미 level 파라미터를 받고 있으므로 그대로 사용)
  const { data, error } = await supabase.rpc('fetch_words', {
    p_user_id: userId,
    p_level: level,
    p_limit: remainingLimit,
  });

  if (error) {
    console.error('Error fetching words via RPC:', error);
    return { words: [], todayCount: currentCount, dailyGoal: DAILY_GOAL, isGoalReached: false };
  }

  return {
    words: data as JLPTWord[],
    todayCount: currentCount,
    dailyGoal: DAILY_GOAL,
    isGoalReached: false,
  };
}

/**
 * 학습 평가 기록
 * SM-2 알고리즘 적용
 */
export async function recordReview(
  wordId: string,
  quality: ReviewQuality
): Promise<{
  success: boolean;
  interval: number;
  e_factor: number;
  repetitions: number;
  next_review_date: string;
}> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error('Not authenticated');

  // 기존 기록 조회
  const { data: existing } = await supabase
    .from('learning_records')
    .select('*')
    .eq('user_id', user.id)
    .eq('word_id', wordId)
    .single();

  // SM-2 계산
  const sm2Result = calculateSM2(
    quality,
    existing?.repetitions || 0, // 현재 repetitions
    existing?.interval_days || 0, // 현재 interval
    existing?.e_factor || 2.5, // 현재 EF
    existing?.last_reviewed_at ? new Date(existing.last_reviewed_at) : new Date()
  );

  // 데이터베이스 저장
  const { error } = await supabase.from('learning_records').upsert({
    user_id: user.id,
    word_id: wordId,
    e_factor: sm2Result.e_factor,
    interval_days: sm2Result.interval,
    repetitions: sm2Result.repetitions, // SM-2 결과 사용
    next_review_date: sm2Result.next_review_date,
    last_reviewed_at: new Date().toISOString(),
    is_archived: false,
  });

  if (error) throw error;

  return {
    success: true,
    interval: sm2Result.interval,
    e_factor: sm2Result.e_factor,
    repetitions: sm2Result.repetitions,
    next_review_date: sm2Result.next_review_date,
  };
}
