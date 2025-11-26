import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 인증 확인 및 리다이렉션
  if (!user) {
    redirect('/auth/login');
  }

  return (
    <main className="bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block">
          ← 처음 화면으로 돌아가기
        </Link>
        {children}
      </div>
    </main>
  );
}
