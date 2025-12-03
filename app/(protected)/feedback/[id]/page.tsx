import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { getFeedbackDetail, getPrevNextFeedback } from '../actions';
import { format } from 'date-fns';
import Link from 'next/link';
import DetailActions from '@/components/feedback/DetailActions';

export default async function FeedbackDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { id } = await params;

  // 로그인 확인
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  const { prev, next } = await getPrevNextFeedback(id);
  const feedback = await getFeedbackDetail(id);

  if (!feedback) {
    return (
      <div className="max-w-3xl mx-auto py-10">
        <p className="text-center text-gray-500">존재하지 않는 문의입니다.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-xl font-semibold">{feedback.title}</h1>
      <div className="text-sm text-gray-600 border-b pb-4 mb-4">
        <p>등록 시간: {format(new Date(feedback.created_at), 'yyyy-MM-dd HH:mm')}</p>
      </div>

      <div className="whitespace-pre-line leading-relaxed text-gray-800 mb-8">{feedback.content}</div>
      <DetailActions feedback={feedback} userId={user.id} />

      <hr className="my-6" />

      <div className="flex justify-between text-sm text-primary">
        {prev ? (
          <Link href={`/feedback/${prev.id}`} className="hover:underline">
            ← 이전 글: {prev.title}
          </Link>
        ) : (
          <span className="text-gray-400">이전 글 없음</span>
        )}

        {next ? (
          <Link href={`/feedback/${next.id}`} className="hover:underline">
            다음 글: {next.title} →
          </Link>
        ) : (
          <span className="text-gray-400">다음 글 없음</span>
        )}
      </div>
    </div>
  );
}
