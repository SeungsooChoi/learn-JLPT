import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

const levels = [
  {
    level: 'N5',
    description: `히라가나, 가타카나, 일상생활에서 사용되는 기본적인 한자로 쓰인 정형적인 어구나 글을 읽고 이해할 수 있다.`,
    wordCount: '800+ 단어',
    color: 'bg-green-500/10 border-green-500/20',
  },
  {
    level: 'N4',
    description: `기본적인 어휘나 한자를 이용해서 쓰여진 일상생활에서 흔히 접할 수 있는 화제의 글을 읽고 이해할 수 있다.`,
    wordCount: '1,500+ 단어',
    color: 'bg-blue-500/10 border-blue-500/20',
  },
  {
    level: 'N3',
    description: `일상적인 상황에서 사용되는 일본어를 어느 정도 이해할 수 있다.`,
    wordCount: '3,750+ 단어',
    color: 'bg-yellow-500/10 border-yellow-500/20',
  },
  {
    level: 'N2',
    description: `일상적인 상황에서 사용되는 일본어의 이해와 더불어, 보다 폭넓은 상황에서 사용되는 일본어를 어느 정도 이해할 수 있다.`,
    wordCount: '6,000+ 단어',
    color: 'bg-orange-500/10 border-orange-500/20',
  },
  {
    level: 'N1',
    description: `폭넓은 상황에서 사용되는 일본어를 이해할 수 있다.`,
    wordCount: '10,000+ 단어',
    color: 'bg-red-500/10 border-red-500/20',
  },
];

export default function LearningPage() {
  return (
    // 레벨 선택
    <main className="bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">회독</h1>
          </div>
          <p className="text-muted-foreground">
            레벨을 선택하세요. 가장 쉬운 레벨은 N5이며 가장 어려운 레벨은 N1입니다.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
          {levels.map((item) => (
            <Card key={item.level} className={`flex flex-col justify-between ${item.color}`}>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-2xl">{item.level}</CardTitle>
                </div>
                <CardDescription className="text-sm text-foreground">{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{item.wordCount}</p>
                <div>
                  <Link href={`/${item.level}`}>
                    <Button className="w-full cursor-pointer" variant="outline">
                      선택
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
