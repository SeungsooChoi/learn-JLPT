import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t py-6 mt-10">
      <div className="container mx-auto px-4 flex flex-col gap-4 text-sm text-muted-foreground">
        {/* Top section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="font-medium text-foreground">하루 단어(一日の単語)</div>

          <div className="flex gap-4">
            <Link href="/terms" className="hover:text-foreground">
              이용약관
            </Link>
            <Link href="/privacy" className="hover:text-foreground">
              개인정보처리방침
            </Link>
            <Link href="https://github.com/SeungsooChoi/learn-JLPT" target="_blank" className="hover:text-foreground">
              GitHub
            </Link>
          </div>
        </div>

        {/* License Notice */}
        <div className="text-xs leading-relaxed">
          본 서비스는
          <Link
            href="https://github.com/jamsinclair/open-anki-jlpt-decks"
            target="_blank"
            className="underline hover:text-foreground"
          >
            “Open Anki JLPT Decks”
          </Link>
          (MIT License)을 기반으로 단어 데이터를 사용합니다.
        </div>

        {/* Copyright */}
        <div className="text-xs">© 2025. Seungsoo Choi. All rights reserved.</div>
      </div>
    </footer>
  );
}
