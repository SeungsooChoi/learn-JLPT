import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import { Toaster } from '@/components/ui/sonner';
import AuthListener from '@/components/AuthListener';

export const metadata: Metadata = {
  title: '하루 단어(一日の単語)',
  description: 'Learn Japanese vocabulary for JLPT N5-N1',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthListener>
          <Navigation />
          {children}
          <Toaster position="top-center" richColors duration={1000} />
        </AuthListener>
      </body>
    </html>
  );
}
