import {Injectable, signal} from '@angular/core';

export interface NavItem {
    path: string;
    label: string;
    icon?: string; // Optional icon
}

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    private readonly _navItems = signal<NavItem[]>([
        {path: '/dashboard', label: 'Dashboard'},
        {path: '/alerts', label: 'Alerts'},
        {path: '/cases', label: 'Cases'},
        {path: '/rules', label: 'Rules'},
        {path: '/reports', label: 'Reports'},
        {path: '/control-panel', label: 'Control Panel'},
    ]);

    public readonly navItems = this._navItems.asReadonly();
}