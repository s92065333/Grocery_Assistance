'use client';

import type { HealthierAlternative, CategoryAssociation, DefaultExpiryRule, SuggestionRule } from './types';

const RULES_STORAGE_KEY = 'smart_shopper_rules';

export interface StoredRules {
  healthierAlternatives: HealthierAlternative[];
  categoryAssociations: CategoryAssociation[];
  defaultExpiryRules: DefaultExpiryRule[];
  customRules: SuggestionRule[];
}

const DEFAULT_RULES: StoredRules = {
  healthierAlternatives: [
    { id: '1', unhealthyItem: 'white bread', healthyAlternative: 'brown bread' },
    { id: '2', unhealthyItem: 'white rice', healthyAlternative: 'brown rice' },
    { id: '3', unhealthyItem: 'full cream milk', healthyAlternative: 'low-fat milk' },
    { id: '4', unhealthyItem: 'whole milk', healthyAlternative: 'low-fat milk' },
    { id: '5', unhealthyItem: 'soda', healthyAlternative: 'sparkling water' },
    { id: '6', unhealthyItem: 'sugar', healthyAlternative: 'honey' },
    { id: '7', unhealthyItem: 'butter', healthyAlternative: 'olive oil' },
    { id: '8', unhealthyItem: 'mayonnaise', healthyAlternative: 'greek yogurt' },
    { id: '9', unhealthyItem: 'potato chips', healthyAlternative: 'baked chips' },
    { id: '10', unhealthyItem: 'ice cream', healthyAlternative: 'frozen yogurt' },
    { id: '11', unhealthyItem: 'pasta', healthyAlternative: 'whole wheat pasta' },
    { id: '12', unhealthyItem: 'white flour', healthyAlternative: 'whole wheat flour' },
    { id: '13', unhealthyItem: 'candy', healthyAlternative: 'dried fruits' },
    { id: '14', unhealthyItem: 'cookies', healthyAlternative: 'oatmeal cookies' },
  ],
  categoryAssociations: [
    { id: '1', primaryItem: 'tea', suggestedItems: ['sugar', 'honey', 'milk'] },
    { id: '2', primaryItem: 'coffee', suggestedItems: ['sugar', 'milk', 'cream'] },
    { id: '3', primaryItem: 'bread', suggestedItems: ['butter', 'jam'] },
    { id: '4', primaryItem: 'eggs', suggestedItems: ['milk', 'cheese'] },
    { id: '5', primaryItem: 'pasta', suggestedItems: ['tomato sauce', 'cheese'] },
    { id: '6', primaryItem: 'rice', suggestedItems: ['vegetables', 'soy sauce'] },
    { id: '7', primaryItem: 'chicken', suggestedItems: ['vegetables', 'spices'] },
    { id: '8', primaryItem: 'fish', suggestedItems: ['lemon', 'vegetables'] },
  ],
  defaultExpiryRules: [
    { id: '1', itemName: 'milk', defaultExpiryDays: 7 },
    { id: '2', itemName: 'eggs', defaultExpiryDays: 14 },
    { id: '3', itemName: 'bread', defaultExpiryDays: 5 },
    { id: '4', itemName: 'cheese', defaultExpiryDays: 10 },
    { id: '5', itemName: 'yogurt', defaultExpiryDays: 7 },
    { id: '6', itemName: 'meat', defaultExpiryDays: 3 },
    { id: '7', itemName: 'fish', defaultExpiryDays: 2 },
    { id: '8', itemName: 'vegetables', defaultExpiryDays: 7 },
    { id: '9', itemName: 'fruits', defaultExpiryDays: 5 },
  ],
  customRules: [],
};

export function loadRules(): StoredRules {
  // Check if we're in a browser environment
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return DEFAULT_RULES;
  }
  
  try {
    const stored = localStorage.getItem(RULES_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with defaults to ensure all properties exist
      return {
        healthierAlternatives: parsed.healthierAlternatives || DEFAULT_RULES.healthierAlternatives,
        categoryAssociations: parsed.categoryAssociations || DEFAULT_RULES.categoryAssociations,
        defaultExpiryRules: parsed.defaultExpiryRules || DEFAULT_RULES.defaultExpiryRules,
        customRules: parsed.customRules || [],
      };
    }
  } catch (error) {
    console.error('Failed to load rules from storage:', error);
  }
  return DEFAULT_RULES;
}

export function saveRules(rules: StoredRules): void {
  // Check if we're in a browser environment
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    console.warn('localStorage is not available. Cannot save rules.');
    return;
  }
  
  try {
    localStorage.setItem(RULES_STORAGE_KEY, JSON.stringify(rules));
  } catch (error) {
    console.error('Failed to save rules to storage:', error);
    throw error;
  }
}

export function addHealthierAlternative(rule: Omit<HealthierAlternative, 'id'>): HealthierAlternative {
  const rules = loadRules();
  const newRule: HealthierAlternative = {
    ...rule,
    id: crypto.randomUUID(),
  };
  rules.healthierAlternatives.push(newRule);
  saveRules(rules);
  return newRule;
}

export function updateHealthierAlternative(id: string, rule: Partial<HealthierAlternative>): void {
  const rules = loadRules();
  const index = rules.healthierAlternatives.findIndex(r => r.id === id);
  if (index !== -1) {
    rules.healthierAlternatives[index] = { ...rules.healthierAlternatives[index], ...rule };
    saveRules(rules);
  }
}

export function deleteHealthierAlternative(id: string): void {
  const rules = loadRules();
  rules.healthierAlternatives = rules.healthierAlternatives.filter(r => r.id !== id);
  saveRules(rules);
}

export function addCategoryAssociation(rule: Omit<CategoryAssociation, 'id'>): CategoryAssociation {
  const rules = loadRules();
  const newRule: CategoryAssociation = {
    ...rule,
    id: crypto.randomUUID(),
  };
  rules.categoryAssociations.push(newRule);
  saveRules(rules);
  return newRule;
}

export function updateCategoryAssociation(id: string, rule: Partial<CategoryAssociation>): void {
  const rules = loadRules();
  const index = rules.categoryAssociations.findIndex(r => r.id === id);
  if (index !== -1) {
    rules.categoryAssociations[index] = { ...rules.categoryAssociations[index], ...rule };
    saveRules(rules);
  }
}

export function deleteCategoryAssociation(id: string): void {
  const rules = loadRules();
  rules.categoryAssociations = rules.categoryAssociations.filter(r => r.id !== id);
  saveRules(rules);
}

export function addDefaultExpiryRule(rule: Omit<DefaultExpiryRule, 'id'>): DefaultExpiryRule {
  const rules = loadRules();
  const newRule: DefaultExpiryRule = {
    ...rule,
    id: crypto.randomUUID(),
  };
  rules.defaultExpiryRules.push(newRule);
  saveRules(rules);
  return newRule;
}

export function updateDefaultExpiryRule(id: string, rule: Partial<DefaultExpiryRule>): void {
  const rules = loadRules();
  const index = rules.defaultExpiryRules.findIndex(r => r.id === id);
  if (index !== -1) {
    rules.defaultExpiryRules[index] = { ...rules.defaultExpiryRules[index], ...rule };
    saveRules(rules);
  }
}

export function deleteDefaultExpiryRule(id: string): void {
  const rules = loadRules();
  rules.defaultExpiryRules = rules.defaultExpiryRules.filter(r => r.id !== id);
  saveRules(rules);
}

export function addCustomRule(rule: Omit<SuggestionRule, 'id' | 'createdAt' | 'updatedAt'>): SuggestionRule {
  const rules = loadRules();
  const now = new Date().toISOString();
  const newRule: SuggestionRule = {
    ...rule,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };
  rules.customRules.push(newRule);
  saveRules(rules);
  return newRule;
}

export function updateCustomRule(id: string, rule: Partial<Omit<SuggestionRule, 'id' | 'createdAt'>>): void {
  const rules = loadRules();
  const index = rules.customRules.findIndex(r => r.id === id);
  if (index !== -1) {
    rules.customRules[index] = {
      ...rules.customRules[index],
      ...rule,
      updatedAt: new Date().toISOString(),
    };
    saveRules(rules);
  }
}

export function deleteCustomRule(id: string): void {
  const rules = loadRules();
  rules.customRules = rules.customRules.filter(r => r.id !== id);
  saveRules(rules);
}

export function exportRules(): string {
  const rules = loadRules();
  return JSON.stringify(rules, null, 2);
}

export function importRules(jsonString: string): void {
  try {
    const parsed = JSON.parse(jsonString);
    saveRules(parsed);
  } catch (error) {
    console.error('Failed to import rules:', error);
    throw new Error('Invalid JSON format');
  }
}

export function resetToDefaults(): void {
  saveRules(DEFAULT_RULES);
}

