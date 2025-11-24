'use client';

import { useEffect } from 'react';
import { useLearningStore } from '@/lib/stores/learningStore';
import { Word } from '@/types/word';
import WordCard from './WordCard';
import ProgressBar from './Progressbar';
import { Button } from './ui/button';
import { createClient } from '@/lib/supabase/client';
import { calculateNextReview, getNextReviewDate } from '@/lib/sm2';

export function WordLearningPanel({ initialWords }: { initialWords: Word[] }) {
  const { words, currentIndex, isFinished, setWords, next } = useLearningStore();

  useEffect(() => {
    setWords(initialWords);
  }, [initialWords, setWords]);

  const currentWord = words[currentIndex];
  const totalWordsCount = words.length;

  const handleAnswer = async (quality: 0 | 1) => {
    console.log(currentWord, quality);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // TODO: 사용자 확인 필요?
    if (!user) return null;

    const sm2Result = calculateNextReview(
      currentWord.repetitions,
      currentWord.easeFactor,
      currentWord.interval_days,
      quality
    );

    // 다음 복습 날짜 계산
    const nextReviewDate = getNextReviewDate(sm2Result.interval_days);

    const { data, error } = await supabase
      .from('learning_records')
      .upsert({
        user_id: user.id,
        word_id: currentWord.id,
        repetitions: sm2Result.repetitions,
        e_factor: sm2Result.easeFactor,
        interval_days: sm2Result.interval_days,
        next_review_date: nextReviewDate,
      })
      .select();

    if (error) throw error;
    console.log(data);
    next();
  };

  if (!words.length) return <p className="text-center mt-10">단어를 불러오는 중...</p>;

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
        <h2 className="text-2xl font-semibold">오늘 학습 완료 🎉</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-6">
      <ProgressBar current={currentIndex + 1} total={totalWordsCount} />
      <WordCard word={currentWord} />
      <div className="flex gap-4">
        <Button variant="outline" onClick={() => handleAnswer(0)}>
          이해못함
        </Button>
        <Button variant="outline" onClick={() => handleAnswer(1)}>
          이해함
        </Button>
      </div>
    </div>
  );
}
