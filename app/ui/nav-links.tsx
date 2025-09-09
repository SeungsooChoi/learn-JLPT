'use client';

import Link from 'next/link';

const links = [
  { name: '단어장', href: '/words' },
  {
    name: '회독',
    href: '/n-th-reading',
  },
];

export default function NavLinks() {
  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className='flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3'
          >
            <p>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
