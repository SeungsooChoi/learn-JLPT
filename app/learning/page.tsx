import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen } from "lucide-react"
import Link from "next/link"

// TODO: wordCount 수치 조정 필요?
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
]

export default function LearningPage() {
  return (
    // 레벨 선택
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
      {levels.map((item) => (
        <Card key={item.level} className={`flex flex-col justify-between ${item.color}`}>
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <CardTitle className="text-2xl">{item.level}</CardTitle>
              <BookOpen className="w-5 h-5 text-muted-foreground" />
            </div>
            <CardDescription className="text-sm text-foreground">{item.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">{item.wordCount}</p>
            <div>
              <Link href={`/learning/${item.level}/review`}>
                <Button className="w-full" variant="default">
                  회독
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}