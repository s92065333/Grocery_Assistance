'use client';

import { useState } from 'react';
import { useGroceryData } from '@/hooks/use-grocery-data';
import AppHeader from './AppHeader';
import { AddItemForm } from './AddItemForm';
import { GroceryListTable } from './GroceryListTable';
import { ActionPanel } from './ActionPanel';
import { ChatInterface } from './ChatInterface';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function GroceryApp() {
  const { groceryList, purchaseHistory, isLoaded, addItem, removeItem, editItem } = useGroceryData();
  const [activeTab, setActiveTab] = useState('list');

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="list">Grocery List</TabsTrigger>
            <TabsTrigger value="chat">AI Assistant</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
              <div className="lg:col-span-3 space-y-6">
                <section className="space-y-4">
                  <h2 className="text-xl font-semibold font-headline">Add New Item</h2>
                  <AddItemForm onAddItem={addItem} disabled={!isLoaded} />
                </section>
                <section>
                  <GroceryListTable
                    groceryList={groceryList}
                    onRemoveItem={removeItem}
                    onEditItem={editItem}
                    isLoaded={isLoaded}
                  />
                </section>
              </div>
              <div className="lg:col-span-2">
                <ActionPanel
                  groceryList={groceryList.map(item => item.name)}
                  purchaseHistory={purchaseHistory}
                  isLoaded={isLoaded}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="chat" className="mt-0">
            <div className="max-w-5xl mx-auto">
              <ChatInterface
                groceryList={groceryList}
                purchaseHistory={purchaseHistory}
                onAddItem={addItem}
                onRemoveItem={removeItem}
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
