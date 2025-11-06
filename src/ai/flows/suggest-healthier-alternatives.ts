'use server';

/**
 * @fileOverview Suggests healthier alternatives for items in the grocery list.
 *
 * - suggestHealthierAlternatives - A function that suggests healthier alternatives for grocery items.
 * - SuggestHealthierAlternativesInput - The input type for the suggestHealthierAlternatives function.
 * - SuggestHealthierAlternativesOutput - The return type for the suggestHealthierAlternatives function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestHealthierAlternativesInputSchema = z.object({
  groceryList: z
    .array(z.string())
    .describe('The current list of grocery items.'),
});
export type SuggestHealthierAlternativesInput = z.infer<
  typeof SuggestHealthierAlternativesInputSchema
>;

const SuggestHealthierAlternativesOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe(
      'A list of suggestions for healthier alternatives to items in the grocery list.'
    ),
});
export type SuggestHealthierAlternativesOutput = z.infer<
  typeof SuggestHealthierAlternativesOutputSchema
>;

export async function suggestHealthierAlternatives(
  input: SuggestHealthierAlternativesInput
): Promise<SuggestHealthierAlternativesOutput> {
  return suggestHealthierAlternativesFlow(input);
}

const healthierAlternativesPrompt = ai.definePrompt({
  name: 'healthierAlternativesPrompt',
  input: {schema: SuggestHealthierAlternativesInputSchema},
  output: {schema: SuggestHealthierAlternativesOutputSchema},
  prompt: `Given the following list of grocery items, suggest healthier alternatives for each item if available.\n\nGrocery List:\n{{#each groceryList}}- {{this}}\n{{/each}}\n\nSuggest healthier alternatives:\n`,
});

const suggestHealthierAlternativesFlow = ai.defineFlow(
  {
    name: 'suggestHealthierAlternativesFlow',
    inputSchema: SuggestHealthierAlternativesInputSchema,
    outputSchema: SuggestHealthierAlternativesOutputSchema,
  },
  async input => {
    const {output} = await healthierAlternativesPrompt(input);
    return output!;
  }
);
