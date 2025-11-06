'use server';

import { checkExpiringItems } from '@/ai/flows/check-expiring-items';
import { suggestHealthierAlternatives } from '@/ai/flows/suggest-healthier-alternatives';
import { suggestRePurchase } from '@/ai/flows/suggest-re-purchase';
import { getAllRuleBasedSuggestions } from '@/lib/rules-engine';
import type { PurchaseHistoryItem, GroceryItem } from '@/lib/types';

export async function getRepurchaseSuggestions(
  purchaseHistory: PurchaseHistoryItem[],
  currentGroceryList: string[]
) {
  try {
    if (purchaseHistory.length === 0) {
      return ["Your purchase history is empty. Add items to get re-purchase suggestions."];
    }
    
    // First, use rule-based engine
    const groceryItems: GroceryItem[] = currentGroceryList.map(name => ({
      id: '',
      name,
      addedDate: new Date().toISOString(),
    }));
    
    const ruleBased = getAllRuleBasedSuggestions(purchaseHistory, groceryItems);
    
    if (ruleBased.rePurchase.length > 0) {
      return ruleBased.rePurchase.map(s => `${s.item}: ${s.reason}`);
    }
    
    // Fallback to AI if no rule-based suggestions
    const historyForAI = purchaseHistory.map(item => ({
      itemName: item.itemName,
      purchaseDate: item.purchaseDate,
    }));

    const result = await suggestRePurchase({
      purchaseHistory: historyForAI,
      currentGroceryList: currentGroceryList,
    });
    
    if (result.suggestions.length === 0) {
        return ["No re-purchase suggestions at this time. All your frequent items might be on your list already."];
    }
    return result.suggestions;
  } catch (error) {
    console.error('Error in getRepurchaseSuggestions:', error);
    return ['Could not fetch re-purchase suggestions. Please try again later.'];
  }
}

export async function getHealthierAlternatives(groceryList: string[]) {
  try {
    if (groceryList.length === 0) {
      return ["Your grocery list is empty. Add items to get healthier suggestions."];
    }
    
    // First, use rule-based engine
    const groceryItems: GroceryItem[] = groceryList.map(name => ({
      id: '',
      name,
      addedDate: new Date().toISOString(),
    }));
    
    const ruleBased = getAllRuleBasedSuggestions([], groceryItems);
    
    if (ruleBased.healthier.length > 0) {
      return ruleBased.healthier.map(s => `${s.item}: ${s.reason}`);
    }
    
    // Fallback to AI
    const result = await suggestHealthierAlternatives({ groceryList });
    if (result.suggestions.length === 0) {
        return ["No healthier alternatives found for the items on your list."];
    }
    return result.suggestions;
  } catch (error) {
    console.error('Error in getHealthierAlternatives:', error);
    return ['Could not fetch healthier alternatives. Please try again later.'];
  }
}

export async function getExpiryReminders(purchaseHistory: PurchaseHistoryItem[]) {
  try {
    if (purchaseHistory.length === 0) {
      return ["Your purchase history is empty. Add items to track their expiry."];
    }

    // First, use rule-based engine
    const ruleBased = getAllRuleBasedSuggestions(purchaseHistory, []);
    
    if (ruleBased.expiry.length > 0) {
      return ruleBased.expiry.map(e => e.message);
    }

    // Fallback to AI
    const historyForAI = purchaseHistory.map(item => ({
      itemName: item.itemName,
      purchaseDate: item.purchaseDate,
      expiryTimeInDays: item.expiryTimeInDays,
    }));

    const result = await checkExpiringItems({
      purchaseHistory: JSON.stringify(historyForAI),
      currentDate: new Date().toISOString(),
    });

    if (result.notifications.length === 0) {
        return ["No items are expiring soon or have expired."];
    }
    return result.notifications;
  } catch (error) {
    console.error('Error in getExpiryReminders:', error);
    return ['Could not fetch expiry reminders. Please try again later.'];
  }
}
