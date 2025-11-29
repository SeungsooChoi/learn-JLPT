'use client';

import { useEffect } from 'react';
import { useLearningStore } from '@/lib/stores/learningStore';
import WordCard from './WordCard';
import ProgressBar from './Progressbar';
import { JLPTWord, ReviewQuality } from '@/types/word';
import { recordReview } from '@/app/(protected)/learn/actions';

export function WordLearningPanel({ initialWords }: { initialWords: JLPTWord[] }) {
  const { words, currentIndex, isFinished, setWords, next } = useLearningStore();

  useEffect(() => {
    setWords(initialWords);
  }, [initialWords, setWords]);

  const currentWord = words[currentIndex];
  const totalWordsCount = words.length;

  const handleRate = async (quality: ReviewQuality) => {
    if (!words[currentIndex]) return;

    try {
      await recordReview(words[currentIndex].id, quality);
      next();
    } catch (error) {
      console.error(error);
    }
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
      <WordCard word={currentWord} onRate={handleRate} />
    </div>
  );
}
