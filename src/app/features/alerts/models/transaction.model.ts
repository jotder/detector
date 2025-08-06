/**
 * Represents a single transaction record, often linked to an alert.
 */
export interface Transaction {
    id: string;
    timestamp: string; // ISO 8601 date string
    storeId: string;
    cashierId: string;
    netSales: number;
    totalAmount: number;
    items: TransactionItem[];
    receiptImageUrl?: string;
}

export interface TransactionItem {
    sku: string;
    name: string;
    quantity: number;
    price: number;
}