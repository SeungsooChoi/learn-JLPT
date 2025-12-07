'use client';

import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { emailRegex, passwordRegex } from '@/lib/validate';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const supabase = createClient();
  const router = useRouter();

  const [validationError, setValidationError] = useState<string | null>(null);

  const validateForm = () => {
    if (!emailRegex.test(email)) {
      return '이메일 형식이 올바르지 않습니다.';
    }
    if (!passwordRegex.test(password)) {
      return '비밀번호는 최소 6자이며, 영문, 숫자, 특수문자를 포함해야 합니다.';
    }
    if (password !== passwordConfirm) {
      return '비밀번호가 다릅니다.';
    }
    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const hasError = validateForm();
    if (hasError) {
      setValidationError(hasError);
      return;
    }

    setValidationError(null);

    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      toast.success('입력하신 이메일로 회원가입 확인 메일이 전송되었습니다.');
      // 이메일 확인이 비활성화된 경우 사용자와 세션이 모두 반환됨.
      router.push('/');
    } catch (error) {
      toast.error('회원가입에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16">
      <h1 className="text-2xl font-bold mb-6">회원가입</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium">이메일</label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일 입력" type="email" />
        </div>

        <div>
          <label className="text-sm font-medium">비밀번호</label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="6자 이상의 비밀번호 입력"
            type="password"
          />
        </div>

        <div>
          <label className="text-sm font-medium">비밀번호 확인</label>
          <Input
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="비밀번호 확인"
            type="password"
          />
        </div>

        {validationError && <p className="text-red-500 text-sm">{validationError}</p>}

        <Button type="submit" disabled={loading}>
          {loading ? '가입 중...' : '회원가입'}
        </Button>
      </form>

      <p className="text-sm mt-4">
        이미 계정이 있으신가요?{' '}
        <Link href="/auth/login" className="text-primary underline">
          로그인
        </Link>
      </p>
    </div>
  );
}
