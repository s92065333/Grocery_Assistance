'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { PurchaseHistoryItem } from '@/lib/types';
import { getRepurchaseSuggestions, getHealthierAlternatives, getExpiryReminders } from '@/lib/actions';
import { Lightbulb, Recycle, Wheat, AlertTriangle, Loader2 } from 'lucide-react';

interface ActionPanelProps {
  groceryList: string[];
  purchaseHistory: PurchaseHistoryItem[];
  isLoaded: boolean;
}

type ActionType = 're-purchase' | 'healthier' | 'expiry';

export function ActionPanel({ groceryList, purchaseHistory, isLoaded }: ActionPanelProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [title, setTitle] = useState('AI Suggestions');
  const [icon, setIcon] = useState<React.ReactNode>(<Lightbulb className="h-6 w-6 text-primary" />);

  const handleAction = async (actionType: ActionType) => {
    setIsLoading(true);
    setSuggestions([]);
    let results: string[] = [];
    
    if (actionType === 're-purchase') {
      setTitle('Re-Purchase Suggestions');
      setIcon(<Recycle className="h-6 w-6 text-primary" />);
      results = await getRepurchaseSuggestions(purchaseHistory, groceryList);
    } else if (actionType === 'healthier') {
      setTitle('Healthier Alternatives');
      setIcon(<Wheat className="h-6 w-6 text-accent-foreground" />);
      results = await getHealthierAlternatives(groceryList);
    } else if (actionType === 'expiry') {
      setTitle('Expiry Reminders');
      setIcon(<AlertTriangle className="h-6 w-6 text-destructive" />);
      results = await getExpiryReminders(purchaseHistory);
    }
    
    setSuggestions(results);
    setIsLoading(false);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">AI Assistant</CardTitle>
          <CardDescription>Get smart suggestions for your groceries.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <Button onClick={() => handleAction('re-purchase')} disabled={!isLoaded || isLoading}>
            <Recycle className="mr-2 h-4 w-4" /> Suggest Re-Purchase
          </Button>
          <Button onClick={() => handleAction('healthier')} disabled={!isLoaded || isLoading} variant="outline">
            <Wheat className="mr-2 h-4 w-4" /> Healthier Options
          </Button>
          <Button onClick={() => handleAction('expiry')} disabled={!isLoaded || isLoading} variant="destructive">
            <AlertTriangle className="mr-2 h-4 w-4" /> Check Expiry
          </Button>
        </CardContent>
      </Card>

      <Card className="min-h-[200px]">
        <CardHeader className="flex flex-row items-center gap-3">
          {icon}
          <CardTitle className="font-headline">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            suggestions.length > 0 ? (
              <ul className="space-y-2 list-disc pl-5 text-sm text-foreground">
                {suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-center py-8">Click a button above to see suggestions here.</p>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
}
