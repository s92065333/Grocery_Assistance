'use client';

import { useState } from 'react';
import { useGroceryData } from '@/hooks/use-grocery-data';
import { QuickAddBar } from './QuickAddBar';
import { GroceryGrid } from './GroceryGrid';
import { ActionPanel } from './ActionPanel';
import { ChatInterface } from './ChatInterface';
import { AddItemDialog } from './AddItemDialog';
import { Button } from '@/components/ui/button';
import { MessageSquare, X, Sparkles, LayoutGrid, List as ListIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

export default function GroceryApp() {
  const { groceryList, purchaseHistory, isLoaded, addItem, removeItem, editItem, injectMockData } = useGroceryData();
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="flex flex-col gap-8 pb-8">
      {/* Dashboard Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-200 dark:border-gray-800">
        <div>
          <h1 className="text-3xl font-bold font-heading text-gray-900 dark:text-white tracking-tight">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1.5">
            You have <span className="font-semibold text-blue-600 dark:text-blue-400">{groceryList.length} items</span> in your grocery list
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1 md:w-[320px] md:flex-none">
            <QuickAddBar onAddItem={addItem} disabled={!isLoaded} />
          </div>

          <AddItemDialog onAddItem={addItem} disabled={!isLoaded} />

          <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
            <SheetTrigger asChild>
              <Button className="h-11 px-5 bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition-all">
                <Sparkles className="mr-2 h-4 w-4" />
                Ask AI
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[500px] p-0 border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <SheetTitle className="sr-only">AI Assistant</SheetTitle>
              <div className="h-full">
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: Grocery Grid */}
        <div className="lg:col-span-8 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <LayoutGrid className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Your Grocery List
            </h2>
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
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-5">
              <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Smart Suggestions
            </h2>
            <div className="mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={injectMockData}
                className="w-full text-xs text-gray-500 hover:text-blue-600 border-dashed"
              >
                <Sparkles className="mr-2 h-3 w-3" />
                Reading Purchase History
              </Button>
            </div>
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
