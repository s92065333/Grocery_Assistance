'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Edit } from 'lucide-react';
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
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">My Grocery List</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
            </CardContent>
        </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="font-headline text-lg">My Grocery List</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {groceryList.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Your grocery list is empty. Add items to get started.</p>
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Item</TableHead>
                    <TableHead className="font-semibold">Quantity</TableHead>
                    <TableHead className="font-semibold">Category</TableHead>
                    <TableHead className="text-right w-[140px] font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {groceryList.map((item) => (
                    <TableRow key={item.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                        {item.quantity && item.unit 
                          ? `${item.quantity} ${item.unit}`
                          : item.quantity 
                          ? item.quantity.toString()
                          : '-'}
                      </TableCell>
                      <TableCell>
                        {item.category ? (
                          <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleEditClick(item)}
                            className="h-8 w-8"
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit {item.name}</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => onRemoveItem(item.id)}
                            className="h-8 w-8"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
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
