'use server'

import { calculateSM2 } from "@/lib/sm2";
import { createClient } from "@/lib/supabase/server"
import { JLPTWord, ReviewQuality } from "@/types/word"

/**
 * 신규 단어 조회
 * @param level - N1 ~ N5
 * @param limit - 반환할 단어 개수
 */
export async function getNewWords(
  level: string,
  limit: number = 30
): Promise<JLPTWord[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) throw new Error('Not authenticated')

  // 학습 기록이 없는 단어만
  const { data, error } = await supabase
    .from('jlpt_words')
    .select('*')
    .eq('level', level)
    .not(
      'id',
      'in',
      `(select word_id from learning_records where user_id = '${user.id}')`
    )
    .order('random()')
    .limit(limit)

  if (error) throw error
  return data as JLPTWord[]
}

/**
 * 복습 단어 조회
 * 조건: next_review_date <= 오늘
 */
export async function getReviewWords(
  level: string,
  limit: number = 30
): Promise<JLPTWord[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) throw new Error('Not authenticated')

  const today = new Date().toISOString().split('T')[0]

  const { data, error } = await supabase
    .from('learning_records')
    .select('*, jlpt_words!inner(*)')
    .eq('user_id', user.id)
    .eq('jlpt_words.level', level)
    .eq('is_archived', false)
    .lte('next_review_date', today)  // 핵심 조건
    .order('next_review_date', { ascending: true })
    .limit(limit)

  if (error) throw error
  
  const words = data?.map((record) => record.jlpt_words) || []
  return words as JLPTWord[]
}

/**
 * 학습 평가 기록
 * SM-2 알고리즘 적용
 */
export async function recordReview(
  wordId: string,
  quality: ReviewQuality
): Promise<{
  success: boolean
  interval: number
  e_factor: number
  repetitions: number
  next_review_date: string
}> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) throw new Error('Not authenticated')

  // 기존 기록 조회
  const { data: existing } = await supabase
    .from('learning_records')
    .select('*')
    .eq('user_id', user.id)
    .eq('word_id', wordId)
    .single()

  // SM-2 계산
  const sm2Result = calculateSM2(
    quality,
    existing?.repetitions || 0,    // 현재 repetitions
    existing?.interval_days || 0,  // 현재 interval
    existing?.e_factor || 2.5,     // 현재 EF
    existing?.last_reviewed_at ? new Date(existing.last_reviewed_at) : new Date()
  )

  // 데이터베이스 저장
  const { error } = await supabase
    .from('learning_records')
    .upsert({
      user_id: user.id,
      word_id: wordId,
      e_factor: sm2Result.e_factor,
      interval_days: sm2Result.interval,
      repetitions: sm2Result.repetitions,  // SM-2 결과 사용
      next_review_date: sm2Result.next_review_date,
      last_reviewed_at: new Date().toISOString(),
      is_archived: false,
    })

  if (error) throw error

  return {
    success: true,
    interval: sm2Result.interval,
    e_factor: sm2Result.e_factor,
    repetitions: sm2Result.repetitions,
    next_review_date: sm2Result.next_review_date,
  }
}