'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { VocabularyDataTable } from '@/components/vocabulary-data-table';
import { Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useWords } from '../../hooks/useWord';

const levels = ['N5', 'N4', 'N3', 'N2', 'N1'] as const; // readOnly

export default function VocabularyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const levelFromUrl = searchParams.get('level') || 'N5';
  const pageFromUrl = Number.parseInt(searchParams.get('page') || '1', 10);
  const { replace } = useRouter();

  const [selectedLevel, setSelectedLevel] = useState(levelFromUrl);
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const pageSize = 10;
  const { words, loading, error, totalCount } = useWords(selectedLevel, currentPage, pageSize);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('level', selectedLevel);
    params.set('page', String(currentPage));
    replace(`/vocabulary?${params.toString()}`);
  }, [selectedLevel, currentPage, router, replace]);

  const handleLevelChange = (level: string) => {
    setSelectedLevel(level);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalCount / pageSize);
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages - 1;

  const goToFirstPage = () => setCurrentPage(1);
  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(0, prev - 1));
  const goToNextPage = () => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  const goToLastPage = () => setCurrentPage(totalPages);

  return (
    <>
      {/* 레벨 선택 필터 */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <span className="font-semibold text-sm">레벨 선택: </span>
          <div className="flex flex-wrap gap-2">
            {levels.map((level) => (
              <Button
                key={level}
                variant={selectedLevel === level ? 'default' : 'outline'}
                size="sm"
                className="min-w-[60px] cursor-pointer"
                onClick={() => handleLevelChange(level)}
              >
                {level}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <Card className="p-8 text-center">
          <p className="text-destructive mb-2">오류가 발생했습니다. 다시 시도해주세요.</p>
        </Card>
      ) : (
        <VocabularyDataTable
          data={words}
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
          canGoPrevious={canGoPrevious}
          canGoNext={canGoNext}
          onFirstPage={goToFirstPage}
          onPreviousPage={goToPreviousPage}
          onNextPage={goToNextPage}
          onLastPage={goToLastPage}
        />
      )}
    </>
  );
}
