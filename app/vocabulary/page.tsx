'use client'

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockWords } from "@/lib/mock-data";
import { Library, Volume2 } from "lucide-react";
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

        <div className="mb-4">
          <p className="text-sm text-muted-foreground">총 {words.length}개의 단어</p>
        </div>
        {/* 단어장 테이블 */}
        <Card className="py-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">단어</TableHead>
                <TableHead className="w-[200px]">후리가나</TableHead>
                <TableHead>뜻</TableHead>
                <TableHead className="w-[80px] text-center">발음</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {words.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4}>
                    {selectedLevel}의 단어가 없습니다.
                  </TableCell>
                </TableRow>
              ) : (
                words.map((word) => (
                  <TableRow key={word.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium text-lg">{word.word}</TableCell>
                    <TableCell className="text-muted-foreground">{word.reading}</TableCell>
                    <TableCell>{word.meaning}</TableCell>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer">
                        <Volume2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>

      </div>
    </div>
  )
}