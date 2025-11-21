import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();

    // 사용자 확인
    const { data: auth, error: authError } = await supabase.auth.getUser();
    if (authError || !auth.user) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    const userId = auth.user.id;

    // 세션 조회
    const { data: sessions, error: fetchError } = await supabase
      .from('study_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    if (fetchError) {
      return NextResponse.json({ ok: false, error: fetchError.message }, { status: 500 });
    }

    const list = sessions ?? [];

    // 통계 계산
    const totalLearned = list.reduce((sum, s) => sum + (s.learned || 0), 0);

    const levelStats = list.reduce((acc: Record<string, number>, s) => {
      acc[s.level] = (acc[s.level] || 0) + (s.learned || 0);
      return acc;
    }, {});

    return NextResponse.json({
      ok: true,
      stats: {
        totalLearned,
        levelStats,
        sessions: list,
      },
    });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
