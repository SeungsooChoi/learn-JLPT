import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { JLPTWord } from '@/types/word';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Volume2Icon } from 'lucide-react';
import { useAudio } from '@/hooks/useAudio';

export default function WordCard({ word, isRating }: { word: JLPTWord; isRating: boolean }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { play } = useAudio();

  const handleFlip = () => {
    if (!isRating) {
      setIsFlipped(true);
    }
  };

  const handlePlay = (word: string | null) => {
    if (word) play(word);
  };

  useEffect(() => {
    setIsFlipped(false);
  }, [word]);

  return (
    <Card className="w-full max-w-md mx-auto gap-2">
      <CardHeader>
        <CardDescription className="text-xl text-center">{word.reading}</CardDescription>
        <CardTitle className="text-2xl text-center">{word.word}</CardTitle>
        <CardDescription className="text-center text-black">
          <Button type="button" variant="ghost" onClick={() => play(word.reading)}>
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
            <p className="text-black text-center">
              {word.pos && `[${word.pos}] `}
              {word.meaning_ko}
            </p>
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
                  className="ml-2"
                  onClick={() => handlePlay(word.example_ja)}
                >
                  <Volume2Icon />
                </Button>
              )}
            </div>
          </CardContent>
        )}
      </CardContent>
    </Card>
  );
}
