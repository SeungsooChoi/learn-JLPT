'use client';

import { useEffect } from 'react';
import { useWordStore } from '@/lib/stores/useWordStore';
import { Button } from '@/components/ui/button';
import { Word } from '@/types/word';
import WordCard from './WordCard';
import StudyCompletedPanel from './StudyCompletePanel';
import ProgressBar from './Progressbar';

export default function StudyPanel({ level, initialWords }: { level: string; initialWords: Word[] }) {
  const { words, currentIndex, setLevel, setKnown, setUnknown, finishStudyAndRecord } = useWordStore();

  useEffect(() => {
    setLevel(level, initialWords);
  }, [initialWords, setLevel, level]);

  const currentWord = words[currentIndex];
  const total = words.length;

  /**
   * 학습 종료시 통계 세션 적용
   */
  useEffect(() => {
    const isFinished = !currentWord;
    if (isFinished) finishStudyAndRecord();
  }, [currentWord, finishStudyAndRecord]);

  if (!words.length) return <p className="text-center mt-10">단어를 불러오는 중...</p>;

  if (!currentWord) {
    return <StudyCompletedPanel total={total} level={level} initialWords={initialWords} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-6">
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
