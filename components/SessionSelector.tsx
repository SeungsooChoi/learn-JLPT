'use client';

import { useWordStore } from '@/lib/stores/useWordStore';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

// 학습 세션 크기를 선택할 수 있는 컴포넌트
export function SessionSelector() {
  const { allWords, selectedSessionSize, setSelectedSessionSize } = useWordStore();
  const UNIT_SIZE = 50; // 학습 단위 크기 고정
  const totalWords = allWords.length;

  // 전체 단어가 없거나 50개 미만이면 선택기를 표시할 필요가 없음
  if (totalWords === 0) {
    return null;
  }

  const options = [];
  let currentAccumulatedSize = 0; // 현재 누적 단어 수

  while (currentAccumulatedSize < totalWords) {
    currentAccumulatedSize += UNIT_SIZE;
    const size = Math.min(currentAccumulatedSize, totalWords);
    options.push(size);
    if (size === totalWords) break;
  }

  return (
    <div className="pb-3 w-full">
      <h3 className="font-bold mb-3">학습 세션 선택 (총 {totalWords} 단어)</h3>

      <Select value={selectedSessionSize.toString()} onValueChange={(value) => setSelectedSessionSize(parseInt(value))}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="학습할 단어 수 선택" />
        </SelectTrigger>
        <SelectContent className="max-h-96">
          {options.map((size, index) => (
            <SelectItem key={size} value={size.toString()}>
              세션 {index + 1} ({size} 단어)
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
