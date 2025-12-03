import FeedbackForm from '@/components/feedback/FeedbackForm';
import { createClient } from '@/lib/supabase/server';

export default async function FeedbackEditPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { id } = await params;

  const { data: feedback } = await supabase.from('feedbacks').select('*').eq('id', id).single();

  if (!feedback) {
    return <div className="max-w-xl mx-auto py-10">존재하지 않는 글입니다.</div>;
  }

  return (
    <div className="max-w-xl mx-auto py-10 space-y-8">
      <h1 className="text-xl font-semibold">문의글 수정</h1>
      <FeedbackForm mode="edit" initialData={feedback} />
    </div>
  );
}
