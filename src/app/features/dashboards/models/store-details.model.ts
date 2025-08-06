/**
 * Detailed information for a specific store.
 */
export interface StoreDetails {
    id: string;
    name: string;
    discountValue: number;
    cashOverShortValue: number;
    refundPercentageOfNetSales: number;
    cashRefundAmount: number;
    cancelCountPercentage: number;
    priceOverridePercentage: number;
}
