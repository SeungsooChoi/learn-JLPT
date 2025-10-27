'use client'

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { VocabularyDataTable } from "@/components/vocabulary-data-table";
import { supabase } from "@/lib/supabase-client";
import { Word } from "@/lib/types";
import { Library } from "lucide-react";
import { useEffect, useState } from "react";

const levels = ["N5", "N4", "N3", "N2", "N1"] as const; // readOnly

export default function VocabularyPage() {
  const [words, setWords] = useState<Word[]>([]);
  const [selectedLevel, setSelectedLevel] = useState("N5");

  useEffect(() => {
    async function fetchWords() {
      // 1. 선택한 레벨의 단어 word_id 목록 가져오기
      const { data, error: levelError } = await supabase
        .from('word_jlpt_level')
        .select('word_id')
        .eq('jlpt_level', selectedLevel);

      if (levelError) {
        console.error(levelError);
        return Response.json({ error: levelError.message }, { status: 500 });
      }

      // 2. word + meaning 조회
      const wordIds = data.map((r) => r.word_id);
      if (wordIds.length === 0) return Response.json([]);

      /**
       * 내부적으로 Supabase가 쿼리를 REST 요청 URL로 직렬화하기 때문에
       * wordIds가 너무 길면 BadRequest가 발생한다. 이거 찾는데 3시간 걸렸다.
       */
      const { data: wordRows, error: wordError } = await supabase
        .from('word')
        .select(`
          id,
          word,
          reading,
          word_jlpt_level!inner(jlpt_level),
          meaning(language, meaning)
        `)
        .in('id', wordIds.slice(0, 5))
        .order('id', { ascending: true });

      if (wordError) {
        console.error(wordError);
        throw wordError
      };

      const formatted = wordRows.map((w) => ({
        id: w.id,
        word: w.word,
        reading: w.reading,
        meanings: w.meaning?.filter(m => m.language === 'ko').flatMap((m) => ({
          language: m.language,
          meaning: m.meaning,
        })) ?? [],
        level: w.word_jlpt_level?.[0]?.jlpt_level ?? '',
        created_at: '', // DB에서 안 가져오면 빈 값
      }));

      console.log(formatted)
      setWords(formatted);
    }
    fetchWords();
  }, [selectedLevel])

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
          {/* TODO: 없는 단어가 있을 수 있다는 공지가 필요한가 */}
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
                  onClick={() => setSelectedLevel(level)}
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        <VocabularyDataTable data={words} />
      </div>
    </div>
  )
}