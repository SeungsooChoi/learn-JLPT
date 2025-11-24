import { createClient } from '@/lib/supabase/server';
import { Word } from '@/types/word';

export async function fetchWords(level: string, userId: string): Promise<Word[]> {
  const LIMIT_WORDS = 30;
  const supabase = await createClient();

  const { data, error } = await supabase.rpc('fetch_words', {
    p_user_id: userId,
    p_level: level,
    p_limit: LIMIT_WORDS,
  });
  if (error) {
    console.error('Error fetching words via RPC: ', error);
    return [];
  }

  // RPC는 이미 merged된 형태로 반환되므로 추가 가공 필요 없음
  return data as Word[];
}
