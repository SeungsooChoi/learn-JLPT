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

  // 1. 레벨별 학습 단어 수 (Recharts Pie Chart 또는 Bar Chart용)
  const levelData = Object.entries(levelStats)
    .map(([level, learnedCount]) => ({
      name: level as JLPTLevel,
      learned: learnedCount,
    }))
    .sort((a, b) => b.learned - a.learned); // 학습량이 많은 순서로 정렬

  // 2. 최근 7일간의 학습 단어 수 (Recharts Line/Bar Chart용)
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

  // 오늘 날짜 (로컬 시간 기준, 시/분/초 제거)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // N일 전 날짜 계산 (루프의 시작점)
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - days + 1); // 예: 오늘이 15일이고 days=7이면, 9일부터 시작

  // 1. sessions 필터링 및 집계
  sessions.forEach((session) => {
    const sessionDate = new Date(session.date);

    // sessionDate가 유효한 날짜인지 확인
    if (isNaN(sessionDate.getTime())) return;

    // 로컬 시간 기준으로 날짜 키 생성
    const dateKey = getLocalISODateKey(sessionDate);

    // startDate 이전의 세션은 무시 (startDate는 로컬 자정 기준)
    if (sessionDate.getTime() < startDate.getTime()) return;

    dailyData[dateKey] = (dailyData[dateKey] || 0) + session.learned;
  });

  // 2. N일치 데이터 배열 생성 (데이터가 없는 날은 0으로 채움)
  const dataArray = [];

  for (let i = 0; i < days; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    const dateKey = getLocalISODateKey(currentDate);

    dataArray.push({
      // Recharts X축 표시에 사용할 포맷 (예: 11.16)
      date: currentDate.toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' }),
      learned: dailyData[dateKey] || 0,
    });
  }

  return dataArray;
};
