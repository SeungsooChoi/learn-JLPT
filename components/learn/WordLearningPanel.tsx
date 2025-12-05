'use client';

import { useEffect, useState } from 'react';
import { useLearningStore } from '@/lib/stores/learningStore';
import WordCard from './WordCard';
import ProgressBar from './Progressbar';
import { JLPTWord, ReviewQuality } from '@/types/word';

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
        <h2 className="text-2xl font-semibold">세션 완료</h2>
        <p className="text-lg">
          오늘 진행도: <span className="font-bold text-blue-600">{Math.min(todayCount + words.length, dailyGoal)}</span>{' '}
          / {dailyGoal}
        </p>
        {/* 아직 목표 미달성 시 '계속하기' 버튼 표시 가능? */}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-6">
      <div className="w-full space-y-2 px-4">
        <ProgressBar current={globalProgress} total={dailyGoal} />
      </div>
      <WordCard word={currentWord} onRate={handleRate} isRating={isRating} />
    </div>
  );
}
