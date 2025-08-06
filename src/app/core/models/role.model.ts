/**
 * Represents a user role and its associated permissions.
 */
export interface Role {
    id: string;
    name: string;
    permissions: string[]; // e.g., ['read:reports', 'create:rules']
}