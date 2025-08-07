import {Component, Input, Signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnalyticsSummary} from '../../models/analytics-summary.model';


@Component({
    selector: 'app-analytics-dashboard',
    standalone: true,
    imports: [CommonModule],

    templateUrl: './analytics-dashboard.html',
    styleUrl: './analytics-dashboard.scss'
})
export class AnalyticsDashboard {
    @Input({required: true}) summary!: Signal<AnalyticsSummary | null>;
}
