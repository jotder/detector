import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analyze.html',
  styleUrl: './analyze.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Analyze {}