import { Injectable, signal } from '@angular/core';
import { APP_ROUTES, buildPath } from '../config/routes.config';

export interface NavItem {
    path: string;
    label: string;
    children?: NavItem[];
}

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    private readonly _navItems = signal<NavItem[]>([
        {
            path: buildPath(APP_ROUTES.DASHBOARD),
            label: 'Dashboard',
            children: [
                {
                    path: buildPath(APP_ROUTES.DASHBOARD, APP_ROUTES.EXECUTIVE_DASHBOARD),
                    label: 'Executive Dashboard',
                },
                {
                    path: buildPath(APP_ROUTES.DASHBOARD, APP_ROUTES.ANALYTICS_VIEW),
                    label: 'Analytics View',
                },
                {
                    path: buildPath(APP_ROUTES.DASHBOARD, APP_ROUTES.DRILL_DOWN_VIEW),
                    label: 'Drill Down View',
                },
            ],
        },
        {
            path: buildPath(APP_ROUTES.ALERTS),
            label: 'Alerts',
            children: [
                {
                    path: buildPath(APP_ROUTES.ALERTS),
                    label: 'Dashboard',
                },
                {
                    path: buildPath(APP_ROUTES.ALERTS, APP_ROUTES.ANALYZE),
                    label: 'Analyze',
                },
            ],
        },
        { path: buildPath(APP_ROUTES.CASES), label: 'Cases' },
        { path: buildPath(APP_ROUTES.RULES), label: 'Rules' },
        { path: buildPath(APP_ROUTES.REPORTS), label: 'Reports' },
        { path: buildPath(APP_ROUTES.AI), label: 'AI Assistant' },
        { path: buildPath(APP_ROUTES.CONTROL_PANEL), label: 'Control Panel' },
    ]);

    public readonly navItems = this._navItems.asReadonly();
}
