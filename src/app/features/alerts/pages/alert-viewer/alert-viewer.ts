import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert-viewer',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    @if (alert(); as alertData) {
      <mat-card>
        <mat-card-header>
          <mat-card-title>Alert Details</mat-card-title>
          <mat-card-subtitle>ID: {{ alertData.id }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p><strong>Transaction ID:</strong> {{ alertData.transactionId }}</p>
          <p><strong>Rule ID:</strong> {{ alertData.ruleId }}</p>
          <p><strong>Severity:</strong> {{ alertData.severity }}</p>
          <p><strong>Status:</strong> {{ alertData.status }}</p>
          <p><strong>Timestamp:</strong> {{ alertData.timestamp | date:'full' }}</p>
          <p><strong>Assignee:</strong> {{ alertData.assigneeId || 'Unassigned' }}</p>
        </mat-card-content>
      </mat-card>
    } @else {
      <p>Alert not found.</p>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertViewer {
  private alertService = inject(AlertService);
  id = input.required<string>();
  alert = computed(() => this.alertService.getAlertById(this.id())());
}