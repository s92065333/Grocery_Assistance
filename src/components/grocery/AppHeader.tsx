import { ShoppingCart } from 'lucide-react';

export default function AppHeader() {
  return (
    <header className="p-4 border-b bg-card">
      <div className="container mx-auto flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <ShoppingCart className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-2xl font-bold font-headline text-foreground">
          Smart Shopper
        </h1>
      </div>
    </header>
  );
}
