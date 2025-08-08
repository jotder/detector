/**
 * Defines the route paths for the application as constants.
 * Using constants for route paths provides type safety and makes it easier to refactor routes in the future.
 */
export const APP_ROUTES = {
    // Top-level features
    DASHBOARD: 'dashboard',
    ALERTS: 'alerts',
    CASES: 'cases',
    RULES: 'rules',
    REPORTS: 'reports',
    AI: 'ai',
    CONTROL_PANEL: 'control-panel',
    AUTH: 'auth',

    // Dashboard sub-routes
    EXECUTIVE_DASHBOARD: 'executive-dashboard',
    ANALYTICS_VIEW: 'analytics-view',
    DRILL_DOWN_VIEW: 'drill-down-view',

    // Alerts sub-routes
    ANALYZE: 'analyze',
    NEW: 'new',
    EDIT: 'edit',
    // We don't need a constant for ':id' as it's a parameter

    // Misc
    NOT_FOUND: '404',
} as const;

/**
 * A helper function to build a full, absolute path from route segments.
 * @param segments The segments of the path.
 * @returns A full path string starting with a '/'.
 */
export const buildPath = (...segments: string[]): string => `/${segments.join('/')}`;