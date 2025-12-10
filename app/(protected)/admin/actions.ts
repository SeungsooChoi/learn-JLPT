'use server';

import { createClient } from '@/lib/supabase/server';
import { GrammarCategory, GrammarPointWithCategory } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getGrammarData() {
  const supabase = await createClient();

  const [categoriesResult, pointsResult] = await Promise.all([
    supabase.from('grammar_categories').select('*').order('sort_order'),
    supabase.from('grammar_points').select('*, grammar_categories(*)').order('sort_order'),
  ]);

  return {
    categories: (categoriesResult.data || []) as GrammarCategory[],
    grammarPoints: (pointsResult.data || []) as GrammarPointWithCategory[],
  };
}

export async function getGrammarDataById(id: string) {
  const supabase = await createClient();

  const [categoriesResult, pointsResult] = await Promise.all([
    supabase.from('grammar_categories').select('*').order('sort_order'),
    supabase.from('grammar_points').select('*').eq('id', id).single(),
  ]);

  return {
    categories: (categoriesResult.data || []) as GrammarCategory[],
    grammarPoint: pointsResult.data,
  };
}

export async function getGrammarPoint(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('grammar_points')
    .select('*, grammar_categories(*)')
    .eq('id', id)
    .single();

  if (error || !data) return null;

  return data;
}

export async function createGrammarPoint(formData: FormData) {
  const supabase = await createClient();

  const data = {
    category_id: formData.get('category_id') as string,
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    content: formData.get('content') as string,
    sort_order: parseInt(formData.get('sort_order') as string) || 0,
  };

  const { error } = await supabase.from('grammar_points').insert({
    ...data,
    description: data.description || null,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/');
  revalidatePath('/admin');
  redirect('/admin');
}

export async function updateGrammarPoint(id: string, formData: FormData) {
  const supabase = await createClient();

  const data = {
    category_id: formData.get('category_id') as string,
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    content: formData.get('content') as string,
    sort_order: parseInt(formData.get('sort_order') as string) || 0,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from('grammar_points')
    .update({
      ...data,
      description: data.description || null,
    })
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/');
  revalidatePath(`/admin/grammar/${id}`);
  redirect(`/admin/grammar/${id}`);
}

export async function deleteGrammarPoint(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from('grammar_points').delete().eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/');
  revalidatePath('/admin');
  redirect('/admin');
}
