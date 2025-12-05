'use client';

import { useState } from 'react';
import { useGroceryData } from '@/hooks/use-grocery-data';
import { QuickAddBar } from './QuickAddBar';
import { GroceryGrid } from './GroceryGrid';
import { ActionPanel } from './ActionPanel';
import { ChatInterface } from './ChatInterface';
import { Button } from '@/components/ui/button';
import { MessageSquare, X, Sparkles, LayoutGrid, List as ListIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

export default function GroceryApp() {
  const { groceryList, purchaseHistory, isLoaded, addItem, removeItem, editItem } = useGroceryData();
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="flex flex-col gap-8 pb-20">
      {/* Dashboard Header / Stats Zone */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in">
        <div>
          <h2 className="text-3xl font-bold font-heading text-foreground tracking-tight">
            Good Evening, <span className="text-gradient">Shopper</span>
          </h2>
          <p className="text-muted-foreground mt-1">
            You have <span className="font-bold text-primary">{groceryList.length} items</span> in your list.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-full md:w-[300px]">
            <QuickAddBar onAddItem={addItem} disabled={!isLoaded} />
          </div>

          <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
            <SheetTrigger asChild>
              <Button className="rounded-full h-12 px-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg shadow-primary/20 transition-all">
                <Sparkles className="mr-2 h-4 w-4" />
                Ask AI
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[500px] p-0 border-l border-white/10 bg-black/20 backdrop-blur-2xl">
              <div className="h-full pt-10">
                <ChatInterface
                  groceryList={groceryList}
                  purchaseHistory={purchaseHistory}
                  onAddItem={addItem}
                  onRemoveItem={removeItem}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in" style={{ animationDelay: '100ms' }}>

        {/* Left Column: Grocery Grid */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold font-heading flex items-center gap-2">
              <LayoutGrid className="h-5 w-5 text-primary" />
              Your Essentials
            </h3>
            {/* View Toggle could go here */}
          </div>

          <GroceryGrid
            groceryList={groceryList}
            onRemoveItem={removeItem}
            onEditItem={editItem}
            isLoaded={isLoaded}
          />
        </div>

        {/* Right Column: Suggestions & Quick Actions */}
        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-6">
            <h3 className="text-xl font-bold font-heading flex items-center gap-2 mb-6">
              <Sparkles className="h-5 w-5 text-accent" />
              Smart Suggestions
            </h3>
            <ActionPanel
              groceryList={groceryList.map(item => item.name)}
              purchaseHistory={purchaseHistory}
              isLoaded={isLoaded}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
