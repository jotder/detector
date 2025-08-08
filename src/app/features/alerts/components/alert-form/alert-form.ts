import { ChangeDetectionStrategy, Component, effect, EventEmitter, inject, input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Alert, AlertSeverity, AlertStatus } from '../../models/alert.model';

@Component({
  selector: 'app-alert-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './alert-form.html',
  styleUrl: './alert-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertForm {
  alert = input<Alert | null>(null);
  @Output() save = new EventEmitter<Partial<Alert>>();
  @Output() cancel = new EventEmitter<void>();

  alertForm: FormGroup;

  readonly severities = Object.values(AlertSeverity);
  readonly statuses = Object.values(AlertStatus);

  private readonly fb = inject(FormBuilder);

  constructor() {
    this.alertForm = this.fb.group({
      ruleId: ['', Validators.required],
      transactionId: ['', Validators.required],
      severity: [AlertSeverity.Low, Validators.required],
      status: [AlertStatus.Open, Validators.required],
      assigneeId: [''],
    });

    effect(() => {
      const alertData = this.alert();
      if (alertData) {
        this.alertForm.patchValue(alertData);
      } else {
        this.alertForm.reset({
          severity: AlertSeverity.Low,
          status: AlertStatus.Open,
          ruleId: '',
          transactionId: '',
          assigneeId: '',
        });
      }
    });
  }

  onSubmit(): void {
    if (this.alertForm.valid) {
      this.save.emit(this.alertForm.value as Partial<Alert>);
    }
  }
}