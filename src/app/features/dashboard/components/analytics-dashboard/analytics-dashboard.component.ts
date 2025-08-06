import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsSummary } from '../../models/analytics-summary.model';
import { FormatNumberPipe } from '../../../../shared/pipes/format-number.pipe';

@Component({
  selector: 'app-analytics-dashboard',
  standalone: true,
  imports: [CommonModule, FormatNumberPipe],
  templateUrl: './analytics-dashboard.component.html',
  styleUrl: './analytics-dashboard.component.scss'
})
export class AnalyticsDashboardComponent {
  @Input() summary: AnalyticsSummary | null = null;
}
