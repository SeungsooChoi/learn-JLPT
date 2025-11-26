'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

// 유효성 검사를 위한 스키마
const signUpSchema = z.object({
  email: z.string().email('이메일 형식이 올바르지 않습니다.'),
  password: z
    .string()
    .min(6, '비밀번호는 최소 6자 이상이어야 합니다.')
    .regex(/[a-zA-Z]/, '영문을 포함해야 합니다.')
    .regex(/[0-9]/, '숫자를 포함해야 합니다.')
    .regex(/[!@#$%^&*]/, '특수문자(!@#$%^&*)를 포함해야 합니다.'),
  passwordConfirm: z.string(),
}).refine((data) => data.password === data.passwordConfirm, {
  message: '비밀번호가 다릅니다.',
  path: ['passwordConfirm'],
});

const loginSchema = z.object({
  email: z.string().email('이메일 형식이 올바르지 않습니다.'),
  password: z
    .string()
    .min(6, '비밀번호는 최소 6자 이상이어야 합니다.')
    .regex(/[a-zA-Z]/, '영문을 포함해야 합니다.')
    .regex(/[0-9]/, '숫자를 포함해야 합니다.')
    .regex(/[!@#$%^&*]/, '특수문자(!@#$%^&*)를 포함해야 합니다.'),
});

export async function loginAction(formData:  {
  email: string;
  password: string;
}) {
  try {
    const validatedData = loginSchema.parse(formData);

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: validatedData.email,
      password: validatedData.password,
    });

    if (error) throw error;

    revalidatePath('/', 'layout');
    return {
      success: true,
      message: '로그인되었습니다.',
      user: {
        id: data.user?.id,
        email: data.user?.email,
      },
    };
  } catch (error) {
    if (error) {
      return { success: false, error: '로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요.' };
    }

    if (error instanceof Error) {
      return {
        success: false,
        error: '로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요.',
      };
    }

    return { success: false, error: '알 수 없는 오류가 발생했습니다.' };
  }
}

export async function signupAction(formData: {
  email: string;
  password: string;
  passwordConfirm: string;
}) {
  try {
    const validatedData = signUpSchema.parse(formData);

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password,
    });

    if (error) throw error;

    revalidatePath('/', 'layout');
    return { success: true, message: '회원가입이 완료되었습니다.' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldError = error;
      return { success: false, error: fieldError.message };
    }

    if (error instanceof Error) {
      return {
        success: false,
        error: '회원가입에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요.',
      };
    }

    return { success: false, error: '알 수 없는 오류가 발생했습니다.' };
  }
}

export async function logoutAction() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  
  revalidatePath('/', 'layout')
  redirect('/auth/login')
}