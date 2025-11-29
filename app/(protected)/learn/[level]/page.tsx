import { fetchWords } from '@/app/actions/fetchWords';
import { WordLearningPanel } from '@/components/learn/WordLearningPanel';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function LearnPage({ params }: { params: Promise<{ level: string }> }) {
  const { level } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  const words = await fetchWords(level, user.id);

  if (!words.length)
    return (
      <div className="text-center mt-10">
        <h1 className="text-xl font-bold">오늘 학습 가능한 단어가 없습니다.</h1>
      </div>
    );

  return <WordLearningPanel initialWords={words} />;
}
