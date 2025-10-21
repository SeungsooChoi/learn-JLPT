' '

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-6">
        <SheetHeader className="p-0">
          <SheetTitle>메뉴</SheetTitle>
          <SheetDescription>이동하려는 메뉴를 클릭하세요.</SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col space-y-4 text-lg font-medium">
          <Link href="/">홈</Link>
          <Link href="/vocab">단어장</Link>
          <Link href="/review">회독</Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}