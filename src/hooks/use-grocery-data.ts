'use client';

import { useState, useEffect, useCallback } from 'react';
import type { GroceryItem, PurchaseHistoryItem } from '@/lib/types';

const GROCERY_LIST_KEY = 'smart_shopper_grocery_list';
const PURCHASE_HISTORY_KEY = 'smart_shopper_purchase_history';
const DEFAULT_EXPIRY_DAYS = 7;

export function useGroceryData() {
  const [groceryList, setGroceryList] = useState<GroceryItem[]>([]);
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseHistoryItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage
  useEffect(() => {
    try {
      const storedGroceryList = localStorage.getItem(GROCERY_LIST_KEY);
      if (storedGroceryList) {
        const parsed = JSON.parse(storedGroceryList);
        // Handle migration from old string[] format to new GroceryItem[] format
        if (Array.isArray(parsed) && parsed.length > 0) {
          if (typeof parsed[0] === 'string') {
            // Old format - convert to new format
            const migrated: GroceryItem[] = parsed.map((name: string) => ({
              id: crypto.randomUUID(),
              name,
              addedDate: new Date().toISOString(),
            }));
            setGroceryList(migrated);
            localStorage.setItem(GROCERY_LIST_KEY, JSON.stringify(migrated));
          } else {
            // New format
            setGroceryList(parsed);
          }
        }
      }

      const storedPurchaseHistory = localStorage.getItem(PURCHASE_HISTORY_KEY);
      if (storedPurchaseHistory) {
        const parsed = JSON.parse(storedPurchaseHistory);
        if (Array.isArray(parsed)) {
          // Handle migration from old format to new format
          const migrated: PurchaseHistoryItem[] = parsed.map((item: any) => ({
            id: item.id || crypto.randomUUID(),
            itemName: item.itemName,
            purchaseDate: item.purchaseDate,
            expiryTimeInDays: item.expiryTimeInDays || DEFAULT_EXPIRY_DAYS,
            quantity: item.quantity,
            cost: item.cost,
            expiryDate: item.expiryDate,
          }));
          setPurchaseHistory(migrated);
          localStorage.setItem(PURCHASE_HISTORY_KEY, JSON.stringify(migrated));
        }
      }
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save grocery list to localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(GROCERY_LIST_KEY, JSON.stringify(groceryList));
      } catch (error) {
        console.error("Failed to save grocery list to localStorage", error);
      }
    }
  }, [groceryList, isLoaded]);

  // Save purchase history to localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(PURCHASE_HISTORY_KEY, JSON.stringify(purchaseHistory));
      } catch (error) {
        console.error("Failed to save purchase history to localStorage", error);
      }
    }
  }, [purchaseHistory, isLoaded]);

  const addItem = useCallback((
    itemName: string, 
    quantity?: number, 
    unit?: string, 
    category?: string,
    expiryDate?: string
  ) => {
    const trimmedName = itemName.trim();
    if (!trimmedName) return;

    // Check if item already exists
    setGroceryList(prev => {
      const existingItem = prev.find(item => 
        item.name.toLowerCase() === trimmedName.toLowerCase()
      );
      if (existingItem) return prev;

      const newItem: GroceryItem = {
        id: crypto.randomUUID(),
        name: trimmedName,
        quantity,
        unit,
        category,
        expiryDate,
        addedDate: new Date().toISOString(),
      };
      return [...prev, newItem];
    });

    // Update purchase history
    setPurchaseHistory(prev => {
      const existingItemIndex = prev.findIndex(
        item => item.itemName.toLowerCase() === trimmedName.toLowerCase()
      );
      
      const historyItem: PurchaseHistoryItem = {
        id: existingItemIndex > -1 ? prev[existingItemIndex].id : crypto.randomUUID(),
        itemName: trimmedName,
        purchaseDate: new Date().toISOString(),
        expiryTimeInDays: DEFAULT_EXPIRY_DAYS,
        quantity,
        expiryDate: expiryDate || (expiryDate ? undefined : new Date(Date.now() + DEFAULT_EXPIRY_DAYS * 24 * 60 * 60 * 1000).toISOString()),
      };

      if (existingItemIndex > -1) {
        const updated = [...prev];
        updated[existingItemIndex] = historyItem;
        return updated;
      }
      return [...prev, historyItem];
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setGroceryList(prev => prev.filter(item => item.id !== itemId));
  }, []);

  const editItem = useCallback((item: GroceryItem) => {
    setGroceryList(prev => 
      prev.map(existingItem => 
        existingItem.id === item.id ? item : existingItem
      )
    );
  }, []);

  return {
    groceryList,
    purchaseHistory,
    isLoaded,
    addItem,
    removeItem,
    editItem,
  };
}
