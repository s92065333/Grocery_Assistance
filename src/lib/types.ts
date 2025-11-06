export interface PurchaseHistoryItem {
  id: string;
  name: string;
  purchaseDate: string; // ISO string
  expiryTimeInDays: number;
}
