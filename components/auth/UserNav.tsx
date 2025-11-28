'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User } from 'lucide-react';
import { toast } from 'sonner';

import { useAuthStore } from '@/lib/stores/authStore';
import { createClient } from '@/lib/supabase/client';
import { deleteUser } from '@/app/(public)/auth/actions';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function UserNav() {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const user = useAuthStore((s) => s.user);
  const isLoading = useAuthStore((s) => s.isLoading); // Store에 isLoading이 있어야 함

  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
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

  if (isLoading) {
    return <div className="w-20 h-9 animate-pulse bg-muted rounded-md" />;
  }

  // 비로그인 상태
  if (!user) {
    return (
      <div className="flex gap-2">
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
      </div>
    );
  }

  // 로그인 상태
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="rounded-xl cursor-pointer" size="icon">
            <User></User>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-3xs">
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
            <AlertDialogDescription>탈퇴하시면 하루 단어 서비스를 이용하실 수 없습니다.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAccount}>확인</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
