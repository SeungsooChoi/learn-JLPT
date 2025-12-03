'use server';

import { createClient } from '@/lib/supabase/server';

const ITEMS_PER_PAGE = 10;

export async function getFeedbackList({ page = 1, query = '' }: { page?: number; query?: string }) {
  const supabase = await createClient();

  // 페이지네이션 범위 계산
  const from = (page - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;

  // 쿼리 작성
  let dbQuery = supabase.from('feedbacks').select('*', { count: 'exact' });

  // 검색어 필터 (제목,내용 검색)
  if (query) {
    dbQuery = dbQuery.or(`title.ilike.%${query}%,content.ilike.%${query}%`);
  }

  // 데이터 조회
  const { data, count, error } = await dbQuery.order('created_at', { ascending: false }).range(from, to);

  if (error) {
    console.error('Error fetching vocabulary:', error);
    throw new Error('문의사항을 불러오는데 실패했습니다.');
  }

  return {
    feedbacks: data,
    totalPages: Math.ceil((count || 0) / ITEMS_PER_PAGE),
    currentPage: page,
    totalCount: count || 0,
  };
}
