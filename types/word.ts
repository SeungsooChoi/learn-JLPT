export type Word = {
  id: number;
  word: string; // 일본어 단어
  reading: string; // 읽는 법
  meaning_ko: string; // 한국어 뜻
  level: string; // JLPT 레벨 (N5~N1)
  pos: string; // 품사 (명사, 동사 등)
  example_ja: string; // 일본어 예문
  example_ko: string; // 한국어 번역
};
