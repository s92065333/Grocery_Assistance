'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { PurchaseHistoryItem } from '@/lib/types';
import { getRepurchaseSuggestions, getHealthierAlternatives, getExpiryReminders } from '@/lib/actions';
import { Lightbulb, Recycle, Wheat, AlertTriangle, Loader2, Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActionPanelProps {
  groceryList: string[];
  purchaseHistory: PurchaseHistoryItem[];
  isLoaded: boolean;
}

type ActionType = 're-purchase' | 'healthier' | 'expiry' | null;

export function ActionPanel({ groceryList, purchaseHistory, isLoaded }: ActionPanelProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeAction, setActiveAction] = useState<ActionType>(null);
  const [title, setTitle] = useState('AI Suggestions');
  const [icon, setIcon] = useState<React.ReactNode>(<Lightbulb className="h-5 w-5 text-primary" />);

  const handleAction = async (actionType: ActionType) => {
    if (!actionType) return;

    setIsLoading(true);
    setSuggestions([]);
    setActiveAction(actionType);
    let results: string[] = [];

    try {
      if (actionType === 're-purchase') {
        setTitle('Re-Purchase Suggestions');
        setIcon(<Recycle className="h-5 w-5 text-primary" />);
        results = await getRepurchaseSuggestions(purchaseHistory, groceryList);
      } else if (actionType === 'healthier') {
        setTitle('Healthier Alternatives');
        setIcon(<Wheat className="h-5 w-5 text-accent-foreground" />);
        results = await getHealthierAlternatives(groceryList);
      } else if (actionType === 'expiry') {
        setTitle('Expiry Reminders');
        setIcon(<AlertTriangle className="h-5 w-5 text-destructive" />);
        results = await getExpiryReminders(purchaseHistory);
      }

      setSuggestions(results);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions(['An error occurred while fetching suggestions. Please try again.']);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <Card className="border-gray-200 dark:border-gray-800">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950/50">
              <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">AI Assistant</CardTitle>
          </div>
          <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
            Get smart suggestions for your groceries based on your purchase history and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 gap-2.5">
            <Button
              onClick={() => handleAction('re-purchase')}
              disabled={!isLoaded || isLoading}
              variant="outline"
              className={cn(
                "w-full justify-between h-auto py-3 px-4 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all group",
                activeAction === 're-purchase' && "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  <Recycle className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-sm text-gray-900 dark:text-white">Suggest Re-Purchase</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Based on history</div>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400 dark:text-gray-500 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              onClick={() => handleAction('healthier')}
              disabled={!isLoaded || isLoading}
              variant="outline"
              className={cn(
                "w-full justify-between h-auto py-3 px-4 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all group",
                activeAction === 'healthier' && "border-green-500 bg-green-50 dark:bg-green-950/20"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-md bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                  <Wheat className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-sm text-gray-900 dark:text-white">Healthier Options</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Better alternatives</div>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400 dark:text-gray-500 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              onClick={() => handleAction('expiry')}
              disabled={!isLoaded || isLoading}
              variant="outline"
              className={cn(
                "w-full justify-between h-auto py-3 px-4 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all group",
                activeAction === 'expiry' && "border-red-500 bg-red-50 dark:bg-red-950/20"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-md bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-sm text-gray-900 dark:text-white">Check Expiry</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Avoid waste</div>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400 dark:text-gray-500 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-200 dark:border-gray-800 min-h-[280px]">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950/50">
              {icon}
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">{title}</CardTitle>
              {suggestions.length > 0 && !isLoading && (
                <Badge variant="secondary" className="mt-1.5 text-xs bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300">
                  {suggestions.length} {suggestions.length === 1 ? 'suggestion' : 'suggestions'}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {isLoading ? (
            <div className="flex flex-col justify-center items-center py-12 space-y-3">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
              <p className="text-sm text-gray-600 dark:text-gray-400">Analyzing your data...</p>
            </div>
          ) : (
            suggestions.length > 0 ? (
              <div className="space-y-2.5">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-3.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                  >
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{suggestion}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center py-12 space-y-3">
                <Lightbulb className="h-10 w-10 text-gray-300 dark:text-gray-700" />
                <div className="text-center space-y-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">No suggestions yet</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Click a button above to get personalized suggestions
                  </p>
                </div>
              </div>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
}
