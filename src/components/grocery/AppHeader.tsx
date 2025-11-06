'use client';

import { ShoppingCart, Settings } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

export default function AppHeader() {
  const pathname = usePathname();
  const isRulesPage = pathname === '/rules';

  return (
    <header className="border-b bg-card shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold font-headline text-foreground">
              Smart Shopper
            </h1>
          </div>
          <nav className="flex gap-2">
            <Link href="/">
              <Button variant={!isRulesPage ? 'default' : 'ghost'} size="sm">
                Grocery List
              </Button>
            </Link>
            <Link href="/rules">
              <Button variant={isRulesPage ? 'default' : 'ghost'} size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Rules
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
