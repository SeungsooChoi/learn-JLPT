import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getGrammarPoint } from '../../actions';
import { MarkdownViewer } from '@/components/admin/MarkdownViewer';

export default async function GrammarDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const item = await getGrammarPoint(id);

  if (!item) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/admin/grammar">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            목록으로
          </Button>
        </Link>
        <div className="flex gap-2">
          <Link href={`/admin/grammar/${item.id}/edit`}>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              수정
            </Button>
          </Link>
          <Button variant="outline" size="sm">
            <Trash2 className="h-4 w-4 text-destructive" />
            삭제
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex gap-2">
            <Badge variant="default">{item.grammar_categories.level}</Badge>
            <Badge variant="outline">{item.grammar_categories.title}</Badge>
          </div>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="text-3xl mb-3">{item.title}</CardTitle>
              {item.description && <p className="text-muted-foreground text-base">{item.description}</p>}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <MarkdownViewer content={item.content} />
        </CardContent>
      </Card>
    </div>
  );
}
