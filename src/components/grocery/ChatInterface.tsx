'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { processChatCommand } from '@/ai/flows/process-chat-command';
import { getAllRuleBasedSuggestions } from '@/lib/rules-engine';
import type { GroceryItem, PurchaseHistoryItem } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  reasoning?: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  groceryList: GroceryItem[];
  purchaseHistory: PurchaseHistoryItem[];
  onAddItem: (itemName: string, quantity?: number, unit?: string, category?: string, expiryDate?: string) => void;
  onRemoveItem: (itemId: string) => void;
}

export function ChatInterface({ groceryList, purchaseHistory, onAddItem, onRemoveItem }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your grocery shopping assistant. I can help you manage your grocery list, suggest items, and remind you about expiring products. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev: Message[]) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // First, check rule-based suggestions
      const ruleBasedSuggestions = getAllRuleBasedSuggestions(purchaseHistory, groceryList);

      // Process the command with AI
      const groceryListNames = groceryList.map(item => item.name);
      const historyForAI = purchaseHistory.map(item => ({
        itemName: item.itemName,
        purchaseDate: item.purchaseDate,
        expiryTimeInDays: item.expiryTimeInDays,
      }));

      const result = await processChatCommand({
        userMessage: input.trim(),
        groceryList: groceryListNames,
        purchaseHistory: historyForAI,
      });

      // Execute actions based on intent
      if (result.intent === 'add' && result.items.length > 0) {
        result.items.forEach((itemName: string) => {
          const quantity = result.quantities?.find((q: { item: string; quantity?: number; unit?: string }) => q.item.toLowerCase() === itemName.toLowerCase());
          onAddItem(
            itemName,
            quantity?.quantity,
            quantity?.unit,
            undefined,
            undefined
          );
        });
        toast({
          title: 'Items added',
          description: `Added ${result.items.join(', ')} to your grocery list.`,
        });
      } else if (result.intent === 'remove' && result.items.length > 0) {
        const itemToRemove = groceryList.find((item: GroceryItem) =>
          result.items.some((rm: string) => item.name.toLowerCase().includes(rm.toLowerCase()))
        );
        if (itemToRemove) {
          onRemoveItem(itemToRemove.id);
          toast({
            title: 'Item removed',
            description: `Removed ${itemToRemove.name} from your grocery list.`,
          });
        }
      } else if (result.intent === 'suggest') {
        // Enhance response with rule-based suggestions
        const suggestions: string[] = [];
        if (ruleBasedSuggestions.rePurchase.length > 0) {
          suggestions.push(...ruleBasedSuggestions.rePurchase.map(s => `${s.item}: ${s.reason}`));
        }
        if (ruleBasedSuggestions.category.length > 0) {
          suggestions.push(...ruleBasedSuggestions.category.map(s => `${s.item}: ${s.reason}`));
        }
        if (suggestions.length > 0) {
          result.response += '\n\nRule-based suggestions:\n' + suggestions.join('\n');
        }
      } else if (result.intent === 'healthier') {
        const healthierSuggestions = ruleBasedSuggestions.healthier.map(s => `${s.item}: ${s.reason}`);
        if (healthierSuggestions.length > 0) {
          result.response += '\n\n' + healthierSuggestions.join('\n');
        }
      } else if (result.intent === 'expiry') {
        const expiryReminders = ruleBasedSuggestions.expiry.map(e => e.message);
        if (expiryReminders.length > 0) {
          result.response += '\n\n' + expiryReminders.join('\n');
        }
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: result.response,
        reasoning: result.reasoning,
        timestamp: new Date(),
      };

      setMessages((prev: Message[]) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error processing chat command:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error processing your request. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev: Message[]) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="glass-card border-0 h-[calc(100vh-12rem)] flex flex-col shadow-xl overflow-hidden">
      <CardHeader className="pb-4 border-b border-white/10 bg-white/40 dark:bg-black/20 backdrop-blur-md">
        <CardTitle className="font-heading flex items-center gap-2 text-xl">
          <div className="p-2 rounded-lg bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          AI Assistant
        </CardTitle>
        <CardDescription className="mt-1 ml-11">Chat with your grocery shopping assistant</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 min-h-0 p-0">
        <ScrollArea className="flex-1 p-6" ref={scrollRef}>
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md mt-1">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl p-4 shadow-sm",
                    message.role === 'user'
                      ? "bg-primary text-primary-foreground rounded-tr-sm"
                      : "bg-white dark:bg-card border border-white/20 text-foreground rounded-tl-sm"
                  )}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  {message.reasoning && (
                    <div className="mt-3 pt-3 border-t border-border/10">
                      <p className="text-xs opacity-70 italic flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        Reasoning: {message.reasoning}
                      </p>
                    </div>
                  )}
                </div>
                {message.role === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center mt-1">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start animate-fade-in">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white dark:bg-card border border-white/20 rounded-2xl rounded-tl-sm p-4 shadow-sm flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">Thinking...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="p-4 border-t border-white/10 bg-white/40 dark:bg-black/20 backdrop-blur-md">
          <div className="flex gap-3 relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message... (e.g., 'Add 2kg rice', 'What should I buy?')"
              disabled={isLoading}
              className="flex-1 pl-4 pr-12 h-12 rounded-full bg-white/80 dark:bg-black/40 border-white/20 focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
            />
            <Button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              size="icon"
              className="absolute right-1 top-1 h-10 w-10 rounded-full shadow-md hover:shadow-lg transition-all"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

