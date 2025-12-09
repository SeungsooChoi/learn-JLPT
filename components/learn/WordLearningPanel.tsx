'use client';

import { useEffect, useState } from 'react';
import { useLearningStore } from '@/lib/stores/learningStore';
import WordCard from './WordCard';
import ProgressBar from './Progressbar';
import { JLPTWord, ReviewQuality } from '@/lib/types';
import { Button } from '../ui/button';

interface WordLearningPanelProps {
  initialWords: JLPTWord[];
  todayCount: number;
  dailyGoal: number;
  isGoalReached: boolean;
  level: string;
}

export function WordLearningPanel({
  initialWords,
  todayCount,
  dailyGoal,
  isGoalReached,
  level,
}: WordLearningPanelProps) {
  const { words, currentIndex, isFinished, setWords, recordAndNext } = useLearningStore();
  const [isRating, setIsRating] = useState(false);

  useEffect(() => {
    setWords(initialWords);
  }, [initialWords, setWords]);

  const currentWord = words[currentIndex];

  // 전체 진행도: (오늘 이미 한 개수) + (현재 세션 진행 개수)
  // 단, currentIndex는 0부터 시작하므로 +1, 완료 시점 고려
  const sessionProgress = isFinished ? words.length : currentIndex + 1;
  const globalProgress = Math.min(todayCount + sessionProgress, dailyGoal);

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

  if (isGoalReached && initialWords.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
        <h2 className="text-2xl font-bold text-green-600">오늘의 목표 달성! 🎉</h2>
        <p className="text-gray-600">
          오늘 {level} 단계 할당량({dailyGoal}개)을 모두 학습했습니다.
          <br />
          다른 레벨을 학습하거나 내일 다시 도전해주세요!
        </p>
      </div>
    );
  }
  if (!words.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-4">
        <p className="text-center">학습할 단어를 불러오는 중이거나 없습니다.</p>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
        <h2 className="text-2xl font-bold text-green-600">{level} 단계 할당량 완료</h2>
        <p className="text-gray-600">
          오늘 {level} 단계 할당량({dailyGoal}개)을 모두 학습했습니다.
          <br />
          다른 레벨을 학습하거나 내일 다시 도전해주세요!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-6">
      <div className="w-full space-y-2 px-4">
        <ProgressBar current={globalProgress} total={dailyGoal} />
      </div>
      <WordCard word={currentWord} isRating={isRating} />
      {/* 평가 */}
      <div className="grid grid-cols-6 gap-2">
        {[
          { q: 0, label: '모름' },
          { q: 1, label: '어려움' },
          { q: 2, label: '겨우' },
          { q: 3, label: '보통' },
          { q: 4, label: '좋음' },
          { q: 5, label: '완벽' },
        ].map(({ q, label }) => (
          <Button
            key={q}
            onClick={() => handleRate(q as ReviewQuality)}
            disabled={isRating}
            variant="outline"
            size="sm"
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}
