'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

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

export async function getFeedbackDetail(id: string) {
  const supabase = await createClient();

  const { data } = await supabase.from('feedbacks').select('*').eq('id', id).single();

  return data;
}

export async function getPrevNextFeedback(id: string) {
  const supabase = await createClient();

  const { data: curr } = await supabase.from('feedbacks').select('created_at').eq('id', id).single();

  if (!curr) return { prev: null, next: null };

  const { data: prev } = await supabase
    .from('feedbacks')
    .select('id, title')
    .lt('created_at', curr.created_at)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  const { data: next } = await supabase
    .from('feedbacks')
    .select('id, title')
    .gt('created_at', curr.created_at)
    .order('created_at', { ascending: true })
    .limit(1)
    .single();

  return { prev, next };
}

export async function deleteFeedback(id: string) {
  try {
    const supabase = await createClient();

    // 로그인 사용자 확인
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, message: '로그인 후 이용해주세요.' };
    }

    // 본인 글인지 확인
    const { data: feedback } = await supabase.from('feedbacks').select('user_id').eq('id', id).single();

    if (!feedback || feedback.user_id !== user.id) {
      return { success: false, message: '본인이 작성한 글만 삭제할 수 있습니다.' };
    }

    const { error } = await supabase.from('feedbacks').delete().eq('id', id);
    if (error) throw error;

    revalidatePath('/feedback');

    return { success: true, message: null };
  } catch (error) {
    console.error(error);
    return { success: false, message: '삭제 중 오류가 발생했습니다.' };
  }
}
