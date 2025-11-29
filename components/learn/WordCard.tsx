import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { JLPTWord, ReviewQuality } from '@/types/word';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Volume2Icon } from 'lucide-react';
import { useAudio } from '@/hooks/useAudio';

export default function WordCard({
  word,
  onRate,
}: {
  word: JLPTWord;
  onRate: (quality: ReviewQuality) => void;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isRating, setIsRating] = useState(false);
  const { play, stop } = useAudio();

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

  const handlePlay = (word: string | null) => {
    if (word) play(word);
  };

  return (
    <Card className="w-full max-w-md mx-auto gap-2">
      <CardHeader>
        <CardDescription className="text-xl text-center">
          {word.reading}
        </CardDescription>
        <CardTitle className="text-2xl text-center">{word.word}</CardTitle>
        <CardDescription className="text-center text-black">
          <Button
            type="button"
            variant="ghost"
            className="cursor-pointer"
            onClick={() => play(word.reading)}
          >
            <Volume2Icon />
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isFlipped ? (
          <div
            onClick={handleFlip}
            className="cursor-pointer text-center min-h-16 bg-linear-to-br from-slate-50 to-slate-100 p-6 transition-all"
          >
            <CardContent className="space-y-2 text-center">
              <p className="text-gray-500">클릭하여 의미 확인</p>
            </CardContent>
          </div>
        ) : (
          <CardContent className="space-y-2 text-left px-0">
            <p className="text-black text-center">{word.meaning_ko}</p>
            <div className="flex flex-row justify-start items-center">
              <div>
                <div>{word.example_ja}</div>
                <div>{word.example_ko}</div>
              </div>

              {word.example_ja && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="cursor-pointer ml-2"
                  onClick={() => handlePlay(word.example_ja)}
                >
                  <Volume2Icon />
                </Button>
              )}
            </div>
          </CardContent>
        )}

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
