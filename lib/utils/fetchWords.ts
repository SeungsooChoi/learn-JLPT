import { promises as fs } from 'fs';
import { Word } from '@/types/word';
import path from 'path';
import { SupabaseClient } from '@supabase/supabase-js';

/**
 * @deprecated
 * @returns Array
 */
export async function fetchWords(): Promise<Word[]> {
  const filePath = path.join(process.cwd(), 'public', 'data', 'words.json');
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data).slice(0, 10);
}

/**
 * supabase DB에서 레벨에 맞는 단어 목록 fetch
 * @param level
 * @returns
 */
export async function fetchWordsByLevel(supabase: SupabaseClient, level: string): Promise<Word[]> {
  const { data, error } = await supabase
    .from('jlpt_words')
    .select('id, word, reading, meaning_ko, level')
    .eq('level', level)
    .order('id', { ascending: true });

  if (error) {
    console.error(`Error fetching words for level ${level}:`, error);
    return [];
  }

  return (data || []) as Word[];
}
