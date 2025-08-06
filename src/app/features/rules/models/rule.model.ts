/**
 * Represents a business rule for detecting anomalies.
 */
export interface Rule {
    id: string;
    name: string;
    description: string;
    status: 'active' | 'passive';
    priority: 'low' | 'medium' | 'high';
    condition: string; // Could be a string representation of the logic
    schedule?: string; // e.g., cron expression
    triggerInfoTemplate: string;
}