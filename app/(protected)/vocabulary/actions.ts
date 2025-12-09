'use server';

import { createClient } from '@/lib/supabase/server';
import { JLPTWord } from '@/lib/types';

const ITEMS_PER_PAGE = 20;

export async function getVocabularyList({
  page = 1,
  query = '',
  level,
}: {
  page?: number;
  query?: string;
  level?: string;
}) {
  const supabase = await createClient();

  // 페이지네이션 범위 계산
  const from = (page - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;

  // 쿼리 작성
  let dbQuery = supabase.from('jlpt_words').select('*', { count: 'exact' });

  // 검색어 필터 (단어, 의미, 읽는 법 검색)
  if (query) {
    dbQuery = dbQuery.or(`word.ilike.%${query}%,meaning_ko.ilike.%${query}%,reading.ilike.%${query}%`);
  }

  // 레벨 필터 (옵션)
  if (level) {
    dbQuery = dbQuery.eq('level', level);
  }

  // 데이터 조회
  const { data, count, error } = await dbQuery
    .order('id', { ascending: true }) // 또는 level, word 등 원하는 순서
    .range(from, to);

  if (error) {
    console.error('Error fetching vocabulary:', error);
    throw new Error('단어장을 불러오는데 실패했습니다.');
  }

  return {
    words: data as JLPTWord[],
    totalPages: Math.ceil((count || 0) / ITEMS_PER_PAGE),
    currentPage: page,
    totalCount: count || 0,
  };
}
