import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiskyCashier } from '../../models/risk-entity.model';

@Component({
  selector: 'app-risky-cashiers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './risky-cashiers.component.html',
  styleUrl: './risky-cashiers.component.scss'
})
export class RiskyCashiersComponent {
  @Input() cashiers: RiskyCashier[] | null = null;
}
