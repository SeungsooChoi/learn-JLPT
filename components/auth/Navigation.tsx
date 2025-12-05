'use client';

import Link from 'next/link';
import UserNav from './UserNav';
import MobileNav from './MobileNav';
import NavItems from './NavItems';

export default function Navigation() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <div className="md:hidden">하루 단어(一日の単語)</div>
            <span className="hidden sm:inline">하루 단어(一日の単語)</span>
          </Link>

          {/* 데스크톱 Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <NavItems />
            <UserNav />
          </div>

          {/* 모바일 Navigation */}
          <div className="md:hidden">
            <UserNav />
            <MobileNav />
          </div>
        </div>
      </div>
    </nav>
  );
}
