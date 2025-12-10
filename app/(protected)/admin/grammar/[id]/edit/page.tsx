import { AdminGrammarForm } from '@/components/admin/AdminGrammarForm';
import { notFound } from 'next/navigation';
import { getGrammarDataById } from '../../../actions';

export default async function AdminEditPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const { categories, grammarPoint } = await getGrammarDataById(id);

  if (!grammarPoint) {
    notFound();
  }

  return <AdminGrammarForm categories={categories} grammarPoint={grammarPoint} mode="edit" />;
}
