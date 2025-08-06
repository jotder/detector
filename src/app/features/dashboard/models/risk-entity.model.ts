/**
 * Represents a high-risk entity, either a store or a cashier.
 */
export interface RiskEntity {
  id: string;
  name: string;
  riskScore: number;
  trend: 'up' | 'down' | 'stable';
}

export interface RiskyStore extends RiskEntity {
  // Store-specific properties can be added here
}

export interface RiskyCashier extends RiskEntity {
  // Cashier-specific properties can be added here
}