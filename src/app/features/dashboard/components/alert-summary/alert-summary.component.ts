import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardSummary} from '../../models/dashboard-summary.model';
import { FormatNumberPipe } from '../../../../shared/pipes/format-number.pipe';

@Component({
  selector: 'app-alert-summary',
  standalone: true,
  imports: [CommonModule, FormatNumberPipe],
  templateUrl: './alert-summary.component.html',
  styleUrl: './alert-summary.component.scss'
})
export class AlertSummaryComponent {
  @Input() summary: DashboardSummary | null = null;
}