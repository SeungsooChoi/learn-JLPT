'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import NavItems from './NavItems';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-64">
        <SheetHeader>
          <SheetTitle>
            <Link href="/" className="font-bold text-lg">
              하루 단어(一日の単語)
            </Link>
          </SheetTitle>
          <SheetDescription>JLPT 단어 학습</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4">
          <NavItems onItemClick={() => setIsOpen(false)} isMobile />
        </div>
      </SheetContent>
    </Sheet>
  );
}
