'use client';

import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { passwordRegex } from '@/lib/validate';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';

export default function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const supabase = createClient();
  const router = useRouter();

  const [validationError, setValidationError] = useState<string | null>(null);

  const validateForm = () => {
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
      const { data, error } = await supabase.auth.updateUser({
        password,
      });
      if (error) throw error;
      toast.success('비밀번호가 재설정되었습니다.');
      router.push('/');
    } catch (error) {
      toast.error('오류가 발생했습니다. 관리자에게 문의주세요.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16">
      <h1 className="text-2xl font-bold mb-6">비밀번호 재설정</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          {loading ? '재설정 중...' : '비밀번호 재설정'}
        </Button>
      </form>
    </div>
  );
}
