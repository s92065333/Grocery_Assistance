'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2 } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

interface GroceryListTableProps {
  groceryList: string[];
  onRemoveItem: (itemName: string) => void;
  isLoaded: boolean;
}

export function GroceryListTable({ groceryList, onRemoveItem, isLoaded }: GroceryListTableProps) {
    
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
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">My Grocery List</CardTitle>
      </CardHeader>
      <CardContent>
        {groceryList.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">Your grocery list is empty.</p>
        ) : (
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-right w-[100px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {groceryList.map((item) => (
                  <TableRow key={item}>
                    <TableCell className="font-medium">{item}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => onRemoveItem(item)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                        <span className="sr-only">Remove {item}</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
