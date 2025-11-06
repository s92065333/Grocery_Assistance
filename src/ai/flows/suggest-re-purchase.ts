'use server';

/**
 * @fileOverview Recommends items for re-purchase based on purchase history.
 *
 * - suggestRePurchase - A function that suggests items for re-purchase.
 * - SuggestRePurchaseInput - The input type for the suggestRePurchase function.
 * - SuggestRePurchaseOutput - The return type for the suggestRePurchase function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRePurchaseInputSchema = z.object({
  purchaseHistory: z.array(
    z.object({
      itemName: z.string().describe('The name of the item.'),
      purchaseDate: z.string().describe('The date the item was purchased.'),
    })
  ).describe('The user purchase history.'),
  currentGroceryList: z.array(z.string()).describe('The current grocery list.'),
});
export type SuggestRePurchaseInput = z.infer<typeof SuggestRePurchaseInputSchema>;

const SuggestRePurchaseOutputSchema = z.object({
  suggestions: z.array(
    z.string().describe('Items suggested for re-purchase.')
  ).describe('A list of suggested items for re-purchase.'),
});
export type SuggestRePurchaseOutput = z.infer<typeof SuggestRePurchaseOutputSchema>;

export async function suggestRePurchase(input: SuggestRePurchaseInput): Promise<SuggestRePurchaseOutput> {
  return suggestRePurchaseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRePurchasePrompt',
  input: {schema: SuggestRePurchaseInputSchema},
  output: {schema: SuggestRePurchaseOutputSchema},
  prompt: `You are a helpful shopping assistant. Analyze the user's purchase history and current grocery list to suggest items for re-purchase.

Purchase History:
{{#each purchaseHistory}}
- {{itemName}} (Purchased on {{purchaseDate}})
{{/each}}

Current Grocery List:
{{#each currentGroceryList}}
- {{this}}
{{/each}}

Suggest items from the purchase history that are NOT currently in the grocery list. Only suggest items that the user has bought before.

Format your response as a list of item names.
`, 
});

const suggestRePurchaseFlow = ai.defineFlow(
  {
    name: 'suggestRePurchaseFlow',
    inputSchema: SuggestRePurchaseInputSchema,
    outputSchema: SuggestRePurchaseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
