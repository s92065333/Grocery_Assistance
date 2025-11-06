'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { PlusCircle } from 'lucide-react';

const formSchema = z.object({
  itemName: z.string().min(2, {
    message: 'Item name must be at least 2 characters.',
  }),
});

interface AddItemFormProps {
  onAddItem: (itemName: string) => void;
  disabled?: boolean;
}

export function AddItemForm({ onAddItem, disabled }: AddItemFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemName: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onAddItem(values.itemName);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-2">
        <FormField
          control={form.control}
          name="itemName"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormControl>
                <Input placeholder="e.g., Organic Milk" {...field} disabled={disabled} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={disabled}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Item
        </Button>
      </form>
    </Form>
  );
}
