import StudyPanel from '@/components/study-panel';
import { fetchWords } from '@/lib/utils/fetchWords';

export default async function Home() {
  const words = await fetchWords();

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-1">
        <div className="max-w-4xl mx-auto">
          <StudyPanel initialWords={words} />
        </div>
      </div>
    </div>
  );
}
