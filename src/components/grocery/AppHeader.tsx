'use client';

import { ShoppingCart, Settings, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function AppHeader() {
  const pathname = usePathname();
  const isRulesPage = pathname === '/rules';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/60 dark:bg-black/40 backdrop-blur-xl shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-accent shadow-lg transition-transform group-hover:scale-105 group-hover:rotate-3">
              <ShoppingCart className="h-5 w-5 text-white" />
              <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-primary shadow-sm">
                AI
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold font-heading tracking-tight text-foreground group-hover:text-primary transition-colors">
                Smart Shopper
              </h1>
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                AI Assistant
              </span>
            </div>
          </div>

          <nav className="flex items-center gap-1 bg-secondary/50 p-1 rounded-full border border-white/10">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "rounded-full px-4 transition-all duration-300",
                  !isRulesPage
                    ? "bg-white dark:bg-card text-primary shadow-sm font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/50"
                )}
              >
                Grocery List
              </Button>
            </Link>
            <Link href="/rules">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "rounded-full px-4 transition-all duration-300",
                  isRulesPage
                    ? "bg-white dark:bg-card text-primary shadow-sm font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/50"
                )}
              >
                <Settings className="mr-2 h-3.5 w-3.5" />
                Rules
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
