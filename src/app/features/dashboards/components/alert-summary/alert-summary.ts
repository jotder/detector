import {Component, Input, Signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardSummary} from '../../models/dashboard-summary.model';

@Component({
    selector: 'app-alert-summary',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './alert-summary.html',
    styleUrl: './alert-summary.scss'
})
export class AlertSummary {
    @Input({required: true}) summary!: Signal<DashboardSummary | null>;
}