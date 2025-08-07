import { Injectable, signal } from '@angular/core';

export interface NavItem {
    path: string;
    label: string;
    icon?: string; // Optional icon
    children?: NavItem[];
}

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    private readonly _navItems = signal<NavItem[]>([
        {
            path: '/dashboard',
            label: 'Dashboard',
            children: [
                {
                    path: '/dashboard/executive-dashboard',
                    label: 'Executive Dashboard',
                },
                {
                    path: '/dashboard/analytics-view',
                    label: 'Analytics View',
                },
                {
                    path: '/dashboard/drill-down-view',
                    label: 'Drill Down View',
                },
            ],
        },
        { path: '/alerts', label: 'Alerts' },
        { path: '/cases', label: 'Cases' },
        { path: '/rules', label: 'Rules' },
        { path: '/reports', label: 'Reports' },
        { path: '/control-panel', label: 'Control Panel' },
    ]);

    public readonly navItems = this._navItems.asReadonly();
}
