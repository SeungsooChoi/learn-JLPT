'use client';

import { useState, useTransition } from 'react';
import type { GrammarCategory, GrammarPoint } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Trash2, Plus } from 'lucide-react';
import { createGrammarPoint, deleteGrammarPoint, updateGrammarPoint } from '@/app/(protected)/admin/actions';
import { Label } from '../ui/label';
import { MarkdownViewer } from './MarkdownViewer';

interface AdminFormProps {
  categories: GrammarCategory[];
  grammarPoint?: GrammarPoint;
  mode: 'create' | 'edit';
}

export function AdminGrammarForm({ categories, grammarPoint, mode }: AdminFormProps) {
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  const [formData, setFormData] = useState({
    category_id: grammarPoint?.category_id || '',
    title: grammarPoint?.title || '',
    description: grammarPoint?.description || '',
    content: grammarPoint?.content || '',
    sort_order: grammarPoint?.sort_order || 0,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.category_id) {
      alert('카테고리를 선택해주세요.');
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append('category_id', formData.category_id);
    formDataObj.append('title', formData.title);
    formDataObj.append('description', formData.description);
    formDataObj.append('content', formData.content);
    formDataObj.append('sort_order', formData.sort_order.toString());

    startTransition(async () => {
      if (mode === 'edit' && grammarPoint) {
        const result = await updateGrammarPoint(grammarPoint.id, formDataObj);
        if (result?.error) {
          alert('저장 실패: ' + result.error);
        }
      } else {
        const result = await createGrammarPoint(formDataObj);
        if (result?.error) {
          alert('저장 실패: ' + result.error);
        }
      }
    });
  };

  const handleDelete = () => {
    if (!grammarPoint) return;

    if (!confirm('정말 삭제하시겠습니까?')) return;

    startTransition(async () => {
      const result = await deleteGrammarPoint(grammarPoint.id);
      if (result?.error) {
        alert('삭제 실패: ' + result.error);
      }
    });
  };

  const selectedCategory = categories.find((c) => c.id === formData.category_id);

  return (
    <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'edit' | 'preview')}>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          {mode === 'create' && (
            <>
              <Plus className="h-6 w-6" />새 문법 항목 추가
            </>
          )}
          {mode === 'edit' && '문법 항목 수정'}
        </h1>
        <div className="flex items-center gap-2">
          {mode === 'edit' && (
            <Button variant="destructive" size="sm" onClick={handleDelete} disabled={isPending}>
              <Trash2 className="h-4 w-4 mr-2" />
              삭제
            </Button>
          )}
          <TabsList>
            <TabsTrigger value="edit">작성 모드</TabsTrigger>
            <TabsTrigger value="preview">미리보기</TabsTrigger>
          </TabsList>
        </div>
      </div>

      <TabsContent value="edit" className="mt-0">
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">카테고리 *</Label>
                  <Select
                    value={formData.category_id}
                    onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                    disabled={isPending}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="카테고리 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          [{cat.level}] {cat.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sort_order">정렬 순서 *</Label>
                  <Input
                    id="sort_order"
                    type="number"
                    placeholder="0"
                    value={formData.sort_order}
                    onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                    disabled={isPending}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">제목 *</Label>
                <Input
                  id="title"
                  placeholder="예: 02 명사의 정중체형"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  disabled={isPending}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">설명</Label>
                <Textarea
                  id="description"
                  placeholder="간단한 설명 (선택사항)"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  disabled={isPending}
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">본문 (마크다운) *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="마크다운 내용을 입력하세요..."
                  className="min-h-[400px] font-mono text-sm"
                  disabled={isPending}
                  required
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={isPending}>
                  <Save className="h-4 w-4 mr-2" />
                  {isPending ? '저장 중...' : '저장'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="preview" className="mt-0">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-3xl mb-3">{formData.title || '제목 없음'}</CardTitle>
                {formData.description && <p className="text-muted-foreground text-base">{formData.description}</p>}
              </div>
            </div>
            {selectedCategory && (
              <div className="flex gap-2 pt-2">
                <span className="px-3 py-1 bg-primary text-primary-foreground text-sm rounded-md font-medium">
                  {selectedCategory.level}
                </span>
                <span className="px-3 py-1 border text-sm rounded-md">{selectedCategory.title}</span>
              </div>
            )}
          </CardHeader>
          <CardContent className="pt-6">
            {formData.content ? (
              <MarkdownViewer content={formData.content} />
            ) : (
              <p className="text-muted-foreground">본문 내용이 없습니다.</p>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
