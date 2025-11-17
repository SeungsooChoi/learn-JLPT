'use client';

import { useStatsStore } from '@/lib/stores/useStatsStore';
import { calculateStatsSummary } from '@/lib/utils/statsUtils';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import DailyProgressChart from './DailyProgressChart';
import LevelDistributionChart from './LevelDistributionChart';

function StatsPanel() {
  const [isMounted, setIsMounted] = useState(false);
  const { localStats, env } = useStatsStore(); // 로컬 통계 조회

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // SSR 시점 또는 Hydration 완료 전 로딩 스켈레톤 표시
    return (
      <div className="p-4 space-y-8 animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-1/3"></div>
        <div className="grid grid-cols-3 gap-6">
          <div className="h-24 bg-gray-200 rounded"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
        </div>
        <div className="h-96 bg-gray-200 rounded"></div>
      </div>
    );
  }
  const summary = calculateStatsSummary(localStats);

  // 로컬 통계 데이터가 없을 경우 (초기 상태)
  if (summary.totalLearnedWords === 0) {
    return (
      <div className="text-center mt-10 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">아직 학습 기록이 없습니다 😥</h3>
        <p className="text-gray-600">단어 학습을 시작하면 여기에 통계가 표시됩니다.</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">
        나의 학습 통계
        <span className="text-sm font-normal text-gray-500 ml-2">
          ({env === 'local' ? '비 로그인 상태입니다. 데이터가 지워질 수 있습니다.' : '로그인 계정 기준'})
        </span>
      </h2>

      {/* 요약 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 학습 단어 수</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{summary.totalLearnedWords.toLocaleString()}개</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 학습 세션</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{summary.totalSessions.toLocaleString()}회</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            {/* TODO: 레벨별 학습량 표시 */}
            <CardTitle className="text-sm font-medium">가장 많은 단어를 학습한 레벨</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{summary.levelData[0]?.name}</div>
          </CardContent>
        </Card>
      </div>

      {/* 차트 섹션 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* 일일 학습 진행 상황 (Line/Bar Chart) */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>최근 7일 학습 진행</CardTitle>
          </CardHeader>
          <CardContent>
            <DailyProgressChart data={summary.dailyLearnedData || []} />
          </CardContent>
        </Card>

        {/* 레벨별 단어 분포 (Pie Chart) */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>JLPT 레벨별 학습 분포</CardTitle>
          </CardHeader>
          <CardContent>
            <LevelDistributionChart data={summary.levelData.filter((d) => d.learned > 0)} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default StatsPanel;
