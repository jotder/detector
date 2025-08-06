/**
 * Represents a case for investigation, which can contain multiple alerts.
 */
export interface Case {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'closed' | 'pending';
  assigneeId?: string; // User ID
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  relatedAlertIds: string[];
}