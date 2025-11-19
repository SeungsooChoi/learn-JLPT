import StudyPanel from '@/components/StudyPanel';
import { createClient } from '@/lib/supabase/server';
import { fetchWordsByLevel } from '@/lib/utils/fetchWords';

export default async function Home({ params }: { params: Promise<{ level: string }> }) {
  const { level } = await params;
  const supabase = await createClient();

  const words = await fetchWordsByLevel(supabase, level);
  if (!words.length) {
    console.error('Error fetching data:');
    // 단어가 없는 경우 사용자에게 알리는 UI 반환
    return (
      <div className="text-center mt-20">
        <h1 className="text-xl font-bold">📚 {level} 레벨의 단어가 없습니다.</h1>
      </div>
    );
  }

  return (
    <main className="bg-background">
      <div className="container mx-auto px-4 py-8">
        <StudyPanel level={level} initialWords={words} />
      </div>
    </main>
  );
}
