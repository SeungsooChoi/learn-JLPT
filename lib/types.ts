export interface JLPTWord {
  id: string;
  word: string;
  reading: string;
  meaning_ko: string;
  level: string;
  pos: string | null;
  example_ja: string | null;
  example_ko: string | null;
}

export interface LearningRecord {
  user_id: string;
  word_id: string;
  e_factor: number; // 1.3 ~ ∞ 난이도 계수
  interval_days: number; // >= 0 현재 복습 간격(일)
  repetitions: number; // >= 0 (SM-2 상태) 반복 횟수
  next_review_date: string; // YYYY-MM-DD
  last_reviewed_at: string;
  is_archived: boolean;
}

export type ReviewQuality = 0 | 1 | 2 | 3 | 4 | 5;

export interface SM2Result {
  interval: number;
  e_factor: number;
  repetitions: number;
  next_review_date: string;
}

export type JLPTLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

export interface GrammarCategory {
  id: string;
  title: string;
  level: JLPTLevel;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface GrammarPoint {
  id: string;
  category_id: string;
  title: string;
  description: string | null;
  content: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface GrammarPointWithCategory extends GrammarPoint {
  grammar_categories: GrammarCategory;
}
