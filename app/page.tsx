import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Library } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">JLPT Word Study</h2>
            <p className="text-slate-600">단어장과 회독을 통해 JLPT 일본어 단어를 학습하세요.</p>
          </div>

          {/* Main Features */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Link href="/learning" className="block">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>회독</CardTitle>
                  <CardDescription>JLPT 레벨별로 단어를 학습하세요.</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/vocabulary" className="block">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Library className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>단어장</CardTitle>
                  <CardDescription>JLPT 레벨 필터에 맞는 모든 단어를 확인할 수 있습니다.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
