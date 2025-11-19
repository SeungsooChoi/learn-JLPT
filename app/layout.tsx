import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import { Toaster } from '@/components/ui/sonner';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

export const metadata: Metadata = {
  title: '하루 단어(一日の単語)',
  description: 'Learn Japanese vocabulary for JLPT N5-N1',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          cookieStore.set(name, value, options);
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body>
        <Navigation user={user} />
        {children}
        <Toaster position="top-right" richColors duration={1000} />
      </body>
    </html>
  );
}
