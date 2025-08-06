import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NavigationService} from '../../../core/services/navigation.service';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    templateUrl: './sidebar.html',
    styleUrl: './sidebar.scss',
})
export class Sidebar {
    private navigationService = inject(NavigationService);
    /**
     * Navigation items are converted from an observable to a signal for more efficient
     * change detection and a cleaner template syntax.
     */
    navItems = this.navigationService.navItems();
}