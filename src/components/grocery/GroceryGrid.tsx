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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Skeleton key={i} className="h-32 w-full rounded-2xl bg-white/10" />
                ))}
            </div>
        );
    }

    if (groceryList.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-white/5 mb-6 border border-white/10">
                    <ShoppingCart className="h-10 w-10 text-muted-foreground/50" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Your list is empty</h3>
                <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
                    Start adding items to your grocery list to keep track of what you need.
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {groceryList.map((item) => (
                    <Card key={item.id} className="glass-card border-0 group relative overflow-hidden transition-all hover:-translate-y-1">
                        <CardContent className="p-5">
                            <div className="flex justify-between items-start mb-3">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-primary font-bold text-lg">
                                    {item.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleEditClick(item)}
                                        className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => onRemoveItem(item.id)}
                                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <h3 className="font-bold text-lg text-foreground truncate mb-1">{item.name}</h3>

                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                                <span className="font-medium bg-white/10 px-2 py-0.5 rounded-md text-foreground">
                                    {item.quantity && item.unit
                                        ? `${item.quantity} ${item.unit}`
                                        : item.quantity
                                            ? item.quantity.toString()
                                            : '1'}
                                </span>
                                {item.category && (
                                    <Badge variant="secondary" className="bg-white/5 hover:bg-white/10 text-xs font-normal">
                                        {item.category}
                                    </Badge>
                                )}
                            </div>

                            {item.expiryDate && (
                                <div className="flex items-center gap-1.5 text-xs text-orange-500/80 mt-2 bg-orange-500/5 p-2 rounded-lg border border-orange-500/10">
                                    <Clock className="h-3 w-3" />
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
