'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Edit, ShoppingCart, Clock, Tag } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { EditItemDialog } from './EditItemDialog';
import type { GroceryItem } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface GroceryGridProps {
    groceryList: GroceryItem[];
    onRemoveItem: (itemId: string) => void;
    onEditItem: (item: GroceryItem) => void;
    isLoaded: boolean;
}

export function GroceryGrid({ groceryList, onRemoveItem, onEditItem, isLoaded }: GroceryGridProps) {
    const [editingItem, setEditingItem] = useState<GroceryItem | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const handleEditClick = (item: GroceryItem) => {
        setEditingItem(item);
        setIsEditDialogOpen(true);
    };

    const handleSaveEdit = (item: GroceryItem) => {
        onEditItem(item);
        setIsEditDialogOpen(false);
        setEditingItem(null);
    };

    if (!isLoaded) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Skeleton key={i} className="h-40 w-full rounded-lg bg-gray-200 dark:bg-gray-800" />
                ))}
            </div>
        );
    }

    if (groceryList.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                    <ShoppingCart className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Your list is empty</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1.5 max-w-sm mx-auto text-sm">
                    Start adding items to your grocery list to keep track of what you need.
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {groceryList.map((item) => (
                    <Card key={item.id} className="group relative overflow-hidden transition-all hover:shadow-md border-gray-200 dark:border-gray-800">
                        <CardContent className="p-5">
                            <div className="flex justify-between items-start mb-4">
                                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-lg shadow-sm">
                                    {item.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleEditClick(item)}
                                        className="h-8 w-8 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/20"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => onRemoveItem(item.id)}
                                        className="h-8 w-8 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <h3 className="font-semibold text-base text-gray-900 dark:text-white truncate mb-2">{item.name}</h3>

                            <div className="flex items-center gap-2 flex-wrap mb-3">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-md">
                                    {item.quantity && item.unit
                                        ? `${item.quantity} ${item.unit}`
                                        : item.quantity
                                            ? item.quantity.toString()
                                            : '1'}
                                </span>
                                {item.category && (
                                    <Badge variant="secondary" className="text-xs font-normal bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                                        {item.category}
                                    </Badge>
                                )}
                            </div>

                            {item.expiryDate && (
                                <div className="flex items-center gap-2 text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 px-3 py-2 rounded-md border border-amber-200 dark:border-amber-800/50">
                                    <Clock className="h-3.5 w-3.5" />
                                    <span>Expires {new Date(item.expiryDate).toLocaleDateString()}</span>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>

            <EditItemDialog
                item={editingItem}
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
                onSave={handleSaveEdit}
            />
        </>
    );
}
