export interface GroceryItem {
  id: string;
  name: string;
  quantity?: number;
  unit?: string;
  category?: string;
  expiryDate?: string; // ISO string
  addedDate: string; // ISO string
}

export interface PurchaseHistoryItem {
  id: string;
  itemName: string;
  purchaseDate: string; // ISO string
  expiryTimeInDays: number;
  quantity?: number;
  cost?: number;
  expiryDate?: string; // ISO string
}

export interface BudgetEntry {
  id: string;
  date: string; // ISO string
  amount: number;
  description?: string;
}

export interface SuggestionRule {
  id: string;
  name: string;
  type: 're-purchase' | 'category' | 'expiry' | 'healthier';
  condition: Record<string, unknown>;
  action: Record<string, unknown>;
  priority: number;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface HealthierAlternative {
  id: string;
  unhealthyItem: string;
  healthyAlternative: string;
  category?: string;
}

export interface CategoryAssociation {
  id: string;
  primaryItem: string;
  suggestedItems: string[];
  category?: string;
}

export interface DefaultExpiryRule {
  id: string;
  itemName: string;
  category?: string;
  defaultExpiryDays: number;
}
