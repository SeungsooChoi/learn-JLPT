import { promises as fs } from 'fs';
import { Word } from '@/types/word';
import path from 'path';

export async function fetchWords(): Promise<Word[]> {
  const filePath = path.join(process.cwd(), 'public', 'data', 'words.json');
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data).slice(0, 10);
}
