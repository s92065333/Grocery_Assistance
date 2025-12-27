'use server';
/**
 * @fileOverview Flow to check expiring items in the purchase history and provide reminders.
 *
 * - checkExpiringItems - A function that checks for expiring items and returns notifications.
 * - CheckExpiringItemsInput - The input type for the checkExpiringItems function.
 * - CheckExpiringItemsOutput - The return type for the checkExpiringItems function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CheckExpiringItemsInputSchema = z.object({
  purchaseHistory: z.array(
    z.object({
      itemName: z.string(),
      purchaseDate: z.string(),
      expiryTimeInDays: z.number().optional(),
      expiryDate: z.string().optional(),
      deleted: z.boolean().optional(),
      isDeleted: z.boolean().optional(),
      consumed: z.boolean().optional(),
      isConsumed: z.boolean().optional(),
    })
  ).describe('The purchase history.'),
  groceryList: z.array(z.string()).optional().describe('The current grocery list items.'),
  currentDate: z.string().describe('The current date in ISO format.'),
});
export type CheckExpiringItemsInput = z.infer<typeof CheckExpiringItemsInputSchema>;

const CheckExpiringItemsOutputSchema = z.object({
  notifications: z.array(z.string()).describe('Array of notifications for expiring or expired items.'),
});
export type CheckExpiringItemsOutput = z.infer<typeof CheckExpiringItemsOutputSchema>;

export async function checkExpiringItems(
  input: CheckExpiringItemsInput
): Promise<CheckExpiringItemsOutput> {
  return checkExpiringItemsFlow(input);
}

// Default expiry days for common items if not specified by user
const DEFAULT_EXPIRY_RULES: Record<string, number> = {
  milk: 7,
  eggs: 21,
  bread: 5,
  vegetables: 5,
  fruits: 7,
  meat: 3,
  chicken: 3,
  fish: 2,
  rice: 365,
  pasta: 365,
  cheese: 14,
  yogurt: 10,
  butter: 30,
  juice: 14,
  canned: 365,
  sauce: 90,
  frozen: 90,
  potato: 14,
  onion: 14,
  garlic: 30,
};

const GENERIC_DEFAULT_DAYS = 7;

const checkExpiringItemsPrompt = ai.definePrompt({
  name: 'checkExpiringItemsPrompt',
  input: {
    schema: z.object({
      currentDate: z.string(),
      items: z.array(z.object({
        itemName: z.string(),
        daysUntilExpiry: z.number(),
      })),
    }),
  },
  output: {schema: CheckExpiringItemsOutputSchema},
  prompt: `You are a helpful assistant that checks a user's purchase history for items that are about to expire.

  Current Date: {{currentDate}}

  Items and days until expiry:
  {{#each items}}
  - {{itemName}}: {{daysUntilExpiry}} days
  {{/each}}

  Your task is to generate notifications for items that meet the following conditions:
  - Expired (days < 0)
  - Expires Today (days == 0)
  - Expires Tomorrow (days == 1)
  - Expires Soon (days <= 3)

  Ignore items with more than 3 days remaining.

  Return the output as a JSON object with a "notifications" property containing the array of strings.
  `,
});

const checkExpiringItemsFlow = ai.defineFlow(
  {
    name: 'checkExpiringItemsFlow',
    inputSchema: CheckExpiringItemsInputSchema,
    outputSchema: CheckExpiringItemsOutputSchema,
  },
  async input => {
    try {
      const groceryListSet = new Set((input.groceryList || []).map(i => i.toLowerCase().trim()));

      const purchaseHistory = input.purchaseHistory.filter(
        item => !item.deleted && !item.isDeleted && !item.consumed && !item.isConsumed
        item => !item.deleted && !item.isDeleted && !item.consumed && !item.isConsumed && !groceryListSet.has(item.itemName.toLowerCase().trim())
      );
      const currentDate = new Date(input.currentDate);
      // Normalize current date to UTC midnight for accurate day comparison
      currentDate.setUTCHours(0, 0, 0, 0);

      // Group by normalized item name to handle case variations and find the best/worst expiry
      const itemsMap = new Map<string, {days: number; originalName: string}[]>();

      for (const item of purchaseHistory) {
        if (!item.itemName) continue;

        const purchaseDate = new Date(item.purchaseDate);
        // Normalize purchase date to UTC midnight
        purchaseDate.setUTCHours(0, 0, 0, 0);

        let expiryDate: Date;

        // 1. Use explicit expiry date if available (User update)
        if (item.expiryDate) {
          expiryDate = new Date(item.expiryDate);
        }
        // 2. Use relative days if available
        else if (typeof item.expiryTimeInDays === 'number') {
          expiryDate = new Date(purchaseDate);
          expiryDate.setUTCDate(purchaseDate.getUTCDate() + item.expiryTimeInDays);
        }
        // 3. Fallback to defaults
        else {
          const normalizedName = item.itemName.toLowerCase().trim();
          let days = GENERIC_DEFAULT_DAYS;
          
          // Check for specific or partial match in defaults
          for (const [key, val] of Object.entries(DEFAULT_EXPIRY_RULES)) {
            if (normalizedName.includes(key)) {
              days = val;
              break;
            }
          }
          expiryDate = new Date(purchaseDate);
          expiryDate.setUTCDate(purchaseDate.getUTCDate() + days);
        }

        // Normalize expiry date to midnight
        expiryDate.setUTCHours(0, 0, 0, 0);

        const timeDiff = expiryDate.getTime() - currentDate.getTime();
        const daysUntilExpiry = Math.round(timeDiff / (1000 * 3600 * 24));

        const key = item.itemName.trim().toLowerCase();
        
        if (!itemsMap.has(key)) {
          itemsMap.set(key, []);
        }
        itemsMap.get(key)!.push({days: daysUntilExpiry, originalName: item.itemName});
      }

      const itemsForAi: {itemName: string; daysUntilExpiry: number}[] = [];

      for (const entries of itemsMap.values()) {
        // Find best expiry (largest days) to see if we have fresh stock
        const bestExpiry = Math.max(...entries.map(e => e.days));
        
        // If we have fresh stock (expiry > 3 days), assume replaced/ok and skip warnings
        if (bestExpiry > 3) continue;
        
        // Otherwise, find the most urgent relevant expiry to notify about
        const worstEntry = entries.reduce((prev, curr) => prev.days < curr.days ? prev : curr);
        const days = worstEntry.days;
        const displayName = worstEntry.originalName;

        itemsForAi.push({itemName: displayName, daysUntilExpiry: days});
      }

      const {output} = await checkExpiringItemsPrompt({
        currentDate: input.currentDate,
        items: itemsForAi,
      });

      return output || { notifications: [] };
    } catch (e) {
      console.error('Error processing purchase history:', e);
      return {notifications: ['Error processing purchase history.']};
    }
  }
);
