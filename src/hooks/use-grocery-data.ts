'use client';

import { useState, useEffect, useCallback } from 'react';
import type { PurchaseHistoryItem } from '@/lib/types';

const GROCERY_LIST_KEY = 'smart_shopper_grocery_list';
const PURCHASE_HISTORY_KEY = 'smart_shopper_purchase_history';
const DEFAULT_EXPIRY_DAYS = 7;

export function useGroceryData() {
  const [groceryList, setGroceryList] = useState<string[]>([]);
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseHistoryItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedGroceryList = localStorage.getItem(GROCERY_LIST_KEY);
      if (storedGroceryList) {
        setGroceryList(JSON.parse(storedGroceryList));
      }

      const storedPurchaseHistory = localStorage.getItem(PURCHASE_HISTORY_KEY);
      if (storedPurchaseHistory) {
        setPurchaseHistory(JSON.parse(storedPurchaseHistory));
      }
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(GROCERY_LIST_KEY, JSON.stringify(groceryList));
      } catch (error) {
        console.error("Failed to save grocery list to localStorage", error);
      }
    }
  }, [groceryList, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(PURCHASE_HISTORY_KEY, JSON.stringify(purchaseHistory));
      } catch (error) {
        console.error("Failed to save purchase history to localStorage", error);
      }
    }
  }, [purchaseHistory, isLoaded]);

  const addItem = useCallback((itemName: string) => {
    const trimmedName = itemName.trim();
    if (!trimmedName) return;

    setGroceryList(prev => {
      if (prev.includes(trimmedName)) return prev;
      return [...prev, trimmedName];
    });

    const newItem: PurchaseHistoryItem = {
      itemName: trimmedName,
      purchaseDate: new Date().toISOString(),
      expiryTimeInDays: DEFAULT_EXPIRY_DAYS,
    };
    
    setPurchaseHistory(prev => {
        const existingItemIndex = prev.findIndex(item => item.itemName === trimmedName);
        if (existingItemIndex > -1) {
            const updatedHistory = [...prev];
            updatedHistory[existingItemIndex] = { ...updatedHistory[existingItemIndex], purchaseDate: new Date().toISOString() };
            return updatedHistory;
        }
        return [...prev, newItem];
    });

  }, []);

  const removeItem = useCallback((itemName: string) => {
    setGroceryList(prev => prev.filter(item => item !== itemName));
  }, []);

  return {
    groceryList,
    purchaseHistory,
    isLoaded,
    addItem,
    removeItem,
  };
}
