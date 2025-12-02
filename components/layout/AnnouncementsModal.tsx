'use client';

import { useEffect, useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { useAnnouncementStore } from '@/lib/stores/announcementStore';

type AnnouncementProps = {
  id: string;
  title: string;
  content: string;
  is_active: boolean;
  is_popup: boolean;
  created_at: string;
};

export default function AnnouncementModal({ announcements }: { announcements: AnnouncementProps[] }) {
  const { lastClosedId, isLoading, setLastClosedId } = useAnnouncementStore();
  const [open, setOpen] = useState(false);

  const latestAnn = useMemo(() => announcements?.[0] ?? null, [announcements]);

  useEffect(() => {
    console.log('isLoading :: ', isLoading);
    console.log('lastClosedId :: ', lastClosedId);
    if (isLoading) return;
    if (latestAnn.id !== lastClosedId) {
      setOpen(true);
    }
  }, [isLoading, latestAnn, lastClosedId]);

  const closePopup = () => setOpen(false);

  const closeForToday = () => {
    setLastClosedId(latestAnn.id);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg w-[90%] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{latestAnn.title}</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        {/* 공지 내용 */}
        <div className="mt-2 whitespace-pre-line text-sm leading-6 max-h-[300px] overflow-y-auto pr-1">
          {latestAnn.content}
        </div>

        <DialogFooter className="mt-4 flex flex-col gap-2">
          <Button variant="outline" onClick={closePopup}>
            닫기
          </Button>
          <Button variant="default" onClick={closeForToday}>
            다시 보지 않음
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
