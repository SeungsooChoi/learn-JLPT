import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { JLPTWord, ReviewQuality } from '@/types/word';
import { useState } from 'react';
import { Button } from './ui/button';

export default function WordCard({ word, onRate }: { word: JLPTWord; onRate: (quality: ReviewQuality) => void }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isRating, setIsRating] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleRate = (quality: ReviewQuality) => {
    setIsRating(true);
    onRate(quality);

    // 다음 카드
    setTimeout(() => {
      setIsFlipped(false);
      setIsRating(false);
    }, 300);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardDescription className="text-xl text-center">{word.reading}</CardDescription>
        <CardTitle className="text-2xl text-center">{word.word}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          onClick={handleFlip}
          className="cursor-pointer text-center min-h-16 bg-gradient-to-br from-slate-50 to-slate-100 p-6 transition-all"
        >
          {!isFlipped ? (
            <CardContent className="space-y-2 text-center">
              <p className="text-gray-500">클릭하여 의미 확인</p>
            </CardContent>
          ) : (
            <CardContent className="space-y-2 text-center">
              <p className="text-gray-700">{word.meaning_ko}</p>
            </CardContent>
          )}
        </div>
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
              onClick={() => handleRate(q)}
              disabled={isRating}
              variant="outline"
              size="sm"
              className="cursor-pointer"
            >
              {label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
