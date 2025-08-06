/**
 * Detailed information for a specific cashier.
 */
export interface CashierDetails {
    id: string;
    name: string;
    refundPercentageOfNetSales: number;
    cashRefundAmount: number;
    cashOverShort: number;
}
