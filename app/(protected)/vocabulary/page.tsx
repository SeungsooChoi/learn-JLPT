import Pagination from '@/components/vocabulary/Pagination';
import SearchInput from '@/components/vocabulary/SearchInput';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import { getVocabularyList } from './actions';
import VocaTableRow from '@/components/vocabulary/VocaTableRow';

// Next.js 15: params와 searchParams는 Promise입니다.
export default async function VocabularyPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string; level?: string }>;
}) {
  const params = await searchParams;
  const query = params.query || '';
  const page = Number(params.page) || 1;

  // 레벨 필터: URL 파라미터가 없으면 'All'(전체)로 간주
  const currentLevel = params.level || 'All';

  // API 호출용: 'All'이면 undefined를 전달하여 필터 해제
  const fetchLevel = currentLevel === 'All' ? undefined : currentLevel;

  // 데이터 Fetch
  const { words, totalPages, totalCount } = await getVocabularyList({
    page,
    query,
    level: fetchLevel,
  });

  const levels = ['All', 'N1', 'N2', 'N3', 'N4', 'N5'];

  return (
    <div className="container mx-auto py-10 px-4 space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">단어장</h1>
          <p className="text-gray-500 text-sm mt-1">
            총 {totalCount.toLocaleString()}개의 단어가 있습니다.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto items-stretch sm:items-center">
          {/* 레벨 필터 탭 */}
          <div className="flex p-1 bg-slate-100 rounded-lg self-start sm:self-auto w-full">
            {levels.map((lvl) => {
              // 링크 생성 로직: 'All'이면 level 파라미터 제거
              const queryParams: Record<string, string> = { page: '1' };
              if (query) queryParams.query = query;
              if (lvl !== 'All') queryParams.level = lvl;

              return (
                <Link
                  key={lvl}
                  href={`/vocabulary?${new URLSearchParams(
                    queryParams
                  ).toString()}`}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                    currentLevel === lvl
                      ? 'bg-white text-blue-600 shadow-sm ring-1 ring-black/5'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  {lvl === 'All' ? '전체' : lvl}
                </Link>
              );
            })}
          </div>
          <SearchInput />
        </div>
      </div>

      <div className="rounded-md border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="w-[100px] text-center font-bold">
                레벨
              </TableHead>
              <TableHead className="font-bold">단어</TableHead>
              <TableHead className="font-bold">후리가나 (읽는 법)</TableHead>
              <TableHead className="font-bold">의미</TableHead>
              <TableHead className="font-bold">예문(일본어)</TableHead>
              <TableHead className="font-bold">예문(한글)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {words.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-gray-500"
                >
                  {query ? '검색 결과가 없습니다.' : '등록된 단어가 없습니다.'}
                </TableCell>
              </TableRow>
            ) : (
              words.map((word) => <VocaTableRow key={word.id} word={word} />)
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && <Pagination totalPages={totalPages} />}
    </div>
  );
}
