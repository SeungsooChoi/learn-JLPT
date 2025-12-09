'use client';

import { Volume2Icon } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { useAudio } from '@/hooks/useAudio';

interface SokuonWord {
  hiragana: string;
  katakana: string;
  romaji: string;
  kanji: string;
}

export default function WordSokuon({ type = 'hiragana' }: { type: string }) {
  const { play } = useAudio();

  const SOKUON_EXAMPLES: SokuonWord[] = [
    { hiragana: 'がっこう', katakana: 'ガッコウ', romaji: 'gakkou', kanji: '学校' },
    { hiragana: 'きっぷ', katakana: 'キップ', romaji: 'kippu', kanji: '切符' },
    { hiragana: 'ずっと', katakana: 'ズット', romaji: 'zutto', kanji: 'ずっと' },
    { hiragana: 'まっすぐ', katakana: 'マッスグ', romaji: 'massugu', kanji: '真っ直ぐ' },
  ];

  const handleVolumeClick = (word: string) => {
    if (word) play(word);
  };

  return (
    <Card className="mb-6 shadow-sm rounded-2xl overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl">
          촉음 (促音)
          <Badge variant="secondary" className="text-md ml-2">
            っ / ッ
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="p-4 md:p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl md:text-5xl font-medium text-purple-600">
                {type === 'hiragana' ? 'っ' : 'ッ'}
              </div>
              <div>
                <p className="text-sm md:text-base font-semibold text-gray-800"> 작은 &apos;つ/ツ&apos;로 표기 </p>
                <p className="text-xs md:text-sm text-gray-600"> 다음 자음을 한 박자 멈추고 발음 </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SOKUON_EXAMPLES.map((word, idx) => (
                <div
                  key={idx}
                  className="bg-white p-3 md:p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-row justify-start items-center"
                >
                  <div className="flex flex-col">
                    <span className="text-lg md:text-xl font-medium text-purple-600">
                      {type === 'hiragana' ? word.hiragana : word.katakana}
                    </span>
                    <span className="text-sm text-gray-600">
                      {word.romaji} ({word.kanji})
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="ml-3"
                    onClick={() => handleVolumeClick(type === 'hiragana' ? word.hiragana : word.katakana)}
                  >
                    <Volume2Icon />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
