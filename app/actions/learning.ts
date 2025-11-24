import { calculateNextReview, getNextReviewDate } from '@/lib/sm2';
import { createClient } from '@/lib/supabase/server';
import { Word } from '@/types/word';

export default async function updateLearningRecord(word: Word, quality: 0 | 1) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // TODO: 사용자 확인 필요?
  if (!user) return null;

  const sm2Result = calculateNextReview(word.repetitions, word.easeFactor, word.interval, quality);

  // 다음 복습 날짜 계산
  const nextReviewDate = getNextReviewDate(sm2Result.interval);

  const { data, error } = await supabase.from('learning_records').upsert({
    user_id: user.id,
    word_id: word.id,
    repetitions: sm2Result.repetitions,
    e_factor: sm2Result.easeFactor,
    interval: sm2Result.interval,
    next_review_date: nextReviewDate,
  });

  console.log(data, error);
}
