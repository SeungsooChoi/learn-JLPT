import Link from 'next/link';
import { format } from 'date-fns';
import SearchInput from '@/components/common/SearchInput';
import { getFeedbackList } from './actions';
import Pagination from '@/components/common/Pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default async function FeedbackListPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) {
  const params = await searchParams;
  const query = params.query || '';
  const page = Number(params.page) || 1;

  // 데이터 Fetch
  const { feedbacks, totalPages, totalCount } = await getFeedbackList({
    page,
    query,
  });

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">내 문의사항</h1>
        <Link href="/feedback/new" className="text-sm text-primary underline hover:opacity-80">
          새 글 작성
        </Link>
      </div>

      <SearchInput />

      <div className="rounded-md border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="font-bold">제목</TableHead>
              <TableHead className="text-right font-bold">작성 일시</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {feedbacks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-500">
                  {query ? '검색 결과가 없습니다.' : '등록된 문의가 없습니다.'}
                </TableCell>
              </TableRow>
            ) : (
              feedbacks.map((feedback) => (
                <TableRow key={feedback.id} className="hover:bg-gray-50/50">
                  <TableCell className="text-left font-medium text-gray-600">{feedback.title}</TableCell>
                  <TableCell className="text-right text-gray-900">
                    {format(new Date(feedback.created_at), 'yyyy-MM-dd HH:mm')}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages >= 1 && <Pagination totalPages={totalPages} />}
    </div>
  );
}
