import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Word } from '@/types/word';

export default function WordCard({ word }: { word: Word }) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">{word.word}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-center">
        <p className="text-gray-700">{word.meaning}</p>
        <p className="text-sm text-gray-500">{word.example}</p>
        <p className="text-sm text-gray-500">{word.example_ko}</p>
      </CardContent>
    </Card>
  );
}
