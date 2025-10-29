'use client'

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { VocabularyDataTable } from "@/components/vocabulary-data-table";
import { supabase } from "@/lib/supabase-client";
import { Word } from "@/lib/types";
import { Library, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const levels = ["N5", "N4", "N3", "N2", "N1"] as const; // readOnly

export default function VocabularyPage() {
  const [words, setWords] = useState<Word[]>([]);
  const [selectedLevel, setSelectedLevel] = useState("N5");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    async function fetchWords() {
      try {
        setLoading(true);
        setError(null);
        const offset = (currentPage - 1) * pageSize;

        const { data, count, error } = await supabase
          .from('word_with_korean')
          .select('*', { count: 'exact' }) // 전체 개수 포함
          .eq('jlpt_level', selectedLevel)
          .range(offset, offset + pageSize - 1)
          .order('created_at', { ascending: true }) // 생성 시간순

        if (error) {
          throw error;
        }
        setTotalCount(count || 0);

        const formatted = data.map((w) => ({
          id: w.id,
          word: w.word,
          reading: w.reading,
          meanings: w.korean_meanings.join(', '),
          level: w.jlpt_level,
          created_at: w.created_at,
        }));

        setWords(formatted);
      } catch (error) {
        console.error('데이터를 불러오는 중 오류가 발생했습니다. ', error);
        setError(error instanceof Error ? error.message : "Failed to fetch words");
      } finally {
        setLoading(false);
      }
    }
    fetchWords();
  }, [selectedLevel, currentPage]);

  const handleLevelChange = (level: string) => {
    setSelectedLevel(level);
    setCurrentPage(1);
  }

  const totalPages = Math.ceil(totalCount / pageSize);
  const canGoPrevious = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1;

  const goToFirstPage = () => setCurrentPage(1);
  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(0, prev - 1));
  const goToNextPage = () => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  const goToLastPage = () => setCurrentPage(totalPages);

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Library className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">단어장</h1>
          </div>
          <p className="text-muted-foreground">모든 JLPT 레벨의 단어를 찾아볼 수 있습니다.</p>
          <p className="text-muted-foreground">정확하지 않은 단어, 뜻이 있을 수 있습니다. 발견 시 문의 부탁드립니다.</p>
        </div>
        {/* 레벨 선택 필터 */}
        <Card className="p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <span className="font-semibold text-sm">레벨 선택: </span>
            <div className="flex flex-wrap gap-2">
              {levels.map((level) => (
                <Button
                  key={level}
                  variant={selectedLevel === level ? "default" : "outline"}
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
      </div>
    </div>
  )
}