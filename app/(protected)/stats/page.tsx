import { createClient } from '@/lib/supabase/server';

type LevelStats = {
  learned_count: number;
  level: string;
  total_count: number;
};

export default async function StatsPage() {
  const supabase = await createClient();

  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return <div>로그인이 필요합니다.</div>;

  const userId = user.id;

  // 1) 오늘 학습 통계
  const { data: todayStats } = await supabase.rpc('statistics_today', {
    p_user_id: userId,
  });

  // 2) 레벨별 진행도
  const { data: levelStats } = await supabase.rpc('statistics_level_progress', {
    p_user_id: userId,
  });

  return (
    <div className="mx-auto space-y-10">
      {/* 요약 카드 */}
      <section>
        <h2 className="text-xl font-semibold mb-4">오늘 학습 요약</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg text-center shadow-sm bg-white">
            <div className="text-sm text-gray-500">오늘 학습 단어</div>
            <div className="text-2xl font-semibold">{todayStats[0].today_total.toLocaleString() ?? 0}</div>
          </div>

          <div className="p-4 border rounded-lg text-center shadow-sm bg-white">
            <div className="text-sm text-gray-500">신규 학습 단어</div>
            <div className="text-2xl font-semibold">{todayStats[0].new_words.toLocaleString() ?? 0}</div>
          </div>

          <div className="p-4 border rounded-lg text-center shadow-sm bg-white">
            <div className="text-sm text-gray-500">복습 예정 단어</div>
            <div className="text-2xl font-semibold">{todayStats[0].review_words.toLocaleString() ?? 0}</div>
          </div>
        </div>
      </section>

      {/* 레벨별 진행률 */}
      <section>
        <h2 className="text-xl font-semibold mb-4">레벨별 진행률</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-10">
          {levelStats?.map((level: LevelStats) => {
            const percent = Math.round((level.learned_count / level.total_count) * 100);
            return (
              <div key={level.level} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{level.level}</span>
                  <span>{percent}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded">
                  <div className="h-full bg-blue-600 rounded" style={{ width: `${percent}%` }} />
                </div>
                <div className="flex justify-between text-sm">
                  <span>진행 {level.learned_count.toLocaleString()}개</span>
                  <span>총 {level.total_count.toLocaleString()}개</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
