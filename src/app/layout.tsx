import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/contexts/AuthContext';
import { Sidebar } from '@/components/grocery/Sidebar';

export const metadata: Metadata = {
  title: 'Smart Shopper',
  description: 'An AI-powered grocery shopping assistant',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full overflow-hidden">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased h-screen w-screen overflow-hidden bg-gray-50 dark:bg-gray-950 text-foreground">
        <AuthProvider>
          <div className="flex h-full w-full relative">
            {/* Subtle background pattern */}
            <div className="fixed inset-0 -z-10 h-full w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"></div>
            <div className="fixed inset-0 -z-10 h-full w-full bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.03)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.03)_1px,transparent_0)] bg-[size:20px_20px]"></div>

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1 h-full overflow-hidden relative md:pl-64 transition-all duration-300">
              <div className="h-full w-full overflow-y-auto">
                <div className="max-w-7xl mx-auto p-6 md:p-8">
                  {children}
                </div>
              </div>
            </main>
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
