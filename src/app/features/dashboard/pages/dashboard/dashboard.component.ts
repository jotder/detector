import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertSummaryComponent } from '../../components/alert-summary/alert-summary.component';
import { DashboardSummary } from '../../models/dashboard-summary.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, AlertSummaryComponent],
  template: `
    <h2>Executive Dashboard</h2>
    <app-alert-summary [summary]="summary"></app-alert-summary>
    <!-- Other dashboard widgets will go here -->
  `,
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  // Mock data for demonstration purposes.
  // In a real application, this would come from a service.
  summary: DashboardSummary = {
    openAlertCount: 125,
    inProgressAlertCount: 42,
    closedAlertCount: 18934,
  };
}