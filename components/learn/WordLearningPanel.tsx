'use client';

import { useEffect, useState } from 'react';
import { useLearningStore } from '@/lib/stores/learningStore';
import WordCard from './WordCard';
import ProgressBar from './Progressbar';
import { JLPTWord, ReviewQuality } from '@/types/word';

export function WordLearningPanel({ initialWords }: { initialWords: JLPTWord[] }) {
  const { words, currentIndex, isFinished, setWords, recordAndNext } = useLearningStore();
  const [isRating, setIsRating] = useState(false);

  useEffect(() => {
    setWords(initialWords);
  }, [initialWords, setWords]);

  const currentWord = words[currentIndex];
  const totalWordsCount = words.length;

  const handleRate = async (quality: ReviewQuality) => {
    if (!words[currentIndex] || isRating) return;

    setIsRating(true);

    try {
      await recordAndNext(words[currentIndex].id, quality);
    } catch (error) {
      console.error(error);
    } finally {
      setIsRating(false);
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
      <WordCard word={currentWord} onRate={handleRate} isRating={isRating} />
    </div>
  );
}
