import { WordLearningPanel } from '@/components/learn/WordLearningPanel';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { fetchWords } from '../actions';

export default async function LearnPage({ params }: { params: Promise<{ level: string }> }) {
  const { level } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  const { words, todayCount, dailyGoal, isGoalReached } = await fetchWords(level, user.id);

  return (
    <WordLearningPanel
      initialWords={words}
      todayCount={todayCount}
      dailyGoal={dailyGoal}
      isGoalReached={isGoalReached}
      level={level}
    />
  );
}
