'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ConfirmDialog } from '../common/ConfrmDialog';
import { deleteFeedback } from '@/app/(protected)/feedback/actions';
import { toast } from 'sonner';

type FeedbackDetailProps = {
  id: string;
  user_id: string;
  title: string;
  content: string;
};

export default function DetailActions({ feedback, userId }: { feedback: FeedbackDetailProps; userId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const isOwner = userId === feedback.user_id;

  const handleDelete = async () => {
    const { success, message } = await deleteFeedback(feedback.id);
    if (!success) {
      toast.error(message);
      return;
    }
    toast.success('문의가 삭제되었습니다.');
    router.push('/feedback');
  };

  return (
    <div className="flex justify-between">
      <Button variant="outline" onClick={() => router.push('/feedback')}>
        목록으로
      </Button>

      {isOwner && (
        <>
          {/* 삭제 확인 Dialog */}
          <ConfirmDialog
            open={open}
            setOpen={setOpen}
            title="삭제하시겠습니까?"
            description="삭제 후에는 복구가 불가능합니다."
            confirmLabel="삭제"
            cancelLabel="취소"
            onConfirm={handleDelete}
          />

          <div className="flex justify-end gap-2">
            <Button onClick={() => router.push(`/feedback/${feedback.id}/edit`)}>수정</Button>

            <Button variant="destructive" onClick={() => setOpen(true)}>
              삭제
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
