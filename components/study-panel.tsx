'use client';

import { useEffect, useState } from 'react';
import { useWordStore } from '@/lib/stores/useWordStore';
import { Button } from '@/components/ui/button';
import { Word } from '@/types/word';
import ProgressBar from './progressbar';
import WordCard from './word-card';

export default function WordList({ initialWords }: { initialWords: Word[] }) {
  const { words, setWords, updateStatus } = useWordStore();
  const [index, setIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setWords(initialWords);
  }, [initialWords, setWords]);

  const current = words[index];
  const total = words.length;

  const handleAnswer = (status: Word['status']) => {
    if (!current) return;
    updateStatus(current.id, status);
    const nextIndex = index + 1;
    if (nextIndex >= total) {
      setIsFinished(true);
    } else {
      setIndex(nextIndex);
    }
  };

  if (!words.length) return <p className="text-center mt-10">단어를 불러오는 중...</p>;

  if (isFinished) {
    const understood = words.filter((w) => w.status === 'understood').length;
    const notUnderstood = words.filter((w) => w.status === 'not_understood').length;

    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
        <h2 className="text-2xl font-semibold">🎉 학습 완료!</h2>
        <p className="text-gray-600">
          전체 <strong>{total}</strong>개 단어 중 <span className="text-green-600 font-medium">{understood}</span>개
          이해함,
          <span className="text-red-500 font-medium"> {notUnderstood}</span>개 이해못함
        </p>

        <div className="flex gap-3 mt-4">
          {/* <Button onClick={handleRestart}>다시 학습하기</Button> */}
          <Button variant="outline" onClick={() => alert('이해못한 단어만 복습 기능은 다음 단계에서 추가됩니다.')}>
            이해못한 단어 복습
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
      <ProgressBar current={index + 1} total={total} />
      <WordCard word={current} />
      <div className="flex gap-4 mt-6">
        <Button variant="outline" onClick={() => handleAnswer('understood')}>
          이해함
        </Button>
        <Button variant="outline" onClick={() => handleAnswer('not_understood')}>
          이해못함
        </Button>
      </div>
    </div>
  );
}
