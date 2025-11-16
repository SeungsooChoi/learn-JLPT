import Link from 'next/link';

export default function LearningLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block">
          ← 처음 화면으로 돌아가기
        </Link>
        {children}
      </div>
    </div>
  );
}
