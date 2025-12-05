'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard,
    ShoppingBag,
    Settings,
    LogOut,
    User,
    Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';

export function Sidebar() {
    const pathname = usePathname();
    const { user, signOut } = useAuth();

    const navItems = [
        {
            title: 'Dashboard',
            href: '/',
            icon: LayoutDashboard,
        },
        {
            title: 'My List',
            href: '/list', // We might need to adjust routes or keep it all in one page
            icon: ShoppingBag,
        },
        {
            title: 'Rules & Settings',
            href: '/rules',
            icon: Settings,
        },
    ];

    return (
        <aside className="hidden md:flex h-screen w-72 flex-col fixed left-0 top-0 z-50 border-r border-white/10 bg-black/20 backdrop-blur-xl">
            {/* Logo Section */}
            <div className="p-6 flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-accent shadow-lg">
                    <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                    <h1 className="text-xl font-bold font-heading tracking-tight text-white">
                        Smart Shopper
                    </h1>
                    <p className="text-[10px] font-medium text-white/50 uppercase tracking-wider">
                        AI Dashboard
                    </p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-2 mt-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                    return (
                        <Link key={item.href} href={item.href}>
                            <div
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
                                    isActive
                                        ? "bg-primary/20 text-primary shadow-[0_0_20px_rgba(16,185,129,0.1)] border border-primary/10"
                                        : "text-muted-foreground hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground group-hover:text-white")} />
                                <span className="font-medium">{item.title}</span>
                                {isActive && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_currentColor]" />
                                )}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile */}
            <div className="p-4 mt-auto">
                <div className="rounded-2xl bg-white/5 border border-white/5 p-4 backdrop-blur-md">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg">
                            {user?.email?.[0].toUpperCase() || <User className="h-5 w-5" />}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium text-white truncate">
                                {user?.email || 'Guest User'}
                            </p>
                            <p className="text-xs text-white/50">Free Plan</p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={signOut}
                        className="w-full justify-start text-muted-foreground hover:text-red-400 hover:bg-red-500/10"
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                    </Button>
                </div>
            </div>
        </aside>
    );
}
