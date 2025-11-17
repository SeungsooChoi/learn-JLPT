'use client';

import { useEffect } from 'react';
import { useWordStore } from '@/lib/stores/useWordStore';
import { Button } from '@/components/ui/button';
import { Word } from '@/types/word';
import WordCard from './WordCard';
import StudyCompletedPanel from './StudyCompletePanel';
import ProgressBar from './Progressbar';
import { SessionSelector } from './SessionSelector';

export default function StudyPanel({ level, initialWords }: { level: string; initialWords: Word[] }) {
  const {
    words: sessionWords,
    currentIndex,
    initializeStudy,
    setKnown,
    setUnknown,
    finishStudyAndRecord,
  } = useWordStore();

  useEffect(() => {
    initializeStudy(level, initialWords);
  }, [initialWords, initializeStudy, level]);

  const currentWord = sessionWords[currentIndex];
  const total = sessionWords.length;

  /**
   * 학습 종료시 통계 세션 적용
   */
  useEffect(() => {
    const isFinished = !currentWord;
    if (isFinished) finishStudyAndRecord();
  }, [currentWord, finishStudyAndRecord]);

  if (!sessionWords.length) return <p className="text-center mt-10">단어를 불러오는 중...</p>;

  if (!currentWord) {
    return <StudyCompletedPanel total={total} level={level} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-6">
      <SessionSelector />
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
