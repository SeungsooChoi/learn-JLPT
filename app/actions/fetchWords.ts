import { createClient } from '@/lib/supabase/server';
import { JLPTWord } from '@/types/word';

export async function fetchWords(level: string, userId: string): Promise<JLPTWord[]> {
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

  return data as JLPTWord[];
}
