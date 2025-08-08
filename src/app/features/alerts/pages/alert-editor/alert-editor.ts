import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { AlertForm } from '../../components/alert-form/alert-form';
import { Alert } from '../../models/alert.model';
import { APP_ROUTES, buildPath } from '../../../../core/config/routes.config';

@Component({
  selector: 'app-alert-editor',
  standalone: true,
  imports: [CommonModule, AlertForm],
  template: `
    <h2>{{ isEditMode() ? 'Edit Alert' : 'Create New Alert' }}</h2>
    <app-alert-form 
      [alert]="alertToEdit() ?? null"
      (save)="onSave($event)"
      (cancel)="onCancel()">
    </app-alert-form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertEditor {
  private alertService = inject(AlertService);
  private router = inject(Router);

  id = input<string>(); // From route params
  isEditMode = computed(() => !!this.id());
  alertToEdit = computed(() => {
    const id = this.id();
    return id ? this.alertService.getAlertById(id)() : undefined;
  });

  onSave(alertData: Partial<Alert>): void {
    if (this.isEditMode() && this.alertToEdit()) {
      this.alertService.updateAlert({ ...this.alertToEdit()!, ...alertData });
    } else {
      this.alertService.addAlert(alertData as Omit<Alert, 'id' | 'timestamp'>);
    }
    this.router.navigate([buildPath(APP_ROUTES.ALERTS)]);
  }

  onCancel(): void {
    this.router.navigate([buildPath(APP_ROUTES.ALERTS)]);
  }
}