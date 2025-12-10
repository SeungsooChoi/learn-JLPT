import { AdminGrammarTable } from '@/components/admin/AdminGrammarTable';
import { getGrammarData } from '../actions';

export default async function AdminGrammarPage() {
  const { categories, grammarPoints } = await getGrammarData();

  return (
    <div className="mx-auto space-y-10">
      <div>
        <h1 className="text-3xl font-bold">문법 관리(관리자 페이지)</h1>
        <p className="text-muted-foreground mt-2">
          등록된 문법을 확인하고 수정하거나 새로운 문법을 추가할 수 있습니다.
        </p>
      </div>

      <AdminGrammarTable categories={categories} grammarPoints={grammarPoints} />
    </div>
  );
}
