/**
 * Represents a custom or standard report configuration.
 */
export interface Report {
    id: string;
    name: string;
    description: string;
    createdBy: string; // User ID
    createdAt: string; // ISO 8601 date string
    configuration: any; // JSON object for report parameters
}