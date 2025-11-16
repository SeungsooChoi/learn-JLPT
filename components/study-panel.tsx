'use client';

import { useEffect } from 'react';
import { useWordStore } from '@/lib/stores/useWordStore';
import { Button } from '@/components/ui/button';
import { Word } from '@/types/word';
import ProgressBar from './progressbar';
import WordCard from './word-card';
import StudyCompletedPanel from './study-complete-panel';

export default function StudyPanel({ level, initialWords }: { level: string; initialWords: Word[] }) {
  const { words, currentIndex, setLevel, setKnown, setUnknown } = useWordStore();

  useEffect(() => {
    setLevel(level, initialWords);
  }, [initialWords, setLevel, level]);

  const currentWord = words[currentIndex];
  const total = words.length;

  if (!words.length) return <p className="text-center mt-10">단어를 불러오는 중...</p>;

  if (!currentWord) {
    return <StudyCompletedPanel total={total} level={level} initialWords={initialWords} />;
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
