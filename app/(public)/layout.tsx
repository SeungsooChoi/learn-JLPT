import { ReactNode } from 'react';

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <main className="grow bg-background">
      <div className="container mx-auto px-4 py-8">{children}</div>
    </main>
  );
}
