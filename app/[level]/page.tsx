import StudyPanel from '@/components/StudyPanel';
import { fetchWordsByLevel } from '@/lib/utils/fetchWords';

export default async function Home({ params }: { params: Promise<{ level: string }> }) {
  const { level } = await params;
  const words = await fetchWordsByLevel(level);

  return (
    <main className="bg-background">
      <div className="container mx-auto px-4 py-8">
        <StudyPanel level={level} initialWords={words} />
      </div>
    </main>
  );
}
