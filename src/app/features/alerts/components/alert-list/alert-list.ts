import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Alert } from '../../models/alert.model';

@Component({
  selector: 'app-alert-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './alert-list.html',
  styleUrl: './alert-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertList {
  @Input({ required: true }) alerts!: Signal<Alert[]>;

  @Output() view = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  readonly displayedColumns: string[] = ['id', 'severity', 'status', 'timestamp', 'actions'];
}