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
      <body className="font-sans antialiased h-screen w-screen overflow-hidden bg-background text-foreground selection:bg-primary/20 selection:text-primary">
        <AuthProvider>
          <div className="flex h-full w-full relative">
            {/* Background decoration - Deep Space / Abstract Mesh */}
            <div className="fixed inset-0 -z-10 h-full w-full bg-[#0a0a0a] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
            <div className="fixed top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1 h-full overflow-hidden relative md:pl-72 transition-all duration-300">
              <div className="h-full w-full overflow-y-auto no-scrollbar p-4 md:p-8">
                {children}
              </div>
            </main>
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
