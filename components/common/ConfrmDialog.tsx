'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type ConfirmDialogProps = {
  open: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  setOpen: (open: boolean) => void;
};

export function ConfirmDialog({
  open,
  title = '확인',
  description,
  confirmLabel = '확인',
  cancelLabel = '취소',
  onConfirm,
  onCancel,
  setOpen,
}: ConfirmDialogProps) {
  const handleClose = () => {
    setOpen(false);
    onCancel?.();
  };

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogHeader>
        <DialogDescription />
      </DialogHeader>
      <DialogContent className="max-w-sm rounded-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {description && <p className="text-sm text-muted-foreground mt-1 whitespace-pre-line">{description}</p>}

        <DialogFooter className="mt-6 flex gap-2">
          <Button variant="outline" onClick={handleClose}>
            {cancelLabel}
          </Button>
          <Button onClick={handleConfirm}>{confirmLabel}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
