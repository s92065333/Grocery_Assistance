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
  purchaseHistory: z
    .string()
    .describe(
      'A JSON string representing the purchase history. Each item should have purchaseDate and expiryTimeInDays fields.'
    ),
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

const prompt = ai.definePrompt({
  name: 'checkExpiringItemsPrompt',
  input: {schema: CheckExpiringItemsInputSchema},
  output: {schema: CheckExpiringItemsOutputSchema},
  prompt: `You are a helpful assistant that checks a user's purchase history for items that are about to expire or have already expired.  You will receive purchase history as a JSON string, and the current date.

  Purchase History:
  {{purchaseHistory}}

  Current Date: {{currentDate}}

  Your task is to generate an array of notifications for items that meet the following conditions:

  - If an item will expire tomorrow, generate a notification saying "{{itemName}} will expire tomorrow."
  - If an item has already expired, generate a notification saying "{{itemName}} has expired. Consider replacing it."

  Return the notifications as a JSON array of strings.

  Example:
  Input:
  {
    "purchaseHistory": '[{"itemName": "Milk", "purchaseDate": "2024-01-01", "expiryTimeInDays": 7}, {"itemName": "Eggs", "purchaseDate": "2024-01-05", "expiryTimeInDays": 3}]',
    "currentDate": "2024-01-07"
  }

  Output:
  {
    "notifications": ["Milk will expire tomorrow.", "Eggs has expired. Consider replacing it."]
  }`,
});

const checkExpiringItemsFlow = ai.defineFlow(
  {
    name: 'checkExpiringItemsFlow',
    inputSchema: CheckExpiringItemsInputSchema,
    outputSchema: CheckExpiringItemsOutputSchema,
  },
  async input => {
    try {
      const purchaseHistory = JSON.parse(input.purchaseHistory) as {itemName: string; purchaseDate: string; expiryTimeInDays: number}[];
      const currentDate = new Date(input.currentDate);

      const notifications: string[] = [];

      for (const item of purchaseHistory) {
        const purchaseDate = new Date(item.purchaseDate);
        const expiryDate = new Date(
          purchaseDate.setDate(purchaseDate.getDate() + item.expiryTimeInDays)
        );
        const timeDiff = expiryDate.getTime() - currentDate.getTime();
        const daysUntilExpiry = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if (daysUntilExpiry === 1) {
          notifications.push(`${item.itemName} will expire tomorrow.`);
        } else if (daysUntilExpiry <= 0) {
          notifications.push(`${item.itemName} has expired. Consider replacing it.`);
        }
      }

      return {notifications};
    } catch (e) {
      console.error('Error processing purchase history:', e);
      return {notifications: ['Error processing purchase history.']};
    }
  }
);
