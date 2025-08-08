import {Component, Input, Signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertSummary} from '../alert-summary/alert-summary';
import {DashboardSummary} from '../../models/dashboard-summary.model';

@Component({
    selector: 'app-executive-dashboard',
    standalone: true,
    imports: [CommonModule, AlertSummary],
    templateUrl: 'executive-dashboard.html',
    styleUrl: './executive-dashboard.scss',
})
export class ExecutiveDashboard {
    @Input({required: true}) summary!: Signal<DashboardSummary | null>;
}