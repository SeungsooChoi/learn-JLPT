'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { emailRegex, passwordRegex } from '@/lib/validate';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const login = useAuthStore((s) => s.login);
  const loading = useAuthStore((s) => s.loading);
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateEmail = (value: string) => {
    if (!value) return '이메일을 입력해주세요.';
    if (!emailRegex.test(value)) return '이메일 형식이 올바르지 않습니다.';
    return '';
  };

  const validatePw = (value: string) => {
    if (!value) return '비밀번호를 입력해주세요.';
    if (!passwordRegex.test(value)) {
      return '비밀번호는 최소 6자이며, 영문, 숫자, 특수문자를 포함해야 합니다.';
    }
    return '';
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailErr = validateEmail(email);
    const passwordErr = validatePw(password);
    setErrors({ email: emailErr, password: passwordErr });

    if (emailErr || passwordErr) return;

    const isSuccess = await login(email, password);

    if (!isSuccess) {
      toast.error('로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요.');
      return;
    }

    toast.success('로그인 성공!');
    router.push('/');
  };

  return (
    <form className="max-w-sm mx-auto p-6 border rounded-xl shadow-sm space-y-4" onSubmit={onSubmit}>
      <h2 className="text-xl font-semibold mb-2">로그인</h2>

      {/* 이메일 */}
      <div className="space-y-1">
        <Input type="email" placeholder="이메일 입력" value={email} onChange={(e) => setEmail(e.target.value)} />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      {/* 비밀번호 */}
      <div className="space-y-1">
        <Input
          type="password"
          placeholder="6자 이상의 비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? '로그인 중...' : '로그인'}
      </Button>
    </form>
  );
}
