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
        <aside className="hidden md:flex h-screen w-64 flex-col fixed left-0 top-0 z-50 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
            {/* Logo Section */}
            <div className="p-6 flex items-center gap-3 border-b border-gray-200 dark:border-gray-800">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 shadow-md">
                    <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                    <h1 className="text-lg font-bold font-heading tracking-tight text-gray-900 dark:text-white">
                        Smart Shopper
                    </h1>
                    <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        AI Assistant
                    </p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                    return (
                        <Link key={item.href} href={item.href}>
                            <div
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                                    isActive
                                        ? "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 font-medium shadow-sm"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                                )}
                            >
                                <item.icon className={cn("h-5 w-5 shrink-0", isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200")} />
                                <span className="text-sm">{item.title}</span>
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile */}
            <div className="p-4 mt-auto border-t border-gray-200 dark:border-gray-800">
                <div className="rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800 p-3">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                            {user?.email?.[0].toUpperCase() || <User className="h-4 w-4" />}
                        </div>
                        <div className="overflow-hidden flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {user?.email || 'Guest User'}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Free Plan</p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={signOut}
                        className="w-full justify-start text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20"
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                    </Button>
                </div>
            </div>
        </aside>
    );
}
