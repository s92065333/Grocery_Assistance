'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { AddItemForm } from './AddItemForm';

interface AddItemDialogProps {
  onAddItem: (itemName: string, quantity?: number, unit?: string, category?: string, expiryDate?: string) => void;
  disabled?: boolean;
}

export function AddItemDialog({ onAddItem, disabled }: AddItemDialogProps) {
  const [open, setOpen] = useState(false);

  const handleAddItem = (
    itemName: string,
    quantity?: number,
    unit?: string,
    category?: string,
    expiryDate?: string
  ) => {
    onAddItem(itemName, quantity, unit, category, expiryDate);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={disabled} className="h-11 bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
          <Plus className="mr-2 h-4 w-4" /> Add Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-0">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-white px-6 pt-6">Add New Item</DialogTitle>
        </DialogHeader>
        <div className="pb-2">
          <AddItemForm onAddItem={handleAddItem} disabled={disabled} />
        </div>
      </DialogContent>
    </Dialog>
  );
}