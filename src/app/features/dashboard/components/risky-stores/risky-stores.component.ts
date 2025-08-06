import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiskyStore } from '../../models/risk-entity.model';

@Component({
  selector: 'app-risky-stores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './risky-stores.component.html',
  styleUrl: './risky-stores.component.scss'
})
export class RiskyStoresComponent {
  @Input() stores: RiskyStore[] | null = null;
}
