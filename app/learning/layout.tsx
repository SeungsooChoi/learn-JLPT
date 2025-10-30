import { GraduationCap } from "lucide-react";
import Link from "next/link";

export default function LearningLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block">
            ← 홈으로 돌아가기
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">회독</h1>
          </div>
          <p className="text-muted-foreground">레벨을 선택하세요. 가장 쉬운 레벨은 N5이며 가장 어려운 레벨은 N1입니다.</p>
        </div>
        {children}
      </div>
    </div>
  );
}
