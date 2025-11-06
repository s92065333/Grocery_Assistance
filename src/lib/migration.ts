'use client';

import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  query, 
  where 
} from 'firebase/firestore';
import { getFirestoreDb } from './firebase';
import type { GroceryItem, PurchaseHistoryItem } from './types';

const GROCERY_LIST_KEY = 'smart_shopper_grocery_list';
const PURCHASE_HISTORY_KEY = 'smart_shopper_purchase_history';

export async function migrateLocalStorageToFirestore(userId: string): Promise<void> {
  try {
    // Check if migration already happened
    const db = getFirestoreDb();
    const groceryListRef = collection(db, `users/${userId}/groceryList`);
    const groceryListSnapshot = await getDocs(groceryListRef);
    
    if (groceryListSnapshot.size > 0) {
      // Already migrated
      return;
    }

    // Get data from localStorage
    const storedGroceryList = localStorage.getItem(GROCERY_LIST_KEY);
    const storedPurchaseHistory = localStorage.getItem(PURCHASE_HISTORY_KEY);

    // Migrate grocery list
    if (storedGroceryList) {
      const groceryList: string[] = JSON.parse(storedGroceryList);
      for (const itemName of groceryList) {
        const groceryItem: GroceryItem = {
          id: crypto.randomUUID(),
          name: itemName,
          addedDate: new Date().toISOString(),
        };
        await setDoc(doc(db, `users/${userId}/groceryList`, groceryItem.id), groceryItem);
      }
    }

    // Migrate purchase history
    if (storedPurchaseHistory) {
      const purchaseHistory: PurchaseHistoryItem[] = JSON.parse(storedPurchaseHistory);
      for (const item of purchaseHistory) {
        const historyItem: PurchaseHistoryItem = {
          ...item,
          id: item.id || crypto.randomUUID(),
        };
        await setDoc(doc(db, `users/${userId}/purchaseHistory`, historyItem.id), historyItem);
      }
    }

    // Clear localStorage after successful migration
    localStorage.removeItem(GROCERY_LIST_KEY);
    localStorage.removeItem(PURCHASE_HISTORY_KEY);
  } catch (error) {
    console.error('Migration failed:', error);
    // Don't throw - allow app to continue with Firestore
  }
}

