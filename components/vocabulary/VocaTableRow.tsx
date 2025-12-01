'use client';

import { JLPTWord } from '@/types/word';
import { TableCell, TableRow } from '../ui/table';
import { useAudio } from '@/hooks/useAudio';
import { Button } from '../ui/button';
import { Volume2Icon } from 'lucide-react';

export default function VocaTableRow({ word }: { word: JLPTWord }) {
  const { play, stop } = useAudio();

  const handlePlay = (word: string | null) => {
    if (word) play(word);
  };

  return (
    <TableRow className="hover:bg-gray-50/50">
      <TableCell className="text-center font-medium text-gray-600">{word.level}</TableCell>
      <TableCell className="text-lg text-gray-600">{word.word}</TableCell>
      <TableCell className="text-gray-700">
        {word.reading}
        {word.reading && (
          <Button
            type="button"
            variant="ghost"
            className="ml-1 cursor-pointer"
            size="icon-sm"
            onClick={() => handlePlay(word.reading)}
          >
            <Volume2Icon className="w-2 h-2" />
          </Button>
        )}
      </TableCell>
      <TableCell className="text-gray-900">{word.meaning_ko}</TableCell>
      <TableCell className="text-gray-900">
        {word.example_ja}
        {word.example_ja && (
          <Button
            type="button"
            variant="ghost"
            className="ml-1 cursor-pointer"
            size="icon-sm"
            onClick={() => handlePlay(word.example_ja)}
          >
            <Volume2Icon className="w-2 h-2" />
          </Button>
        )}
      </TableCell>
      <TableCell className="text-gray-900">{word.example_ko}</TableCell>
    </TableRow>
  );
}
