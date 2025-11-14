import { promises as fs } from 'fs';
import { Word } from '@/types/word';
import path from 'path';

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
 * 레벨에 맞는 단어 목록 fetch
 * @param level
 * @returns
 */
export async function fetchWordsByLevel(level: string): Promise<Word[]> {
  const fileName = `${level.toLowerCase()}.json`; // n5.json
  const filePath = path.join(process.cwd(), 'public', 'data', fileName);

  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Failed to load level file: ${fileName}`, err);
    return [];
  }
}
