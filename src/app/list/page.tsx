'use client';

import { GroceryGrid } from '@/components/grocery/GroceryGrid';
import { QuickAddBar } from '@/components/grocery/QuickAddBar';
import { useGroceryData } from '@/hooks/use-grocery-data';

export default function ListPage() {
    const { groceryList, addItem, removeItem, editItem } = useGroceryData();

    return (
        <div className="h-full flex flex-col relative">
            <div className="flex-1 overflow-y-auto p-6 pb-32 no-scrollbar">
                <div className="max-w-5xl mx-auto space-y-8">
                    <div>
                        <h1 className="text-3xl font-bold font-heading text-foreground mb-2">My Grocery List</h1>
                        <p className="text-muted-foreground">Manage your shopping essentials.</p>
                    </div>

                    <GroceryGrid
                        items={groceryList}
                        onRemove={removeItem}
                        onEdit={editItem}
                    />
                </div>
            </div>

            {/* Floating Quick Add Bar */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center z-40 px-4">
                <div className="w-full max-w-2xl">
                    <QuickAddBar onAdd={addItem} />
                </div>
            </div>
        </div>
    );
}
