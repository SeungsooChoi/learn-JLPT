export type Word = {
  id: string;
  word: string; // 일본어 단어
  reading: string; // 읽는 법
  meaning_ko: string; // 한국어 뜻
  level: string; // JLPT 레벨 (N5~N1)
  pos: string; // 품사 (명사, 동사 등)
  example_ja: string; // 일본어 예문
  example_ko: string; // 한국어 번역
};

/**
 * 영구 저장용 학습 기록
 */
export type StudyRecord = {
  level: string; // JLPT 레벨 'n5' | 'n4' | ...
  learned: string[]; // 이해한 단어 ID 목록
  unknown: string[]; // 미이해 단어 ID 목록
  lastIndex: number; // 마지막 학습 위치
  cycle: number; // 회독 횟수
};
