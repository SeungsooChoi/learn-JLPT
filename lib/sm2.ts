import { ReviewQuality, SM2Result } from "@/types/word"

export function calculateSM2(
  quality: ReviewQuality,
  currentRepetitions: number,   
  currentInterval: number,
  currentEF: number,
  lastReviewDate: Date
): SM2Result {
  // 1. EF 계산
  let newEF = currentEF + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  newEF = Math.max(1.3, newEF)

  // 2. repetitions과 interval 계산
  let newRepetitions: number
  let newInterval: number

  if (quality < 3) {
    // 실패: 완전 리셋
    newRepetitions = 0
    newInterval = 0
  } else {
    // 성공: repetitions에 따른 간격
    newRepetitions = currentRepetitions + 1
    
    if (newRepetitions === 1) {
      newInterval = 1      // 첫 성공
    } else if (newRepetitions === 2) {
      newInterval = 3      // 두 번째 성공
    } else {
      newInterval = Math.round(currentInterval * newEF)
    }
  }

  // 3. 날짜 계산
  const nextReviewDate = new Date(lastReviewDate)
  nextReviewDate.setDate(nextReviewDate.getDate() + newInterval)
  
  return {
    interval: newInterval,
    e_factor: parseFloat(newEF.toFixed(2)),
    repetitions: newRepetitions,
    next_review_date: nextReviewDate.toISOString().split('T')[0]
  }
}

/**
 * 간격 반복 알고리즘
 * @param repetitions // 해당 단어 반복 횟수
 * @param easeFactor // 단어의 난이도(기본값 2.5)
 * @param interval_days // 마지막 학습 후 다음 복습까지의 일 수
 * @param quality // 0: 모름, 1: 알고있음
 * @returns
 */
export const calculateNextReview = (
  repetitions: number,
  easeFactor: number = 2.5,
  interval_days: number = 0,
  quality: 0 | 1 = 0
) => {
  if (quality === 0) {
    return { repetitions: 0, interval_days: 1, easeFactor: Math.max(1.3, easeFactor - 0.2) };
  }

  let newInterval = interval_days;
  if (repetitions === 0) newInterval = 1;
  else if (repetitions === 1) newInterval = 3;
  else newInterval = Math.round(interval_days * easeFactor);

  const newEase = easeFactor + (0.1 - (1 - quality) * 0.2);

  return {
    repetitions: repetitions + 1,
    interval_days: newInterval,
    easeFactor: Math.max(1.3, Math.min(3.5, newEase)),
  };
};

/**
 * 다음 복습일 계산
 * @param interval_days
 * @returns
 */
export const getNextReviewDate = (interval_days: number): string => {
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + interval_days);
  return nextDate.toISOString().split('T')[0]; // YYYY-MM-DD 형식
};
