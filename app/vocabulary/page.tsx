'use client'

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { VocabularyDataTable } from "@/components/vocabulary-data-table";
import { mockWords } from "@/lib/mock-data";
import { Library } from "lucide-react";
import { useState } from "react";

const levels = ["N5", "N4", "N3", "N2", "N1"] as const; // readOnly

export default function VocabularyPage() {
  const [selectedLevel, setSelectedLevel] = useState("N5");

  const words = mockWords[selectedLevel] || [];

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