'use server';

/**
 * @fileOverview Processes natural language chat commands for the grocery assistant.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProcessChatCommandInputSchema = z.object({
  userMessage: z.string().describe('The user\'s natural language message.'),
  groceryList: z.array(z.string()).describe('Current grocery list items.'),
  purchaseHistory: z.array(
    z.object({
      itemName: z.string(),
      purchaseDate: z.string(),
      expiryTimeInDays: z.number().optional(),
      deleted: z.boolean().optional(),
      isDeleted: z.boolean().optional(),
      consumed: z.boolean().optional(),
      isConsumed: z.boolean().optional(),
    })
  ).describe('User\'s purchase history.'),
});

const ProcessChatCommandOutputSchema = z.object({
  intent: z.enum(['add', 'remove', 'check', 'suggest', 'expiry', 'healthier', 'greeting', 'unknown']).describe('The detected intent of the user message.'),
  items: z.array(z.string()).describe('Extracted items from the message.'),
  quantities: z.array(z.object({
    item: z.string(),
    quantity: z.number(),
    unit: z.string().optional(),
  })).optional().describe('Extracted quantities and units.'),
  response: z.string().describe('The assistant\'s response to the user.'),
  reasoning: z.string().optional().describe('Explanation of why the assistant made this suggestion or response.'),
});

export type ProcessChatCommandInput = z.infer<typeof ProcessChatCommandInputSchema>;
export type ProcessChatCommandOutput = z.infer<typeof ProcessChatCommandOutputSchema>;

export async function processChatCommand(input: ProcessChatCommandInput): Promise<ProcessChatCommandOutput> {
  return processChatCommandFlow(input);
}

const prompt = ai.definePrompt({
  name: 'processChatCommandPrompt',
  input: {schema: ProcessChatCommandInputSchema},
  output: {schema: ProcessChatCommandOutputSchema},
  prompt: `You are a helpful grocery shopping assistant. Analyze the user's message and determine their intent.

User Message: "{{userMessage}}"

Current Grocery List:
{{#each groceryList}}
- {{this}}
{{/each}}

Purchase History:
{{#each purchaseHistory}}
- {{itemName}} (Purchased on {{purchaseDate}})
{{/each}}

Your task:
1. Determine the intent: 'add', 'remove', 'check', 'suggest', 'expiry', 'healthier', 'greeting', or 'unknown'
2. Extract any items mentioned (e.g., "2kg rice" → item: "rice", quantity: 2, unit: "kg")
3. Extract quantities and units if mentioned
4. Generate a helpful response
5. If suggesting something, explain your reasoning

Examples:
- "Add 2kg rice" → intent: 'add', items: ['rice'], quantities: [{item: 'rice', quantity: 2, unit: 'kg'}]
- "Do I have milk?" → intent: 'check', items: ['milk']
- "What should I buy this week?" → intent: 'suggest'
- "What's expiring?" → intent: 'expiry'
- "Suggest healthier options" → intent: 'healthier'

Be conversational and helpful. Explain your reasoning when making suggestions.`,
});

const processChatCommandFlow = ai.defineFlow(
  {
    name: 'processChatCommandFlow',
    inputSchema: ProcessChatCommandInputSchema,
    outputSchema: ProcessChatCommandOutputSchema,
  },
  async input => {
    const filteredHistory = input.purchaseHistory.filter(
      item => !item.deleted && !item.isDeleted && !item.consumed && !item.isConsumed
    );
    const {output} = await prompt({
      ...input,
      purchaseHistory: filteredHistory,
    });
    return output!;
  }
);
