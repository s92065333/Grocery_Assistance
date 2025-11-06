import type { PurchaseHistoryItem, GroceryItem } from './types';

// Default rules (server-safe, used when localStorage is not available)
const DEFAULT_HEALTHIER_ALTERNATIVES: Record<string, string> = {
  'white bread': 'brown bread',
  'white rice': 'brown rice',
  'full cream milk': 'low-fat milk',
  'whole milk': 'low-fat milk',
  'soda': 'sparkling water',
  'sugar': 'honey',
  'butter': 'olive oil',
  'mayonnaise': 'greek yogurt',
  'potato chips': 'baked chips',
  'ice cream': 'frozen yogurt',
  'pasta': 'whole wheat pasta',
  'white flour': 'whole wheat flour',
  'candy': 'dried fruits',
  'cookies': 'oatmeal cookies',
};

const DEFAULT_CATEGORY_ASSOCIATIONS: Record<string, string[]> = {
  'tea': ['sugar', 'honey', 'milk'],
  'coffee': ['sugar', 'milk', 'cream'],
  'bread': ['butter', 'jam'],
  'eggs': ['milk', 'cheese'],
  'pasta': ['tomato sauce', 'cheese'],
  'rice': ['vegetables', 'soy sauce'],
  'chicken': ['vegetables', 'spices'],
  'fish': ['lemon', 'vegetables'],
};

const DEFAULT_EXIRY_DAYS: Record<string, number> = {
  'milk': 7,
  'eggs': 14,
  'bread': 5,
  'cheese': 10,
  'yogurt': 7,
  'meat': 3,
  'fish': 2,
  'vegetables': 7,
  'fruits': 5,
};

// Helper function to safely load rules from storage (client-side only)
function safeLoadRules() {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    // Use dynamic import to avoid server-side issues
    const storage = require('./rules-storage');
    return storage.loadRules();
  } catch {
    return null;
  }
}

// Helper function to get healthier alternatives map (server-safe)
function getHealthierAlternativesMap(): Record<string, string> {
  const rules = safeLoadRules();
  if (rules) {
    const map: Record<string, string> = {};
    rules.healthierAlternatives.forEach((rule: { unhealthyItem: string; healthyAlternative: string }) => {
      map[rule.unhealthyItem.toLowerCase()] = rule.healthyAlternative;
    });
    return map;
  }
  return DEFAULT_HEALTHIER_ALTERNATIVES;
}

// Helper function to get category associations map (server-safe)
function getCategoryAssociationsMap(): Record<string, string[]> {
  const rules = safeLoadRules();
  if (rules) {
    const map: Record<string, string[]> = {};
    rules.categoryAssociations.forEach((rule: { primaryItem: string; suggestedItems: string[] }) => {
      map[rule.primaryItem.toLowerCase()] = rule.suggestedItems;
    });
    return map;
  }
  return DEFAULT_CATEGORY_ASSOCIATIONS;
}

// Helper function to get default expiry days map (server-safe)
function getDefaultExpiryDaysMap(): Record<string, number> {
  const rules = safeLoadRules();
  if (rules) {
    const map: Record<string, number> = {};
    rules.defaultExpiryRules.forEach((rule: { itemName: string; defaultExpiryDays: number }) => {
      map[rule.itemName.toLowerCase()] = rule.defaultExpiryDays;
    });
    return map;
  }
  return DEFAULT_EXIRY_DAYS;
}

interface Suggestion {
  item: string;
  reason: string;
  type: 're-purchase' | 'category' | 'healthier';
}

export function evaluateRePurchaseRules(
  purchaseHistory: PurchaseHistoryItem[],
  currentGroceryList: GroceryItem[]
): Suggestion[] {
  const suggestions: Suggestion[] = [];
  const currentItemNames = currentGroceryList.map(item => item.name.toLowerCase());
  const now = new Date();
  const DEFAULT_EXIRY_DAYS = getDefaultExpiryDaysMap();

  // Rule: If item was purchased in the last 7 days and typically runs out weekly → suggest adding it
  purchaseHistory.forEach(item => {
    const purchaseDate = new Date(item.purchaseDate);
    const daysSincePurchase = Math.floor((now.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Check if item is not in current list
    if (!currentItemNames.includes(item.itemName.toLowerCase())) {
      // Rule: If purchased within last 7 days and expiry is around 7 days, suggest re-purchase
      if (daysSincePurchase >= 5 && daysSincePurchase <= 7) {
        const typicalExpiry = DEFAULT_EXIRY_DAYS[item.itemName.toLowerCase()] || item.expiryTimeInDays;
        if (typicalExpiry <= 7) {
          suggestions.push({
            item: item.itemName,
            reason: `You bought ${item.itemName} ${daysSincePurchase} days ago, and it typically runs out within a week. Should I add it again?`,
            type: 're-purchase',
          });
        }
      }
      
      // Rule: If item was purchased frequently (more than 3 times in history), suggest it
      const purchaseCount = purchaseHistory.filter(
        h => h.itemName.toLowerCase() === item.itemName.toLowerCase()
      ).length;
      if (purchaseCount >= 3 && daysSincePurchase <= 14) {
        const existing = suggestions.find(s => s.item.toLowerCase() === item.itemName.toLowerCase());
        if (!existing) {
          suggestions.push({
            item: item.itemName,
            reason: `You frequently buy ${item.itemName}. Would you like to add it to your list?`,
            type: 're-purchase',
          });
        }
      }
    }
  });

  return suggestions;
}

export function evaluateCategoryRules(
  currentGroceryList: GroceryItem[]
): Suggestion[] {
  const suggestions: Suggestion[] = [];
  const currentItemNames = currentGroceryList.map(item => item.name.toLowerCase());
  const CATEGORY_ASSOCIATIONS = getCategoryAssociationsMap();

  // Check for category associations
  currentItemNames.forEach(itemName => {
    const associations = CATEGORY_ASSOCIATIONS[itemName];
    if (associations) {
      associations.forEach(associatedItem => {
        if (!currentItemNames.includes(associatedItem.toLowerCase())) {
          suggestions.push({
            item: associatedItem,
            reason: `You have ${itemName} in your list. Would you like to add ${associatedItem} as well?`,
            type: 'category',
          });
        }
      });
    }
  });

  return suggestions;
}

export function evaluateHealthierAlternatives(
  currentGroceryList: GroceryItem[]
): Suggestion[] {
  const suggestions: Suggestion[] = [];
  const currentItemNames = currentGroceryList.map(item => item.name.toLowerCase());
  const HEALTHIER_ALTERNATIVES = getHealthierAlternativesMap();

  currentItemNames.forEach(itemName => {
    const healthier = HEALTHIER_ALTERNATIVES[itemName];
    if (healthier && !currentItemNames.includes(healthier.toLowerCase())) {
      suggestions.push({
        item: healthier,
        reason: `Consider replacing ${itemName} with ${healthier} for a healthier option.`,
        type: 'healthier',
      });
    }
  });

  return suggestions;
}

export function evaluateExpiryReminders(
  purchaseHistory: PurchaseHistoryItem[]
): Array<{ message: string; severity: 'warning' | 'critical' }> {
  const reminders: Array<{ message: string; severity: 'warning' | 'critical' }> = [];
  const now = new Date();
  const DEFAULT_EXIRY_DAYS = getDefaultExpiryDaysMap();

  purchaseHistory.forEach(item => {
    const purchaseDate = new Date(item.purchaseDate);
    const expiryDays = item.expiryTimeInDays || DEFAULT_EXIRY_DAYS[item.itemName.toLowerCase()] || 7;
    const expiryDate = new Date(purchaseDate.getTime() + expiryDays * 24 * 60 * 60 * 1000);
    const daysUntilExpiry = Math.floor((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntilExpiry <= 0) {
      reminders.push({
        message: `${item.itemName} has expired. Consider replacing it.`,
        severity: 'critical',
      });
    } else if (daysUntilExpiry <= 3) {
      reminders.push({
        message: `${item.itemName} will expire in ${daysUntilExpiry} day${daysUntilExpiry !== 1 ? 's' : ''}.`,
        severity: 'warning',
      });
    }
  });

  return reminders;
}

export function getAllRuleBasedSuggestions(
  purchaseHistory: PurchaseHistoryItem[],
  currentGroceryList: GroceryItem[]
): {
  rePurchase: Suggestion[];
  category: Suggestion[];
  healthier: Suggestion[];
  expiry: Array<{ message: string; severity: 'warning' | 'critical' }>;
} {
  return {
    rePurchase: evaluateRePurchaseRules(purchaseHistory, currentGroceryList),
    category: evaluateCategoryRules(currentGroceryList),
    healthier: evaluateHealthierAlternatives(currentGroceryList),
    expiry: evaluateExpiryReminders(purchaseHistory),
  };
}

