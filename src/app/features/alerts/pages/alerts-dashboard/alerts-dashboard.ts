import { ChangeDetectionStrategy, Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { AlertService } from '../../services/alert.service';
import { AlertList } from '../../components/alert-list/alert-list';
import { APP_ROUTES, buildPath } from '../../../../core/config/routes.config';

@Component({
  selector: 'app-alerts-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    AlertList,
  ],
  templateUrl: './alerts-dashboard.html',
  styleUrl: './alerts-dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertsDashboard implements OnDestroy {
  private readonly alertService = inject(AlertService);
  private readonly router = inject(Router);
  private readonly destroy$ = new Subject<void>();

  readonly alerts = this.alertService.alerts;
  readonly searchControl = new FormControl('');

  constructor() {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), takeUntil(this.destroy$))
      .subscribe((term) => {
        this.alertService.setSearchTerm(term || '');
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onCreateAlert(): void {
    this.router.navigate([buildPath(APP_ROUTES.ALERTS, APP_ROUTES.NEW)]);
  }

  onViewAlert(id: string): void {
    this.router.navigate([buildPath(APP_ROUTES.ALERTS, id)]);
  }

  onEditAlert(id: string): void {
    this.router.navigate([buildPath(APP_ROUTES.ALERTS, id, APP_ROUTES.EDIT)]);
  }

  onDeleteAlert(id: string): void {
    // In a real app, you would use a confirmation dialog service.
    if (confirm(`Are you sure you want to delete alert ${id}?`)) {
      this.alertService.deleteAlert(id);
    }
  }
}