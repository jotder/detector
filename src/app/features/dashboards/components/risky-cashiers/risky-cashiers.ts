import {Component, Input, Signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RiskyCashier} from '../../models/risk-entity.model';

@Component({
    selector: 'app-risky-cashiers',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './risky-cashiers.html',
    styleUrl: './risky-cashiers.scss'
})
export class RiskyCashiers {
    @Input({required: true}) cashiers!: Signal<RiskyCashier[] | null>;
}
