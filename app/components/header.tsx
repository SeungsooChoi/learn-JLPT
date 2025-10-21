import Link from "next/link";
import { MobileMenu } from "./mobileMenu";

export function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b bg-white sticky top-0 z-50">
      <h1 className="text-lg font-semibold">
        <Link href="/">JLPT Word Study</Link>
      </h1>

      {/* PC Menu */}
      <nav className="hidden md:flex space-x-6 text-sm font-medium">
        <Link href="/">Home</Link>
        <Link href="/vocab">단어장</Link>
        <Link href="/review">회독</Link>
      </nav>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <MobileMenu />
      </div>
    </header>
  );
}