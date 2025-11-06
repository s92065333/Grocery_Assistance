import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-healthier-alternatives.ts';
import '@/ai/flows/check-expiring-items.ts';
import '@/ai/flows/suggest-re-purchase.ts';