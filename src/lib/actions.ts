'use server';

import { checkExpiringItems } from '@/ai/flows/check-expiring-items';
import { suggestHealthierAlternatives } from '@/ai/flows/suggest-healthier-alternatives';
import { suggestRePurchase } from '@/ai/flows/suggest-re-purchase';
import type { PurchaseHistoryItem } from '@/lib/types';

export async function getRepurchaseSuggestions(
  purchaseHistory: PurchaseHistoryItem[],
  currentGroceryList: string[]
) {
  try {
    if (purchaseHistory.length === 0) {
      return ["Your purchase history is empty. Add items to get re-purchase suggestions."];
    }
    
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
