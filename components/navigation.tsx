'use client';

import { BookOpen, BookOpenTextIcon, ChartColumn, Menu, User } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuthStore } from '@/lib/stores/authStore';
import { createClient } from '@/lib/supabase/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { deleteUser } from '@/app/(public)/auth/actions';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const pathname = usePathname();
  const supabase = createClient();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  const handleLogout = async () => {
    // logout
    await supabase.auth.signOut();

    // 로그인 페이지로 리디렉션
    toast.info('로그아웃되었습니다.');
    router.replace('/');
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    await deleteUser(user?.id);
    await supabase.auth.signOut();
    router.replace('/auth/login');
    toast.info('회원 탈퇴되었습니다.');
  };

  const navItems = [
    { href: '/', label: '학습', icon: BookOpen },
    { href: '/stats', label: '통계', icon: ChartColumn },
    { href: '/vocabulary', label: '단어장', icon: BookOpenTextIcon },
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
                <Link href="/auth/login">
                  <Button variant="ghost" className="cursor-pointer">
                    로그인
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button variant="outline" className="cursor-pointer">
                    회원가입
                  </Button>
                </Link>
              </>
            )}

            {user && (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="rounded-xl cursor-pointer" size="icon">
                      <User></User>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-10">
                    <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <span className="cursor-pointer">비밀번호 재설정</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpenDeleteDialog(!openDeleteDialog)}>
                      <span className="text-red-500 cursor-pointer">회원 탈퇴</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" className="cursor-pointer" onClick={handleLogout}>
                  로그아웃
                </Button>

                <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>정말 탈퇴하시겠습니까?</AlertDialogTitle>
                      <AlertDialogDescription>
                        탈퇴하시면 하루 단어 서비스를 이용하실 수 없습니다.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>취소</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteAccount}>확인</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
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
