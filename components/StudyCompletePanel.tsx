import { Button } from '@/components/ui/button';
import { useWordStore } from '@/lib/stores/useWordStore';

export default function StudyCompletedPanel({ total, level }: { total: number; level: string }) {
  const { allWords, isReviewMode, startReview, initializeStudy, resetLevel, getUnknownWords } = useWordStore();

  const unknownWords = getUnknownWords();

  const handleRestart = () => {
    resetLevel(level);
    initializeStudy(level, allWords);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
      <h2 className="text-2xl font-semibold"> {isReviewMode ? '복습 완료 🎉' : '학습 완료 🎉'}</h2>
      <p className="text-gray-600">
        총 <strong>{total}</strong>개 단어를 {isReviewMode ? '복습' : '학습'}했습니다!
      </p>

      <div className="flex flex-col gap-2">
        {unknownWords.length > 0 && (
          <Button onClick={startReview} className="w-full">
            {isReviewMode ? '다시 복습하기' : '이해 못한 단어만 복습'} ({unknownWords.length}개)
          </Button>
        )}

        {unknownWords.length === 0 && <p className="text-green-600 font-medium">모든 단어를 이해했습니다! 🎊</p>}
        <Button variant="outline" onClick={handleRestart} className="w-full">
          처음부터 다시 학습하기
        </Button>
      </div>
    </div>
  );
}
