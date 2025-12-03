'use client';

import { ReactNode } from 'react';
import { TableRow } from '../ui/table';
import { useRouter } from 'next/navigation';

type FeedbackProps = {
  id: string;
  user_id: string;
  title: string;
  content: string;
};

export default function FeedBackRow({ feedback, children }: { feedback: FeedbackProps; children: ReactNode }) {
  const router = useRouter();

  return (
    <TableRow className="hover:bg-gray-300/50 cursor-pointer" onClick={() => router.push(`/feedback/${feedback.id}`)}>
      {children}
    </TableRow>
  );
}
