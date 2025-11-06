'use client';

import { useGroceryData } from '@/hooks/use-grocery-data';
import AppHeader from './AppHeader';
import { AddItemForm } from './AddItemForm';
import { GroceryListTable } from './GroceryListTable';
import { ActionPanel } from './ActionPanel';

export default function GroceryApp() {
  const { groceryList, purchaseHistory, isLoaded, addItem, removeItem } = useGroceryData();

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <section>
              <h2 className="text-xl font-semibold font-headline mb-4">Add New Item</h2>
              <AddItemForm onAddItem={addItem} disabled={!isLoaded} />
            </section>
            <section>
              <GroceryListTable
                groceryList={groceryList}
                onRemoveItem={removeItem}
                isLoaded={isLoaded}
              />
            </section>
          </div>
          <div className="lg:col-span-2">
            <ActionPanel
              groceryList={groceryList}
              purchaseHistory={purchaseHistory}
              isLoaded={isLoaded}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
