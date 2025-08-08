import {Component, Input, signal, Signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertSummary} from '../alert-summary/alert-summary';
import {DashboardSummary} from '../../models/dashboard-summary.model';

@Component({
    selector: 'app-executive-dashboard',
    standalone: true,
    imports: [CommonModule, AlertSummary],
    template: `

        <div class="card">
            <div class="card-header">
                <h2>Executive Dashboard</h2>
            </div>
            <div class="card-body">
                <app-alert-summary [summary]="summary"></app-alert-summary>
            </div>
        </div>

        <h2>Executive Dashboard</h2>
        <app-alert-summary [summary]="summary"></app-alert-summary>

    `,
    styleUrl: './executive-dashboard.scss',
})
export class ExecutiveDashboard {
  summary: Signal<DashboardSummary | null> = signal(null);
}