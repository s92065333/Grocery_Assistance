'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Package, Hash, Scale, Tag, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const formSchema = z.object({
  itemName: z.string().min(2, {
    message: 'Item name must be at least 2 characters.',
  }),
  quantity: z.coerce.number().positive().optional().or(z.literal('')),
  unit: z.string().optional(),
  category: z.string().optional(),
  expiryDate: z.string().optional(),
});

interface AddItemFormProps {
  onAddItem: (itemName: string, quantity?: number, unit?: string, category?: string, expiryDate?: string) => void;
  disabled?: boolean;
}

export function AddItemForm({ onAddItem, disabled }: AddItemFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemName: '',
      quantity: '',
      unit: '',
      category: '',
      expiryDate: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onAddItem(
      values.itemName,
      values.quantity ? Number(values.quantity) : undefined,
      values.unit || undefined,
      values.category || undefined,
      values.expiryDate || undefined
    );
    form.reset();
  }

  return (
    <Card className="glass-card border-0 overflow-hidden">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-6">
                <FormField
                  control={form.control}
                  name="itemName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Item Name</FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <Package className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <Input
                            placeholder="e.g., Organic Milk"
                            className="pl-9 bg-white/50 dark:bg-black/20 border-white/20 focus:bg-white dark:focus:bg-black/40 transition-all"
                            {...field}
                            disabled={disabled}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="md:col-span-3">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Quantity</FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <Hash className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <Input
                            type="number"
                            placeholder="e.g., 2"
                            className="pl-9 bg-white/50 dark:bg-black/20 border-white/20 focus:bg-white dark:focus:bg-black/40 transition-all"
                            {...field}
                            disabled={disabled}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="md:col-span-3">
                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Unit</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || undefined} disabled={disabled}>
                        <FormControl>
                          <SelectTrigger className="bg-white/50 dark:bg-black/20 border-white/20 focus:bg-white dark:focus:bg-black/40 transition-all">
                            <div className="flex items-center gap-2">
                              <Scale className="h-4 w-4 text-muted-foreground" />
                              <SelectValue placeholder="Unit" />
                            </div>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="kg">kg</SelectItem>
                          <SelectItem value="g">g</SelectItem>
                          <SelectItem value="L">L</SelectItem>
                          <SelectItem value="mL">mL</SelectItem>
                          <SelectItem value="pieces">pieces</SelectItem>
                          <SelectItem value="pack">pack</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="md:col-span-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || undefined} disabled={disabled}>
                        <FormControl>
                          <SelectTrigger className="bg-white/50 dark:bg-black/20 border-white/20 focus:bg-white dark:focus:bg-black/40 transition-all">
                            <div className="flex items-center gap-2">
                              <Tag className="h-4 w-4 text-muted-foreground" />
                              <SelectValue placeholder="Select category" />
                            </div>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Dairy">Dairy</SelectItem>
                          <SelectItem value="Fruits">Fruits</SelectItem>
                          <SelectItem value="Vegetables">Vegetables</SelectItem>
                          <SelectItem value="Meat">Meat</SelectItem>
                          <SelectItem value="Beverages">Beverages</SelectItem>
                          <SelectItem value="Bakery">Bakery</SelectItem>
                          <SelectItem value="Pantry">Pantry</SelectItem>
                          <SelectItem value="Snacks">Snacks</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="md:col-span-6">
                <FormField
                  control={form.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Expiry Date (Optional)</FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <Input
                            type="date"
                            className="pl-9 bg-white/50 dark:bg-black/20 border-white/20 focus:bg-white dark:focus:bg-black/40 transition-all"
                            {...field}
                            disabled={disabled}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={disabled}
              className="w-full md:w-auto md:min-w-[200px] h-11 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
            >
              <PlusCircle className="mr-2 h-5 w-5" /> Add Item
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
