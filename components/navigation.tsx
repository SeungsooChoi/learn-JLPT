'use client';

import { BookOpen, ChartColumn, Menu } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { toast } from 'sonner';
import { User } from '@supabase/supabase-js';

export default function Navigation({ user: serverUser }: { user: User | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const clientUser = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const logout = useAuthStore((s) => s.logout);

  // 서버에서 받은 user를 클라이언트 초기값으로만 반영
  useEffect(() => {
    if (serverUser) setUser(serverUser);
  }, [serverUser, setUser]);

  const user = clientUser ?? serverUser; // 클라이언트 우선 적용

  const handleLogout = async () => {
    await logout();

    toast.info('로그아웃되었습니다.');
    router.push('/login');
  };

  const navItems = [
    { href: '/', label: '회독', icon: BookOpen },
    { href: '/stats', label: '통계', icon: ChartColumn },
  ];

  const isActive = (href: string) => pathname.endsWith(href);

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <div className="md:hidden">하루 단어(一日の単語)</div>
            <span className="hidden sm:inline">하루 단어(一日の単語)</span>
          </Link>

          {/* 데스크톱 Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <Button variant={isActive(item.href) ? 'secondary' : 'ghost'} className="gap-2 cursor-pointer">
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
            {/* 로그인 / 로그아웃 섹션 */}
            {!user && (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="cursor-pointer">
                    로그인
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="outline" className="cursor-pointer">
                    회원가입
                  </Button>
                </Link>
              </>
            )}

            {user && (
              <>
                <span className="text-sm text-muted-foreground mr-2">{user.email}</span>
                <Button variant="outline" className="cursor-pointer" onClick={handleLogout}>
                  로그아웃
                </Button>
              </>
            )}
          </div>

          {/* 모바일 Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="font-bold text-lg">
                    하루 단어(一日の単語)
                  </Link>
                </SheetTitle>
                <SheetDescription>JLPT 단어 학습</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-4">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                      <Button
                        variant={isActive(item.href) ? 'secondary' : 'ghost'}
                        className="w-full justify-start gap-2"
                      >
                        <Icon className="w-4 h-4" />
                        {item.label}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
