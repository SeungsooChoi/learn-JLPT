'use client';

import { FormEvent, useState } from 'react';
import { Input } from '../ui/input';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { ConfirmDialog } from '../common/ConfrmDialog';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';

export default function FeedbackForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [validationError, setValidationError] = useState<string | null>(null);

  const validateForm = () => {
    if (!title.trim()) {
      return '제목은 필수 입력사항입니다.';
    }
    if (!content.trim()) {
      return '내용은 필수 입력사항입니다.';
    }
    return null;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const hasError = validateForm();
    if (hasError) {
      setValidationError(hasError);
      return;
    }

    setValidationError(null);
    setOpen(true);
  };

  const submitFeedback = async () => {
    try {
      setLoading(true);
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase.from('feedbacks').insert({
        user_id: user.id,
        title,
        content,
      });
      if (error) throw error;
      toast.success('문의글이 등록되었습니다.');

      router.push('/feedback');
    } catch (error) {
      console.error(error);
      toast.error('문의글 등록에 실패했습니다. 제목 또는 내용이 너무 길거나 내용이 맞지 않습니다.');
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium">제목</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="문의글 제목 입력" type="text" />
        </div>

        <div>
          <label className="text-sm font-medium">내용</label>
          <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="문의 내용 입력" />
        </div>

        {validationError && <p className="text-red-500 text-sm">{validationError}</p>}

        <div className="flex justify-between">
          <Button type="button" variant="outline" disabled={loading} onClick={() => router.push('/feedback')}>
            목록으로 돌아가기
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? '등록 중...' : '문의 등록'}
          </Button>
        </div>
      </form>

      <ConfirmDialog
        open={open}
        setOpen={setOpen}
        title="문의 등록"
        description="입력하신 내용을 등록하시겠습니까?"
        confirmLabel="등록"
        cancelLabel="취소"
        onConfirm={submitFeedback}
      />
    </>
  );
}
