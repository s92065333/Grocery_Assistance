'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Edit, ShoppingCart } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { EditItemDialog } from './EditItemDialog';
import type { GroceryItem } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

interface GroceryListTableProps {
  groceryList: GroceryItem[];
  onRemoveItem: (itemId: string) => void;
  onEditItem: (item: GroceryItem) => void;
  isLoaded: boolean;
}

export function GroceryListTable({ groceryList, onRemoveItem, onEditItem, isLoaded }: GroceryListTableProps) {
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
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="font-headline">My Grocery List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Skeleton className="h-12 w-full rounded-lg bg-muted/50" />
            <Skeleton className="h-12 w-full rounded-lg bg-muted/50" />
            <Skeleton className="h-12 w-full rounded-lg bg-muted/50" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="glass-card border-0 overflow-hidden">
        <CardContent className="p-0">
          {groceryList.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted/50 mb-4">
                <ShoppingCart className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Your list is empty</h3>
              <p className="text-muted-foreground mt-1 max-w-sm mx-auto">
                Start adding items to your grocery list to keep track of what you need.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-b border-white/10">
                    <TableHead className="font-semibold text-muted-foreground pl-6">Item</TableHead>
                    <TableHead className="font-semibold text-muted-foreground">Quantity</TableHead>
                    <TableHead className="font-semibold text-muted-foreground">Category</TableHead>
                    <TableHead className="text-right w-[140px] font-semibold text-muted-foreground pr-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {groceryList.map((item) => (
                    <TableRow key={item.id} className="hover:bg-white/40 dark:hover:bg-black/20 border-b border-white/10 transition-colors">
                      <TableCell className="font-medium pl-6 text-foreground">{item.name}</TableCell>
                      <TableCell className="text-foreground">
                        {item.quantity && item.unit
                          ? `${item.quantity} ${item.unit}`
                          : item.quantity
                            ? item.quantity.toString()
                            : <span className="text-muted-foreground">-</span>}
                      </TableCell>
                      <TableCell>
                        {item.category ? (
                          <Badge variant="secondary" className="bg-white/50 dark:bg-white/10 hover:bg-white/70 transition-colors font-medium">
                            {item.category}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditClick(item)}
                            className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit {item.name}</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onRemoveItem(item.id)}
                            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove {item.name}</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      <EditItemDialog
        item={editingItem}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSave={handleSaveEdit}
      />
    </>
  );
}
