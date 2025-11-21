import { JLPTLevel } from '@/types/word';
import { Stats, StudySession } from '../stores/useStatsStore';

/**
 * Date 객체를 YYYY-MM-DD 형식의 로컬 날짜 문자열로 변환합니다.
 * @param date
 * @returns
 */
const getLocalISODateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * 학습 통계 요약에 필요한 데이터를 계산합니다.
 * @param stats
 */
export const calculateStatsSummary = (stats: Stats) => {
  if (!stats) {
    return {
      totalLearnedWords: 0,
      totalSessions: 0,
      levelData: [],
    };
  }

  const { totalLearned, sessions, levelStats } = stats;

  // 1) 레벨별 누적 학습 단어 수
  const levelData = Object.entries(levelStats)
    .map(([level, learned]) => ({
      name: level as JLPTLevel,
      learned,
    }))
    .sort((a, b) => b.learned - a.learned);

  // 2) 최근 7일 증분 학습량
  const lastSevenDays = getDailyLearned(sessions, 7);

  return {
    totalLearnedWords: totalLearned,
    totalSessions: sessions.length,
    levelData,
    dailyLearnedData: lastSevenDays,
  };
};

/**
 * 최근 N일간의 일일 학습 단어 수를 계산합니다.
 * @param sessions
 * @param days
 * @returns
 */
const getDailyLearned = (sessions: StudySession[], days: number) => {
  const dailyData: Record<string, number> = {};

  // 1) 날짜순 정렬
  const sorted = [...sessions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // 2) 세션별 이전 learned 를 기억
  const prevLearnedMap = new Map<string, number>();

  // 3) delta 기반 일일 학습량 계산
  for (const s of sorted) {
    const sessionDate = new Date(s.date);
    if (isNaN(sessionDate.getTime())) continue;

    const dateKey = getLocalISODateKey(sessionDate);

    const prev = prevLearnedMap.get(s.id) ?? 0;
    const delta = Math.max(0, s.learned - prev);

    dailyData[dateKey] = (dailyData[dateKey] || 0) + delta;

    prevLearnedMap.set(s.id, s.learned);
  }

  // ------------------------------------
  // 4) days 범위 필터링 (추가 계산 없음)
  // ------------------------------------
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startDate = new Date(today);
  startDate.setDate(today.getDate() - days + 1);

  const result = [];

  // 5) days 범위만큼 날짜를 순회하며 데이터 구성
  for (let i = 0; i < days; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    const key = getLocalISODateKey(currentDate);

    result.push({
      date: currentDate.toLocaleDateString('ko-KR', {
        month: '2-digit',
        day: '2-digit',
      }),
      learned: dailyData[key] ?? 0,
    });
  }

  return result;
};
