'use client';

import { GroceryListTable } from '@/components/grocery/GroceryListTable';
import { useGroceryData } from '@/hooks/use-grocery-data';

export default function ListPage() {
  const { groceryList, removeItem, editItem, isLoaded } = useGroceryData();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold font-heading text-gray-900 dark:text-white tracking-tight">
          My Grocery List
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1.5">
          View and manage your items in a detailed table view.
        </p>
      </div>

      <GroceryListTable
        groceryList={groceryList}
        onRemoveItem={removeItem}
        onEditItem={editItem}
        isLoaded={isLoaded}
      />
    </div>
  );
}