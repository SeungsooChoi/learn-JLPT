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
