import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchWords } from '@/lib/utils/fetchWords';

export default async function Home() {
  const words = await fetchWords();

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">JLPT 단어 리스트 (테스트용)</h1>
          {words.map((w) => (
            <Card key={w.id}>
              <CardHeader>
                <CardTitle className="text-xl">{w.word}</CardTitle>
                <p className="text-sm text-gray-500">{w.reading}</p>
              </CardHeader>
              <CardContent>
                <p className="mb-2">뜻: {w.meaning}</p>
                <p className="text-sm text-gray-700">
                  예문: {w.example}
                  <br />
                  <span className="text-gray-500">({w.example_ko})</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
