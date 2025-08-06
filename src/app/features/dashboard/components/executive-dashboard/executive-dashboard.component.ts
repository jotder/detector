import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertSummaryComponent } from '../alert-summary/alert-summary.component';
import { DashboardSummary } from '../../models/dashboard-summary.model';

@Component({
  selector: 'app-executive-dashboard',
  standalone: true,
  imports: [CommonModule, AlertSummaryComponent],
  template: `
    <h2>Executive Dashboard</h2>
    <app-alert-summary [summary]="summary"></app-alert-summary>
  `,
  styleUrl: './executive-dashboard.component.scss',
})
export class ExecutiveDashboardComponent {
  @Input() summary: DashboardSummary | null = null;
}