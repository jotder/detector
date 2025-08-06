import {Role} from './role.model';

/**
 * Represents an authenticated user in the system.
 */
export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
}