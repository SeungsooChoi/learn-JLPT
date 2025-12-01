import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import AuthListener from '@/components/auth/AuthListener';
import Navigation from '@/components/auth/Navigation';
import { Footer } from '@/components/layout/Footer';

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
        <Footer />
      </body>
    </html>
  );
}
