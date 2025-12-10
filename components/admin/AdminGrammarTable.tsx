'use client';

import { useState, useTransition } from 'react';
import type { GrammarCategory, GrammarPointWithCategory } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { deleteGrammarPoint } from '@/app/(protected)/admin/actions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface AdminGrammarTableProps {
  categories: GrammarCategory[];
  grammarPoints: GrammarPointWithCategory[];
}

export function AdminGrammarTable({ categories, grammarPoints }: AdminGrammarTableProps) {
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = (id: string, title: string) => {
    if (!confirm(`"${title}"을(를) 삭제하시겠습니까?`)) return;

    setDeletingId(id);
    startTransition(async () => {
      const result = await deleteGrammarPoint(id);
      if (result?.error) {
        alert('삭제 실패: ' + result.error);
      }
      setDeletingId(null);
    });
  };

  const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];

  return (
    <Tabs defaultValue="N5">
      <TabsList className="grid grid-cols-5 w-full">
        {levels.map((level) => (
          <TabsTrigger key={level} value={level}>
            {level}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* 탭별 컨텐츠 */}
      {levels.map((level) => {
        const levelCategories = categories.filter((c) => c.level === level);
        const levelPoints = grammarPoints.filter((p) => levelCategories.some((c) => c.id === p.category_id));

        return (
          <TabsContent key={level} value={level}>
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">카테고리</TableHead>
                    <TableHead>제목</TableHead>
                    <TableHead className="w-[200px]">설명</TableHead>
                    <TableHead className="w-[80px] text-center">순서</TableHead>
                    <TableHead className="w-[120px] text-center">작업</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {levelPoints.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground">
                        등록된 문법이 없습니다.
                      </TableCell>
                    </TableRow>
                  ) : (
                    levelPoints.map((point) => (
                      <TableRow key={point.id}>
                        <TableCell>
                          <Badge variant="outline" className="whitespace-nowrap">
                            {point.grammar_categories.title}
                          </Badge>
                        </TableCell>

                        <TableCell className="font-medium">
                          <Link href={`/admin/grammar/${point.id}`}>point.title</Link>
                        </TableCell>

                        <TableCell className="text-sm text-muted-foreground">
                          <div className="line-clamp-2">{point.description || '-'}</div>
                        </TableCell>

                        <TableCell className="text-center">{point.sort_order}</TableCell>

                        <TableCell>
                          <div className="flex items-center justify-center gap-2">
                            <Link href={`/admin/grammar/${point.id}/edit`}>
                              <Button variant="ghost" size="sm" disabled={isPending}>
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(point.id, point.title)}
                              disabled={isPending || deletingId === point.id}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
