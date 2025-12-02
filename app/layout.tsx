import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import AuthListener from '@/components/auth/AuthListener';
import Navigation from '@/components/auth/Navigation';
import { Footer } from '@/components/layout/Footer';
import { fetchAnnoncements } from './actions/fetchAnnouncements';
import AnnouncementModal from '@/components/layout/AnnouncementsModal';

export const metadata: Metadata = {
  title: '하루 단어(一日の単語)',
  description: 'Learn Japanese vocabulary for JLPT N5-N1',
  keywords: ['JLPT', 'JLPT 단어', 'JLPT N2', 'JLPT N3', '일본어 단어', '일본어 공부', '일본어 학습'],
  authors: [{ name: 'Seungsoo Choi' }],
  creator: 'Seungsoo Choi',
  publisher: 'Seungsoo Choi',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const announcements = await fetchAnnoncements();

  return (
    <html lang="ko">
      <body className="flex flex-col min-h-screen">
        <AuthListener>
          <Navigation />
          {children}
          <Toaster position="top-center" richColors duration={1000} />
        </AuthListener>
        <AnnouncementModal announcements={announcements} />
        <Footer />
      </body>
    </html>
  );
}
