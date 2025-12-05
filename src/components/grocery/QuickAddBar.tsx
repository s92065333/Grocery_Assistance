'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Plus, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const formSchema = z.object({
    input: z.string().min(2),
});

interface QuickAddBarProps {
    onAddItem: (itemName: string, quantity?: number, unit?: string, category?: string, expiryDate?: string) => void;
    disabled?: boolean;
}

export function QuickAddBar({ onAddItem, disabled }: QuickAddBarProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            input: '',
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Simple parsing logic for the quick bar (can be enhanced with AI later)
        // Format: "2kg Rice" or just "Milk"
        const parts = values.input.split(' ');
        let quantity: number | undefined;
        let unit: string | undefined;
        let name = values.input;

        // Very basic heuristic: if first part is number-like
        if (parts.length > 1 && /^\d+/.test(parts[0])) {
            const qtyMatch = parts[0].match(/^(\d+)([a-zA-Z]+)?$/);
            if (qtyMatch) {
                quantity = parseInt(qtyMatch[1]);
                unit = qtyMatch[2]; // e.g. "kg" from "2kg"
                name = parts.slice(1).join(' ');
            }
        }

        onAddItem(name, quantity, unit);
        form.reset();
    }

    return (
        <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="relative flex items-center gap-2 bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-white/20 p-2 rounded-full shadow-2xl transition-all focus-within:ring-2 focus-within:ring-primary/20">
                    <div className="pl-3 text-muted-foreground">
                        <Plus className="h-5 w-5" />
                    </div>
                    <FormField
                        control={form.control}
                        name="input"
                        render={({ field }) => (
                            <FormItem className="flex-1 mb-0">
                                <FormControl>
                                    <Input
                                        placeholder="Quick add item (e.g. '2kg Rice')..."
                                        className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-10 text-base placeholder:text-muted-foreground/50"
                                        {...field}
                                        disabled={disabled}
                                        autoComplete="off"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        disabled={disabled || !form.formState.isValid}
                        size="icon"
                        className="rounded-full h-10 w-10 bg-primary hover:bg-primary/90 text-white shadow-lg shrink-0"
                    >
                        <ArrowRight className="h-5 w-5" />
                    </Button>
                </form>
            </Form>
        </div>
    );
}
