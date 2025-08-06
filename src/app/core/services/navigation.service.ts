import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface NavItem {
  path: string;
  label: string;
  icon?: string; // Optional icon
}

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private navItems = new BehaviorSubject<NavItem[]>([
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/alerts', label: 'Alerts' },
    { path: '/cases', label: 'Cases' },
    { path: '/rules', label: 'Rules' },
    { path: '/reports', label: 'Reports' },
    { path: '/control-panel', label: 'Control Panel' },
  ]);

  navItems$ = this.navItems.asObservable();
}