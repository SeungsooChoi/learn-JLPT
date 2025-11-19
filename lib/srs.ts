/**
 * 간격 반복 알고리즘
 * @param repetitions
 * @param easeFactor
 * @param interval
 * @param quality
 * @returns
 */
export const calculateNextReview = (
  repetitions: number,
  easeFactor: number = 2.5,
  interval: number = 0,
  quality: 0 | 1 = 0 // 0: 모름, 1: 알음
) => {
  if (quality === 0) {
    return { repetitions: 0, interval: 1, easeFactor: Math.max(1.3, easeFactor - 0.2) };
  }

  let newInterval = interval;
  if (repetitions === 0) newInterval = 1;
  else if (repetitions === 1) newInterval = 3;
  else newInterval = Math.round(interval * easeFactor);

  const newEase = easeFactor + (0.1 - (1 - quality) * 0.2);

  return {
    repetitions: repetitions + 1,
    interval: newInterval,
    easeFactor: Math.max(1.3, Math.min(3.5, newEase)),
  };
};
