import { useAuthStore } from '@/lib/stores/authStore';
import { BookOpen, BookOpenTextIcon, ChartColumn, FileEdit, NotebookPen, Sprout } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';

interface NavItemsProps {
  onItemClick?: () => void;
  isMobile?: boolean;
}

export default function NavItems({ onItemClick, isMobile = false }: NavItemsProps) {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const isAdmin = user?.user_metadata?.role === 'admin';

  const baseItems = [
    { href: '/', label: '학습', icon: BookOpen },
    { href: '/vocabulary', label: '단어장', icon: BookOpenTextIcon },
    { href: '/wordtable', label: '글자표', icon: Sprout },
    { href: '/stats', label: '통계', icon: ChartColumn },
    { href: '/feedback', label: '문의', icon: NotebookPen },
  ];

  const navItems = isAdmin ? [...baseItems, { href: '/admin/grammar', label: '문법 작성', icon: FileEdit }] : baseItems;

  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <>
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link key={item.href} href={item.href} onClick={onItemClick}>
            <Button
              variant={isActive(item.href) ? 'secondary' : 'ghost'}
              className={isMobile ? 'w-full justify-start gap-2' : 'gap-2'}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Button>
          </Link>
        );
      })}
    </>
  );
}
