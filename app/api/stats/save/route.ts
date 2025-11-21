import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const body = await req.json(); // { session: {...} }
    const session = body.session;
    const supabase = await createClient();

    // supabase.auth.getUser()로 현재 user 확인
    const {
      data: { user },
      error: userErr,
    } = await supabase.auth.getUser();
    if (userErr || !user) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });

    // Insert
    const { error } = await supabase.from('study_sessions').insert({
      user_id: user.id,
      level: session.level,
      date: session.date ?? new Date().toISOString(),
      learned: session.learned,
      total: session.total,
      known: session.known ?? [],
      unknown: session.unknown ?? [],
    });

    if (error) {
      console.error('API save error:', error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('API save exception:', e);
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
