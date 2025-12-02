import { createClient } from '@/lib/supabase/server';

export async function fetchAnnoncements() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .eq('is_active', true)
    .eq('is_popup', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('팝업 공지사항 조회 실패: ', error);
    return [];
  }

  return data;
}
