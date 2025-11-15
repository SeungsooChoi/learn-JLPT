'use client';

import { useEffect } from 'react';
import { useWordStore } from '@/lib/stores/useWordStore';
import { Button } from '@/components/ui/button';
import { Word } from '@/types/word';
import ProgressBar from './progressbar';
import WordCard from './word-card';

export default function StudyPanel({ level, initialWords }: { level: string; initialWords: Word[] }) {
  const {
    words,
    currentIndex,
    isReviewMode,
    setLevel,
    setKnown,
    setUnknown,
    startReview,
    resetLevel,
    getUnknownWords,
  } = useWordStore();

  useEffect(() => {
    setLevel(level, initialWords);
  }, [initialWords, setLevel, level]);

  const unknownWords = getUnknownWords();
  const currentWord = words[currentIndex];
  const total = words.length;

  if (!words.length) return <p className="text-center mt-10">단어를 불러오는 중...</p>;

  if (!currentWord) {
    const handleRestart = () => {
      resetLevel(level);
      setLevel(level, initialWords);
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
        <h2 className="text-2xl font-semibold"> {isReviewMode ? '복습 완료 🎉' : '학습 완료 🎉'}</h2>
        <p className="text-gray-600">
          총 <strong>{total}</strong>개 단어를 {isReviewMode ? '복습' : '학습'}했습니다!
        </p>

        <div className="flex flex-col gap-2">
          {/* 모르는 단어가 있으면 항상 복습 버튼 표시 */}
          {unknownWords.length > 0 && (
            <Button onClick={startReview} className="w-full">
              {isReviewMode ? '다시 복습하기' : '이해 못한 단어만 복습'} ({unknownWords.length}개)
            </Button>
          )}

          {/* 모든 단어를 이해했을 때만 표시 */}
          {unknownWords.length === 0 && <p className="text-green-600 font-medium">모든 단어를 이해했습니다! 🎊</p>}
          <Button variant="outline" onClick={handleRestart} className="w-full">
            처음부터 다시 학습하기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
      <ProgressBar current={currentIndex + 1} total={total} />
      <WordCard word={currentWord} />
      <div className="flex gap-4 mt-6">
        <Button variant="outline" onClick={setKnown}>
          이해함
        </Button>
        <Button variant="outline" onClick={setUnknown}>
          이해못함
        </Button>
      </div>
    </div>
  );
}
