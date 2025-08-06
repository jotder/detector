/**
 * Represents a high-risk entity, either a store or a cashier.
 */
export interface RiskEntity {
  id: string;
  name: string;
  type: 'store' | 'cashier';
  riskScore: number;
  trend: 'up' | 'down' | 'stable';
}